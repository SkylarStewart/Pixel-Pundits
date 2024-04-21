//wrapper that will only allow authenticated users to access our application's private pages.
//think of private pages as profile settings, profile info, etc etc.


//copied from https://www.mongodb.com/developer/products/atlas/email-password-authentication-react/ since there's no need to create your own version of something so universal

import { useContext, React } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UserContext } from "../contexts/user.context"

const PrivateRoute = () => {

    //fetching the user from the user context
    const { user } = useContext(UserContext);
    const location = useLocation();
    //redirection if the user isnt logged in. This is what keeps our stuff private :)
    const redirectLoginUrl = `/login?redirectTo=${encodeURI(location.pathname)}`;



    return !user ? <Navigate to={redirectLoginUrl} /> : <Outlet />;


}

export default PrivateRoute;