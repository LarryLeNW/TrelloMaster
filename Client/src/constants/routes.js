export const ROUTES = {
    USER: {
        HOME: "/",
        BOARD: "/board",
        BOARD_DETAIL: "/board/details/:id",
        PRODUCT_LIST: "/products",
        PRODUCT_DETAIL: "/products/details/:id",
        CART: "/cart",
        CHECKOUT: "/checkout",
        // profile
        PROFILE: "/profile",
        USER_INFO: "/profile/user-info",
        ORDER_HISTORY: "/profile/order-history",
        CHANGE_PASSWORD: "/profile/change-password",
        EXTERNAL_AUTH_SUCCESS: "/login-success/:_id/:tokenLogin",
    },
    ADMIN: {
        DASHBOARD: "/admin/dashboard",
        USER_MANAGEMENT: "/admin/user-manament",
        PRODUCT_MANAGEMENT: "/admin/product-manament/:category",
        POST_MANAGEMENT: "admin/post-management",
    },
    CONTACT: "/contact",
    POST: "/post",
    LOGIN: "/login",
    REGISTER: "/register",
    RESET_PASSWORD: "/reset-password/:token",
    FORGOT_PASSWORD: "/forgot-password",
};
