import {Link} from "react-router-dom";

const NavItem = ({value, isLast, linkTo}: { value: string, isLast: boolean, linkTo: string }) => {
    return (
        <li>
            <div className={`middlebox ${isLast ? "middlebox_last" : ""}`}></div>
            <Link to={linkTo}>{value}</Link>
        </li>
    )
};

export default NavItem;