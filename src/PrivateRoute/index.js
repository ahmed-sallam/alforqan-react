import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Route, useNavigate, Redirect } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase';
import Login from '../Login';
function Index({ children, ...rest }) {
    const navigate = useNavigate();
    const [user, setUSer] = useState(null)



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUSer(user)
                //     console.log("mid auth", user);
                //     console.log("mid auth", userType, uid, user);

                // if (userType !== "admin") {
                //     navigate("/dash/students", { state: { userType, uid } })
                // }
            } else {
                navigate("/login")
            }
        })
    }, [])

    return (
        <Route {...rest}>
            {
                true ? children : <Redirect to="/login" />
            }
        </Route>
    )
}


export default Index
