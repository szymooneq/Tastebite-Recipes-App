import { useLocation } from 'react-router-dom';

function RecipeManagment(): JSX.Element {
	const { pathname } = useLocation();

	console.log(pathname);

	return <div>RecipeManagment</div>;
}

export default RecipeManagment;
