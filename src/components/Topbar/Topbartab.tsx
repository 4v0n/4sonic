interface TopbartabProps {
  icon: string;
  text: string;
  href: string;
}

const Topbartab: React.FC<TopbartabProps> = ({
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

export default Topbartab;