
export default function ErrorBox({error}) {
    return (
        <div className={`p-1 hidden gap-2 bg-[#ffd0d6] text-[#bc0007] rounded ${error ? '!flex' : ''}`}>
            <i className="">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><g><g><g><path d="M0 0H24V24H0z" transform="translate(-361.000000, -324.000000) translate(73.000000, 320.000000) translate(288.000000, 4.000000)"></path><path fill="#BC0007" fillRule="nonzero" d="M3.867 22c-.48 0-.962-.1-1.442-.398-1.346-.796-1.827-2.687-1.058-4.08L9.54 3.393c.192-.398.576-.796.961-.995.673-.398 1.442-.498 2.211-.298.77.199 1.346.696 1.827 1.393l8.076 14.03c.289.497.385.994.385 1.492 0 .796-.288 1.592-.865 2.09-.481.596-1.154.895-1.923.895H3.867z" transform="translate(-361.000000, -324.000000) translate(73.000000, 320.000000) translate(288.000000, 4.000000)"></path><path fill="#FFF" fillRule="nonzero" d="M12 16c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm0-8c.6 0 1 .4 1 1v4c0 .6-.4 1-1 1s-1-.4-1-1V9c0-.6.4-1 1-1z" transform="translate(-361.000000, -324.000000) translate(73.000000, 320.000000) translate(288.000000, 4.000000)"></path></g></g></g></g></svg>
            </i>
            <p className="text-sm">{error}</p>
        </div>
    )
}
