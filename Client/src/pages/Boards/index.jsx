import { Box, CircularProgress, Dialog, DialogTitle } from "@mui/material";
import { Button, Card, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "src/constants/routes";
import { createBoardRequest } from "src/redux/slicers/board.slice";

function Home() {
    const dispatch = useDispatch();
    const [isOpenFormCreate, setIsOpenFormCreate] = useState(false);
    const navigate = useNavigate();
    const [loginForm] = Form.useForm();
    const { data, loading, error } = useSelector((state) => state.board.board);
    const userInfo = useSelector((state) => state.auth.userInfo.data);
    console.log("🚀 ~ Home ~ userInfo:", userInfo);

    useEffect(() => {
        document.title = `${userInfo?.username} - TaskMaster`;
    }, []);
    const [typeNewBoard, setTypeNewBoard] = useState("private");

    const handleClickOpen = () => {
        setIsOpenFormCreate(true);
    };

    const handleClose = () => {
        setIsOpenFormCreate(false);
    };

    const handleCreateBoard = (values) => {
        dispatch(
            createBoardRequest({
                values: {
                    ...values,
                    type: typeNewBoard,
                    userId: userInfo._id,
                },
                callback: () => {
                    toast.success("Create board successfully");
                },
            })
        );
    };

    return (
        <Box
            sx={{
                display: "flex",
                height: "90vh",
            }}
        >
            <Box
                sx={{
                    borderRight: "1px solid blue",
                    padding: "1rem",
                }}
            >
                <Button variant="outlined" onClick={handleClickOpen}>
                    Create New Board
                </Button>
                <Dialog onClose={handleClose} open={isOpenFormCreate}>
                    <DialogTitle>Create Board</DialogTitle>
                    <Form
                        style={{
                            width: "500px",
                            padding: "16px",
                        }}
                        onFinish={handleCreateBoard}
                        form={loginForm}
                    >
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter title ...!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description ...!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Box sx={{ mb: 2 }}>
                            <b>Select Type : {"   "}</b>
                            <select
                                onChange={(e) =>
                                    setTypeNewBoard(e.target.value)
                                }
                            >
                                <option
                                    style={{ padding: "1rem" }}
                                    value="private"
                                >
                                    Private
                                </option>
                                <option
                                    style={{ padding: "1rem" }}
                                    value="public"
                                >
                                    Public
                                </option>
                            </select>
                        </Box>

                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            Create
                        </Button>
                    </Form>
                </Dialog>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    padding: 2,
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                        }}
                    >
                        <CircularProgress color="success" size={"10%"} />
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            height: "100%",
                            gap: 2,
                        }}
                    >
                        {data?.map((board) => (
                            <Card
                                onClick={() => {
                                    navigate(
                                        generatePath(ROUTES.USER.BOARD_DETAIL, {
                                            id: board._id,
                                        })
                                    );
                                }}
                                title={board.title}
                                bordered
                                extra={<em>{board.type}</em>}
                                style={{
                                    width: 300,
                                    maxHeight: 200,
                                    overflow: "auto",
                                    cursor: "pointer",
                                    border: "1px solid black",
                                }}
                            >
                                <p>
                                    <b>Description :</b> {board.description}
                                </p>
                                <em>
                                    {board.createAt &&
                                        new Date(
                                            board.createAt
                                        ).toLocaleDateString()}
                                </em>
                            </Card>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default Home;
