import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCurrentContent } from '../../states/currentQContent';

export default function SubmitQBtns({ onClick, condition }) {

    const navigation = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="z-50 bg-white absolute top-[calc(100%_-_57px)] left-0 right-0 w-full py-3 px-4 flex items-center justify-end gap-4 border-t border-neutral-100">
            <button
                onClick={() => {
                    navigation('/', { state: { update: false } })
                }}
                className="text-sm font-bold text-[#3B368E] cursor-pointer min-w-16 h-8 flex items-center justify-center rounded bg-[#f0f2f5] hover:bg-[#d8dbe0]">انصراف</button>
            {condition ? (
                <button
                    onClick={async () => {
                        await onClick()
                        await dispatch(clearCurrentContent(''))
                        navigation('/')
                    }}
                    className="text-sm font-bold text-white cursor-pointer min-w-16 h-8 flex items-center justify-center rounded bg-[#3b368e]">ذخیره</button>
            ) : (
                <button className="text-sm cursor-default font-bold text-white min-w-16 h-8 flex items-center justify-center rounded bg-[#3b368e]/[75%]">ذخیره</button>
            )}
        </div>
    )
}
