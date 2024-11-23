import React from "react";

interface ClickableIconProps {
  icon?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
}

export default function({
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  children,
}: ClickableIconProps) {

  if (children == undefined) {
    return (
      <button
        className="button flex items-center justify-center min-h-8 min-w-8 rounded-full cursor-pointer"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {icon && (<img src={icon} alt="icon" className="object-contain" />)}
      </button>
    );
  }

  return (
    <button
      className="button flex items-center min-h-8 min-w-8 px-2 rounded-full cursor-pointer"
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