import { createIcon } from "@/blockies.min";

export const getIcon = async () => {
  const canvas = createIcon({
    size: 16,
    scale: 16,
  });
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob((blob) => resolve(blob), "image/png")
  );
  return blob;
};
