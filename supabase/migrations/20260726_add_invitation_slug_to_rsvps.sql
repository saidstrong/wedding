alter table public.rsvps
add column if not exists invitation_slug text;

update public.rsvps
set invitation_slug = 'beksultan-bulbul'
where invitation_slug is null
  or btrim(invitation_slug) = '';

alter table public.rsvps
alter column invitation_slug set default 'beksultan-bulbul';

alter table public.rsvps
alter column invitation_slug set not null;

create index if not exists rsvps_invitation_slug_created_at_idx
on public.rsvps (invitation_slug, created_at desc);
