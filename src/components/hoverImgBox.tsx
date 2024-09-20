const HoverImgBox = ({surfaceImgSrc, bottomImgSrc, onSubmit, username, password}: {
    surfaceImgSrc: string,
    bottomImgSrc: string,
    onSubmit: (username: string, password: string) => Promise<void>,
    username: string,
    password: string
}) => {
    return (
        <div className="hover-img-box" onClick={() => void onSubmit(username, password)}>
            <img className="surface" src={surfaceImgSrc} alt=""/>
            <img className="bottom" src={bottomImgSrc} alt=""/>
        </div>
    )
};

export default HoverImgBox;
