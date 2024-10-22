import {createContext} from "react";
import {Credentials} from "google-auth-library";

export type GoogleOAuthContextType = {
    login: () => void;
    credentials?: Credentials;
    specifiedScopes: string[];
}

export const GoogleOAuthContext = createContext<GoogleOAuthContextType>({
    login: () => {},
    specifiedScopes: [],
});