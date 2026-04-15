"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminGate() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const passcode = String(formData.get("passcode") ?? "");

      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passcode }),
      });

      if (!response.ok) {
        setError("Құпия код қате. Қайта тексеріп көріңіз.");
        setPending(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Кіру кезінде қате пайда болды.");
      setPending(false);
    }
  }

  return (
    <div className="section-shell flex min-h-screen items-center justify-center py-12">
      <div className="panel-frame w-full max-w-md p-8">
        <p className="section-kicker">Admin</p>
        <h1 className="font-display text-4xl text-charcoal">
          RSVP бақылау панелі
        </h1>
        <p className="mt-4 text-sm leading-7 text-taupe">
          Қарапайым passcode енгізіңіз. Бұл бет қонақ жауаптарын қарауға
          арналған.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-charcoal">
            Passcode
            <input
              type="password"
              name="passcode"
              required
              className="min-h-12 rounded-2xl border border-gold/20 bg-white/75 px-4 text-base outline-none transition focus:border-gold/45 focus:ring-2 focus:ring-gold/20"
            />
          </label>

          <button type="submit" disabled={pending} className="primary-button">
            {pending ? "Тексерілуде..." : "Кіру"}
          </button>

          <p className="min-h-6 text-sm text-red-600" aria-live="polite">
            {error}
          </p>
        </form>
      </div>
    </div>
  );
}
