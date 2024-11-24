import classNames from "classnames";
import React, { ReactNode } from "react";

interface ClickableIconProps {
  icon?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: ReactNode;
  className?: string;
}

export default function({
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
  className,
}: ClickableIconProps) {

  const baseIconOnlyClasses = "button flex items-center justify-center min-h-8 min-w-8 rounded-full cursor-pointer";

  if (children == undefined) {
    return (
      <button
        className= {classNames(baseIconOnlyClasses, className)}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {icon && (<img src={icon} alt="icon" className="object-contain" />)}
      </button>
    );
  }

  const baseClasses = "button flex items-center min-h-8 min-w-8 px-2 rounded-full cursor-pointer";

  return (
    <button
      className={classNames(baseClasses, className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center justify-start">
        {icon && (<img src={icon} alt="icon" className="object-contain" />)}
        {children}
      </div>
    </button>
  );
};