import { useEffect, useState } from 'react'
import { throttle } from '../../../lib/helpers/throttle'
import Searchbar from '../../UI/Searchbar/Searchbar'
import ThemeButton from '../../UI/ThemeButton/ThemeButton'
import styles from './Header.module.css'

const Header = () => {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

	const paralax = {
		transform: `translate(${mousePos.x / -40}px, ${mousePos.y / 100}px)`
	}

	const handleMouseMove = throttle((e: React.MouseEvent) => {
		if (window.screen.width > 768) return setMousePos({ x: e.pageX, y: e.pageY })
		setMousePos({ x: 0, y: 0 })
	}, 25)

	useEffect(() => {
		document.body.addEventListener('mousemove', handleMouseMove)
	}, [])

	return (
		<header className="p-3 md:p-0 flex flex-col items-center justify-center gap-3 relative h-[40vh] overflow-hidden">
			<div className={styles.header} style={paralax} />
			<h1 className={`${styles.logo} text-white text-[3.4rem]`}>Tastebite</h1>
			<div className="container flex items-center justify-center gap-3">
				<Searchbar />
				<ThemeButton />
			</div>
		</header>
	)
}

export default Header
