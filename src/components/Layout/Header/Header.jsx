import { useEffect, useState } from "react";
import ThemeButton from "../../UI/ThemeButton";
import styles from "./Header.module.css";
// import Quote from './Quote/Quote'
import Searchbar from "./Searchbar/Searchbar";

export default function Header() {
  const [mousePosition, setMousePosition] = useState({});
  const paralaxStyles = {
    transform: `translate(${mousePosition?.x / -20}px, ${
      mousePosition?.y / 80
    }px)`
  };

  useEffect(() => {
    document.body.addEventListener("mousemove", (e) =>
      setMousePosition({ x: e.pageX, y: e.pageY })
    );
  }, []);

  return (
    <header className="p-3 flex flex-col items-center justify-center gap-3 relative h-[40vh] overflow-hidden">
      <div className={styles.headerImage} style={paralaxStyles}></div>
      <div className={`${styles.logo} text-[3.4rem] text-white`}>Tastebite</div>
      <div className="container flex items-center justify-center gap-3">
        <Searchbar />
        <ThemeButton />
      </div>
      {/* <Quote /> */}
    </header>
  );
}
