import React from "react";

interface ClickableIconProps {
  icon: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const ClickableIcon: React.FC<ClickableIconProps> = ({
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <button
      className="button flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img src={icon} alt="icon" className="object-contain" />
    </button>
  );
};

export default ClickableIcon;
