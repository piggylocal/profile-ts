import React from "react";
import {useGoogleLogin} from "@react-oauth/google";
import {Credentials} from "google-auth-library";
import axios from "axios";
import {useLocalStorage} from "@uidotdev/usehooks";

import {GoogleOAuthContext} from "../contexts/googleOAuthContext";
import {
    areCredentialsValidMaybeExpired,
    hasExpired,
} from "../managers/googleOAuth";

const GoogleOAuthWrapper = ({children, specifiedScopes}: {
    children: React.ReactNode,
    specifiedScopes: string[],
}) => {
    const [credentials, setCredentials] = useLocalStorage<Credentials | undefined>("google-credentials", undefined);

    const googleLogin = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async codeResponse => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API}/auth/google`, {
                    code: codeResponse.code,
                });
                setCredentials(response.data);
            } catch (error) {
                console.error(error);
            }
        },
        onError: errorResponse => console.error(errorResponse),
        scope: specifiedScopes.join(" "),
    });

    const googleRefreshTokens = async () => {
        if (!credentials) {
            return;
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_API}/auth/google/refresh-token`, {
                refreshToken: credentials.refresh_token,
            });
            setCredentials(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const login = () => {
        if (!credentials || !areCredentialsValidMaybeExpired(credentials, specifiedScopes)) {
            googleLogin();
            return;
        }
        if (hasExpired(credentials)) {
            void googleRefreshTokens();
            return;
        }
        // Do nothing if the credentials are valid.
    };

    return (
        <GoogleOAuthContext.Provider value={{login, credentials, specifiedScopes}}>
            {children}
        </GoogleOAuthContext.Provider>
    )
}

export default GoogleOAuthWrapper;