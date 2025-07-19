import React from 'react'

export default function Preview() {
  return (
    <main className='w-full h-[calc(100vh_-_96px)] flex items-center justify-center bg-[#285975] lg:h-[calc(100vh_-_48px)]'>
      <div
        dangerouslySetInnerHTML={{ __html: localStorage.getItem('welcome') }}
        className="h-max flex flex-col gap-4 [&>button]:w-40 [&>button]:h-12 [&>button]:rounded-lg [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:text-black [&>button]:font-bold [&>button]:text-xl [&>button]:bg-[#FBF7BC] text-[#FBF7BC]"
      ></div>
    </main>
  )
}
