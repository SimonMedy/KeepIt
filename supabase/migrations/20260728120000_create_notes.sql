-- Schéma complet de KeepIt.
-- Cette migration est idempotente pour pouvoir être appliquée à un projet
-- Supabase neuf ou à la base configurée pendant le développement.

create extension if not exists pgcrypto;

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text default '',
  created_at timestamptz not null default now()
);

alter table public.notes
  add column if not exists content text default '',
  add column if not exists created_at timestamptz not null default now();

alter table public.notes enable row level security;

grant usage on schema public to anon;
grant select, insert, update, delete on table public.notes to anon;

drop policy if exists "Autoriser lecture publique des notes" on public.notes;
drop policy if exists "Autoriser insertion publique de notes" on public.notes;
drop policy if exists "Autoriser modification publique de notes" on public.notes;
drop policy if exists "Autoriser suppression publique de notes" on public.notes;
drop policy if exists "lecture_notes" on public.notes;
drop policy if exists "ajout_notes" on public.notes;
drop policy if exists "modification_notes" on public.notes;
drop policy if exists "suppression_notes" on public.notes;

create policy "lecture_notes" on public.notes
  for select to anon using (true);

create policy "ajout_notes" on public.notes
  for insert to anon with check (true);

create policy "modification_notes" on public.notes
  for update to anon using (true) with check (true);

create policy "suppression_notes" on public.notes
  for delete to anon using (true);

create index if not exists idx_notes_created_at on public.notes (created_at desc);
