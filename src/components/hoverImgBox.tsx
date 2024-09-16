const HoverImgBox = ({surfaceImgSrc, bottomImgSrc}: { surfaceImgSrc: string, bottomImgSrc: string }) => {
    return (
        <div className="hover-img-box">
            <img className="surface" src={surfaceImgSrc} alt=""/>
            <img className="bottom" src={bottomImgSrc} alt=""/>
        </div>
    )
};

export default HoverImgBox;
