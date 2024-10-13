import React from "react";

interface ClickableIconProps {
  icon: string;
}

const ClickableIcon: React.FC<ClickableIconProps> = ({
  icon,
}) => {
  return (
    <div className="button flex items-center justify-center w-10 h-10 rounded-full">
      <img src={icon} />
    </div>
  );
};

export default ClickableIcon;