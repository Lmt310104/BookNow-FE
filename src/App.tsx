import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import AuthLayout from "./layouts/AuthLayout/AuthLayout";
import SignInPage from "./pages/AuthPage/SignInPage/SignInPage";
import SignUpPage from "./pages/AuthPage/SignUpPage/SignUpPage";
import ForgotPassword from "./pages/AuthPage/ForgotPasswordPage/ForgotPasswordPage";
const allRouter = [ 
  {
    path: "/",
    children: [
      {index: true, element: <HomePage />, isPrivate: false},
      {
        path: "auth", 
        element: <AuthLayout />,
        children:[
          { index: true, element: <SignInPage />, isPrivate: false },
          { path: "sign-in", element: <SignInPage />, isPrivate: false}, 
          { path: "sign-up", element: <SignUpPage />, isPrivate: false},
          { path: "forgot-password", element: <ForgotPassword />, isPrivate: false}
        ]
      }
    ]
  }
]

function App() {
  const router = createBrowserRouter(allRouter);
  return <RouterProvider router={router} />;
}

export default App;
