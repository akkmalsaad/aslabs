import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "page" | "narrow";
};

export function Container({ size = "page", className = "", ...props }: ContainerProps) {
  const base = size === "narrow" ? "container-narrow" : "container-page";
  return <div className={`${base} ${className}`} {...props} />;
}
