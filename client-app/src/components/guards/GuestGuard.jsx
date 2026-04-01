import useAuth from "../../hooks/useAuth";
import { Navigate } from "react-router";
import { Outlet } from "react-router";

export default function GuestGuard() {

    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return false
        
    }

    return <Outlet />
}