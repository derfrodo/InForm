const fs = require("fs");

fs.mkdirSync("./dist", { recursive: true });

(async () => {
    await fs.cpSync(
        "./src/templates/",
        "./dist/templates/",
        {
            recursive: true,
            force: true,
        }
    );
})();
