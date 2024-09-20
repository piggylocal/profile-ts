import {Button} from "@mui/material";
import {useLocalStorage} from "@uidotdev/usehooks";
import {useNavigate} from "react-router-dom";

const Admin = () => {
    const [, setToken] = useLocalStorage<string | undefined>("token", undefined);

    const navigate = useNavigate();

    function logout() {
        setToken(undefined);
        navigate("/");
    }

    return (
        <div className="center">
            <Button variant="text" onClick={logout}>Logout</Button>
        </div>
    )
}

export default Admin;