import { queryConfig } from '@/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { Spinner } from '@/components/ui/spinner';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { MainErrorFallback } from '@/components/errors/main';



type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => { 
    const [queryClient] = React.useState(()=> new QueryClient({
        defaultOptions: queryConfig,
    }));
    return (
        <React.Suspense
            fallback = {
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner size="xl" />
                </div>
            }
        >
            <ErrorBoundary FallbackComponent={MainErrorFallback}>
                <HelmetProvider>
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                </HelmetProvider>

            </ErrorBoundary>

        </React.Suspense>
    )
}