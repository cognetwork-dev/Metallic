import { ChemicalBuild } from "chemicaljs";

const build = new ChemicalBuild({
    path: "build",
	rammerhead: false,
});

await build.write();
