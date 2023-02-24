import { Phase } from "@/api/types/Phase";
import Checkbox from "@/components/Checkbox";
import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

type PhaseButtonProps = {
  phase: Phase;
  checked: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const PhaseButton: FunctionComponent<PhaseButtonProps> = ({
  phase,
  checked,
  ...props
}) => {
  return (
    <button
      className="rounded-xl hover:bg-gray-200 min-h-10 w-full flex px-4 text-white/80 text-sm items-center gap-2"
      {...props}
    >
      <Checkbox checked={checked} readOnly />
      <span>{phase.name}</span>
    </button>
  );
};

export default PhaseButton;
