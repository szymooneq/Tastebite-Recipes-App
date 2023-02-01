import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProfileNavbar from './components/Layout/Navbar/Profile/ProfileNavbar';
import RootLayout from './components/Layout/RootLayout';
import './index.css';
const NotFound = React.lazy(() => import('./pages/404'));
const Home = React.lazy(() => import('./pages/Home'));
const Search = React.lazy(() => import('./pages/Search'));
const ProductView = React.lazy(() => import('./pages/[id]'));
const UserDetails = React.lazy(() => import('./pages/Profile/UserDetails'));
const UserRecipes = React.lazy(() => import('./pages/Profile/UserRecipes'));
const AddRecipe = React.lazy(
	() => import('./pages/Profile/RecipesManagment/AddRecipe')
);
const EditRecipe = React.lazy(
	() => import('./pages/Profile/RecipesManagment/EditRecipe')
);
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: <Home />
			},
			{
				path: 'przepis/:id',
				element: <ProductView />
			},
			{
				path: 'logowanie',
				element: <Login />
			},
			{
				path: 'rejestracja',
				element: <Register />
			},
			{
				path: 'szukaj',
				element: <Search />,
				children: [
					{
						path: ':term',
						element: <Search />
					}
				]
			},
			{
				path: 'profil',
				element: <ProfileNavbar />,
				children: [
					{
						index: true,
						element: <UserDetails />
					},
					{
						path: 'przepisy',
						element: <UserRecipes />
					},
					{
						path: 'przepisy/dodaj',
						element: <AddRecipe />
					},
					{
						path: 'przepisy/edytuj/:id',
						element: <EditRecipe />
					}
				]
			},
			{
				path: '*',
				element: <NotFound />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
