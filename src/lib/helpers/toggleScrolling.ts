export const toggleScrolling = (isActive: boolean) => {
	if (isActive) return document.body.classList.add('overflow-hidden')

	document.body.classList.remove('overflow-hidden')
}
