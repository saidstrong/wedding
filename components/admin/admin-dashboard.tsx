"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { RsvpRow } from "@/lib/supabase/types";

type AdminResponse = {
  summary: {
    totalSubmissions: number;
    attending: number;
    notAttending: number;
    byInvitation: Record<
      string,
      {
        totalSubmissions: number;
        attending: number;
        notAttending: number;
      }
    >;
  };
  submissions: RsvpRow[];
};

const invitationLabels: Record<string, string> = {
  "beksultan-bulbul": "Бексұлтан & Бұлбұл",
  "shyngys-nazerke": "Шыңғыс & Назерке",
};

function formatInvitationLabel(slug: string) {
  return invitationLabels[slug] ?? slug;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("kk-KZ", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AdminResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [invitationFilter, setInvitationFilter] = useState("all");

  const invitationSlugs = useMemo(
    () =>
      Array.from(
        new Set(data?.submissions.map((entry) => entry.invitation_slug) ?? []),
      ).sort(),
    [data],
  );
  const visibleSubmissions = useMemo(
    () =>
      data?.submissions.filter(
        (entry) =>
          invitationFilter === "all" ||
          entry.invitation_slug === invitationFilter,
      ) ?? [],
    [data, invitationFilter],
  );
  const visibleSummary = useMemo(
    () => ({
      totalSubmissions: visibleSubmissions.length,
      attending: visibleSubmissions.filter(
        (entry) => entry.attendance_status === "attending",
      ).length,
      notAttending: visibleSubmissions.filter(
        (entry) => entry.attendance_status === "not_attending",
      ).length,
    }),
    [visibleSubmissions],
  );

  async function loadData() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/rsvps", {
        cache: "no-store",
      });

      if (!response.ok) {
        setLoading(false);
        setError("RSVP деректерін оқу мүмкін болмады.");
        return;
      }

      const payload = (await response.json()) as AdminResponse;
      setData(payload);
      setLoading(false);
    } catch {
      setLoading(false);
      setError("RSVP деректерін оқу мүмкін болмады.");
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
    } finally {
      router.refresh();
    }
  }

  useEffect(() => {
    void loadData();
  }, []);

  return (
    <div className="section-shell py-10 sm:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Admin</p>
          <h1 className="font-display text-4xl text-charcoal sm:text-5xl">
            RSVP submissions
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-taupe">
            Тек server-side route арқылы оқылатын қонақ жауаптары. Жаңарту
            үшін бетті қайта ашпай-ақ refresh жасай аласыз.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => void loadData()} className="ghost-button">
            Жаңарту
          </button>
          <button type="button" onClick={handleLogout} className="ghost-button">
            Шығу
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <label className="grid gap-2 text-sm font-medium text-charcoal">
          Шақыру бойынша сүзу
          <select
            value={invitationFilter}
            onChange={(event) => setInvitationFilter(event.target.value)}
            className="min-h-12 rounded-[1.1rem] border border-gold/14 bg-white/82 px-4 text-sm outline-none transition focus:border-gold/36 focus:ring-2 focus:ring-gold/16"
          >
            <option value="all">Барлық шақырулар</option>
            {invitationSlugs.map((slug) => (
              <option key={slug} value={slug}>
                {formatInvitationLabel(slug)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="panel-frame p-6">
          <p className="text-sm text-taupe">Барлық жауап</p>
          <p className="mt-3 font-display text-5xl text-charcoal">
            {loading ? "..." : visibleSummary.totalSubmissions}
          </p>
        </div>
        <div className="panel-frame p-6">
          <p className="text-sm text-taupe">Келетіндер</p>
          <p className="mt-3 font-display text-5xl text-charcoal">
            {loading ? "..." : visibleSummary.attending}
          </p>
        </div>
        <div className="panel-frame p-6">
          <p className="text-sm text-taupe">Келе алмайтындар</p>
          <p className="mt-3 font-display text-5xl text-charcoal">
            {loading ? "..." : visibleSummary.notAttending}
          </p>
        </div>
      </div>

      <div className="panel-frame mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead className="bg-white/70 text-xs uppercase tracking-[0.24em] text-taupe">
              <tr>
                <th className="px-5 py-4 font-medium">Шақыру</th>
                <th className="px-5 py-4 font-medium">Қонақ</th>
                <th className="px-5 py-4 font-medium">Мәртебе</th>
                <th className="px-5 py-4 font-medium">Саны</th>
                <th className="px-5 py-4 font-medium">Ескертпе</th>
                <th className="px-5 py-4 font-medium">Жіберілген уақыты</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-5 py-6 text-sm text-taupe" colSpan={6}>
                    Деректер жүктелуде...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="px-5 py-6 text-sm text-red-600" colSpan={6}>
                    {error}
                  </td>
                </tr>
              ) : visibleSubmissions.length > 0 ? (
                visibleSubmissions.map((entry: RsvpRow) => (
                  <tr key={entry.id} className="border-t border-gold/10">
                    <td className="px-5 py-5 align-top">
                      <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-charcoal">
                        {formatInvitationLabel(entry.invitation_slug)}
                      </span>
                    </td>
                    <td className="px-5 py-5 align-top">
                      <div className="font-medium text-charcoal">
                        {entry.full_name}
                      </div>
                      {entry.second_guest_name ? (
                        <div className="mt-1 text-sm text-taupe">
                          2-қонақ: {entry.second_guest_name}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-5 py-5 align-top">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          entry.attendance_status === "attending"
                            ? "bg-gold/15 text-charcoal"
                            : "bg-black/5 text-taupe"
                        }`}
                      >
                        {entry.attendance_status === "attending"
                          ? "Келеді"
                          : "Келе алмайды"}
                      </span>
                    </td>
                    <td className="px-5 py-5 align-top text-sm text-taupe">
                      {entry.guest_count ?? "—"}
                    </td>
                    <td className="px-5 py-5 align-top text-sm leading-6 text-taupe">
                      {entry.note ?? "—"}
                    </td>
                    <td className="px-5 py-5 align-top text-sm text-taupe">
                      {formatDate(entry.created_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-6 text-sm text-taupe" colSpan={6}>
                    {invitationFilter === "all"
                      ? "Әзірге бірде-бір RSVP жоқ."
                      : "Бұл шақыру бойынша RSVP жоқ."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
