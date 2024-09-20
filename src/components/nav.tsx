import {useLocalStorage} from "@uidotdev/usehooks";

import NavItem from "./navItem";

const Nav = () => {
    const [token,] = useLocalStorage<string | undefined>("token", undefined);
    const hasLoggedIn = Boolean(token);

    return (
        <nav>
            <ul>
                <NavItem value={"Notes"} isLast={false} linkTo={"/"}></NavItem>
                <NavItem value={"Profile"} isLast={false} linkTo={"/profile"}></NavItem>
                <NavItem value={"Photo"} isLast={false} linkTo={"/photo"}></NavItem>
                <NavItem value={"Wordle+"} isLast={false} linkTo={"https://wordle-plus.netlify.app/"}></NavItem>
                {!hasLoggedIn && <NavItem value={"Login"} isLast={true} linkTo={"/login"}></NavItem>}
                {hasLoggedIn && <NavItem value={"Admin"} isLast={true} linkTo={"/admin"}></NavItem>}
            </ul>
        </nav>
    )
};

export default Nav;