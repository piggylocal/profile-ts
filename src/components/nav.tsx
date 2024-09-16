import NavItem from "./navItem";

const Nav = () => {
    return (
        <nav>
            <ul>
                <NavItem value={"Notes"} isLast={false} linkTo={"/"}></NavItem>
                <NavItem value={"Profile"} isLast={false} linkTo={"/profile"}></NavItem>
                <NavItem value={"Photo"} isLast={false} linkTo={"/photo"}></NavItem>
                <NavItem value={"Wordle+"} isLast={false} linkTo={"https://wordle-plus.netlify.app/"}></NavItem>
                <NavItem value={"Login"} isLast={true} linkTo={"/login"}></NavItem>
            </ul>
        </nav>
    )
};

export default Nav;