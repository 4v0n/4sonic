import React from "react";

interface ClickableIconProps {
  icon: string;
  onClick?: () => void;
}

const ClickableIcon: React.FC<ClickableIconProps> = ({
  icon,
  onClick,
}) => {
  return (
    <div
      className="button flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
      onClick={onClick}
    >
      <img src={icon} alt="icon" className="object-contain" />
    </div>
  );
};

export default ClickableIcon;
