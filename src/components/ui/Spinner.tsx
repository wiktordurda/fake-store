import { type ReactNode } from "react";
import SpinnerIcon from "./SpinnerIcon";

export interface SpinnerProps {
  children: ReactNode;
  spinning?: boolean;
}

const Spinner = ({ children, spinning }: SpinnerProps) => {
  return (
    <div className="relative">
      {children}
      {spinning && (
        <>
          <div className="absolute left-0 top-0 h-full w-full bg-muted/50"></div>
          <SpinnerIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </>
      )}
    </div>
  );
};

export default Spinner;
