import React from "react";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Signup() {
    const navigate = useNavigate();
    const location = useLocation();

    // As explained in the Login page.
    const { emailPasswordSignup } = useContext(UserContext);
    const [form, setForm] = useState({
        email: "",
        password: "",
        username: "",
    });

    // As explained in the Login page.
    const onFormInputChange = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    };


    // As explained in the Login page.
    const redirectNow = () => {
        const redirectTo = location.search.replace("?redirectTo=", "");
        navigate(redirectTo ? redirectTo : "/");
    }

    // As explained in the Login page.
    const onSubmit = async () => {
        try {
            const user = await emailPasswordSignup(form.email, form.password, form.username);
            if (user) {
                redirectNow();
            }
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="body-background">

            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Container Container className="text-center p-4" style={{
                    width: "100%",
                    maxWidth: "400px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
                }}>
                    <h1>Sign Up for Pixel Pundits</h1>
                    <div>

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
                            <label htmlFor="username" style={{ marginBottom: '5px' }}>Username</label>
                            <input
                                id="username"
                                type="username"
                                name="username"
                                className="form-control"
                                value={form.username}
                                onChange={onFormInputChange} />
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
                    </div>
                    <Button
                      variant="primary"
                      onClick={onSubmit}
                      style={{ marginBottom: '10px' }}>
                      Sign Up
                    </Button>
                    <p>Have an account already? <Link to="/login">Log in</Link></p>
                </Container>
            </Container>
        </div>
    );
}