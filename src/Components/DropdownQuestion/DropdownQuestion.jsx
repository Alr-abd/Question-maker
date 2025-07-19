import { useEffect, useState } from 'react'
import ContentEditor from '../ContentEditor/ContentEditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Bold, Italic, FontColor, FontBackgroundColor, Underline, Link, Alignment } from 'ckeditor5';
// import { SlashCommand } from 'ckeditor5-premium-features';
import useCustomDispatch from '../../hooks/useCustomDispatch';
import { addCurrentContent } from '../../states/currentQContent';
import InputField from '../InputField/InputField';

// CKEditor styles

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import SubmitQBtns from '../SubmitQBtns/SubmitQBtns';
import ErrorBox from '../ErrorBox/ErrorBox';

export default function DropdownQuestion() {
    const [showItems, setShowItems] = useState('readyItems')
    const [media, setMedia] = useState('picture')
    const [currentItem, setCurrentItem] = useState('انتخاب کنید')
    const [inputValue, setInputValue] = useState('')
    const [currentInput, setCurrentInput] = useState('')
    const [showItemsMenu, setShowItemsMenu] = useState(false)
    const [shownSections, setShownSections] = useState({
        desc: false,
        img: false,
        requireAnswer: false,
        randomOrder: false,
        charSort: false,
        dontShowQuestionNumber: false,
    })
    const [content, setContent] = useState({
        img: '',
        video: '',
        question: '',
        desc: '',
        items: ''
    })
    const [readyItems] = useState([
        { id: 1, title: 'تحصیلات', items: [{ id: 1, showInput: false, value: 'دیپلم' }, { id: 2, showInput: false, value: 'کاردانی' }, { id: 3, showInput: false, value: 'کارشناسی' }, { id: 4, showInput: false, value: 'کارشناسی ارشد' }, { id: 5, showInput: false, value: 'دکتری' }] },
        { id: 2, title: 'گروه سنی', items: [{ id: 1, showInput: false, value: 'نوزاد' }, { id: 2, showInput: false, value: 'کودک' }, { id: 3, showInput: false, value: 'نوجوان' }, { id: 4, showInput: false, value: 'جوان' }, { id: 5, showInput: false, value: 'میانسال' }, { id: 6, showInput: false, value: 'کهنسال' }] },
        { id: 3, title: 'بازه‌های سنی', items: [{ id: 1, showInput: false, value: 'کمتر از ۱۸ سال' }, { id: 2, showInput: false, value: '۱۸ تا ۲۳' }, { id: 3, showInput: false, value: '۲۴ تا ۲۹' }, { id: 4, showInput: false, value: '۳۰ تا ۳۵' }, { id: 5, showInput: false, value: '۳۶ تا ۴۰' }, { id: 6, showInput: false, value: '۴۱ تا ۵۰' }, { id: 7, showInput: false, value: 'بالای ۵۰ سال' }] },
        { id: 4, title: 'روزهای هفته', items: [{ id: 1, showInput: false, value: 'شنبه' }, { id: 2, showInput: false, value: 'یکشنبه' }, { id: 3, showInput: false, value: 'دو شنبه' }, { id: 4, showInput: false, value: 'سه شنبه' }, { id: 5, showInput: false, value: 'چهار شنبه' }, { id: 6, showInput: false, value: 'پنج شنبه' }, { id: 7, showInput: false, value: 'حمعه' }] },
        { id: 5, title: 'زمان‌های روز', items: [{ id: 1, showInput: false, value: 'صبح' }, { id: 2, showInput: false, value: 'ظهر' }, { id: 3, showInput: false, value: 'بعد از ظهر' }, { id: 4, showInput: false, value: 'عصر' }, { id: 5, showInput: false, value: 'غروب' }, { id: 6, showInput: false, value: 'شب' },] },
        { id: 6, title: 'خیلی موافقم تا خیلی مخالفم', items: [{ id: 1, showInput: false, value: 'خیلی موافقم' }, { id: 2, showInput: false, value: 'موافقم' }, { id: 3, showInput: false, value: 'تا حدودی' }, { id: 4, showInput: false, value: 'مخالفم' }, { id: 5, showInput: false, value: 'خیلی مخالفم' }] },
        { id: 7, title: 'خیلی راضی تا خیلی ناراضی', items: [{ id: 1, showInput: false, value: 'خیلی راضی' }, { id: 2, showInput: false, value: 'راضی' }, { id: 3, showInput: false, value: 'تا حدودی' }, { id: 4, showInput: false, value: 'ناراضی ام' }, { id: 5, showInput: false, value: 'خیلی ناراضی ام' }] },
        { id: 8, title: 'خیلی زیاد تا خیلی کم', items: [{ id: 1, showInput: false, value: 'خیلی زیاد' }, { id: 2, showInput: false, value: 'زیاد' }, { id: 3, showInput: false, value: 'تا حدودی' }, { id: 4, showInput: false, value: 'کم' }, { id: 5, showInput: false, value: 'خیلی کم' }] },
        { id: 9, title: 'عالی تا خیلی ضعیف', items: [{ id: 1, showInput: false, value: 'عالی' }, { id: 2, showInput: false, value: 'خوب' }, { id: 3, showInput: false, value: 'متوسظ' }, { id: 4, showInput: false, value: 'ضعیف' }, { id: 5, showInput: false, value: 'خیلی ضعیف' }] },
        { id: 10, title: 'درست/نادرست', items: [{ id: 1, showInput: false, value: 'درست' }, { id: 2, showInput: false, value: 'نادرست' }] },
        { id: 11, title: 'موافق/مخالف', items: [{ id: 1, showInput: false, value: 'موافق' }, { id: 2, showInput: false, value: 'مخالف' }] },
        { id: 12, title: 'بله/خیر', items: [{ id: 1, showInput: false, value: 'بله' }, { id: 2, showInput: false, value: 'خیر' }] },
        { id: 13, title: 'جنسیت', items: [{ id: 1, showInput: false, value: 'مرد' }, { id: 2, showInput: false, value: 'زن' }, { id: 3, showInput: false, value: 'مایل به پاسخ نیستم' }] }
    ])
    const [inputs, setInputs] = useState([])

    useCustomDispatch(addCurrentContent(Object.values(content).join('')))

    const uploadImageHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();

        if (file) {
            reader.onload = () => {
                setContent(prev => ({ ...prev, img: `<img src='${reader.result}' alt='img' /> ` }))
            };
            reader.readAsDataURL(file);
        }
    }

    useEffect(() => {
        setContent(prev => ({ ...prev, items: `<ul>${inputs.map(input => `<li key={${input.id}}>${input.value}</li>`)}</ul>` }))
    }, [inputs])

    return (
        <>
            <div className="flex flex-col gap-2 pt-6">
                <label className="text-sm font-bold">سوال</label>
                <CKEditor
                    editor={ClassicEditor}
                    // config={{
                    //     toolbar: {
                    //         items: ['bold', 'italic', '|', 'fontColor', 'fontBackgroundColor', '|', 'underline', 'link', '|', 'alignment'],
                    //     },
                    //     plugins: [
                    //         Bold, Italic, FontColor, FontBackgroundColor, Underline, Link, Alignment
                    //     ],
                    //     licenseKey: '<YOUR_LICENSE_KEY>',
                    //     mention: {
                    //         // Mention configuration
                    //     },
                    //     initialData: '<p>khghg</p>',
                    //     language: {
                    //         ui: 'fa',
                    //         content: 'fa'
                    //     },
                    // }}
                    data={''}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(prev => ({ ...prev, question: !shownSections.dontShowQuestionNumber ? '<span>1</span>' + data : data }))
                    }}
                />
                {!content.question ? (
                    <ErrorBox error={'سوال را وارد کنید'} />
                ) : (<></>)}
            </div>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, desc: !prev.desc }))
                    setContent(prev => ({ ...prev, desc: `` }))
                }}
                open={shownSections.desc} title={'توضیحات'}>
                <CKEditor
                    editor={ClassicEditor}
                    // config={{
                    //     toolbar: {
                    //         items: ['bold', 'italic', '|', 'fontColor', 'fontBackgroundColor', '|', 'underline', 'link', '|', 'alignment'],
                    //     },
                    //     plugins: [
                    //         Bold, Italic, FontColor, FontBackgroundColor, Underline, Link, Alignment
                    //     ],
                    //     licenseKey: '<YOUR_LICENSE_KEY>',
                    //     mention: {
                    //         // Mention configuration
                    //     },
                    //     initialData: '<p>khghg</p>',
                    //     language: {
                    //         ui: 'fa',
                    //         content: 'fa'
                    //     },
                    // }}
                    data={setShownSections.desc ? content.desc : ''}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(prev => ({ ...prev, desc: data }))
                    }}
                />
                {!content.desc ? (
                    <ErrorBox error={'توضیحات را وارد کنید'} />
                ) : (<></>)}
            </ContentEditor >
            <form className="flex flex-col gap-4 py-4">
                <ul className="flex items-center gap-1">
                    <li onClick={() => setShowItems('items')} className={`h-full border-[#3B368E] flex items-center justify-center rounded-[4px] text-sm hover p-1 hover:bg-neutral-100 cursor-pointer ${showItems === 'items' ? 'font-bold text-[#3B368E] border-b-2 rounded-none' : ''}`}>
                        گزینه‌ها
                    </li>
                    <li onClick={() => setShowItems('readyItems')} className={`h-full border-[#3B368E] flex items-center justify-center rounded-[4px] text-sm hover p-1 hover:bg-neutral-100 cursor-pointer ${showItems === 'readyItems' ? 'font-bold text-[#3B368E] border-b-2 rounded-none' : ''}`}>
                        گزینه‌های آماده
                    </li>
                </ul>
                {showItems === 'readyItems' && (
                    <div className="flex items-center justify-between gap-2">
                        <div className="cursor-pointer relative w-full h-8 flex items-center justify-between rounded border border-[#bbbcc0] px-1">
                            <p onClick={() => setShowItemsMenu(prev => !prev)} className="text-sm w-full pt-1 pb-2">{currentItem}</p>
                            <i onClick={() => setShowItemsMenu(prev => !prev)} className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><g><g><g><path d="M0 0H24V24H0z" transform="translate(-651.000000, -290.000000) translate(647.000000, 286.000000) translate(4.000000, 4.000000)"></path><path stroke="#3B368E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 10L12 16 18 10" transform="translate(-651.000000, -290.000000) translate(647.000000, 286.000000) translate(4.000000, 4.000000)"></path></g></g></g></g></svg>
                            </i>
                            {showItemsMenu ? (
                                <ul className={`flex flex-col gap-1 max-h-48 p-2 w-full overflow-y-auto [&::-webkit-scrollbar]:w-0 border rounded absolute top-full left-0 z-10 bg-white shadow-[0_2px_4px_0_rgba(151, 160, 179, .5)]`}>
                                    {readyItems.map(readyItem =>
                                    (<li
                                        key={readyItem.id}
                                        onClick={() => {
                                            setCurrentItem(readyItem.title)
                                            setShowItemsMenu(false)
                                            setInputs(readyItem.items.map((item, index) => ({ id: index + 1, value: item.value })))
                                        }} className="p-2 flex items-center justify-between rounded cursor-pointer hover:bg-[#d8dbe0]">
                                        <span className="text-xs">{readyItem.title}</span>
                                        {currentItem === readyItem.title ? (
                                            <i className="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><g><g><g><path d="M0 0H16V16H0z" transform="translate(-78.000000, -514.000000) translate(70.000000, 506.000000) translate(8.000000, 8.000000)"></path><path stroke="#3B368E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9.2L5.846 11 12 5" transform="translate(-78.000000, -514.000000) translate(70.000000, 506.000000) translate(8.000000, 8.000000)"></path></g></g></g></g></svg>
                                            </i>
                                        ) : ''}
                                    </li>
                                    ))}
                                </ul>
                            ) : ''}
                        </div>
                        <i
                            onClick={() => {
                                setInputs([])
                                setCurrentItem('انتخاب کنید')
                            }}
                            className="rounded bg-[#f0f2f5] flex items-center justify-center hover:bg-[#d8dbe0] cursor-pointer size-8 min-w-8">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.939"><path d="m8.353 15.211 6.858-6.857M8.353 8.353l6.858 6.858"></path></g></g></svg>
                        </i>
                    </div>
                )}
                <ul className="rounded border h-[120px] p-2 overflow-y-auto flex flex-col gap-2">
                    {inputs && inputs.map((input, index) => (
                        <>
                            {input.showInput ? (
                                <input
                                    onKeyDown={e => {
                                        const updatedValues = [...inputs];
                                        updatedValues[index].value = e.target.value;
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            updatedValues[index].showInput = false
                                            setInputs(updatedValues)
                                        }
                                    }}
                                    onChange={e => setCurrentInput(e.target.value)}
                                    value={currentInput}
                                    className='h-7 p-1 pr-2 outline-none rounded border-[2px] border-[#E1E1EE] text-sm' type="text" />
                            ) : (
                                <li
                                    // onClick={() => {
                                    //     const updatedValues = [...inputs];
                                    //     updatedValues[index].showInput = true;
                                    //     setInputs(updatedValues)
                                    //     setCurrentInput(input.value)
                                    // }}
                                    key={input.id} className="flex items-center text-[#3b368e] transition-all duration-200 bg-[#E1E1EE] rounded pr-2 border-[2px] border-white hover:!border-[#E1E1EE]" >
                                    <span className="w-full text-sm">{input.value}</span>
                                    <i
                                        onClick={() => {
                                            const updatedValues = [...inputs];
                                            updatedValues[index].showInput = true;
                                            setInputs(updatedValues)
                                            setCurrentInput(input.value)
                                        }}
                                        className="cursor-pointer ml-[2px]">
                                        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path stroke="#3B368E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 17.66h6M15 6.423a1.394 1.394 0 0 1 1.366-.374c.488.134.87.523 1 1.022.13.498-.009 1.03-.366 1.395L8.667 16.98 6 17.659l.667-2.723L15 6.423z"></path></g></svg>
                                    </i>
                                    <i
                                        onClick={() => {
                                            const updatedValues = [...inputs];
                                            updatedValues.splice(index, 1);
                                            setInputs(updatedValues)
                                        }}
                                        className="cursor-pointer">
                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g stroke="#3B368E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.939"><path d="m8.353 15.211 6.858-6.857M8.353 8.353l6.858 6.858"></path></g></g></svg>
                                    </i>
                                </li>
                            )}
                        </>
                    ))}
                    <input
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                setInputs(prev => [...prev, { id: inputs.length, value: inputValue }])
                                setInputValue('')
                            }
                        }}
                        onChange={(e) => {
                            setInputValue(e.target.value)
                        }}
                        className='opacity-0 transition-all duration-200 border-none outline-none bg-inherit text-sm placeholder:text-neutral-300 my-1 px-1 focus:opacity-100' placeholder='گزینه های سوال را وارد نمایید' value={inputValue} type="text" />
                </ul>
            </form >
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, img: !prev.img }))
                    setContent(prev => ({ ...prev, img: ``, video: '' }))
                }}
                open={shownSections.img} title={'عکس یا ویدیو'}>
                <div className="w-max flex items-center self-start h-8 rounded overflow-hidden">
                    <div onClick={() => setMedia('picture')} className={`w-16 h-full flex items-center justify-center bg-[#f0f2f5] hover:bg-[#d8dbe0] text-sm cursor-pointer ${media === 'picture' && '!bg-[#d8dbe0]'}`}>عکس</div>
                    <div onClick={() => setMedia('video')} className={`w-16 h-full flex items-center justify-center bg-[#f0f2f5] hover:bg-[#d8dbe0] text-sm cursor-pointer ${media === 'video' && '!bg-[#d8dbe0]'}`}>ویدیو</div>
                </div>
                {media === 'picture' ? (
                    <div className="max-w-[340px] w-full bg-[#f0f2f5] p-4 flex flex-col items-center self-center gap-2 rounded">
                        <button className="relative py-1 px-3 pb-2 cursor-pointer flex items-center gap-2 bg-[#3b368e] rounded">
                            <input className='absolute inset-0 opacity-0 cursor-pointer' onChange={uploadImageHandler} onClick={uploadImageHandler} type="file" name="fileInput" id="fileInput" accept='image/png, image/gif, image/jpeg' />
                            <label htmlFor='fileInput' className="text-white text-sm">بار گذاری تصویر</label>
                        </button>
                        <p className="text-xs text-[#6b7079]">حداکثر حجم : 2MB</p>
                    </div>
                ) : (
                    <form className="flex flex-col gap-2">
                        <label className="text-sm" htmlFor="inputVideo">آدرس ویدیو (URL)</label>
                        <input className="w-full outline-none rounded border border-[#bbbcc0] py-1 pb-2 px-3 text-sm" onChange={(e) => setContent(prev => ({ ...prev, video: `<video src=${e.target.value}></video>` }))} id="inputVideo" type="text" />
                    </form>
                )}
                {(!content.img && !content.video) ? (
                    <ErrorBox error={'ادرس ویدیو یا عکس را وارد کنید'} />
                ) : (<></>)}
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, requireAnswer: !prev.requireAnswer }))
                }}
                open={shownSections.requireAnswer} title={'پاسخ به سوال اجباری باشد'}>
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, randomOrder: !prev.randomOrder }))
                }}
                open={shownSections.randomOrder} title={'تصادفی‌سازی ترتیب گزینه‌ها'}>
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, charSort: !prev.charSort }))
                }}
                open={shownSections.charSort} title={'مرتب‌سازی بر اساس حروف الفبا'}>
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, dontShowQuestionNumber: !prev.dontShowQuestionNumber }))
                }}
                open={shownSections.dontShowQuestionNumber} title={'عدم نمایش شماره‌ سوال'}>
            </ContentEditor>
            <SubmitQBtns
                condition={(inputs && content.question && (!shownSections.img || (shownSections.img && (content.img || (content.video && content.video !== '<video src=></video>')))) && (!shownSections.desc || (shownSections.desc && content.desc)))}
                onClick={() => {
                    // dispatch(saveQuestion(Object.values(content).join('')))
                }}
            />
        </>
    )
}
