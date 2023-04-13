import { Inter, Space_Grotesk, Poppins } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import data from "../utils/sampleData";
import ProjectItem from "@/components/projectItem/ProjectItem";
import { useEffect, useRef, useState } from "react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "700", "800", "900"],
});

export default function Home() {
  const menuItem = useRef<HTMLUListElement | null>(null);
  const [renderItems, setRenderItems] = useState(data);

  const cloneItems = () => {
    const itemHeight = menuItem.current?.children[0].clientHeight;
    if (itemHeight) {
      const fitMax = Math.ceil(window.innerHeight / itemHeight);
      const cloneItems = [...renderItems]
        .filter((el, index) => index < fitMax)
        .map((target) => target);

      setRenderItems([...renderItems, ...cloneItems]);

      return cloneItems.length * itemHeight;
    }

    return;
  };

  const getScrollPos = () => {
    return menuItem.current!.scrollTop - (menuItem.current?.clientTop || 0);
  };

  const setScrollPos = (pos: number) => {
    if (menuItem.current) menuItem.current.scrollTop = pos;
  };

  const initScroll = () => {
    const scrollPos = getScrollPos();

    if (scrollPos <= 0) {
      setScrollPos(1);
    }
  };

  useEffect(() => {
    const cloneHeight = cloneItems();
    initScroll();

    if (menuItem.current) {
    }
    const scrollUpdate = () => {
      const scrollPos = getScrollPos();

      if (cloneHeight)
        if (cloneHeight + scrollPos >= menuItem.current!.scrollHeight) {
          setScrollPos(1);
        } else if (scrollPos <= 0) {
          setScrollPos(
            (menuItem.current?.scrollHeight as number) - cloneHeight - 10
          );
        }
    };

    const currentItem = menuItem.current;

    currentItem!.style.scrollBehavior = "unset";
    currentItem!.addEventListener("scroll", scrollUpdate);

    return () => {
      currentItem?.removeEventListener("scroll", scrollUpdate);
    };
  }, []);

  return (
    <main className={`${spaceGrotesk.variable} ${poppins.variable}`}>
      <ul
        ref={menuItem}
        className="scroll-smooth h-screen overflow-y-auto hide-scroll "
      >
        {renderItems.map((project, index) => {
          return (
            <ProjectItem
              menuItem={menuItem}
              key={index}
              project={project}
              itemIndex={index}
            />
          );
        })}
      </ul>
      <Footer />
    </main>
  );
}
