import React from 'react';

const AuthButton = () => {
    const google_auth = () => {
        window.location.replace("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&redirect_uri=http://localhost:3000/auth/oauth&client_id=545651915476-dqk40tcpn6pdodoghvjhtkf85g8gf0o0.apps.googleusercontent.com");
    }

    return (
        <div>
            <button onClick={google_auth}>Войти с помощью google</button>
        </div>
    );
};

export default AuthButton;