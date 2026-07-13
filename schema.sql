-- Deutsch Master · estrutura inicial do banco
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text not null,
  current_belt text not null default 'white',
  cefr_level text not null default 'A0',
  xp integer not null default 0,
  streak integer not null default 0,
  completed_lessons integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id text primary key,
  belt text not null,
  title text not null,
  description text,
  xp_reward integer not null default 40,
  order_index integer not null default 0
);

create table if not exists public.user_progress (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null references public.lessons(id) on delete cascade,
  completed boolean not null default false,
  score integer not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, lesson_id)
);

create table if not exists public.daily_missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  progress integer not null default 0,
  target integer not null default 1,
  xp_reward integer not null default 15,
  completed boolean not null default false,
  date date not null default current_date
);

insert into public.lessons (id, belt, title, description, xp_reward, order_index) values
  ('lesson-1', 'white', 'Apresentação', 'Apresente-se e abra sua primeira conversa.', 40, 1),
  ('lesson-2', 'white', 'Sua primeira rotina', 'Palavras que acompanham todos os seus dias.', 45, 2),
  ('lesson-3', 'yellow', 'No café', 'Peça, agradeça e aproveite a pausa.', 55, 3),
  ('lesson-4', 'yellow', 'Na estação', 'Entenda placas e compre seu bilhete.', 55, 4)
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.lessons enable row level security;
alter table public.user_progress enable row level security;
alter table public.daily_missions enable row level security;

drop policy if exists "Anyone can read lessons" on public.lessons;
create policy "Anyone can read lessons" on public.lessons for select using (true);

create policy "Users can read their profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can insert their profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can read their progress" on public.user_progress for select using (auth.uid() = user_id);
create policy "Users can write their progress" on public.user_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can read their missions" on public.daily_missions for select using (auth.uid() = user_id);
create policy "Users can write their missions" on public.daily_missions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Cria automaticamente o perfil após o cadastro via Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Lernende'), new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
