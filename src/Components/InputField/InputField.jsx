import ErrorBox from "../ErrorBox/ErrorBox"

export default function InputField({ type, label, max, min, value, onChange, setLimits }) {

    return (
        <>
            {type === 'limit' ? (
                <>
                    <span className="text-xs">محدودیت تعداد حروف پاسخ</span>
                    <div className="flex items-center gap-2">
                        <label htmlFor='min' className="text-sm font-bold text-nowrap min-w-max">حداقل</label>
                        <input
                            onChange={(e) => {
                                setLimits(prev => ({ ...prev, min: e.target.value }))
                                onChange()
                            }}
                            value={min}
                            id='min' className="outline-none rounded border border-[#bbbcc0] py-1 pb-2 px-3 text-sm max-w-28" type="number" />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor='max' className="text-sm font-bold text-nowrap min-w-max">حداکثر</label>
                        <input
                            onChange={(e) => {
                                setLimits(prev => ({ ...prev, max: e.target.value }))
                                onChange()
                            }}
                            value={max}
                            id='max' className="outline-none rounded border border-[#bbbcc0] py-1 pb-2 px-3 text-sm max-w-28" type="number" />
                    </div>
                    {!min && !max ? (
                        <ErrorBox error={'حداقل و حداکثر را وارد کنید'} />
                    ) : (<></>)}
                </>
            ) : (
                <>
                    <div className="flex flex-col gap-2">
                        <label htmlFor='input' className="text-sm text-nowrap min-w-max">{label}</label>
                        <input onChange={onChange} value={value} id='input' className="w-full outline-none rounded border border-[#bbbcc0] py-1 pb-2 px-3 text-sm" type="text" />
                    </div>
                    {!value ? (
                        <ErrorBox error={'چیزی را وارد کنید'} />
                    ) : (<></>)}
                </>
            )}
        </>
    )
}
