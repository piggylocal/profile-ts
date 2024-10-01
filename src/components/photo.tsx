// This component is currently not in use.

const Photo = () => {
    return (
        <main className="main_about">
            <div className="about">
                <div className="person_info">
                    <img className="person" src={`${process.env.PUBLIC_URL}/me.jpeg`} alt=""/>
                    <p>me</p>
                </div>
            </div>
        </main>
    )
};

export default Photo;
