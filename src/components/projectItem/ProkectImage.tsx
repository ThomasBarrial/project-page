import Image from "next/image";

interface IProps {
  url: string;
  title: string;
  opacity: number;
  parralaxPos: { x: number; y: number };
  scale: number;
}

function ProjectImage({ url, title, opacity, parralaxPos, scale }: IProps) {
  return (
    <div
      style={{
        opacity,
        scale: `${scale}`,
      }}
      className="fixed z-0 left-[20%] top-[5%]  pointer-events-none transform duration-[1500ms]"
    >
      <div
        style={{
          transform: `translate3d(${parralaxPos.x}px, ${parralaxPos.y}px, 0px)`,
        }}
        className="relative h-[40vw] w-[50vw]"
      >
        <Image src={url} alt={title} fill className={`object-cover`} />
      </div>
    </div>
  );
}

export default ProjectImage;
