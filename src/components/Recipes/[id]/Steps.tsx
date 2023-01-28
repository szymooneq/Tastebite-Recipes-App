interface props {
	data: string[];
}

function Steps({ data }: props): JSX.Element {
	return (
		<>
			<h2 className="mb-2 text-2xl font-bold text-green-600 dark:text-green-500">
				Wykonanie
			</h2>
			<ol className="list-decimal list-inside dark:text-gray-400">
				{data.length ? (
					data.map((item, id) => (
						<li key={id} className="mb-3">
							{item}
						</li>
					))
				) : (
					<p>Brak informacji</p>
				)}
			</ol>
		</>
	);
}

export default Steps;
