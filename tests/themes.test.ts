import { expect, test } from 'bun:test';
import { z } from "zod";
import fs from 'fs';

test('Sanity Check', () => {
    expect(1).toBe(1);
    expect(1+1).toBe(2)
})

test('Themes file exists', async () => {
    const exists = await Bun.file('src/themes.json').exists()
    expect(exists).toBe(true);
});

let themes = await Bun.file("src/themes.json").text();
let themesJson = JSON.parse(themes);

test('Themes file contains JSON', () => {
    themes = JSON.parse(themes);
});

test('Themes file contains an array', () => {
    expect((Array.isArray(themes))).toBe(true);
});

const ThemeProperties = z.object({
    background: z.string({
        required_error: "Background is required",
        invalid_type_error: "Background must be a string",
    }),
    secondary: z.string({
        required_error: "Secondary is required",
        invalid_type_error: "Secondary must be a string",
    }),
    primary: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    text: z.string({
        required_error: "Text is required",
        invalid_type_error: "Text must be a string",
    }),
    textInverse: z.string({
        required_error: "Text inverse is required",
        invalid_type_error: "Text inverse must be a string",
    }),
    font: z.string({
        required_error: "Font is required",
        invalid_type_error: "Font must be a string",
    }),
})

const CustomThemes = z.record(z.string({
    required_error: "Custom property selector is required",
    invalid_type_error: "Custom property selectors value must be a string",
}), z.record(z.string({
    required_error: "Custom property key is required",
    invalid_type_error: "Custom property keys value must be a string",
}), z.string({
    required_error: "Custom property value is required",
    invalid_type_error: "Custom property values value must be a string",
}))).optional()

const Theme = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    id: z.string({
        required_error: "ID is required",
        invalid_type_error: "ID must be a string",
    }),
    theme: ThemeProperties,
    custom: CustomThemes
})

test('Themes are valid', () => {
    for (const theme of themes) {
        const result = Theme.safeParse(theme);
        if (!result.success) {
            console.log("Failed theme:", theme);
            console.log("Validation errors:", result.error.errors);
            //@ts-expect-error testing sequence
            expect(result.success).toBe(true);
        }
    }
    expect(1).toBe(1);
});

test('Default theme exists', () => {
    expect(themesJson.filter(theme => theme.id === "default").length > 0).toBe(true);
});

test('No duplicate themes exist', () => {
    expect(themesJson.filter((theme) => themesJson.filter((x) => x.id == theme.id).length > 1).length == 0).toBe(true);
});
