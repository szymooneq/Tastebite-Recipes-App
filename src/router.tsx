import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
const ProfileNav = React.lazy(() => import('./components/Layout/ProfileNavbar'))
const NotFoundPage = React.lazy(() => import('./pages/404'))
const HomePage = React.lazy(() => import('./pages'))
const SearchPage = React.lazy(() => import('./pages/search'))
const LoginPage = React.lazy(() => import('./pages/login'))
const RegisterPage = React.lazy(() => import('./pages/register'))
const RecipePage = React.lazy(() => import('./pages/recipe/[id]'))
const ProfilePage = React.lazy(() => import('./pages/profile'))
const UserRecipesPage = React.lazy(() => import('./pages/profile/recipes'))
const AddRecipePage = React.lazy(() => import('./pages/profile/recipes/add'))
const EditRecipePage = React.lazy(() => import('./pages/profile/recipes/edit/[id]'))

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <HomePage />
			},
			{
				path: 'recipe/:id',
				element: <RecipePage />
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'register',
				element: <RegisterPage />
			},
			{
				path: 'search',
				element: <SearchPage />,
				children: [
					{
						path: ':term',
						element: <SearchPage />
					}
				]
			},
			{
				path: 'profile',
				element: <ProfileNav />,
				children: [
					{
						index: true,
						element: <ProfilePage />
					},
					{
						path: 'recipes',
						element: <UserRecipesPage />
					},
					{
						path: 'recipes/add',
						element: <AddRecipePage />
					},
					{
						path: 'recipes/edit/:id',
						element: <EditRecipePage />
					}
				]
			},
			{
				path: '*',
				element: <NotFoundPage />
			}
		]
	}
])
