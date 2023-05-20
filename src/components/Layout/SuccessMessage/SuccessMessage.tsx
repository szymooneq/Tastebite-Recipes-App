import { InformationCircleIcon } from '@heroicons/react/20/solid'

const SuccessMessage = () => (
	<div className="p-3 my-5 mx-auto rounded-lg text-center">
		<div className="flex justify-center items-center">
			<InformationCircleIcon className="w-5 h-5 mr-2 text-green-700 dark:text-green-200" />
			<h3 className="text-xl font-bold text-green-700 dark:text-green-200">
				Twoje konto zostało utworzone!
			</h3>
		</div>
		<div className="my-3 font-semibold text-md text-green-700 dark:text-green-200">
			<p>
				Gratulacje! Twoje konto zostało utworzone.
				<br />
				Za 5 sekund zostaniesz automatycznie zalogowany i przekierowany na stronę główną...
			</p>
		</div>
	</div>
)

export default SuccessMessage
