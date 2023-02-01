import { useEffect, useState } from 'react';
import { throttle } from '../../../lib/helpers/throttle';
import styles from './Header.module.css';
import Searchbar from './Searchbar/Searchbar';
import ThemeButton from './Searchbar/ThemeButton';

function Header() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const paralaxStyles = {
		transform: `translate(${mousePosition.x / -40}px, ${
			mousePosition.y / 100
		}px)`
	};

	const paralaxHandler = throttle((e: React.MouseEvent) => {
		if (window.screen.width > 768) {
			setMousePosition({ x: e.pageX, y: e.pageY });
		} else {
			setMousePosition({ x: 0, y: 0 });
		}
	}, 25);

	useEffect(() => {
		document.body.addEventListener('mousemove', paralaxHandler);
	}, []);

	return (
		<header className="p-3 md:p-0 flex flex-col items-center justify-center gap-3 relative h-[40vh] overflow-hidden">
			<div className={styles.headerImage} style={paralaxStyles}></div>
			<h1 className={`${styles.logo} text-white text-[3.4rem]`}>Tastebite</h1>
			<div className="container flex items-center justify-center gap-3">
				<Searchbar />
				<ThemeButton />
			</div>
		</header>
	);
}

export default Header;
