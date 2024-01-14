function Button(props: ButtonTypes) {
    const active = props.active ? "bg-secondary text-textInverse activeButton " : ""

    return (
        <button {...props} class={active + "button button rounded-full px-4 py-2 select-none cursor-pointer h-10 flex items-center justify-center gap-1.5"}>
            {props.children}
        </button>
    )
}

function SquareButton(props: ButtonTypes) {
    const active = props.active ? "bg-secondary text-textInverse activeButton " : ""

    return (
        <button {...props} class={active + "button rounded-lg px-4 py-2 select-none cursor-pointer h-10 flex items-center justify-center gap-1.5"}>
            {props.children}
        </button>
    )
}

function RoundButton(props: ButtonTypes) {
    const active = props.active ? "bg-secondary text-textInverse activeButton " : ""

    return (
        <button {...props} class={active + "button rounded-full p-2 select-none cursor-pointer h-10 w-10 flex items-center justify-center"}>
            {props.children}
        </button>
    )
}

export { Button, SquareButton, RoundButton };