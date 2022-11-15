import { roundToTwo } from "../../../lib/helpers/roundToTwo"
import Item from "./Item"

export default function Nutrions({ calories, protein, carbohydrates, fat }) {
  return (
    <div className={`p-3 flex flex-col justify-center w-full h-max rounded text-white bg-rose-700 sm:w-max lg:w-full`}>
      <p className="text-xl font-bold">Wartości odżywcze:</p>
      <Item title="Kalorie" content={`${roundToTwo(calories * 4.2)} kJ / ${calories} kcal`} />
      <Item title="Białko" content={`${protein} g`} />
      <Item title="Węglowodany" content={`${carbohydrates} g`} />
      <Item title="Tłuszcz" content={`${fat} g`} />
    </div>
  )
}
