import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image, { ImageProps } from "next/image";
import React, { FunctionComponent, useEffect, useState } from "react";

type SupabaseImageProps = Omit<ImageProps, "src"> & {
  bucket: string;
  src: string;
};

const BASE_64_TRANSPARENT =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

type Callback = (_: string) => void;

const CACHES = new Map<string, string>();
const CALLBACKS = new Map<string, Map<string, Callback>>();

const SupabaseImage: FunctionComponent<SupabaseImageProps> = ({
  bucket,
  src,
  alt,
  ...props
}) => {
  const supabase = useSupabaseClient();
  const [imageSrc, setImageSrc] = useState<string>(BASE_64_TRANSPARENT);

  useEffect(() => {
    let ignore = false;
    const id = crypto.randomUUID();
    const key = `${bucket}-${src}`;
    const callback = async () => {
      const { data } = await supabase.storage.from(bucket).download(src);
      const imageSrc = data ? URL.createObjectURL(data) : BASE_64_TRANSPARENT;
      if (!ignore) {
        CACHES.set(key, imageSrc);
        setImageSrc(imageSrc);
        const asd = CALLBACKS.get(key);
        asd?.forEach((cb) => cb(imageSrc));
        CALLBACKS.delete(key);
      }
    };
    if (!CACHES.has(key)) {
      CACHES.set(key, "");
      callback();
    } else {
      CALLBACKS.has(key)
        ? CALLBACKS.get(key)!.set(id, callback)
        : CALLBACKS.set(key, new Map([[id, callback]]));
    }
    return () => {
      CALLBACKS.get(key)?.delete(id);
      CACHES.delete(key);
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket, src]);

  return <Image src={imageSrc} alt={alt} {...props} />;
};

export default SupabaseImage;
