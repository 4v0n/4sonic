import React from "react";

interface ClickableIconProps {
  icon: string;
  href: string;
}

const ClickableIcon: React.FC<ClickableIconProps> = ({
  icon,
  href,
}) => {
  return (
    <a href={href || "#"}>
      <img src={icon} />
    </a>
  );
};

export default ClickableIcon;