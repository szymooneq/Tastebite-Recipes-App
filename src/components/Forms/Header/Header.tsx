import { HeaderProps } from './Header.types'

const color = {
	amber: 'border-amber-600',
	rose: 'border-rose-700',
	blue: 'border-blue-700',
	green: 'border-green-700'
}

const Header = ({ title, hrColor }: HeaderProps): JSX.Element => (
	<>
		<h2 className="font-bold text-2xl text-center text-black dark:text-white">{title}</h2>
		<hr className={`mt-2 mb-7 border-4 ${color[hrColor]}`} />
	</>
)

export default Header
