alter table public.rsvps
add column if not exists second_guest_name text;

alter table public.rsvps
drop constraint if exists rsvps_second_guest_name_check;

alter table public.rsvps
add constraint rsvps_second_guest_name_check check (
  (
    attendance_status = 'attending'
    and guest_count = 2
    and second_guest_name is not null
    and char_length(trim(second_guest_name)) between 2 and 120
  )
  or (
    (
      attendance_status = 'attending'
      and guest_count = 1
    )
    or attendance_status = 'not_attending'
  )
  and second_guest_name is null
);
