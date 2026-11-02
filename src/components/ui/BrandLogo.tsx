import type { ComponentType, SVGProps } from "react";
import AsLabsLogoJs from "../../../assets/react/AsLabsLogo";
import { site } from "@/lib/site";

type BrandLogoProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  variant?: "horizontal" | "stacked" | "mark";
  /** Colour for the slash only. Letters follow the CSS `color` of the parent. */
  accent?: string;
  title?: string;
};

// The brand kit's own component (assets/react/AsLabsLogo.jsx) is plain JS;
// type it here so regenerating the brand kit updates the site logo too.
const AsLabsLogo = AsLabsLogoJs as ComponentType<BrandLogoProps>;

export function BrandLogo({ title = site.name, ...props }: BrandLogoProps) {
  return <AsLabsLogo title={title} {...props} />;
}
