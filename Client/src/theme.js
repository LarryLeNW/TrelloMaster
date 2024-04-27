import { experimental_extendTheme } from "@mui/material";

// initialize css variable styles
const appBarHeight = "58px";
const boardBarHeight = "60px";
const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

const theme = experimental_extendTheme({
    custom: {
        appBarHeight,
        boardBarHeight,
        contentHeight: `calc(100vh - ${appBarHeight} - ${boardBarHeight})`,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    },
    colorSchemes: {
        light: {
            // palette: { primary: teal, secondary: deepOrange },
        },
        dark: {
            // palette: { primary: cyan, secondary: orange },
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "*::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "*::-webkit-scrollbar-thumb": {
                        backgroundColor: "#dcdde1",
                        borderRadius: "8px",
                    },
                    "*::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "white",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: { textTransform: "none" },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({ color: theme.palette.primary.main }),
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: "0.875rem",
                    "& fieldset": { borderWidth: "0.5px !important" },
                    "&:hover fieldset": { borderWidth: "1px !important" },
                    "&.Mui-focused fieldset": { borderWidth: "1px !important" },
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: { "&.MuiTypography-body1": { fontSize: "0.875rem" } },
            },
        },
    },
});

export default theme;
