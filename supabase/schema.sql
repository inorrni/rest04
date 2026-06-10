-- ============================================================
-- rest04 게시판 스키마 + RLS  (접두어 rest04_ 적용)
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- 권한 정책: 게시판은 "회원 전용" (로그인해야 읽기·쓰기 모두 가능)
-- ※ 구버전(접두어 없는 posts)이 있다면 먼저 teardown.sql 실행.
-- ============================================================

-- 1) rest04_posts 테이블 ----------------------------------------
create table if not exists public.rest04_posts (
  id          uuid primary key default gen_random_uuid(),
  category    text not null check (category in ('notice', 'free', 'qna')),
  title       text not null check (char_length(title) between 1 and 120),
  content     text not null,
  author_id   uuid not null references auth.users (id) on delete cascade default auth.uid(),
  author_name text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists rest04_posts_category_created_idx
  on public.rest04_posts (category, created_at desc);

-- updated_at 자동 갱신
create or replace function public.rest04_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists rest04_posts_touch_updated_at on public.rest04_posts;
create trigger rest04_posts_touch_updated_at
  before update on public.rest04_posts
  for each row execute function public.rest04_touch_updated_at();

-- 2) RLS 활성화 -------------------------------------------------
alter table public.rest04_posts enable row level security;

-- 읽기: 로그인한 사용자만 (회원 전용 게시판)
drop policy if exists "rest04_posts_select_authenticated" on public.rest04_posts;
create policy "rest04_posts_select_authenticated"
  on public.rest04_posts for select
  to authenticated
  using (true);

-- 작성: 로그인 사용자, 본인 id 로만
drop policy if exists "rest04_posts_insert_own" on public.rest04_posts;
create policy "rest04_posts_insert_own"
  on public.rest04_posts for insert
  to authenticated
  with check (auth.uid() = author_id);

-- 수정: 본인 글만
drop policy if exists "rest04_posts_update_own" on public.rest04_posts;
create policy "rest04_posts_update_own"
  on public.rest04_posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- 삭제: 본인 글만
drop policy if exists "rest04_posts_delete_own" on public.rest04_posts;
create policy "rest04_posts_delete_own"
  on public.rest04_posts for delete
  to authenticated
  using (auth.uid() = author_id);
