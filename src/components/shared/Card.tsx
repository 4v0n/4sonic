import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children?: ReactNode;
  footer?: string;
}

export default function Card({
  title,
  children,
  footer,
}: CardProps) {
  return (
    <div className="flex bg-surface1-light dark:bg-surface1-dark rounded-lg">
      <div className="p-2 w-full">
        <h1 className="font-bold text-lg">
          {title && title}
        </h1>
        {children && children}
        <p className="font-extralight text-sm">
          {footer && footer}
        </p>
      </div>
    </div>
  );
}
