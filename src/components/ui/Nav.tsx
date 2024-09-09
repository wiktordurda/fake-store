import { type ReactNode } from "react";
import { Link } from "../../i18n/routing";
import Logo from "./Logo";

export interface NavProps {
  children?: ReactNode;
}

const Nav = ({ children }: NavProps) => {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-background pr-4">
      <Link href="/">
        <Logo />
      </Link>
      {!!children && <div>{children}</div>}
    </nav>
  );
};

export default Nav;
