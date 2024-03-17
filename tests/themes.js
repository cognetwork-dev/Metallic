import test from 'ava';
import { z } from "zod";
import fs from 'fs';

test('Themes file exists', (t) => {
    t.true(fs.existsSync('src/themes.json'), "The file /src/themes.json file does not exist.");
});

let themes = fs.readFileSync("src/themes.json", "utf-8");

test('Themes file contains JSON', (t) => {
    try {
        themes = JSON.parse(themes)
        t.pass();
    } catch {
        t.fail("The themes file does not contain valid JSON.");
    }
});

test('Themes file contains an array', (t) => {
    t.true(Array.isArray(themes), "The themes file does not contain a valid array.");
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

test('Themes are valid', (t) => {
    for (let theme of themes) {
        if (Theme.safeParse(theme).success) {
            t.pass();
        } else {
            console.log("Failed theme: ")
            console.log(theme)
            t.fail("A theme is missing a property or a property is an incorrect type.");
        }
    }
});

test('Default theme exists', (t) => {
    t.true(themes.filter((theme) => theme.id == "default").length > 0, "No default theme was found")
});

test('No duplicate themes exist', (t) => {
    t.true(themes.filter((theme) => themes.filter((x) => x.id == theme.id).length > 1).length == 0, "Duplicate themes exist with the same ID.")
});