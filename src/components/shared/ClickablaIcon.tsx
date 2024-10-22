import React from "react";

interface ClickableIconProps {
  icon: string;
}

const ClickableIcon: React.FC<ClickableIconProps> = ({
  icon,
}) => {
  return (
    <div className="button flex items-center justify-center w-8 h-8 rounded-full">
      <img src={icon} />
    </div>
  );
};

export default ClickableIcon;