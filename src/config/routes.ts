const routes = {
  AUTH: {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
  },
  CUSTOMER: {
    HOME: "/",
    BOOK_DETAIL: "/book/:bookId",
    CART: "/checkout/cart",
    CHECKOUT: "/checkout/payment",
    PURCHASE: "/customer/purchase",
    ORDER_DETAIL: "/customer/purchase/:orderId",
    ACCOUNT_PROFILE: "/customer/account/profile",
    ACCOUNT_ADDRESS: "/customer/account/address",
    CHANGE_PASSWORD: "/customer/account/password",
  },
  ADMIN: {
    DASHBOAD: "/dashboad",
    ORDER: "/portal/order",
    PRODUCT: "/portal/book",
    ADD_PRODUCT: "/portal/book/new",
    PRODUCT_DETAIL: "/portal/book/:bookId",
    REVIEW: "/portal/rating",
    BOOK_REPORT: "/datacenter/book/overview",
    INCOME_REPORT: "/datacenter/income/overview",
    ACCOUNT_PROFILE: "/admin/account/profile",
    CHANGE_PASSWORD: "/admin/account/password",
    CUSTOMER: "/admin/customer",
  },
};
export default routes;
