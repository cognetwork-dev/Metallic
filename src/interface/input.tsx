function SquareInput(props: InputTypes) {
    return (
        <input {...props} class={"input bg-secondary text-textInverse rounded-lg px-4 py-2 h-10 w-96 flex items-center justify-center gap-1.5 outline-none"} />
    )
}

export { SquareInput };