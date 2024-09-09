import { type ReactNode } from "react";
import Nav from "../../../components/ui/Nav";

export interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default BaseLayout;
