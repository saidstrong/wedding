type OrnamentDividerProps = {
  label?: string;
};

export function OrnamentDivider({ label }: OrnamentDividerProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      {label ? (
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold">
          {label}
        </span>
      ) : (
        <span className="inline-flex h-3 w-3 rounded-full border border-gold/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(240,230,214,0.85))]" />
      )}
      <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gold/35 to-transparent" />
    </div>
  );
}
