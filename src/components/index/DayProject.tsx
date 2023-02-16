import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  useRef,
  useState,
} from "react";

export type DayProjectProps = {
  id: string;
  last: boolean;
  onRemove: () => void;
};

const Button: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        className,
        "h-7 px-5 rounded-lg bg-gray-200 text-sm text-white/95 transition-transform hover:scale-105"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const DayProject: FunctionComponent<DayProjectProps> = ({ last, onRemove }) => {
  const [notesVisible, setNotesVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex flex-col relative"
      ref={ref}
      onBlur={(event) => {
        if (!ref.current?.contains(event.relatedTarget)) {
          setNotesVisible(false);
        }
      }}
    >
      <div className={clsx("flex gap-2")}>
        <button onClick={onRemove} className="p-0.5 self-start mt-5">
          <XMarkIcon className="w-3 h-3 text-gray-600" />
        </button>
        <div className="flex flex-col">
          <div
            className={clsx(
              "w-80 p-3 bg-gray-200 rounded-2xl flex gap-4 items-center"
            )}
          >
            <div className="w-8 h-8 bg-white rounded-xl" />
            <span className="text-sm text-white/80 font-medium flex-1">
              Cerebreon Design
            </span>
            <input
              placeholder="0"
              type="number"
              onFocus={() => setNotesVisible(true)}
              onBlur={(e) => {
                setNotesVisible(e.relatedTarget instanceof HTMLTextAreaElement);
              }}
              className={clsx(
                "h-full w-20 rounded-xl border border-gray-400 bg-gray-100 text-white/80 placeholder-gray-400 text-center",
                "focus-visible:outline-none"
              )}
            />
          </div>
          <AnimatePresence>
            {notesVisible && (
              <motion.div
                className="flex flex-col h-20"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <textarea
                  className={clsx(
                    "font-mono text-xs px-2 py-1 caret-white text-white w-full h-20 mt-2 border border-mint-dark bg-mint-dark/20 rounded-xl resize-none",
                    "focus-visible:outline-none focus-visible:border-2"
                  )}
                  onBlur={(event) => {
                    if (!ref.current?.contains(event.relatedTarget)) {
                      setNotesVisible(false);
                    }
                  }}
                />
                <div className="flex self-end mt-2 gap-2">
                  <Button>Anuluj</Button>
                  <Button className="bg-mint-dark">Dodaj</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      {last && <div className="h-8 w-full" />}
    </div>
  );
};

export default DayProject;
