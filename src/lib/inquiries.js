export async function submitInquiry(data) {
  // Stub: 0.8초 지연 후 성공 반환
  await new Promise((r) => setTimeout(r, 800))
  console.log('[inquiry stub]', data)
  return { ok: true }

  // ── Supabase 교체 코드 ─────────────────────────────────
  // import { createClient } from '@supabase/supabase-js'
  // const supabase = createClient(
  //   import.meta.env.VITE_SUPABASE_URL,
  //   import.meta.env.VITE_SUPABASE_ANON_KEY
  // )
  // const { error } = await supabase.from('inquiries').insert([{
  //   name: data.name,
  //   email: data.email,
  //   company: data.company || null,
  //   inquiry_type: data.inquiryType,
  //   message: data.message,
  //   created_at: new Date().toISOString(),
  // }])
  // if (error) throw error
  // // Webhook / Edge Function 메일 알림은 Supabase 대시보드에서 설정
  // return { ok: true }
}
