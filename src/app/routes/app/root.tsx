import { DefaultLayout } from "@/components/layouts/default-layout";
import { useLocation, Outlet } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export const AppRoot = () => {
    const location = useLocation();
    return (
        <DefaultLayout>
            <Suspense
                fallback={
                <div className="flex size-full items-center justify-center">
                    <Spinner size="xl" />
                </div>
                }
            >
                <ErrorBoundary
                    key={location.pathname}
                    fallback={<div>Something went wrong!</div>}
                >
                    <Outlet />
                </ErrorBoundary>
            </Suspense>
        </DefaultLayout>
    )
}