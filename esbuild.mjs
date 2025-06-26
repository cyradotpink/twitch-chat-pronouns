import { copy } from "esbuild-plugin-copy";
import esbuild from "esbuild";
import { readFile, writeFile } from "fs/promises";

const env = (process.env.NODE_ENV || "development").toLowerCase();

/** @type {esbuild.BuildOptions} */
const config = {
  entryPoints: ["src/ts/index.ts"],
  outfile: "dist/bundle.js",
  sourcemap: "both",
  bundle: true,
  plugins: [
    copy({
      resolveFrom: "cwd",
      assets: {
        from: ["./src/public/*"],
        to: ["./dist/"],
      },
    }),
  ],
  define: {
    "process.env.NODE_ENV": JSON.stringify(env),
  },
};

esbuild
  .build(config)
  .then(async () => {
    let manifest = JSON.parse(await readFile("dist/manifest.json"));
    let packagejson = JSON.parse(await readFile("package.json"));
    manifest.version = packagejson.version;
    await writeFile(
      "dist/manifest.json",
      JSON.stringify(manifest, undefined, 2),
    );
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
