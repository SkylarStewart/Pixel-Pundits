//home page
import { UserContext } from "../contexts/user.context";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useContext, React } from 'react';
import UserSearch from "../Components/UserSearch";
import TradeMakerMenu from "../Components/TradingComponents/TradeMakerMenu";
import { Container, Row, Col } from 'react-bootstrap';


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
            alert(error)
        }
    }
    const logoutRedirect = () => {
        navigate("/login")
    }

    //goes to the user's profile
    const onProfileView = async () => {
        navigate("/profile")
    }


    return (
        <Container className="d-flex flex-column align-items-center" style={{ minHeight: "100vh", marginTop: "40px" }}>
            <h1>Pixel Pundits: The App</h1>
            <UserSearch />
            {/* <Button
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
            </Button> */}
        </Container>
    )
}