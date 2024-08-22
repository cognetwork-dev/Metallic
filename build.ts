import { ChemicalBuild } from "chemicaljs";

const build = new ChemicalBuild({
	rammerhead: false,
});

await build.write();
