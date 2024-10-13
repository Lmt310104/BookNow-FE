import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
  // LoaderFunctionArgs,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useMemo } from "react";

import { routes } from "@/config";

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: routes.AUTH.SIGN_IN,
      lazy: async () => {
        const { SignInRoute } = await import("./routes/auth/sign-in");
        return { Component: SignInRoute };
      },
    },
    {
      path: routes.AUTH.SIGN_UP,
      lazy: async () => {
        const { SignUpRoute } = await import("./routes/auth/sign-up");
        return { Component: SignUpRoute };
      },
    },
    {
      path: routes.AUTH.FORGOT_PASSWORD,
      lazy: async () => {
        const { ForgotPasswordRoute } = await import(
          "./routes/auth/forgot-password"
        );
        return { Component: ForgotPasswordRoute };
      },
    },
    {
      path: routes.AUTH.RESET_PASSWORD,
      lazy: async () => {
        const { ResetPasswordRoute } = await import(
          "./routes/auth/reset-password"
        );
        return { Component: ResetPasswordRoute };
      },
    },
    {
      path: routes.CUSTOMER.HOME,
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing");
        return { Component: LandingRoute };
      },
    },
    {
      path: routes.CUSTOMER.ACCOUNT_ADDRESS,
      lazy: async () => {
        const { AccountAddressRoute } = await import(
          "./routes/customers/account-address"
        );
        return { Component: AccountAddressRoute };
      },
    },
    {
      path: routes.CUSTOMER.ACCOUNT_PROFILE,
      lazy: async () => {
        const { AccountProfileRoute } = await import(
          "./routes/customers/account-profile"
        );
        return { Component: AccountProfileRoute };
      },
    },
    {
      path: routes.CUSTOMER.BOOK_DETAIL,
      lazy: async () => {
        const { BookDetailRoute } = await import(
          "./routes/customers/book-detail"
        );
        return { Component: BookDetailRoute };
      },
    },
    {
      path: routes.CUSTOMER.CART,
      lazy: async () => {
        const { CartRoute } = await import("./routes/customers/cart");
        return { Component: CartRoute };
      },
    },
    {
      path: routes.CUSTOMER.CHANGE_PASSWORD,
      lazy: async () => {
        const { AccountPasswordRoute } = await import(
          "./routes/customers/account-password"
        );
        return { Component: AccountPasswordRoute };
      },
    },
    {
      path: routes.CUSTOMER.CHECKOUT,
      lazy: async () => {
        const { CheckOutRoute } = await import("./routes/customers/checkout");
        return { Component: CheckOutRoute };
      },
    },
    {
      path: routes.CUSTOMER.ORDER_DETAIL,
      lazy: async () => {
        const { OrderDetailRoute } = await import(
          "./routes/customers/order-detail"
        );
        return { Component: OrderDetailRoute };
      },
    },
    {
      path: routes.CUSTOMER.PURCHASE,
      lazy: async () => {
        const { PurchaseRoute } = await import("./routes/customers/purchase");
        return { Component: PurchaseRoute };
      },
    },
    {
      path: routes.ADMIN.ACCOUNT_PROFILE,
      lazy: async () => {
        const { AdminProfileRoute } = await import(
          "./routes/admin/account-profile"
        );
        return { Component: AdminProfileRoute };
      },
    },
    {
      path: routes.ADMIN.ADD_PRODUCT,
      lazy: async () => {
        const { AddProductRoute } = await import("./routes/admin/add-product");
        return { Component: AddProductRoute };
      },
    },
    {
      path: routes.ADMIN.BOOK_REPORT,
      lazy: async () => {
        const { BookReportRoute } = await import("./routes/admin/book-report");
        return { Component: BookReportRoute };
      },
    },
    {
      path: routes.ADMIN.DASHBOAD,
      lazy: async () => {
        const { DashboardRoute } = await import("./routes/admin/dashboard");
        return { Component: DashboardRoute };
      },
    },
    {
      path: routes.ADMIN.INCOME_REPORT,
      lazy: async () => {
        const { IncomeReportRoute } = await import(
          "./routes/admin/income-report"
        );
        return { Component: IncomeReportRoute };
      },
    },
    {
      path: routes.ADMIN.ORDER,
      lazy: async () => {
        const { OrderRoute } = await import("./routes/admin/order");
        return { Component: OrderRoute };
      },
    },
    {
      path: routes.ADMIN.PRODUCT,
      lazy: async () => {
        const { ProductRoute } = await import("./routes/admin/product");
        return { Component: ProductRoute };
      },
    },
    {
      path: routes.ADMIN.CHANGE_PASSWORD,
      lazy: async () => {
        const { AdminPasswordRoute } = await import(
          "./routes/admin/account-password"
        );
        return { Component: AdminPasswordRoute };
      },
    },
    {
      path: routes.ADMIN.PRODUCT_DETAIL,
      lazy: async () => {
        const { ProductDetailRoute } = await import(
          "./routes/admin/product-detail"
        );
        return { Component: ProductDetailRoute };
      },
    },
    {
      path: routes.ADMIN.REVIEW,
      lazy: async () => {
        const { ReviewRoute } = await import("./routes/admin/review");
        return { Component: ReviewRoute };
      },
    },
    {
      path: routes.ADMIN.CUSTOMER,
      lazy: async () => {
        const { CustomerRoute } = await import("./routes/admin/customer");
        return { Component: CustomerRoute };
      },
    },
    {
      path: "*",
      lazy: async () => {
        const { NotFoundRoute } = await import("./routes/not-found");
        return { Component: NotFoundRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
