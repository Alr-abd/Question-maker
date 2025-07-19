import { useEffect, useState } from "react";
import FeaturBox from "../../Components/FeaturBox/FeaturBox";
import './Index.css'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from "react-redux";
import { removeContent } from "../../states/mainQContent";

export default function Index() {

    const dispatch = useDispatch()
    const [currentFeature, setCurrentFeature] = useState('')
    const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)
    const [content, setContent] = useState({
        welcomeContent: window.localStorage.getItem('welcome') || null,
        mainContent: JSON.parse(window.localStorage.getItem('mainContent')) || null,
        finishContent: window.localStorage.getItem('finish') || null,
    })
    const [openFeatureMenu, setOpenFeatureMenu] = useState(false)
    const [showFeatursSection, setShowFeatursSection] = useState(false)
    const { state } = useLocation()
    const [update, setUpdate] = useState(state?.update || false)
    const navigation = useNavigate()
    const { features, mainQContent } = useSelector(state => state)
    // const location = useLocation()
    // const { prevLcation, setPrevLocation } = useState(location.pathname)

    // const startQuestionSection = useRef()

    useEffect(() => {
        // const handleStorageChange = () => {
        setContent(prev => ({
            ...prev,
            welcomeContent: window.localStorage.getItem('welcome') || null,
            mainContent: JSON.parse(window.localStorage.getItem('mainContent')) || null,
            finishContent: window.localStorage.getItem('finish') || null,
        }));
        // dispatch(saveContent(content.mainContent))
        console.log(content);
        // };

        // if ((localStorage.getItem('welcome') !== content.welcomeContent) || (localStorage.getItem('finish') !== content.finishContent) || (localStorage.getItem('mainContent') !== JSON.stringify(content.mainContent))) {
        //     handleStorageChange()
        // }

    }, [update, mainQContent]);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = [...content.mainContent]
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);

        window.localStorage.setItem('mainContent', JSON.stringify(newItems))
        setUpdate(prev => !prev)
    };

    return (
        <main className="flex">
            <section className={`opacity-0 invisible -z-10 absolute inset-0 h-screen flex flex-col gap-4 bg-[#EEF0F5] p-2 py-3 lg:h-[calc(100vh_-_48px)] lg:opacity-100 lg:visible lg:z-0 lg:static lg:min-w-[26rem] lg:p-6 ${showFeatursSection ? 'opacity-100 !visible z-10' : ''}`}>
                <div className="relative h-12 flex items-center justify-center lg:hidden">
                    <i
                        onClick={() => setShowFeatursSection(false)}
                        className="absolute right-0 top-0 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><g fill="none" fillRule="evenodd"><g><g><g><path stroke="#3E434D" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M30 18L18 30M18 18L30 30" transform="translate(-1152.000000, -306.000000) translate(232.000000, 302.000000) translate(920.000000, 4.000000)"></path></g></g></g></g></svg>
                    </i>
                    <h2 className="">افزودن سوال</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {features &&
                        features.map((feature, index) => (
                            <FeaturBox
                                onClick={() => {
                                    navigation(`add/${feature.data}`, { state: { index: index } })
                                    setShowFeatursSection(false)
                                }}
                                onDragStart={() => {
                                    setCurrentFeature(feature.data)
                                    setCurrentFeatureIndex(index)
                                }}
                                className={feature.className}
                                key={feature.id}
                                bg={feature.bg}
                                title={feature.title}>
                                {feature.icon}
                            </FeaturBox>))
                    }
                </div>
            </section>
            <section className="relative w-full flex flex-col items-center gap-10 p-4 lg:p-6">
                {content.welcomeContent ? (
                    <div className="group h-12 w-full p-1 flex items-center justify-between rounded-lg hover:bg-neutral-100 cursor-pointer">
                        <div
                            onClick={() => navigation(`edit/welcome`, { state: { index: 0 } })}
                            className="size-full flex items-center gap-2">
                            <div className={`p-1 flex items-center justify-center rounded bg-[#d8dbe0]`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M5 4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h1zm10.53 2.47a.75.75 0 0 1 .073.976l-.073.084-3.72 3.72H22a.75.75 0 0 1 .102 1.493L22 12.75H11.812l3.718 3.72a.75.75 0 0 1 .073.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073-5-5-.063-.072-.034-.047a.77.77 0 0 1-.09-.193.747.747 0 0 1 .187-.748l5-5a.75.75 0 0 1 1.06 0z" fill="#3E434D" fillRule="nonzero"></path></g></svg>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: content.welcomeContent.split('<button')[0] }} className="text-sm font-bold"></p>
                        </div>
                        <div className="relative flex items-center gap-2 opacity-0 group-hover:opacity-100">
                            <div onClick={() => setOpenFeatureMenu(true)} className="flex items-center justify-center w-8 h-6 border rounded cursor-pointer bg-white">
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h16v16H0z"></path><path d="M8 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM2 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" stroke="#3E434D" fill="#3E434D" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                            </div>
                            {openFeatureMenu ? (
                                <ul
                                    onMouseLeave={() => setOpenFeatureMenu(false)}
                                    className="absolute top-6 left-0 w-32 text-xs flex flex-col gap-1 p-1 bg-white rounded shadow-lg">
                                    <li
                                        onClick={() => {
                                            window.localStorage.removeItem('welcome')
                                            setContent(prev => ({ ...prev, welcomeContent: null }))
                                        }}
                                        className="text-red-600 hover:bg-neutral-100 p-1">حذف</li>
                                </ul>
                            ) : (<></>)}
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => navigation(`add/welcome`, { state: { index: 0 } })}
                        onDragOver={(e) => {
                            e.preventDefault()
                            if (currentFeature === 'welcome') {
                                e.currentTarget.classList.add('active-drop')
                            } else {
                                e.currentTarget.classList.remove('active-drop')
                            }
                        }}
                        onDrop={(e) => {
                            e.currentTarget.classList.remove('active-drop')
                            if (currentFeature === 'welcome') {
                                navigation(`add/welcome`, { state: { index: 0 } })
                            }
                        }}
                        // ref={startQuestionSection}
                        className="h-12 w-full text-sm font-medium flex items-center justify-center border border-dashed border-[#bbbcc0] rounded-lg cursor-pointer hover:bg-neutral-100">
                        <i className="">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M12 6a1 1 0 0 1 1 1v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 1-1z" fill="#3E434D"></path></g></svg>
                        </i>
                        صفحه خوش‌آمدگویی
                    </div>
                )}
                {(content.mainContent && content.mainContent.length) ? (
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <div className="flex flex-col w-full" {...provided.droppableProps} ref={provided.innerRef}>
                                    {content.mainContent.map((c, index) => (
                                        <Draggable key={c.id} draggableId={`'${c.id}'`} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="group h-12 w-full p-1 flex items-center justify-between rounded-lg hover:bg-neutral-100 cursor-pointer">
                                                    <div
                                                        onClick={() => navigation(`edit/${c.data}`, { state: { index: content.mainContent.length - 1 } })}
                                                        className="size-full flex items-center gap-2">
                                                        <div dangerouslySetInnerHTML={{ __html: `${c.icon}${!c.dontShowNumber ? index + 1 : ''}` }} className={`p-1 flex items-center justify-center rounded ${c.bg}`}></div>
                                                        <p dangerouslySetInnerHTML={{ __html: c.content && c.content.split('<input')[0] }} className="text-sm font-bold"></p>
                                                    </div>
                                                    <div className="relative flex items-center gap-2 opacity-0 group-hover:opacity-100">
                                                        <div onClick={() => setOpenFeatureMenu(true)} className="flex items-center justify-center w-8 h-6 border rounded cursor-pointer bg-white">
                                                            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h16v16H0z"></path><path d="M8 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM2 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" stroke="#3E434D" fill="#3E434D" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                                                        </div>
                                                        {openFeatureMenu ? (
                                                            <ul
                                                                onMouseLeave={() => setOpenFeatureMenu(false)}
                                                                className="absolute top-6 left-0 w-32 text-xs flex flex-col gap-1 p-1 bg-white rounded shadow-lg">
                                                                <li
                                                                    onClick={async () => {
                                                                        const items = JSON.parse(window.localStorage.getItem('mainContent'))
                                                                        const updatedMainQContent = items.filter(i => i.id !== c.id) || null
                                                                        await dispatch(removeContent(c.id))

                                                                        window.localStorage.setItem('mainContent', JSON.stringify(updatedMainQContent))
                                                                        setUpdate(prev => !prev)
                                                                    }}
                                                                    className="text-red-600 hover:bg-neutral-100 p-1">حذف</li>
                                                            </ul>
                                                        ) : (<></>)}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    <div className="w-full flex flex-col items-center gap-4">
                        <div
                            onDragOver={(e) => {
                                e.preventDefault()
                                if (currentFeature !== 'welcome' && currentFeature !== 'finish') {
                                    e.currentTarget.classList.add('active-drop')
                                } else {
                                    e.currentTarget.classList.remove('active-drop')
                                }
                            }}
                            onDrop={(e) => {
                                e.currentTarget.classList.remove('active-drop')
                                if (currentFeature !== 'welcome' && currentFeature !== 'finish') {
                                    navigation(`add/${currentFeature}`, { state: { index: currentFeatureIndex } })
                                }
                            }}
                            className="h-12 w-full flex items-center justify-center border border-dashed border-[#bbbcc0] rounded-lg">
                        </div>
                        <p className="flex gap-1 tracking-tighter font-medium text-[#6B7079] text-sm">
                            نوع سوال مورد نظر را از ستون سمت راست به اینجا بکشید
                            <i className="">
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><g stroke="#6B7079" strokeLinecap="round" strokeWidth="2"><path d="M22 16c-9 0-11-4-11-14"></path><path strokeLinejoin="round" d="m15 6-4-4-4 4"></path></g></g></svg>
                            </i>
                        </p>
                    </div>
                )}
                {content.finishContent ? (
                    <div className="group h-12 w-full p-1 flex items-center justify-between rounded-lg hover:bg-neutral-100 cursor-pointer">
                        <div
                            onClick={() => navigation(`edit/finish`, { state: { index: 0 } })}
                            className="size-full flex items-center gap-2">
                            <div className={`p-1 flex items-center justify-center rounded bg-[#f0f2f5]`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M16.514 22.418c-.99 0-1.981-.225-2.974-.674-.993-.45-1.925-1.097-2.798-1.943l-5.44-5.254c-.448-.443-.673-.938-.673-1.485 0-.39.117-.751.351-1.083.235-.333.531-.564.89-.694l-.294-.293c-.358-.358-.537-.775-.537-1.25 0-.403.12-.765.361-1.084.241-.319.55-.534.928-.644l-.205-.205a1.687 1.687 0 0 1-.508-1.24c0-.502.178-.938.532-1.31a1.712 1.712 0 0 1 1.285-.556c.488 0 .908.176 1.26.527l.253.254c.117-.384.347-.688.689-.913a1.996 1.996 0 0 1 1.118-.337c.228 0 .448.038.66.113.21.075.398.197.56.366l4.503 4.502a10.958 10.958 0 0 1-.079-.576 4.953 4.953 0 0 1-.029-.528c0-.52.103-1 .308-1.44.205-.44.486-.793.845-1.06.358-.267.768-.4 1.23-.4.436 0 .798.143 1.084.43.286.286.43.631.43 1.035 0 .234-.03.447-.088.64a2.15 2.15 0 0 0-.088.63c0 .449.114 1.015.342 1.699.228.683.582 1.582 1.064 2.695l.283.654c.209.488.367.954.474 1.397.107.442.161.885.161 1.328 0 .976-.143 1.873-.43 2.69a6.403 6.403 0 0 1-1.215 2.124 5.478 5.478 0 0 1-1.866 1.392c-.719.329-1.515.493-2.387.493zM4.883 19.166a3.223 3.223 0 0 1-1.71-.86 3.385 3.385 0 0 1-.976-1.67l.948-.234c.117.47.348.866.693 1.192.345.325.749.53 1.21.615l-.165.957zm.957-1.7a2.386 2.386 0 0 1-1.245-.63 2.38 2.38 0 0 1-.699-1.205l.958-.225c.065.28.203.52.415.718.211.199.457.324.737.376l-.166.967zm10.703 3.878c.703 0 1.343-.135 1.919-.406a4.26 4.26 0 0 0 1.484-1.152c.414-.498.733-1.09.957-1.777.225-.687.337-1.45.337-2.29 0-.404-.039-.786-.117-1.148a5.716 5.716 0 0 0-.352-1.079l-.283-.654c-.514-1.198-.897-2.178-1.147-2.94-.25-.761-.376-1.412-.376-1.953 0-.208.028-.434.083-.678.055-.245.083-.415.083-.513a.366.366 0 0 0-.132-.283.474.474 0 0 0-.327-.117.934.934 0 0 0-.635.229c-.176.153-.31.353-.405.6a2.227 2.227 0 0 0-.142.801c0 .124.005.256.015.396.01.14.03.327.063.561l.264 1.846c-.658 1.01-.986 1.992-.986 2.95 0 .481.086.95.258 1.406.173.455.429.888.767 1.298l-.86.723c-.865-1.022-1.298-2.165-1.298-3.428 0-.97.26-1.94.781-2.91L11.24 5.572a.772.772 0 0 0-.566-.234.8.8 0 0 0-.542.21.667.667 0 0 0-.24.522c0 .241.085.446.254.616l4.2 4.199-.733.722-5.586-5.586a.784.784 0 0 0-.566-.253c-.202 0-.38.08-.537.239a.777.777 0 0 0-.235.561c0 .228.079.42.235.577L12.5 12.73l-.723.723-4.345-4.336a.432.432 0 0 0-.23-.137 1.19 1.19 0 0 0-.259-.029.772.772 0 0 0-.566.235.772.772 0 0 0-.234.566c0 .215.078.407.234.576l4.258 4.268-.723.722-2.91-2.9a.648.648 0 0 0-.479-.186.788.788 0 0 0-.546.225.695.695 0 0 0-.245.527c0 .274.147.554.44.84L11.523 19c.788.755 1.613 1.335 2.476 1.738.863.404 1.71.606 2.544.606zM14.648 5.61a1.38 1.38 0 0 0-.532-.64c-.244-.159-.51-.239-.796-.239v-.976c.482 0 .926.133 1.333.4.407.267.705.622.894 1.065l-.899.39zm1.407-1.279a2.394 2.394 0 0 0-.884-1.055 2.314 2.314 0 0 0-1.304-.39V1.91c.664 0 1.276.184 1.836.552.56.368.977.86 1.25 1.48l-.898.39z" fill="#3C434E" fillRule="nonzero"></path></g></svg>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: content.finishContent.split('<button')[0] }} className="text-sm font-bold"></p>
                        </div>
                        <div className="relative flex items-center gap-2 opacity-0 group-hover:opacity-100">
                            <div onClick={() => setOpenFeatureMenu(true)} className="flex items-center justify-center w-8 h-6 border rounded cursor-pointer bg-white">
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h16v16H0z"></path><path d="M8 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm6 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM2 7a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" stroke="#3E434D" fill="#3E434D" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                            </div>
                            {openFeatureMenu ? (
                                <ul
                                    onMouseLeave={() => setOpenFeatureMenu(false)}
                                    className="absolute top-6 left-0 w-32 text-xs flex flex-col gap-1 p-1 bg-white rounded shadow-lg">
                                    <li
                                        onClick={() => {
                                            window.localStorage.removeItem('finish')
                                            setContent(prev => ({ ...prev, finishContent: null }))
                                        }}
                                        className="text-red-600 hover:bg-neutral-100 p-1">حذف</li>
                                </ul>
                            ) : (<></>)}
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => navigation(`add/finish`, { state: { index: features.length - 1 } })}
                        onDragOver={(e) => {
                            e.preventDefault()
                            if (currentFeature === 'finish') {
                                e.currentTarget.classList.add('active-drop')
                            } else {
                                e.currentTarget.classList.remove('active-drop')
                            }
                        }}
                        onDrop={(e) => {
                            e.currentTarget.classList.remove('active-drop')
                            if (currentFeature === 'finish') {
                                navigation(`add/finish`, { state: { index: features.length - 1 } })
                            }
                        }}
                        className="h-12 w-full text-sm font-medium flex items-center justify-center border border-dashed border-[#bbbcc0] rounded-lg cursor-pointer hover:bg-neutral-100">
                        <i className="">
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M12 6a1 1 0 0 1 1 1v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 1-1z" fill="#3E434D"></path></g></svg>
                        </i>
                        صفحه پایان
                    </div>
                )}
                <button
                    onClick={() => setShowFeatursSection(true)}
                    className="p-3 cursor-pointer fixed bottom-8 left-6 flex items-center gap-2 bg-[#3b368e] text-white text-sm rounded lg:hidden">
                    <svg stroke="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M12 6a1 1 0 0 1 1 1v4h4a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 1-1z" fill="currentColor"></path></g></svg>
                    افزودن سوال
                </button>
            </section>
            <Outlet />
        </main >
    )
}
