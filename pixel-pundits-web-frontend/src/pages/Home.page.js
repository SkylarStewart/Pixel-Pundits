//home page
import { UserContext } from "../contexts/user.context";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useContext, React } from 'react';


export default function Home() {

    const navigate = useNavigate();
    const location = useLocation();

    const { logOutUser } = useContext(UserContext);

    //runs to log out user (will be used in places other than the homepage, testing for now)
    const onLogout = async () => {
        //tries to log out
        try {
            const isLoggedOut = await logOutUser();
            if (isLoggedOut == true) {
                logoutRedirect();
            }
        }
        catch (error) {
            alert(error);
        }
    }
    const logoutRedirect = () => {
        navigate("/login");
    }

    //goes to the user's profile
    const onProfileView = async () => {
        navigate("/profile");
    }

    //goes to the user's trades
    const onTradeView = async () => {
        navigate("/trades");

    }


    return (
        <>
            <h1>Pixel Pundits Homepage :D</h1>
            <h2>Want to make a search?</h2>
            <input
                type="search"
                name="search"
            ></input>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
                onClick={onLogout}>
                Log Out
            </Button>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
                onClick={onProfileView}>
                View Profile
            </Button>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: '10px' }}
                onClick={onTradeView}>
                View Trades
            </Button>
            <Button></Button>
        </>
    )
}