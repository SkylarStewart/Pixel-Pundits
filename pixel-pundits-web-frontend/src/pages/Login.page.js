import { useContext, useEffect, useState, React } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { Row, Col, Button, Container } from "react-bootstrap";
import BackgroundPattern from '../Images/BackgroundPattern.png'

//login page
//the backend glue part was copied from https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/ :)

export default function Login() {

    const navigate = useNavigate();
    const location = useLocation();

    //We are consuming our user-management context to
    //get & set the user details here
    const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);


    //keeping track of the form values for email and password as the user fills it out
    const [form, setForm] = useState({
        email: "",
        password: "",
    })


    //fuction that will be called whenever the user edits the form
    const onFormInputChange = (event) => {
        const { name, value } = event.target
        setForm({ ...form, [name]: value });
    }

    //function that will redirect the user to the appropriate page once auth is complete.
    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }


    // Once a user logs in to our app, we don’t want to ask them for their
    // credentials again every time the user refreshes or revisits our app, 
    // so we are checking if the user is already logged in and
    // if so we are redirecting the user to the home page.
    // Otherwise we will do nothing and let the user to login.

    const loadUser = async () => {
        if (!user) {
            const fetchedUser = await fetchUser();
            if (fetchedUser) {
                redirectNow();
            }
        }
    }

    //useEffect hok that will only run when the component is mounted
    //this helps us verify whether the user is already logged in or not.
    //runs every time the login page is rendered.

    useEffect(() => {
        loadUser();
    }, []);

    //function that's fired ever time the user clicks on the "login" button
    const onSubmit = async (event) => {

        try {
            const user = await emailPasswordLogin(form.email, form.password);
            if (user) {
                redirectNow();
            }
        }

        catch (error) {
            if (error.statusCode === 401) {
                alert("Invalid username/password. Please check to make sure your entry is valid.");
            }
            else {
                alert(error);
            }
        }
    };


    //page rendering (hooking in to the components we have defined above.)
    return (
        <div className="body-background">
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Container className="text-center p-4" style={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                }}>
                    <h1>Log in to Pixel Pundits</h1>
                    <div className="form-group" style={{ textAlign: 'left', marginBottom: '10px' }}>
                        <label htmlFor="email" style={{ marginBottom: '5px' }}>Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="form-control"
                            value={form.email}
                            onChange={onFormInputChange}
                        />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left', marginBottom: "18px" }}>
                        <label htmlFor="password" style={{ marginBottom: '5px' }}>Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            onChange={onFormInputChange} />
                    </div>
                    <Button
                        variant="primary"
                        onClick={onSubmit}
                        style={{ marginBottom: '10px' }}>
                        Log In
                    </Button>
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </Container>
            </Container>
        </div>

    );
}