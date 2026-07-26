import type { ReactNode } from "react";

import type { EditableMedia } from "@/lib/invitations/types";
import { resolveAssetSource } from "@/lib/media";

type BackgroundStageProps = {
  media: EditableMedia;
  overlayOpacity?: number;
  children: ReactNode;
};

export function BackgroundStage({
  media,
  overlayOpacity = 0.82,
  children,
}: BackgroundStageProps) {
  const resolvedSource = resolveAssetSource(media.src);
  const safeOpacity = Math.max(0.3, Math.min(overlayOpacity, 0.92));

  return (
    <div className="relative isolate">
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        {resolvedSource ? (
          <img
            src={resolvedSource}
            alt=""
            className="absolute inset-[-6%] h-[112%] w-[112%] object-cover opacity-45 blur-[28px] saturate-[0.82] sm:blur-[36px]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(255,255,255,0.34)_30%,rgba(232,220,201,0.52)_72%,rgba(246,240,232,0.98)_100%)]" />
        )}

        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,246,240,0.92),rgba(248,243,236,0.82)_22%,rgba(246,240,232,0.9)_58%,rgba(249,246,241,0.97)_100%)]"
          style={{ opacity: safeOpacity }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),transparent_26%),radial-gradient(circle_at_50%_16%,rgba(255,255,255,0.28),transparent_22%)]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
