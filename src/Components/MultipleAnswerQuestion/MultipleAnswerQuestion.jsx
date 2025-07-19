import { useEffect, useState } from 'react'
import ContentEditor from '../ContentEditor/ContentEditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Bold, Italic, FontColor, FontBackgroundColor, Underline, Link, Alignment } from 'ckeditor5';
// import { SlashCommand } from 'ckeditor5-premium-features';
import useCustomDispatch from '../../hooks/useCustomDispatch';
import { addCurrentContent } from '../../states/currentQContent';
import InputField from '../InputField/InputField';
import ErrorBox from '../ErrorBox/ErrorBox';
import SubmitQBtns from '../SubmitQBtns/SubmitQBtns';

// CKEditor styles

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { saveContent } from '../../states/mainQContent';

export default function MultipleAnswerQuestion({ data, bg, icon }) {

    const dispatch = useDispatch()
    const mainQContent = useSelector(state => state.mainQContent)
    const [showItems, setShowItems] = useState('readyItems')
    const [media, setMedia] = useState('picture')
    const [currentItem, setCurrentItem] = useState('انتخاب کنید')
    const [showItemsMenu, setShowItemsMenu] = useState(false)
    const [shownSections, setShownSections] = useState({
        desc: false,
        moreItems: false,
        requireAnswer: false,
        img: false,
        secondLable: false,
        randomOrder: false,
        verticalItems: false,
        multipleAnswer: false,
        dontShowQuestionNumber: false
    })
    const [content, setContent] = useState({
        img: '',
        video: '',
        question: '',
        desc: '',
        items: ''
    })
    const [readyItems] = useState([
        { id: 1, title: 'تحصیلات', items: [{ id: 1, value: 'دیپلم' }, { id: 2, value: 'کاردانی' }, { id: 3, value: 'کارشناسی' }, { id: 4, value: 'کارشناسی ارشد' }, { id: 5, value: 'دکتری' }] },
        { id: 2, title: 'گروه سنی', items: [{ id: 1, value: 'نوزاد' }, { id: 2, value: 'کودک' }, { id: 3, value: 'نوجوان' }, { id: 4, value: 'جوان' }, { id: 5, value: 'میانسال' }, { id: 6, value: 'کهنسال' }] },
        { id: 3, title: 'بازه‌های سنی', items: [{ id: 1, value: 'کمتر از ۱۸ سال' }, { id: 2, value: '۱۸ تا ۲۳' }, { id: 3, value: '۲۴ تا ۲۹' }, { id: 4, value: '۳۰ تا ۳۵' }, { id: 5, value: '۳۶ تا ۴۰' }, { id: 6, value: '۴۱ تا ۵۰' }, { id: 7, value: 'بالای ۵۰ سال' }] },
        { id: 4, title: 'روزهای هفته', items: [{ id: 1, value: 'شنبه' }, { id: 2, value: 'یکشنبه' }, { id: 3, value: 'دو شنبه' }, { id: 4, value: 'سه شنبه' }, { id: 5, value: 'چهار شنبه' }, { id: 6, value: 'پنج شنبه' }, { id: 7, value: 'حمعه' }] },
        { id: 5, title: 'زمان‌های روز', items: [{ id: 1, value: 'صبح' }, { id: 2, value: 'ظهر' }, { id: 3, value: 'بعد از ظهر' }, { id: 4, value: 'عصر' }, { id: 5, value: 'غروب' }, { id: 6, value: 'شب' },] },
        { id: 6, title: 'خیلی موافقم تا خیلی مخالفم', items: [{ id: 1, value: 'خیلی موافقم' }, { id: 2, value: 'موافقم' }, { id: 3, value: 'تا حدودی' }, { id: 4, value: 'مخالفم' }, { id: 5, value: 'خیلی مخالفم' }] },
        { id: 7, title: 'خیلی راضی تا خیلی ناراضی', items: [{ id: 1, value: 'خیلی راضی' }, { id: 2, value: 'راضی' }, { id: 3, value: 'تا حدودی' }, { id: 4, value: 'ناراضی ام' }, { id: 5, value: 'خیلی ناراضی ام' }] },
        { id: 8, title: 'خیلی زیاد تا خیلی کم', items: [{ id: 1, value: 'خیلی زیاد' }, { id: 2, value: 'زیاد' }, { id: 3, value: 'تا حدودی' }, { id: 4, value: 'کم' }, { id: 5, value: 'خیلی کم' }] },
        { id: 9, title: 'عالی تا خیلی ضعیف', items: [{ id: 1, value: 'عالی' }, { id: 2, value: 'خوب' }, { id: 3, value: 'متوسظ' }, { id: 4, value: 'ضعیف' }, { id: 5, value: 'خیلی ضعیف' }] },
        { id: 10, title: 'درست/نادرست', items: [{ id: 1, value: 'درست' }, { id: 2, value: 'نادرست' }] },
        { id: 11, title: 'موافق/مخالف', items: [{ id: 1, value: 'موافق' }, { id: 2, value: 'مخالف' }] },
        { id: 12, title: 'بله/خیر', items: [{ id: 1, value: 'بله' }, { id: 2, value: 'خیر' }] },
        { id: 13, title: 'جنسیت', items: [{ id: 1, value: 'مرد' }, { id: 2, value: 'زن' }, { id: 3, value: 'مایل به پاسخ نیستم' }] }
    ])
    const [moreItems, setMoreItems] = useState([
        { id: 1, lable: 'هیچکدام', value: 'هیچکدام', showContent: false },
        { id: 2, lable: 'همه موارد', value: 'همه موارد', showContent: false },
        { id: 3, lable: 'سایر', value: 'سایر', showContent: false }
    ])
    const [inputs, setInputs] = useState([{ id: 1, value: '' }, { id: 2, value: '' }])

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

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = [...inputs]
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        setInputs(newItems);
    };

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
                                setInputs([{ id: 1, value: '' }, { id: 2, value: '' }])
                                setCurrentItem('انتخاب کنید')
                            }}
                            className="rounded bg-[#f0f2f5] flex items-center justify-center hover:bg-[#d8dbe0] cursor-pointer size-8 min-w-8">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.939"><path d="m8.353 15.211 6.858-6.857M8.353 8.353l6.858 6.858"></path></g></g></svg>
                        </i>
                    </div>
                )}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <ul className="flex flex-col gap-4" {...provided.droppableProps} ref={provided.innerRef}>
                                {inputs.map((input, index) => (
                                    <Draggable key={input.id} draggableId={`'${input.id}'`} index={index}>
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="flex items-center justify-between">
                                                <div className="col-span-2 p-1 flex items-center justify-between rounded border gap-2 h-8 w-[200px]">
                                                    <div className="h-full min-w-9 p-1 pl-2 rounded bg-[#f0f2f5] flex items-center justify-between gap-1 cursor-s-resize">
                                                        <i className="">
                                                            <svg width="12" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h12v24H0z"></path><g stroke="#6B7079" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m1 8 2-2 2 2M5 17l-2 2-2-2M3 7.5v10"></path></g></g></svg>
                                                        </i>
                                                        <span className="">{index + 1}</span>
                                                    </div>
                                                    <input
                                                        onChange={(e) => {
                                                            const updatedValues = [...inputs];
                                                            updatedValues[index].value = e.target.value;
                                                            setInputs(updatedValues)
                                                        }}
                                                        value={input.value} type="text" className="size-full outline-none text-sm placeholder:text-sm" />
                                                </div>
                                                <div className="col-span-1 rounded bg-[#f0f2f5] grid grid-cols-3 overflow-hidden">
                                                    <i
                                                        onClick={() => {
                                                            const updatedValues = [...inputs];
                                                            updatedValues.splice(index + 1, 0, { id: index + 1, value: '' })
                                                            setInputs(updatedValues)
                                                        }}
                                                        className="flex items-center justify-center hover:bg-[#d8dbe0] cursor-pointer size-8">
                                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g stroke="#6B7079" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M12 7v10M7 12h10"></path></g></g></svg>
                                                    </i>
                                                    <i className="flex items-center justify-center hover:bg-[#d8dbe0] cursor-pointer size-8">
                                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g transform="translate(4 6)" stroke="#6B7079" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M0 6s2.91-6 8-6 8 6 8 6-2.91 6-8 6-8-6-8-6z"></path><ellipse cx="8" cy="6" rx="2.182" ry="2.25"></ellipse></g></g></svg>
                                                    </i>
                                                    <i
                                                        onClick={() => {
                                                            const updatedValues = [...inputs];
                                                            updatedValues.splice(index, 1);
                                                            if (updatedValues.length >= 2) {
                                                                setInputs(updatedValues)
                                                            }
                                                        }}
                                                        className={`flex items-center justify-center hover:bg-[#d8dbe0] cursor-pointer size-8 ${inputs.length < 3 ? 'cursor-not-allowed hover:bg-red-500 hover:text-white' : ''}`}>
                                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.939"><path d="m8.353 15.211 6.858-6.857M8.353 8.353l6.858 6.858"></path></g></g></svg>
                                                    </i>
                                                </div>
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </form >
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, moreItems: !prev.moreItems }))
                    setInputs(prev => [...prev.filter(input => input.value !== 'هیچکدام' && input.value !== 'همه موارد' && input.value !== 'سایر')])
                    setContent(prev => ({ ...prev, items: `<ul>${inputs.map(input => `<li key={${input.id}}>${input.value}</li>`)}</ul>` }))
                }}
                open={shownSections.moreItems} title={'گزینه‌های سایر، هیچکدام، همه موارد'}>
                <form className="flex flex-col gap-4">
                    {moreItems.map((item, index) => (
                        <div key={item.id} className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                {item.showContent ? (
                                    <input checked onClick={() => {
                                        const updatedValues = [...moreItems];
                                        updatedValues[index].showContent = !updatedValues[index].showContent;
                                        setMoreItems(updatedValues)
                                        setInputs(prev => [...prev.filter(input => input.value !== item.value)])
                                    }} className='size-5 accent-[#3b368e] cursor-pointer' type="checkbox" name="noneInput" id="noneInput" />
                                ) : (
                                    <input onClick={() => {
                                        const updatedValues = [...moreItems];
                                        updatedValues[index].showContent = !updatedValues[index].showContent;
                                        setMoreItems(updatedValues)
                                        setInputs(prev => [...prev, { id: prev.length, value: item.value }])
                                    }} className='size-5 accent-[#3b368e] cursor-pointer' type="checkbox" name="noneInput" id="noneInput" />
                                )}
                                <label className='text-sm' htmlFor="noneInput">{item.lable}</label>
                            </div>
                            {item.showContent && (
                                <div className="flex items-center gap-2">
                                    <div className="w-full h-8 rounded border flex items-center justify-between gap-2 p-1">
                                        <div className="h-full min-w-9 p-1 rounded bg-[#f0f2f5] flex items-center justify-center">
                                            {item.id}
                                        </div>
                                        <input
                                            onChange={(e) => {
                                                const updatedValues = [...moreItems];
                                                updatedValues[index].value = e.target.value
                                                setMoreItems(updatedValues)
                                            }}
                                            value={item.value} type="text" className="size-full outline-none text-sm placeholder:text-sm" />
                                    </div>
                                    <i className="flex items-center justify-center bg-[#f0f2f5] hover:bg-[#d8dbe0] cursor-pointer rounded size-8 min-w-8">
                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g transform="translate(4 6)" stroke="#6B7079" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M0 6s2.91-6 8-6 8 6 8 6-2.91 6-8 6-8-6-8-6z"></path><ellipse cx="8" cy="6" rx="2.182" ry="2.25"></ellipse></g></g></svg>
                                    </i>
                                </div>
                            )}
                        </div>
                    ))}
                </form>
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, requireAnswer: !prev.requireAnswer }))
                }}
                open={shownSections.requireAnswer} title={'پاسخ به سوال اجباری باشد'}>
            </ContentEditor>
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
                    setShownSections(prev => ({ ...prev, secondLable: !prev.secondLable }))
                }}
                open={shownSections.secondLable} title={'افزودن برچسب دوم به گزینه‌ها?'}>
                <form className="flex flex-col gap-4">
                    {inputs.map(input => (
                        <InputField key={input.id} onChange={() => { }} label={input.id + '.  ' + input.value} />
                    ))}
                </form>
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, randomOrder: !prev.randomOrder }))
                }}
                open={shownSections.randomOrder} title={'تصادفی‌سازی ترتیب گزینه‌ها'}>
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, verticalItems: !prev.verticalItems }))
                }}
                open={shownSections.verticalItems} title={'گزینه‌ها عمودی چیده شوند'}>
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, multipleAnswer: !prev.multipleAnswer }))
                }}
                open={shownSections.multipleAnswer} title={'سوال چند انتخابی باشد'}>
            </ContentEditor>
            <ContentEditor
                onOpen={() => {
                    setShownSections(prev => ({ ...prev, dontShowQuestionNumber: !prev.dontShowQuestionNumber }))
                }}
                open={shownSections.dontShowQuestionNumber} title={'عدم نمایش شماره‌ سوال'}>
            </ContentEditor>
            <SubmitQBtns
                condition={((inputs[0].value !== '' && inputs[1].value !== '') && (!shownSections.moreItems || (shownSections.moreItems && true)) && content.question && (!shownSections.img || (shownSections.img && (content.img || (content.video && content.video !== '<video src=></video>')))) && (!shownSections.desc || (shownSections.desc && content.desc)))}
                onClick={async () => {
                    const newContent = { id: mainQContent.length, data, bg, icon, content: Object.values(content).join(''), dontShowNumber: shownSections.dontShowQuestionNumber };
                    await dispatch(saveContent(newContent));
                    const updatedMainQContent = [...mainQContent, newContent];
                    localStorage.setItem('mainContent', JSON.stringify(updatedMainQContent));
                }}
            />
        </>
    )
}
