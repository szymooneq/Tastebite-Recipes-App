import { useState } from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid'
import { IRecipeApi } from '@/types/Recipe.types'
import { TableProps } from './Table.types'

import Button from '@/components/UI/Button'
import CustomLink from '@/components/UI/CustomLink'
import Image from '@/components/UI/Image'
import Indicator from '@/components/UI/Indicator'
import Modal from '@/components/Modal'

const Table = ({ content }: TableProps): JSX.Element => {
	const [modal, setModal] = useState<{ data: IRecipeApi | null; isOpen: boolean }>({
		data: null,
		isOpen: false
	})

	const handleModal = (product: IRecipeApi | null, isOpen: boolean = false) => {
		setModal({ data: product, isOpen })
	}

	return (
		<>
			<table className="mx-auto w-full text-sm text-gray-500 dark:text-gray-400">
				<thead className="uppercase text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-[#D3D3D3]">
					<tr>
						{['Podgląd', 'Nazwa', 'Status', 'Opcje'].map((el) => (
							<th key={el} className="py-3 px-6">
								{el}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{content.map((product) => (
						<tr
							key={product.id}
							className="text-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
							<td className="p-4 font-semibold text-gray-900 dark:text-white">
								<Image
									className="mx-auto block w-12 h-12 object-contain object-center"
									src={product.img}
									alt={`Zdjęcie podglądowe przepisu "${product.name}"`}
								/>
							</td>
							<td className="p-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white">
								{product.name}
							</td>
							<td className="p-4">
								{product.status ? (
									<Indicator color="green">Aktywny</Indicator>
								) : (
									<Indicator color="red">Ukryty</Indicator>
								)}
							</td>
							<td className="p-4 font-semibold">
								<div className="flex gap-2 items-center justify-center">
									<CustomLink href={`edit/${product.id}`} color="blueOutline">
										<PencilSquareIcon className="w-4 h-4" />
									</CustomLink>
									<Button
										type="button"
										disabled={false}
										color="redOutline"
										onClick={() => handleModal(product, true)}>
										<TrashIcon className="w-4 h-4" />
									</Button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Modal content={modal} setModal={handleModal} />
		</>
	)
}

export default Table
