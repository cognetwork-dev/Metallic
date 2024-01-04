function Button({children}: ButtonTypes) {
    return (
        <button {...this.props} class="bg-secondary rounded-full px-4 py-2 select-none cursor-pointer h-10 flex items-center justify-center gap-1.5">
            {children}
        </button>
    )
}

function SquareButton({children}: ButtonTypes) {
    return (
        <button {...this.props} class="bg-secondary rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center justify-center gap-1.5">
            {children}
        </button>
    )
}

function RoundButton({children}: ButtonTypes) {
    return (
        <button {...this.props} class="bg-secondary rounded-full p-2 select-none cursor-pointer h-10 w-10 flex items-center justify-center">
            {children}
        </button>
    )
}

export { Button, SquareButton, RoundButton };