import styles from "./styles.module.css";

interface IProps {
  title: string;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

function Title({ title, handleMouseEnter, handleMouseLeave }: IProps) {
  return (
    <div
      className="relative font-black z-20 font-spaceGrotesk text-5xl lg:text-9xl w-8/12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden">
        <h1 className="menu-title">{title}</h1>
        <h1 className="menu-title clone">{title}</h1>
      </div>
    </div>
  );
}

export default Title;
