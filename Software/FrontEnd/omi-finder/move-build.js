// File js che si occupa di eliminare la vecchia cartella di build
// se presente e spostare la build nuova

const fs = require("fs");

const oldPath = "./build";
const newPath = "../build";
// Remove old build
fs.rmSync(newPath, { recursive: true, force: true });
// Move new build
fs.renameSync(oldPath, newPath);
