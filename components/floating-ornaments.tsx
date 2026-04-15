import type { CSSProperties } from "react";

import type { OrnamentConfig } from "@/lib/wedding-content";
import { resolveAssetSource } from "@/lib/media";

type FloatingOrnamentsProps = {
  items: readonly OrnamentConfig[];
  className?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getOrnamentStyle(item: OrnamentConfig): CSSProperties {
  return {
    top: item.top,
    bottom: item.bottom,
    left: item.left,
    right: item.right,
    width: `${item.size}px`,
    height: `${item.size}px`,
    opacity: item.opacity ?? 0.3,
    animationDuration: item.duration ?? "26s",
    animationDelay: item.delay ?? "0s",
  };
}

export function FloatingOrnaments({
  items,
  className,
}: FloatingOrnamentsProps) {
  return (
    <div
      aria-hidden="true"
      className={cx("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      {items.map((item, index) => {
        const resolvedSource = resolveAssetSource(item.src);
        const style = getOrnamentStyle(item);

        return (
          <div
            key={`${item.top ?? item.bottom}-${item.left ?? item.right}-${index}`}
            style={style}
            className="floating-ornament absolute"
          >
            {resolvedSource ? (
              <img
                src={resolvedSource}
                alt=""
                className="h-full w-full rounded-full object-cover opacity-90"
              />
            ) : (
              <span className="ornament-token block h-full w-full rounded-full" />
            )}
          </div>
        );
      })}
    </div>
  );
}
