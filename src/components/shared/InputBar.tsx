import classNames from "classnames";

interface InputBarProps {
  icon?: string;
  placeholder?: string;
  onEnter?: () => void;
  className?: string;
  value: string;
  setValue: (s: string) => void;

  censor?: boolean;
  numbersOnly?: boolean;
  maxLength?: number;
};

export default function InputBar({
  icon,
  placeholder = "",
  onEnter,
  className,
  // value is read outside of this component
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  setValue,
  censor,
  numbersOnly,
  maxLength,
}: InputBarProps) {

  if (censor === undefined) {
    censor = false;
  }

  function isNumber(s: string) {
    return /^[0-9]+$/.test(s);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = e.target.value;

    if (maxLength != undefined && newQuery.length > maxLength) {
      return;
    }

    // must allow empty string through to be able to empty the field
    if (numbersOnly && !isNumber(newQuery) && newQuery.length != 0) {
      return;
    }

    setValue(newQuery);
  };

  const baseClasses = "button flex w-64 h-8 items-center justify-start rounded-full px-2";

  return (
    <div className={classNames(baseClasses, className)}>
      {icon && <img src={icon} />}
      <input
        type={censor ? "password" : "text"}
        value={value}
        onChange={handleInputChange}
        onKeyDown={() => {if (onEnter != undefined) onEnter();}}
        placeholder={placeholder}
        className="w-full focus:outline-none items-center bg-transparent"
      />
    </div>
  );
};