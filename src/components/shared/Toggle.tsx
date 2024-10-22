import { useState } from "react";

interface ToggleButtonProps {
  initialState: boolean;
  onEnable: () => void;
  onDisable: () => void;
};

const Toggle = ({ initialState, onEnable, onDisable }: ToggleButtonProps) => {

  const [enabled, setEnabled] = useState(initialState);

  const handleClick = () => {
    setEnabled(!enabled);

    if (enabled) {
      onEnable();
    }
    else {
      onDisable();
    }
  };

  return (
    <div className={enabled ? "toggleActive" : "toggleDisabled"} onClick={handleClick}>
      <div className="h-5 w-5 bg-white rounded-full shadow-lg" />
    </div>
  );
};

export default Toggle;

