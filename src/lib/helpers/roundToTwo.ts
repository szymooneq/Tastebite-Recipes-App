export const roundToTwo = (n: number) => {
	return Number(`${Math.round(Number(`${n}e${2}`))}e-${2}`)
}
