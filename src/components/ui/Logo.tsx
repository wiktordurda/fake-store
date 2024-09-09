import { env } from "../../env";
import { cva, type VariantProps } from "class-variance-authority";

const logoVariants = cva("font-accent p-4 font-black", {
  variants: {
    size: {
      default: "text-3xl",
      sm: "text-2xl",
      lg: "text-4xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

const Logo = ({ size, className }: LogoProps) => {
  return (
    <h2 className={logoVariants({ size, className })}>{env.SITE_TITLE}</h2>
  );
};

export default Logo;
