const imgurTokenKey = "imgur-token";

export function getImgurToken(): string | null {
    return localStorage.getItem(imgurTokenKey);
}

export function setImgurToken(token: string): void {
    localStorage.setItem(imgurTokenKey, token);
}

export function removeImgurToken(): void {
    localStorage.removeItem(imgurTokenKey);
}