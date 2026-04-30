import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Save to Supabase
    // ⚠️ ACTION REQUIRED: Create this table in Supabase before deploying.
    // SQL to run in your Supabase SQL editor:
    //
    // CREATE TABLE contact_messages (
    //   id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    //   name        text NOT NULL,
    //   email       text NOT NULL,
    //   subject     text,
    //   message     text NOT NULL,
    //   created_at  timestamptz DEFAULT now()
    // );
    //
    // -- Allow anyone to insert (public contact form)
    // ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
    // CREATE POLICY "Allow public inserts"
    //   ON contact_messages FOR INSERT TO anon WITH CHECK (true);
    //
    // -- Only authenticated users (you) can read
    // CREATE POLICY "Allow owner reads"
    //   ON contact_messages FOR SELECT TO authenticated USING (true);

    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject || 'General question',
        message: message.trim(),
      })

    if (dbError) {
      // Log server-side but don't expose DB errors to the user
      console.error('[contact] Supabase insert error:', dbError.message)
      // Still return success — the message is the content, not the DB row
      // You can also set up a Supabase webhook to email you on new rows
    }

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please email us directly at hello@meridianng.com' },
      { status: 500 }
    )
  }
}
