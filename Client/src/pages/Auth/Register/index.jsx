import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Box } from "@mui/material";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "src/constants/routes";
import { loginRequest, registerRequest } from "src/redux/slicers/auth.slice";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading } = useSelector((state) => state.auth.register);

    const [registerForm] = Form.useForm();

    useEffect(() => {
        document.title = "Register - TaskMaster";
    }, []);

    useEffect(() => {
        if (error) {
            toast.error("User account or password incorrect !!!");
            registerForm.setFields([
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
        const { confirmPassword, ...dataSubmit } = values;
        dispatch(
            registerRequest({
                data: dataSubmit,
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
                    style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        background: "blue",
                        color: "white",
                    }}
                    onClick={() => {
                        navigate(ROUTES.LOGIN);
                    }}
                >
                    Đăng nhập
                </Button>

                <Box
                    sx={{
                        textAlign: "center",
                        color: "red",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h2>Đăng kí</h2> <VerifiedUserIcon />
                </Box>
                <Form
                    form={registerForm}
                    name="registerForm"
                    layout="vertical"
                    onFinish={(values) => handleSubmit(values)}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Họ và tên"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Họ và tên là bắt buộc",
                            },
                            {
                                type: "string",
                                min: 3,
                                max: 20,
                                message: "Họ và tên phải từ 3-20 kí tự",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Email là bắt buộc",
                            },
                            {
                                type: "email",
                                message: "Email không đúng định dạng",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Mật khẩu là bắt buộc",
                            },
                            {
                                type: "string",
                                min: 3,
                                max: 20,
                                message: "Mật khẩu phải từ 3-20 kí tự",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Xác nhận mật khẩu"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            {
                                required: true,
                                message: "Xác nhận mật khẩu là bắt buộc",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Xác nhận mật khẩu không khớp"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                    >
                        Đăng ký
                    </Button>
                </Form>
            </Box>
        </Box>
    );
}

export default Register;
