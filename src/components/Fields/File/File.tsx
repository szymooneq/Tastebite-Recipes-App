import { useEffect, useRef, useState } from 'react'
import Button from '../../UI/Button/Button'
import Image from '../../UI/Image/Image'
import { getFieldStyles } from '../../../lib/helpers/getFieldStyles'
import ErrorMsg from '../ErrorMsg/ErrorMsg'
import { FileProps } from './File.types'

const File = ({ name, label, errorMsg, currentImg, value, setValue }: FileProps): JSX.Element => {
	const [preview, setPreview] = useState<string | null>(currentImg)
	const inputRef = useRef<HTMLInputElement | null>(null)

	const styles = getFieldStyles(errorMsg, true)
	const { fieldStyle, labelStyle } = styles

	const handleOpen = () => {
		const { current } = inputRef
		if (current) current.click()
	}

	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.currentTarget
		if (files) setValue('file', files[0])
	}

	const handleRemoveFile = () => {
		if (currentImg) return setValue('file', currentImg)
		setValue('file', null)
	}

	return (
		<div className="mb-4">
			<label htmlFor={name} className={`block mb-2 text-sm font-medium ${labelStyle}`}>
				{label}
			</label>

			{preview && !errorMsg ? (
				<Image
					className="w-full mb-2 h-52 rounded-lg object-cover object-center"
					src={preview}
					alt="Food preview"
				/>
			) : null}

			<input
				ref={inputRef}
				id={name}
				name={name}
				type="file"
				hidden
				onChange={(e) => handleChangeFile(e)}
				className={`w-full border text-sm rounded-lg outline-none ${fieldStyle}`}
				accept="image/jpg, image/jpeg, image/gif, image/png"
			/>

			<div className="inline-flex w-full justify-between">
				<Button onClick={() => handleOpen()} color="gray" type="button" disabled={false}>
					Dodaj zdjęcie
				</Button>
				{value ? (
					<Button onClick={() => handleRemoveFile()} color="red" type="button" disabled={false}>
						Usuń
					</Button>
				) : null}
			</div>

			<ErrorMsg content={errorMsg} isTouched={true} />
		</div>
	)
}

export default File
