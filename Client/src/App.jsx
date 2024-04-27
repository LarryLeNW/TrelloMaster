import { ROUTES } from "./constants/routes";
import UserLayout from "./layouts/UserLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import BoardDetail from "./pages/Boards/_id";
import Home from "./pages/Boards/index";
import { Route, Routes } from "react-router-dom";
function App() {
    return (
        <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.USER.HOME} element={<Login />} />
            <Route element={<UserLayout />}>
                <Route path={ROUTES.USER.BOARD} element={<Home />} />
                <Route
                    path={ROUTES.USER.BOARD_DETAIL}
                    element={<BoardDetail />}
                />
            </Route>
            <Route path={"*"} element={<Login />} />
        </Routes>
    );
}

export default App;
