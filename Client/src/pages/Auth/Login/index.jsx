import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from "antd";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfoRequest, loginRequest } from "src/redux/slicers/auth.slice";
import { toast } from "react-toastify";
import { ROUTES } from "src/constants/routes";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.auth.userInfo);

    const [loginForm] = Form.useForm();

    useEffect(() => {
        document.title = "Login - TaskMaster";
        const id = localStorage.getItem("token");
        if (id) {
            dispatch(
                getUserInfoRequest({
                    data: { id },
                    callback: (user) => {
                        if (user?.roleId) navigate(ROUTES.USER.BOARD);
                    },
                })
            );
        }
    }, []);

    useEffect(() => {
        if (error) {
            toast.error("User account or password incorrect !!!");
            loginForm.setFields([
                {
                    name: "username",
                    errors: [" "],
                },
                {
                    name: "password",
                    errors: [error],
                },
            ]);
        }
    }, [error]);

    const handleSubmit = (values) => {
        dispatch(
            loginRequest({
                data: values,
                callback: (user) => {
                    if (user) {
                        navigate(ROUTES.USER.BOARD);
                    }
                },
            })
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: "500px",
                    border: "1px solid blue",
                    padding: "2rem",
                    borderRadius: "5px",
                    backgroundColor: "whitesmoke",
                    position: "relative",
                }}
            >
                <Button
                    style={{ position: "absolute", top: "1rem", right: "1rem" }}
                    danger
                    onClick={() => {
                        navigate(ROUTES.REGISTER);
                    }}
                >
                    Đăng kí
                </Button>

                <Box
                    sx={{
                        textAlign: "center",
                        color: "blue",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h2>Login</h2> <VerifiedUserIcon />
                </Box>
                <Form
                    form={loginForm}
                    name="loginForm"
                    layout="vertical"
                    onFinish={(values) => handleSubmit(values)}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div
                        style={{
                            marginBottom: 16,
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    ></div>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                    >
                        Đăng nhập
                    </Button>
                </Form>
            </Box>
        </Box>
    );
}

export default Login;
