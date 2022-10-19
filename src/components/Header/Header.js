import { useEffect, useState } from 'react';
import ThemeButton from '../UI/ThemeButton/ThemeButton';
import styles from './Header.module.css';
import InspiringQuote from './InspiringQuote/InspiringQuote';
import Searchbar from './Searchbar/Searchbar';

function Header(props) {
  const [mousePosition, setMousePosition] = useState({})
  const paralaxStyles = { transform: `translate(${mousePosition?.x / -20}px, ${mousePosition?.y / 120}px)` }

  useEffect(() => {
    document.body.addEventListener('mousemove', (e) => setMousePosition({ x: e.pageX, y: e.pageY}))
  }, [])

  return (
    <header className="flex flex-col justify-center items-center p-3 gap-3 relative h-[40vh] overflow-hidden">
      <div className={styles.headerImage} style={paralaxStyles}></div>
      <div className={`${styles.logo} text-[3.4rem] text-white`}>Tastebite</div>
      <div className='container flex items-center justify-center gap-3 '>
        <Searchbar />
        <ThemeButton />
      </div>
      <InspiringQuote />
    </header>
  );
}

export default Header;