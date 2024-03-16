import React from "react";
import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user.context";

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
        <>
            <h1>Sign Up to Pixel Pundits</h1>
            <div>

                <p>email</p>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onFormInputChange} />

                <p>username</p>
                <input
                    type="username"
                    name="username"
                    value={form.username}
                    onChange={onFormInputChange} />

                <p>password</p>
                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={onFormInputChange} />
            </div>
            <Button
                variant="contianed"
                color="primary"
                onClick={onSubmit}>
                Sign Up
            </Button>
            <p>Have an account already? <Link to="/login">Login</Link></p>
        </>
    );
}