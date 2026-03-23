import { jwtDecode } from "jwt-decode";

type JwtPayloadWithExp = { exp?: number };

export function isAuthenticatedToken(): boolean {
    if (typeof window === "undefined") return false;

    const token = localStorage.getItem("authToken");
    if (!token) return false;

    try {
        const decoded = jwtDecode<JwtPayloadWithExp>(token);
        const currentTime = Date.now() / 1000;

        if (!decoded.exp || decoded.exp < currentTime) {
            localStorage.removeItem("authToken");
            return false;
        }
        return true;
    } catch {
        localStorage.removeItem("authToken");
        return false;
    }
}




