import {Credentials} from "google-auth-library";

export function hasExpired(credentials: Credentials): boolean {
    return Boolean(credentials.expiry_date && credentials.expiry_date <= Date.now());
}

export function hasRequiredProperties(credentials: Credentials): boolean {
    return Boolean(credentials.access_token && credentials.refresh_token && credentials.expiry_date);
}

export function containsScopes(credentials: Credentials, scopes: string[]): boolean {
    if (!credentials.scope) {
        return false;
    }
    const credentialScopes = credentials.scope.split(" ");
    return scopes.every(scope => credentialScopes.includes(scope));
}

export function areCredentialsValidMaybeExpired(credentials: Credentials, scopes: string[]): boolean {
    return hasRequiredProperties(credentials) && containsScopes(credentials, scopes);
}

export function areCredentialsValid(credentials: Credentials, scopes: string[]): boolean {
    return areCredentialsValidMaybeExpired(credentials, scopes) && !hasExpired(credentials);
}