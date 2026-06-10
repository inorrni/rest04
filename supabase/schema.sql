-- ============================================================
-- rest04 게시판 스키마 + RLS
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- 권한 정책: 게시판은 "회원 전용" (로그인해야 읽기·쓰기 모두 가능)
-- ============================================================

-- 1) posts 테이블 ------------------------------------------------
create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  category    text not null check (category in ('notice', 'free', 'qna')),
  title       text not null check (char_length(title) between 1 and 120),
  content     text not null,
  author_id   uuid not null references auth.users (id) on delete cascade default auth.uid(),
  author_name text not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists posts_category_created_idx
  on public.posts (category, created_at desc);

-- updated_at 자동 갱신
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();

-- 2) RLS 활성화 -------------------------------------------------
alter table public.posts enable row level security;

-- 읽기: 로그인한 사용자만 (회원 전용 게시판)
drop policy if exists "posts_select_authenticated" on public.posts;
create policy "posts_select_authenticated"
  on public.posts for select
  to authenticated
  using (true);

-- 작성: 로그인 사용자, 본인 id 로만
drop policy if exists "posts_insert_own" on public.posts;
create policy "posts_insert_own"
  on public.posts for insert
  to authenticated
  with check (auth.uid() = author_id);

-- 수정: 본인 글만
drop policy if exists "posts_update_own" on public.posts;
create policy "posts_update_own"
  on public.posts for update
  to authenticated
  using (auth.uid() = author_id)
  with check (auth.uid() = author_id);

-- 삭제: 본인 글만
drop policy if exists "posts_delete_own" on public.posts;
create policy "posts_delete_own"
  on public.posts for delete
  to authenticated
  using (auth.uid() = author_id);

-- ============================================================
-- (선택) 공지사항을 관리자만 쓰게 하려면 아래처럼 별도 정책으로 분리.
-- 지금은 모든 회원이 모든 카테고리에 글을 쓸 수 있습니다.
-- ============================================================
