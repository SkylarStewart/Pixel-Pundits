/*
This page is going to be the page that displays the user's profile.
The plan is that, from here, users can see there profile info, make changes,
add and remove cards from their trade binder, and see trade history.
*/

import {useEffect, React, useState, useContext} from "react";
import { UserContext } from "../contexts/user.context";
import { Button } from "@mui/material";

export default function Profile() {

    const { user } = useContext(UserContext);

    return (
        <>
        <h1>User Profile</h1>
        <p>user email: {user._profile.data.email}</p>
        </>
    );
}