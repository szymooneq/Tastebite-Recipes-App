export interface Base {
	name: string;
	label: string;
	// error: string | undefined;
	onChange: (e: React.ChangeEvent | File) => void;
}

export interface ITextField extends Base {
	value: string;
	placeholder: string;
	error: string | undefined;
	touched: boolean | undefined;
	onBlur: (e: React.FocusEvent) => void;
}

export interface IFileField extends Base {
	imgSrc: string;
	file: Blob | null;
	error: string | undefined;

	/* file: {
		lastModified: number;
		name: string;
		size: number;
		webkitRelativePath: string;
	} | null; */
}

export interface ISwitchField extends Base {
	value: boolean;
	onBlur: (e: React.FocusEvent) => void;
}

export interface INumberField extends Base {
	step: number;
	value: number;
	placeholder: string;
	error: string | undefined;
	touched: boolean | undefined;
	onBlur: (e: React.FocusEvent) => void;
}

export interface ISelectField extends Base {
	value: string;
	options: string[];
	error: string | undefined;
	touched: boolean | undefined;
	onBlur: (e: React.FocusEvent) => void;
}

export interface IDynamicField {
	placeholder: string;
	type: string;
	value: string[];
	setValue: (value: string[]) => void;
}
