function Logo(props: IconTypes) {
    return (
        <svg {...props} height="24" width="24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
            <defs>
                <mask id="mask">
                    <rect width="1772.308" height="913.792" fill="white" x="-1.846" y="-1.845"></rect>
                    <path fill="black" d="M 12 6 C 8.682 6 6 8.682 6 12 C 6 15.318 8.682 18 12 18 C 15.318 18 18 15.318 18 12 C 18 8.682 15.318 6 12 6 Z"></path>
                </mask>
            </defs>
            <polygon mask="url(#mask)" fill="var(--primary, #2a7152)" points="18 1.616 6 1.616 0 12 6 22.384 18 22.384 24 12"></polygon>
        </svg>
    )
}

export { Logo };