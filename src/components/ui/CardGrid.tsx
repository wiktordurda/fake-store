import { type ReactNode } from "react";
import { cn } from "../../lib/utils";

export interface CardGridProps {
  children: ReactNode;
  className?: string;
}

const CardGrid = ({ children, className }: CardGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardGrid;
