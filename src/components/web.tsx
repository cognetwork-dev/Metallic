function Web({ref}: WebTypes) {
    return (
        <>
            <iframe ref={ref} class="fixed top-0 left-0 right-0 bottom-0 border-0 bg-background w-full h-full select-none hidden z-100"></iframe>
        </>
    )
}

export { Web };