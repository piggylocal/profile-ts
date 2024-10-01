type NavItemConfig = {
    value: string,
    to: string,
    requiresAdmin?: boolean,
}
type NavConfig = {
    items: NavItemConfig[],
}

const navConfig: NavConfig = {
    items: [
        {value: "Notes", to: "/"},
        {value: "Profile", to: "/profile"},
        {value: "Login", to: "/login", requiresAdmin: false},
        {value: "Admin", to: "/admin", requiresAdmin: true},
    ],
};

export type {NavItemConfig, NavConfig};
export {navConfig};