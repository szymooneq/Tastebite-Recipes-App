import React from 'react'

export default function ProductInfo({theme, title, children}) {
  return (
    <div className={`p-3 flex flex-col justify-center w-full h-max rounded text-white ${theme} sm:w-max lg:w-full`}>
      {title && <p className="font-bold text-xl">{title}:</p>}
      {children}
    </div>
  )
}
