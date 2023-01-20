export interface IRecipe {
	name: string;
	description: string;
	status: boolean;
	details: {
		duration: number;
		level: string;
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
	id?: string;
	img?: string;
	userId?: string;
	createdAt?: {
		seconds: number;
		nanoseconds: number;
	};
	file: Blob | null;
}
