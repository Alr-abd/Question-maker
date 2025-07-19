import { useState } from 'react'
import ContentEditor from '../ContentEditor/ContentEditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Bold, Italic, FontColor, FontBackgroundColor, Underline, Link, Alignment } from 'ckeditor5';
// import { SlashCommand } from 'ckeditor5-premium-features';
import useCustomDispatch from '../../hooks/useCustomDispatch';
import { addCurrentContent } from '../../states/currentQContent';
import ErrorBox from '../ErrorBox/ErrorBox'

// CKEditor styles

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import SubmitQBtns from '../SubmitQBtns/SubmitQBtns';

export default function EmailQueation() {
    const [media, setMedia] = useState('picture')
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
        input: '<input type="email" placeholder="Email Address" />'
    })

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
                condition={(content.input !== '<input type="email" placeholder="Email Address" />' && content.question && (!shownSections.img || (shownSections.img && (content.img || (content.video && content.video !== '<video src=></video>')))) && (!shownSections.desc || (shownSections.desc && content.desc)))}
                onClick={() => {
                    // dispatch(saveQuestion(Object.values(content).join('')))
                }}
            />
        </>
    )
}
