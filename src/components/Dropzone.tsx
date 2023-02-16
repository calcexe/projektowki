import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, {
  FunctionComponent,
  InputHTMLAttributes,
  useCallback,
} from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Image from "next/image";
import ActionButton from "./index/ActionButton";

type DropzoneProps = InputHTMLAttributes<HTMLInputElement> & {
  icon?: string | Blob | null;
};

const Dropzone: FunctionComponent<DropzoneProps> = ({
  className,
  icon,
  placeholder,
  ...props
}) => {
  const imageSrc = icon instanceof Blob ? URL.createObjectURL(icon) : icon!;

  const onDrop = useCallback(
    (_acceptedFiles: File[], _rejections: FileRejection[]) => {},
    []
  );
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: !!icon,
  });

  return (
    <div className="flex flex-col">
      <label className="text-white/60 text-xs leading-6" htmlFor={props.id}>
        {placeholder}
      </label>
      <div
        className={clsx(
          className,
          "aspect-square w-36 h-36 rounded-xl border border-gray-500 bg-gray-300 cursor-pointer",
          isDragActive ? "border-dashed" : "border-solid"
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {icon ? (
          <div className="relative group">
            <Image
              width={144}
              height={144}
              src={imageSrc}
              className="w-full h-full rounded-xl"
              alt="Obraz projektu"
            />
            <ActionButton
              type="button"
              className={clsx(
                "absolute bottom-4 left-4 right-4 justify-center bg-gray-100/80 opacity-0 transition-all",
                "group-hover:opacity-100"
              )}
              onClick={open}
            >
              Zmień
            </ActionButton>
          </div>
        ) : (
          <div className="flex flex-col w-full h-full items-center justify-center p-5">
            <ArrowUpOnSquareIcon className="w-6 h-6 text-mint-regular" />
            <p className="mt-2 text-xs leading-6 font-normal text-white/80 text-center">
              {isDragActive ? "Upuć tutaj..." : "Wgraj lub przerzuć"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
