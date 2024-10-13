interface TabProps {
  icon: string;
  text: string;
  href: string;
}

const Tab: React.FC<TabProps> = ({
  icon,
  text,
  href,
}) => {
  return (
    <a href={href || "#"}>
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
    </a>
  );
};

export default Tab;