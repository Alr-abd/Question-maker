import { useState } from 'react'
import ContentEditor from '../ContentEditor/ContentEditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Bold, Italic, FontColor, FontBackgroundColor, Underline, Link, Alignment } from 'ckeditor5';
// import { SlashCommand } from 'ckeditor5-premium-features';
import useCustomDispatch from '../../hooks/useCustomDispatch';
import { addCurrentContent } from '../../states/currentQContent';

// CKEditor styles

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import InputField from '../InputField/InputField';
import ErrorBox from '../ErrorBox/ErrorBox';
import SubmitQBtns from '../SubmitQBtns/SubmitQBtns';
import { useDispatch, useSelector } from 'react-redux';
import { saveContent } from '../../states/mainQContent';

export default function ShortAnswerTextQuestion({ data, icon, bg }) {

    const dispatch = useDispatch()
    const mainQContent = useSelector(state => state.mainQContent)
    const [media, setMedia] = useState('picture')
    const [currentTextAlg, setCurrentTextAlg] = useState('متن آزاد')
    const [showTextAlgMenu, setShowTextAlgMenu] = useState(false)
    const [inputs, setInputs] = useState({
        shamdDate: 'مثلا:‌ ۱۳۸۷/۰۴/۲۳',
        miladDate: 'YYYY/MM/DD',
        mobileNum: 'مثلا ۰۹۱۲۴۷۵۸۶۹۷',
        phoneNum: 'مثلا: ۰۲۱۸۸۵۵۶۳۰۷',
        charNum: 'مثلا: ۰۱۲۳۴۵۶۷۸۹۱',
        faChar: 'حروف فارسی',
        enChar: 'حروف انگلیسی',
        timeChar: 'مثلا: ۱۱:۱۱:۱۱',
        ipChar: 'مثلا : 192.168.1.1',
        firstCustomAlg: '',
        lastCustomAlg: ''
    })
    const [limits, setLimits] = useState({
        max: 100,
        min: 0
    })
    const [shownSections, setShownSections] = useState({
        img: false,
        desc: false,
        requireAnswer: false,
        dontShowQuestionNumber: false,
    })
    const [content, setContent] = useState({
        img: '',
        video: '',
        question: '',
        desc: '',
        input: '<input type="text" />'
    })
    const [menuAlgs] = useState(
        [
            { id: 1, title: 'متن آزاد', func: () => setContent(prev => ({ ...prev, input: `<input type="text" />` })) },
            { id: 2, title: 'تاریخ شمسی', func: () => setContent(prev => ({ ...prev, input: `<input type='date' placeholder='مثلا:‌ ۱۳۸۷/۰۴/۲۳' />` })) },
            { id: 3, title: 'تاریخ میلادی', func: () => setContent(prev => ({ ...prev, input: `<input type='date' placeholder='YYYY/MM/DD' />` })) },
            { id: 4, title: 'شماره موبایل', func: () => setContent(prev => ({ ...prev, input: `<input type='text' placeholder='مثلا ۰۹۱۲۴۷۵۸۶۹۷' />` })) },
            { id: 5, title: 'شماره تلفن', func: () => setContent(prev => ({ ...prev, input: `<input type='text' placeholder='مثلا: ۰۲۱۸۸۵۵۶۳۰۷' />` })) },
            { id: 6, title: 'کاراکترهای عددی (شماره ملی، کد پستی و ...)', func: () => setContent(prev => ({ ...prev, input: `<input type='text' placeholder='مثلا: ۰۱۲۳۴۵۶۷۸۹۱' />` })) },
            { id: 7, title: 'حروف فارسی', func: () => setContent(prev => ({ ...prev, input: `<input type='text' placeholder='حروف فارسی' />` })) },
            { id: 8, title: 'حروف انگلیسی', func: () => setContent(prev => ({ ...prev, input: `<input type='text' placeholder='حروف انگلیسی' />` })) },
            { id: 9, title: 'زمان', func: () => setContent(prev => ({ ...prev, input: `<input type='text' placeholder='مثلا: ۱۱:۱۱:۱۱' / > ` })) },
            { id: 10, title: 'IP', func: () => setContent(prev => ({ ...prev, input: `<input type='text' placeholder='مثلا : 192.168.1.1' /> ` })) },
            { id: 11, title: 'الگوی دلخواه', func: () => setContent(prev => ({ ...prev, input: `<input type='text' placeholder='' /> ` })) }
        ]
    )

    useCustomDispatch(addCurrentContent(Object.values(content).join('')))

    const uploadImageHandler = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader();

        if (file) {
            reader.onload = () => {
                setContent(prev => ({ ...prev, img: `<img src="${reader.result}" alt='img' />` }))
            };
            reader.readAsDataURL(file);
        }
    }

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
                <div className="flex items-center justify-between gap-2">
                    <label className="text-sm font-bold text-nowrap min-w-max">الگوی پاسخ</label>
                    <div
                        className="cursor-pointer relative w-full flex items-center justify-between rounded border border-[#bbbcc0] px-1">
                        <p onClick={() => setShowTextAlgMenu(prev => !prev)} className="text-sm w-full pt-1 pb-2">{currentTextAlg}</p>
                        <i onClick={() => setShowTextAlgMenu(prev => !prev)} className="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><g><g><g><path d="M0 0H24V24H0z" transform="translate(-651.000000, -290.000000) translate(647.000000, 286.000000) translate(4.000000, 4.000000)"></path><path stroke="#3B368E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 10L12 16 18 10" transform="translate(-651.000000, -290.000000) translate(647.000000, 286.000000) translate(4.000000, 4.000000)"></path></g></g></g></g></svg>
                        </i>
                        {showTextAlgMenu ? (
                            <ul className={`flex flex-col gap-1 max-h-48 p-2 w-full overflow-y-auto [&::-webkit-scrollbar]:w-0 border rounded absolute top-full left-0 z-10 bg-white shadow-[0_2px_4px_0_rgba(151, 160, 179, .5)]`}>
                                {menuAlgs.map(menuAlg =>
                                (<li
                                    key={menuAlg.id}
                                    onClick={() => {
                                        setCurrentTextAlg(menuAlg.title)
                                        setShowTextAlgMenu(false)
                                        menuAlg.func()
                                        console.log('func')
                                    }} className="p-2 flex items-center justify-between rounded cursor-pointer hover:bg-[#d8dbe0]">
                                    <span className="text-xs">{menuAlg.title}</span>
                                    {currentTextAlg === menuAlg.title ? (
                                        <i className="">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd"><g><g><g><path d="M0 0H16V16H0z" transform="translate(-78.000000, -514.000000) translate(70.000000, 506.000000) translate(8.000000, 8.000000)"></path><path stroke="#3B368E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9.2L5.846 11 12 5" transform="translate(-78.000000, -514.000000) translate(70.000000, 506.000000) translate(8.000000, 8.000000)"></path></g></g></g></g></svg>
                                        </i>
                                    ) : ''}
                                </li>
                                ))}
                            </ul>
                        ) : ''}
                    </div>
                </div>
                {
                    currentTextAlg === 'متن آزاد' ? (
                        <InputField max={limits.max} min={limits.min} setLimits={setLimits} onChange={() => setContent(prev => ({ ...prev, input: `<input type='text' minLength=${limits.min} maxLength=${limits.max} />` }))} type={'limit'} />
                    ) : currentTextAlg === 'تاریخ شمسی' ? (
                        <>
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, shamdDate: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='date' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.shamdDate} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا یک تاریخ شمسی معتبر وارد کنید.'} label={'پیام اعتبار سنجی'} />
                        </>
                    ) : currentTextAlg === 'تاریخ میلادی' ? (
                        <>
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, miladDate: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='date' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.miladDate} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا یک تاریخ میلادی معتبر وارد کنید.'} label={'پیام اعتبار سنجی'} />
                        </>
                    ) : currentTextAlg === 'شماره موبایل' ? (
                        <>
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, mobileNum: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.mobileNum} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا یک شماره موبایل معتبر وارد کنید.'} label={'پیام اعتبار سنجی'} />
                        </>
                    ) : currentTextAlg === 'شماره تلفن' ? (
                        <>
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, phoneNum: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.phoneNum} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا یک شماره تلفن معتبر وارد کنید.'} label={'پیام اعتبار سنجی'} />
                        </>
                    ) : currentTextAlg === 'کاراکترهای عددی (شماره ملی، کد پستی و ...)' ? (
                        <>
                            <InputField max={limits.max} min={limits.min} type={'limit'} />
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, charNum: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.charNum} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا فقط از کاراکترهای عددی استفاده کنید.'} label={'پیام اعتبار سنجی'} />
                        </>

                    ) : currentTextAlg === 'حروف فارسی' ? (
                        <>
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, faChar: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.faChar} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا فقط از حروف فارسی استفاده کنید.'} label={'پیام اعتبار سنجی'} />
                        </>
                    ) : currentTextAlg === 'حروف انگلیسی' ? (
                        <>
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, enChar: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.enChar} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا فقط از حروف انگلیسی استفاده کنید.'} label={'پیام اعتبار سنجی'} />
                        </>
                    ) : currentTextAlg === 'زمان' ? (
                        <>
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, timeChar: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.timeChar} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا یک زمان معتبر وارد کنید.'} label={'پیام اعتبار سنجی'} />
                        </>
                    ) : currentTextAlg === 'IP' ? (
                        <>
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, ipChar: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.ipChar} label={'نمونه پاسخ'} />
                            <InputField value={'لطفا یک IP معتبر وارد کنید.'} label={'پیام اعتبار سنجی'} />
                        </>
                    ) : (
                        <>
                            <InputField
                                onChange={() => {
                                    setInputs(prev => ({ ...prev, firstCustomAlg: event.target.value }))
                                    // setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.firstCustomAlg} label={'الگو'} />
                            <InputField
                                onChange={(e) => {
                                    setInputs(prev => ({ ...prev, lastCustomAlg: event.target.value }))
                                    setContent(prev => ({ ...prev, input: `<input type='text' placeholder='${e.target.value}' />` }))
                                }}
                                value={inputs.lastCustomAlg} label={'نمونه پاسخ'} />
                            <InputField value={''} label={'پیام اعتبار سنجی'} />
                        </>
                    )
                }
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
                    setShownSections(prev => ({ ...prev, dontShowQuestionNumber: !prev.dontShowQuestionNumber }))
                }}
                open={shownSections.dontShowQuestionNumber} title={'عدم نمایش شماره‌ سوال'}>
            </ContentEditor>
            <SubmitQBtns
                condition={(content.question && (!shownSections.img || (shownSections.img && (content.img || (content.video && content.video !== '<video src=></video>')))) && (!shownSections.desc || (shownSections.desc && content.desc)))}
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
