import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useGlobalContext from "./use-context";

const useScrollDirection = (element: HTMLElement | null) => {
  const { scrollDirection, setScrollDirection } = useGlobalContext();
  const pathName = usePathname();

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const isAtTop = window.scrollY === 0;
      setScrollDirection?.(isAtTop ? "up" : "down");
      prevScrollY = window.scrollY;
    };

    const handleClick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("scroll", handleScroll);
    if (element) {
      element.addEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [element, setScrollDirection]);
  useEffect(() => {
    setScrollDirection?.("up");
  }, [pathName, setScrollDirection]);

  return scrollDirection;
};

export default useScrollDirection;
