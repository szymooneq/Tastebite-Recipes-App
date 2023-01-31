import useDocumentTitle from '../../lib/hooks/useDocumentTitle';

// TODO: profile update information

function UserDetails(): JSX.Element {
	useDocumentTitle('Profil | Szczegóły profilu');

	return (
		<div className="mx-7 md:mx-auto md:w-96">
			<p className="text-black italic dark:text-white">
				Tymczasowo niedostępne...
			</p>
		</div>
	);
}

export default UserDetails;
