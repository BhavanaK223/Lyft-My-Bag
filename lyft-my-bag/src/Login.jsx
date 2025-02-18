import React from "react";


const Login = () => {
    return (
        <>

            <h1>Please Login with your GatorLink Credentials</h1>
            <form>
                <label htmlFor="fname">Gatorlink Username:</label><br />
                <input type="text" id="fname" name="fname" /><br />
                <label htmlFor="lname">Password:</label><br />
                <input type="text" id="lname" name="lname" /><br />
                <input type="submit" value="Login" />
            </form>
        </>
    )
}
export default Login