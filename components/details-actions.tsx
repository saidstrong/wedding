type DetailsActionsProps = {
  address: string;
  mapUrl: string;
  mapLabel?: string;
  mapIconSrc?: string;
};

export function DetailsActions({
  address,
  mapUrl,
  mapLabel = "2GIS",
  mapIconSrc,
}: DetailsActionsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="ghost-button gap-2"
        aria-label={`${mapLabel}: ${address}`}
      >
        {mapIconSrc ? (
          <img src={mapIconSrc} alt="" className="h-5 w-5 rounded-[0.45rem]" />
        ) : null}
        <span>{mapLabel}</span>
      </a>
    </div>
  );
}
