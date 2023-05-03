export const toggleTheme = (theme: 'dark' | 'light') => {
	const newTheme = theme === 'dark' ? 'light' : 'dark'

	document.documentElement.classList.remove(theme)
	document.documentElement.classList.add(newTheme)

	return newTheme
}
