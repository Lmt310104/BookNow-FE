export const DefaultLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <h1>Default layout</h1>
            <div>
                {children}
            </div>
        </>
    )
}