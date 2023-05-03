export const toggleScrolling = (isActive: boolean) => {
	if (isActive) return document.documentElement.classList.add('overflow-hidden')

	document.documentElement.classList.remove('overflow-hidden')
}
