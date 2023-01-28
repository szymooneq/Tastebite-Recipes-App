export interface IRecipe {
	name: string;
	description: string;
	status: boolean;
	file: Blob | null;
	img?: string;
	details: {
		duration: number;
		level: 'easy' | 'medium' | 'hard';
		portions: number;
	};
	nutrions: {
		calories: number;
		carbohydrates: number;
		fat: number;
		protein: number;
	};
	ingredients: string[];
	steps: string[];
}

export interface IRecipeApi extends IRecipe {
	id: string;
	userId: string;
	createdAt: {
		seconds: number;
		nanoseconds: number;
	};
	editedAt: string;
}
