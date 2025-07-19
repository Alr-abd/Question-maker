import { useState } from 'react'
import ContentEditor from '../ContentEditor/ContentEditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { Bold, Italic, FontColor, FontBackgroundColor, Underline, Link, Alignment } from 'ckeditor5';
// import { SlashCommand } from 'ckeditor5-premium-features';
import useCustomDispatch from '../../hooks/useCustomDispatch';
import { addCurrentContent } from '../../states/currentQContent';
import ErrorBox from '../ErrorBox/ErrorBox';

// import './Welcome.css'

// CKEditor styles

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';
import SubmitQBtns from '../SubmitQBtns/SubmitQBtns';

export default function Welcome() {
    const [input, setInput] = useState('ارسال')
    const [shownSections, setShownSections] = useState({
        desc: false
    })
    const [content, setContent] = useState({
        desc: '',
        btn: '<button>ارسال</button>'
    })

    useCustomDispatch(addCurrentContent(Object.values(content).join('')))
    return (
        <>
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
            <form className="flex flex-col gap-2 mt-6">
                <div className="flex items-center gap-2">
                    <label className="text-sm" htmlFor="inputVideo">دکمه ورود</label>
                    <input className="outline-none rounded border border-[#bbbcc0] py-1 pb-2 px-3 text-sm"
                        onChange={(event) => {
                            setInput(event.target.value)
                            setContent(prev => ({ ...prev, btn: `<button>${event.target.value}</button>` }))
                        }}
                        value={input} id="inputVideo" type="text" />
                </div>
                {content.btn === '<button></button>' ? (
                    <ErrorBox error={'دکمه را وارد کنید'} />
                ) : (<></>)}
            </form>
            <SubmitQBtns
                condition={((content.btn !== '<button></button>') && (!shownSections.desc || (shownSections.desc && content.desc)))}
                onClick={() => {
                    localStorage.setItem('finish', Object.values(content).join(''))
                }}
            />
        </>
    )
}
