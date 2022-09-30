import { useEffect, useState } from 'react';
import styles from './Header.module.css';
import InspiringQuote from './InspiringQuote/InspiringQuote';
import ThemeButton from '../UI/ThemeButton/ThemeButton';
import Searchbar from './Searchbar/Searchbar';

function Header(props) {
  const [mousePosition, setMousePosition] = useState({})
  const paralaxStyles = { transform: `translate(${mousePosition?.x / -20}px, ${mousePosition?.y / 120}px)` }

  useEffect(() => {
    document.body.addEventListener('mousemove', (e) => setMousePosition({ x: e.pageX, y: e.pageY}))
  })

  return (
    <header className="flex flex-col justify-center items-center p-3 gap-3 relative h-56 overflow-hidden">
      <div className={styles.headerImage} style={paralaxStyles}></div>
      <InspiringQuote />
      <Searchbar />
      <ThemeButton />
    </header>
  );
}

export default Header;