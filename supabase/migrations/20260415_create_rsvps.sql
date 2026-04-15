create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  attendance_status text not null check (attendance_status in ('attending', 'not_attending')),
  guest_count integer,
  note text,
  created_at timestamptz not null default timezone('utc', now()),
  constraint rsvps_guest_count_check check (
    (attendance_status = 'attending' and guest_count between 1 and 2)
    or (attendance_status = 'not_attending' and guest_count is null)
  ),
  constraint rsvps_note_length_check check (
    note is null or char_length(note) <= 1000
  )
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);

alter table public.rsvps enable row level security;

grant insert on table public.rsvps to anon, authenticated;

drop policy if exists "Public can submit rsvps" on public.rsvps;
create policy "Public can submit rsvps"
on public.rsvps
for insert
to anon, authenticated
with check (true);
