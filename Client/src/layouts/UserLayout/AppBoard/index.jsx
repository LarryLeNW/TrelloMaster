import {
    Badge,
    Box,
    Button,
    InputAdornment,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import ModeSelect from "src/components/ModeSelect";
import {
    Apps as AppsIcon,
    Close,
    SearchOff,
    SearchOffOutlined,
} from "@mui/icons-material";
import WorkSpaces from "./Menus/WorkSpaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Profiles from "./Menus/Profiles";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "src/constants/routes";

function AppBoard() {
    const navigate = useNavigate();
    const { data } = useSelector((state) => state.auth.userInfo);
    console.log("🚀 ~ AppBoard ~ data:", data);

    useEffect(() => {
        if (!data) {
            console.log("🚀 ~ useEffect ~ data :", data);
            navigate(ROUTES.LOGIN);
        }
    }, []);

    console.log("🚀 ~ AppBoard ~ userInfo:", data);

    const [searchValue, setSearchValue] = useState("");
    return (
        <Box
            sx={{
                width: "100%",
                height: (theme) => theme.custom.appBarHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                overflowX: "auto",
                paddingX: 2,
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AppsIcon sx={{ color: "white" }} />
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "white",
                    }}
                >
                    <div> Icon</div>
                    <Typography variant="span">Trello</Typography>
                </Box>

                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                    <WorkSpaces />
                    <Recent />
                    <Starred />
                    <Templates />
                    <Button
                        variant="outlined"
                        sx={{ border: "none", color: "white" }}
                    >
                        Create
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                    id="outlined-search"
                    label="Search ..."
                    type="text"
                    size="small"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <Close
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => setSearchValue("")}
                                />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        minWidth: "120px",
                        maxWidth: "180px",
                        "& label.Mui-focused": { color: "white" },
                        "& input": { color: "white" },
                        "& label": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "white" },
                            "&:hover fieldset": { borderColor: "white" },
                            "&:Mui-focused fieldset": { borderColor: "white" },
                        },
                    }}
                ></TextField>
                <ModeSelect />
                <Tooltip title="Notifications">
                    <Badge
                        color="warning"
                        variant="dot"
                        sx={{ cursor: "pointer" }}
                    >
                        <NotificationsActiveIcon sx={{ color: "white" }} />
                    </Badge>
                </Tooltip>

                <Tooltip title="Help">
                    <HelpOutlineOutlinedIcon sx={{ color: "white" }} />
                </Tooltip>

                <Profiles />
            </Box>
        </Box>
    );
}

export default AppBoard;
