import { QueryClient, useQueryClient } from "@tanstack/react-query";
import {
    // LoaderFunctionArgs,
    RouterProvider,
    createBrowserRouter
} from 'react-router-dom'; 
import { useMemo } from "react";

import { AppRoot } from './routes/app/root';
import { routes } from "@/config";


export const createAppRouter = (queryClient: QueryClient) =>
    createBrowserRouter([
      {
        path: routes.HOME,
        lazy: async () => {
          const { LandingRoute } = await import('./routes/landing');
          return { Component: LandingRoute };
        },
      },
      {
        path: routes.AUTH.SIGN_IN,
        lazy: async () => {
          const { SignInRoute } = await import('./routes/auth/sign-in');
          return { Component: SignInRoute };
        },
      },
      {
        path: routes.AUTH.SIGN_UP,
        lazy: async () => {
          const { SignUpRoute } = await import('./routes/auth/sign-up');
          return { Component: SignUpRoute };
        },
      },
      {
        path: routes.AUTH.FORGOT_PASSWORD,
        lazy: async () => {
          const { ForgotPasswordRoute } = await import('./routes/auth/forgot-password');
          return { Component: ForgotPasswordRoute };
        },
      },
      {
        path: '/app',
        element: (
          // <ProtectedRoute>
            <AppRoot />
          // </ProtectedRoute>
        ),
      }
      //   children: [
      //     {
      //       path: 'discussions',
      //       lazy: async () => {
      //         const { DiscussionsRoute } = await import(
      //           './routes/app/discussions/discussions'
      //         );
      //         return { Component: DiscussionsRoute };
      //       },
      //       loader: async (args: LoaderFunctionArgs) => {
      //         const { discussionsLoader } = await import(
      //           './routes/app/discussions/discussions'
      //         );
      //         return discussionsLoader(queryClient)(args);
      //       },
      //     },
      //   ],
      // },
      ,
      {
        path: '*',
        lazy: async () => {
          const { NotFoundRoute } = await import('./routes/not-found');
          return { Component: NotFoundRoute };
        },
      },
    ]);
  
  export const AppRouter = () => {
    const queryClient = useQueryClient();
  
    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  
    return <RouterProvider router={router} />;
  };
  