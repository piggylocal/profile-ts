import NavItem from "./navItem";

const Nav = () => {
    return (
        <nav>
            <ul>
                <NavItem value={"Profile"} isLast={false} linkTo={"/"}></NavItem>
                <NavItem value={"Photo"} isLast={false} linkTo={"/photo"}></NavItem>
                <NavItem value={"Wordle+"} isLast={true} linkTo={"https://wordle-plus.netlify.app/"}></NavItem>
            </ul>
        </nav>
    )
};

export default Nav;