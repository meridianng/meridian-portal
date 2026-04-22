-- ============================================================
-- MERIDIAN PORTAL — SUPABASE SCHEMA
-- Run this entire file in your Supabase SQL Editor
-- Project: rlgduhlpuqzczolijonj
-- ============================================================

-- ── 1. PROFILES TABLE ──────────────────────────────────────
-- Extends auth.users. Auto-created when user signs up.
create table if not exists public.profiles (
  id           uuid references auth.users on delete cascade primary key,
  email        text not null,
  full_name    text,
  meridian_key text unique,
  plan         text not null default 'none',
  -- plan values: 'none' | 'v2_tool' | 'v2_course' | 'v2_combo' | 'full'
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Users can only read their own profile
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can only update their own profile
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ── 2. PRODUCT ACCESS TABLE ────────────────────────────────
-- One row per product a user has access to.
create table if not exists public.product_access (
  id              uuid not null default gen_random_uuid() primary key,
  user_id         uuid not null references public.profiles(id) on delete cascade,
  product         text not null,
  -- product values: 'terminal' | 'course' | 'dictionary' | 'bizbooks'
  granted_at      timestamptz not null default now(),
  selar_reference text,
  constraint unique_user_product unique (user_id, product)
);

-- Enable Row Level Security
alter table public.product_access enable row level security;

-- Users can read their own access records
create policy "product_access_select_own"
  on public.product_access for select
  using (auth.uid() = user_id);

-- Users can insert their own access records (via activation flow)
create policy "product_access_insert_own"
  on public.product_access for insert
  with check (auth.uid() = user_id);

-- ── 3. AUTO-CREATE PROFILE ON SIGNUP ───────────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

-- Drop and recreate trigger to avoid duplicates
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── 4. AUTO-UPDATE updated_at ──────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ── DONE ───────────────────────────────────────────────────
-- Tables: profiles, product_access
-- Triggers: auto-create profile on signup, auto-update updated_at
-- RLS: enabled on both tables, users can only access their own rows
