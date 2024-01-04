function Button(props: ButtonTypes) {
    return (
        <button {...props} class="bg-secondary rounded-full px-4 py-2 select-none cursor-pointer h-10 flex items-center justify-center gap-1.5">
            {props.children}
        </button>
    )
}

function SquareButton(props: ButtonTypes) {
    return (
        <button {...props} class="bg-secondary rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center justify-center gap-1.5">
            {props.children}
        </button>
    )
}

function RoundButton(props: ButtonTypes) {
    return (
        <button {...props} class="bg-secondary rounded-full p-2 select-none cursor-pointer h-10 w-10 flex items-center justify-center">
            {props.children}
        </button>
    )
}

export { Button, SquareButton, RoundButton };