const defaultErrorMessages = {
	required_error: 'Pole wymagane',
	invalid_type_error: 'Nieprawidłowa wartość'
}

const authErrorMessages = {
	invalid_email: 'Wprowadź poprawny adres e-mail',
	different_passwords: 'Hasła nie są identyczne'
}

const recipeErrorMessages = {
	name_too_many_characters: 'Maksymalna ilość znaków wynosi 50',
	name_special_characters: 'Tekst zawiera znaki specjalne',
	description_too_many_characters: 'Maksymalna ilość znaków wynosi 550',
	file_too_large: 'Maksymalna wielkość pliku wynosi 1MB.',
	file_wrong_format: 'Dozwolone formaty: jpg, jpeg, gif, png',
	nutrion_overvalued: 'Maksymalna wartość wynosi 9999',
	duration_overvalued: 'Maksymalna wartość wynosi 999',
	portions_overvalued: 'Maksymalna wartość wynosi 99'
}

export { defaultErrorMessages, authErrorMessages, recipeErrorMessages }
