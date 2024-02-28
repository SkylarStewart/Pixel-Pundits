//contexts are used by react to pass data 'globally' instead of passing data 
//using props from parent to child. This is useful when dealing with backend stuff,
//so that's why i'm using it here :).

//copied from https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/ since there's no need to create your own version of something so universal

import { createContext, useState } from 'react'
import { App, Credentials } from "realm-web"
import { APP_ID } from '../realm/constants'

//creating a Realm App instance
const app = new App(APP_ID)
console.log(app);

//creating a user context to manage and access all the user-related functions
//think of this as the user's 'profile'
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to log in user into our App Service app using their email & password
    const emailPasswordLogin = async (email, password) => {
        const credentials = Credentials.emailPassword(email, password);
        const authenticatedUser = await app.logIn(credentials);
        setUser(authenticatedUser);
        return authenticatedUser;
    };

    // Function to sign up user into our App Service app using their email & password
    const emailPasswordSignup = async (email, password) => {
        console.log('started this!!!');
        try {
            await app.emailPasswordAuth.registerUser(email, password);
            // Since we are automatically confirming our users, we are going to log in
            // the user using the same credentials once the signup is complete.
            return emailPasswordLogin(email, password);
        } catch (error) {
            console.log('caught this disgusting error...')
            throw error;
        }
    };

    // Function to fetch the user (if the user is already logged in) from local storage
    const fetchUser = async () => {
        if (!app.currentUser) return false;
        try {
            await app.currentUser.refreshCustomData();
            // Now, if we have a user, we are setting it to our user context
            // so that we can use it in our app across different components.
            setUser(app.currentUser);
            return app.currentUser;
        } catch (error) {
            throw error;
        }
    }

    // Function to logout user from our App Services app
    const logOutUser = async () => {
        if (!app.currentUser) return false;
        try {
            await app.currentUser.logOut();
            // Setting the user to null once loggedOut.
            setUser(null);
            return true;
        } catch (error) {
            throw error
        }
    }

    return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser }}>
        {children}
    </UserContext.Provider>;
}