import React from "react";


const Login = () => {
    return (
        <>  
            <img src="https://www.shutterstock.com/image-vector/cute-crocodile-business-holding-suitcase-600nw-2223279211.jpg"
                width="200"
                height="200"
                style={{ width: 100, height: 100, position: 'fixed', left: 0, top: 0 }} />

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