type NavItemConfig = {
    value: string,
    to: string,
    requiresAdmin: boolean,
}
type NavConfig = {
    items: NavItemConfig[],
}

const navConfig: NavConfig = {
    items: [
        {value: "Notes", to: "/", requiresAdmin: false},
        {value: "Profile", to: "/profile", requiresAdmin: false},
        {value: "Photo", to: "/photo", requiresAdmin: false},
        {value: "Wordle+", to: "https://wordle-plus.netlify.app/", requiresAdmin: false},
        {value: "Login", to: "/login", requiresAdmin: false},
        {value: "Admin", to: "/admin", requiresAdmin: true},
    ],
};

export type {NavItemConfig, NavConfig};
export {navConfig};