interface props {
	title: string;
	content: string | number;
}

function Item({ title, content }: props): JSX.Element {
	return (
		<p className="italic">
			<span className="font-bold">{title}:</span> {content}
		</p>
	);
}

export default Item;
