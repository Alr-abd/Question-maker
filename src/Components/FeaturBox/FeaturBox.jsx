
export default function FeaturBox({className, title, bg, children, onDragStart, onClick}) {
  return (
    <div onClick={onClick} onDragStart={onDragStart} draggable className={`cursor-pointer flex items-center gap-2 rounded-lg bg-white h-10 p-1 hover:shadow-[0_7px_12px_0_#bdbdbd] ${className}`}>
        <div className={`h-full w-8 flex items-center justify-center rounded ${bg}`}>
            {children}
        </div>
        <p className="text-sm">{title}</p>
    </div>
  )
}
