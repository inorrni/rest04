-- ============================================================
-- rest04 기존 스키마 전체 삭제 (이전 schema.sql 로 만든 것 정리)
-- Supabase SQL Editor 에 붙여넣고 실행하세요. 데이터도 함께 삭제됩니다.
-- ============================================================

-- 접두어 없던 구버전 정리
drop table if exists public.posts cascade;            -- 테이블 + 정책 + 인덱스 + 트리거 함께 삭제
drop function if exists public.touch_updated_at() cascade;
