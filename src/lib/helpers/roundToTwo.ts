export const roundToTwo = (n: number) => {
	Number(`${Math.round(Number(`${n}e${2}`))}e-${2}`)
}
