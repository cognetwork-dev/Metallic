function generateProperties(items: any, variables = false) {
    const varAdd = variables ? "--" : ""

    return Object.entries(items).map((prop) => {
        return "\t" + varAdd + prop[0] + ": " + prop[1] + ";"
    }).join("\n")
}

function generateCustomStyle(custom: any, id: any) {
    if (!custom) {
        return ""
    }

    return Object.entries(custom).map((item) => {
        return "\n\nbody[data-theme=\"" + id + "\"] " + item[0] + " {\n" + generateProperties(item[1]) + "\n}"
    }).join("\n")
}

function generateThemes(themes: any) {
    return themes.map((theme: any) => {
        return "body[data-theme=\"" + theme.id + "\"] {\n" + generateProperties(theme.theme, true) + "\n}" + generateCustomStyle(theme.custom, theme.id)
    }).join("\n\n")
}

export { generateThemes };