const fs = require("node:fs");
const path = require("node:path");

const root = process.cwd();
const packageJsonPath = path.join(root, "package.json");
const composerJsonPath = path.join(
  root,
  "node_modules",
  "@prisma",
  "composer",
  "package.json"
);

if (!fs.existsSync(composerJsonPath)) {
  console.error("[JK CAPITAL] @prisma/composer absent après installation npm.");
  process.exit(1);
}

const composerPackage = JSON.parse(fs.readFileSync(composerJsonPath, "utf8"));
const requiredEffect = composerPackage.dependencies?.effect;

if (!requiredEffect) {
  console.error(
    "[JK CAPITAL] @prisma/composer ne déclare pas dependencies.effect."
  );
  process.exit(1);
}

const projectPackage = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
projectPackage.overrides ??= {};
projectPackage.overrides.effect = requiredEffect;

fs.writeFileSync(
  packageJsonPath,
  `${JSON.stringify(projectPackage, null, 2)}\n`
);

console.log(
  `[JK CAPITAL] effect forcé à la version attendue par @prisma/composer : ${requiredEffect}`
);
