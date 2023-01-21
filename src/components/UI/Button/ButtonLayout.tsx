interface props {
	Component: 'button' | 'link';
}
function ButtonLayout({ Component }: props): JSX.Element {
	return <Component>ButtonLayout</Component>;
}

export default ButtonLayout;
