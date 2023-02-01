import useDocumentTitle from '../../lib/hooks/useDocumentTitle';

// TODO: profile update information

function UserDetails(): JSX.Element {
	useDocumentTitle('Profil | Szczegóły profilu');

	return (
		<p className="text-center italic text-gray-700 dark:text-white">
			Tymczasowo niedostępne...
		</p>
	);
}

export default UserDetails;
