import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const Searchbar = () => {
	const [term, setTerm] = useState<string>('')
	const inputRef = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()

	const handlePressEnter = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') navigate(`/szukaj/${term}`)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTerm(e.target.value)
	}

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	return (
		<div className="relative w-80">
			<div className="pl-3 flex absolute inset-y-0 left-0 items-center pointer-events-none">
				<MagnifyingGlassIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
			</div>

			<label htmlFor="search" hidden>
				Szukaj potrawy
			</label>

			<input
				ref={inputRef}
				id="search"
				name="search"
				type="text"
				value={term}
				onKeyDown={handlePressEnter}
				onChange={(e) => handleChange(e)}
				placeholder="Czego szukasz..."
				className="p-4 pl-10 w-full rounded-lg border text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
			/>

			<Link
				to={`szukaj/${term}`}
				className="px-4 py-2 absolute right-2.5 bottom-2.5 rounded-lg text-sm font-medium focus:ring-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
				Szukaj
			</Link>
		</div>
	)
}

export default Searchbar
