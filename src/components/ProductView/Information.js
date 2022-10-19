export default function Information({theme, title, children}) {
  return (
    <div className={`p-3 flex flex-col justify-center w-full h-max rounded text-white ${theme} sm:w-max lg:w-full`}>
      {title && <p className="text-xl font-bold">{title}:</p>}
      {children}
    </div>
  )
}
