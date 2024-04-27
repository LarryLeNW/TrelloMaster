import {
    LightMode as LightModeIcon,
    DarkModeOutlined as DarkModeIcon,
    SettingsBrightness as SettingIcon,
} from "@mui/icons-material";

import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    useColorScheme,
} from "@mui/material";

function ModeSelect() {
    const { mode, setMode } = useColorScheme();
    const handleChange = (event) => {
        setMode(event.target.value);
    };

    return (
        <FormControl size="small" sx={{ minWidth: "120px" }}>
            <InputLabel
                id="label-select-dark-light-mode"
                sx={{ color: "white", "&.Mui-focused": { color: "white" } }}
            >
                Mode
            </InputLabel>
            <Select
                labelId="label-select-dark-light-mode"
                id="select-dark-light-mode"
                value={mode}
                label="Mode"
                onChange={handleChange}
                sx={{
                    color: "white",
                    ".MuiOutlinedInput-notchedOutline": { color: "white" },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        color: "white",
                    },
                    ".MuiSvgIcon-root": { color: "white" },
                }}
            >
                <MenuItem value="light">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <LightModeIcon />
                        Light
                    </Box>
                </MenuItem>
                <MenuItem value="dark">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <DarkModeIcon />
                        Dark
                    </Box>
                </MenuItem>
                <MenuItem value="system">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                        }}
                    >
                        <SettingIcon />
                        System
                    </Box>
                </MenuItem>
            </Select>
        </FormControl>
    );
}

export default ModeSelect;
