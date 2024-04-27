import { Outlet } from "react-router-dom";
import AppBoard from "./AppBoard";

function UserLayout() {
    return (
        <>
            <AppBoard />
            <Outlet />
        </>
    );
}

export default UserLayout;
