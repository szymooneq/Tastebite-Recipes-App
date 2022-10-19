import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router'

export default function Searchbar() {
  const [term, setTerm] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const search = () => {
    navigate(`szukaj/${term}`)
  }

  const onKeyDownHandler = e => {
    e.key === 'Enter' && search()
  }

  const focusInput = () => {
    inputRef.current.focus()
  }

  useEffect(() => {
    focusInput()
  }, [])

  return (
    <div className="relative w-80">
      <div className="pl-3 flex absolute inset-y-0 left-0 items-center pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      <input 
        ref={inputRef}
        type="text" 
        value={term}
        onKeyDown={onKeyDownHandler}
        onChange={e => setTerm(e.target.value)}
        placeholder="Czego szukasz..."
        className="p-4 pl-10 w-full rounded-lg border text-sm text-gray-900 bg-gray-50 border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" />

      <button
        onClick={search}
        className="text-white absolute right-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Szukaj</button>
        
    </div>
  );
}
