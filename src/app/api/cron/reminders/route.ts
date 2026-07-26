import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { createClient } from '@supabase/supabase-js';

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    'mailto:test@example.com',
    vapidPublicKey,
    vapidPrivateKey
  );
}

export async function GET(req: Request) {
  try {
    // 1. Verify Vercel Cron Secret (or local testing)
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ error: 'Supabase credentials missing.' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 2. Calculate target dates
    const today = new Date();
    const addDays = (days: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + days);
      return d.toISOString().split('T')[0];
    };
    
    const targets = [addDays(30), addDays(15), addDays(7), addDays(0)];

    // 3. Query expiring documents
    const { data: documents, error: docError } = await supabase
      .from('documents')
      .select('id, document_type_name, expiry_date, employee_id, employees(full_name)')
      .in('expiry_date', targets);

    if (docError) {
      throw docError;
    }

    if (!documents || documents.length === 0) {
      return NextResponse.json({ message: 'No expiring documents found today.' });
    }

    // 4. Create in-app notifications
    const notificationsToInsert = documents.map(doc => {
      const diffTime = new Date(doc.expiry_date).getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const empName = doc.employees && !Array.isArray(doc.employees) ? (doc.employees as any).full_name : 'Employee';
      
      return {
        notification_key: `exp_${doc.id}_${doc.expiry_date}`,
        title: `${doc.document_type_name} Expiring Soon`,
        subtitle: `${empName}'s document expires in ${diffDays} days.`,
        employee_name: empName,
        expiry_date: doc.expiry_date,
        days_remaining: diffDays,
        status: diffDays <= 0 ? 'expired' : 'expiring_soon',
        document_id: doc.id,
        employee_id: doc.employee_id,
        is_read: false
      };
    });

    const { error: notifError } = await supabase
      .from('notifications')
      .upsert(notificationsToInsert, { onConflict: 'notification_key' });

    if (notifError) {
      console.error("Error inserting notifications:", notifError);
    }

    // 5. Send Web Push to all subscribed users
    const { data: subscriptions } = await supabase.from('push_subscriptions').select('*');
    
    let sentCount = 0;
    if (subscriptions && subscriptions.length > 0 && vapidPublicKey && vapidPrivateKey) {
      for (const doc of documents) {
        const diffTime = new Date(doc.expiry_date).getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const empName = doc.employees && !Array.isArray(doc.employees) ? (doc.employees as any).full_name : 'Employee';
        
        const payload = JSON.stringify({
          title: `Action Required: ${doc.document_type_name}`,
          body: `${empName}'s document expires in ${diffDays === 0 ? 'today' : diffDays + ' days'}!`,
          url: '/'
        });

        const sendPromises = subscriptions.map(async (sub) => {
          try {
            await webpush.sendNotification({
              endpoint: sub.endpoint,
              keys: { auth: sub.auth, p256dh: sub.p256dh }
            }, payload);
            sentCount++;
          } catch (err: any) {
            if (err.statusCode === 410 || err.statusCode === 404) {
              await supabase.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
            }
          }
        });
        
        await Promise.all(sendPromises);
      }
    }

    return NextResponse.json({ 
      success: true, 
      processedDocuments: documents.length,
      pushNotificationsSent: sentCount
    });

  } catch (error: any) {
    console.error('Cron Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
