import classNames from "classnames";
import React, { useState } from "react";

interface InputBarProps {
  icon?: string;
  placeholder?: string;
  onEnter?: (query: string) => void;
  className?: string;
  censor?: boolean;
};

export default function InputBar({
  icon,
  placeholder = "",
  onEnter,
  className,
  censor,
}: InputBarProps) {
  const [query, setQuery] = useState("");
  const [displayText, setDisplayText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (!censor) {
      setDisplayText(newQuery);
    }
    else {
      setDisplayText("*".repeat(newQuery.length));
    }
  };

  const baseClasses = "button flex w-64 h-8 items-center justify-start rounded-full px-2";

  return (
    <div className={classNames(baseClasses, className)}>
      {icon && <img src={icon} />}
      <input
        type="text"
        value={displayText}
        onChange={handleInputChange}
        onKeyDown={() => {if (onEnter != undefined) onEnter(query);}}
        placeholder={placeholder}
        className="w-full focus:outline-none items-center bg-transparent"
      />
    </div>
  );
};