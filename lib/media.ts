import { existsSync } from "node:fs";
import { join } from "node:path";

function isRemoteSource(src: string) {
  return /^https?:\/\//i.test(src);
}

export function normalizePublicSource(src: string) {
  return src.startsWith("/") ? src : `/${src}`;
}

export function hasLocalPublicAsset(src: string) {
  const normalized = normalizePublicSource(src).replace(/^\//, "");
  return existsSync(join(process.cwd(), "public", normalized));
}

export function resolveAssetSource(src?: string) {
  if (!src) {
    return null;
  }

  if (isRemoteSource(src)) {
    return src;
  }

  if (hasLocalPublicAsset(src)) {
    return normalizePublicSource(src);
  }

  return null;
}

export function hasRenderableAsset(src?: string) {
  return Boolean(resolveAssetSource(src));
}
