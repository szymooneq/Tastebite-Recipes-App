interface Base<T> {
	name: string;
	label: string;
	value: T;
	onChange: (e: React.ChangeEvent | File | null) => void;
}

export interface ITextField extends Base<string> {
	placeholder: string;
	error: string | undefined;
	touched: boolean | undefined;
	onBlur: (e: React.FocusEvent) => void;
}

export interface IFileField extends Base<Blob | null> {
	imgValue: string | null;
	error: string | undefined;
}

export interface ISwitchField extends Base<boolean> {}

export interface INumberField extends Base<number> {
	step: number;
	placeholder: string;
	error: string | undefined;
	touched: boolean | undefined;
	onBlur: (e: React.FocusEvent) => void;
}

export interface ISelectField extends Base<string> {
	options: {
		key: string;
		value: string;
	}[];
	error: string | undefined;
	touched: boolean | undefined;
	onBlur: (e: React.FocusEvent) => void;
}

export interface IDynamicField {
	name: string;
	placeholder: string;
	type: string;
	error?: string | string[];
	array: string[];
	setArray: (value: string[]) => void;
}
