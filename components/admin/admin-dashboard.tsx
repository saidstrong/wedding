"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import type { RsvpRow } from "@/lib/supabase/types";

type AdminResponse = {
  summary: {
    totalSubmissions: number;
    attending: number;
    notAttending: number;
  };
  submissions: RsvpRow[];
};

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

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="panel-frame p-6">
          <p className="text-sm text-taupe">Барлық жауап</p>
          <p className="mt-3 font-display text-5xl text-charcoal">
            {loading ? "..." : data?.summary.totalSubmissions ?? 0}
          </p>
        </div>
        <div className="panel-frame p-6">
          <p className="text-sm text-taupe">Келетіндер</p>
          <p className="mt-3 font-display text-5xl text-charcoal">
            {loading ? "..." : data?.summary.attending ?? 0}
          </p>
        </div>
        <div className="panel-frame p-6">
          <p className="text-sm text-taupe">Келе алмайтындар</p>
          <p className="mt-3 font-display text-5xl text-charcoal">
            {loading ? "..." : data?.summary.notAttending ?? 0}
          </p>
        </div>
      </div>

      <div className="panel-frame mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead className="bg-white/70 text-xs uppercase tracking-[0.24em] text-taupe">
              <tr>
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
                  <td className="px-5 py-6 text-sm text-taupe" colSpan={5}>
                    Деректер жүктелуде...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="px-5 py-6 text-sm text-red-600" colSpan={5}>
                    {error}
                  </td>
                </tr>
              ) : data && data.submissions.length > 0 ? (
                data.submissions.map((entry: RsvpRow) => (
                  <tr key={entry.id} className="border-t border-gold/10">
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
                  <td className="px-5 py-6 text-sm text-taupe" colSpan={5}>
                    Әзірге бірде-бір RSVP жоқ.
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
