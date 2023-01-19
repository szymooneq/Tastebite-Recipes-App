import { useEffect, useState } from 'react';

const quotes = [
	`“Cooking is like love. It should be entered into with abandon or not at all.” – Harriet Van Horne`,
	`“A recipe has no soul. You as the cook must bring soul to the recipe.” – Thomas Keller`,
	`“Cooking with kids is not just about ingredients, recipes, and cooking. It’s about harnessing imagination, empowerment, and creativity.” – Guy Fieri`,
	`“Real cooking is more about following your heart than following recipes.” – Unknown`,
	`“Cooking is at once child’s play and adult joy. And cooking done with care is an act of love.” – Craig Claiborne`,
	`“So when people ask me, ‘What do you think of Michelin?’ I don’t cook for guides. I cook for customers.” – Gordon Ramsay`,
	`“The only real stumbling block is fear of failure. In cooking, you’ve got to have a what-the-hell attitude.” – Julia Child`
];

function InspiringQuote() {
	const [quote, setQuote] = useState('Wczytywanie cytatu...');

	useEffect(() => {
		setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
	}, []);

	return (
		<p className="italic text-sm font-bold text-center antialiased text-white">
			{quote}
		</p>
	);
}

export default InspiringQuote;
