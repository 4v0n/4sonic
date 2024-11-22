interface TabProps {
  icon: string;
  text: string;
}

const Tab: React.FC<TabProps> = ({
  icon,
  text,
}) => {
  return (
    <div className="pt-2">
      <div className="button flex items-center space-x-2 px-4 py-2 rounded-t-lg shadow-sm border-t border-x">
        <div>
          {icon && (
            <img src={icon} alt={text} />
          )}
        </div>
        <div>
          {text && (
            <p>{text}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tab;