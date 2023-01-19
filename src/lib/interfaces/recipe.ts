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
	createdAt?: string;
	/* file?: {
		lastModified?: number;
		name?: string;
		size?: number;
		webkitRelativePath?: string;
	} | null; */
	file: Blob | null;
}
