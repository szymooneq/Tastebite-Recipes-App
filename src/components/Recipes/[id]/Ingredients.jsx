export default function Ingredients({ arr }) {
  return (
    <div className={`p-3 flex flex-col justify-center w-full h-max rounded text-white bg-blue-600 sm:w-max lg:w-full`}>
      <p className="text-xl font-bold">Składniki:</p>
      <ul className="list-disc list-inside italic">
        {arr.map((item, id) => <li key={id}>{item}</li>)}
      </ul>
    </div>
  )
}
