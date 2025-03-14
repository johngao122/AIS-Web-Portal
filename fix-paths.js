const fs = require("fs");
const path = require("path");

const baseUrl = "/AIS-Web-Portal";
const siteDir = path.join(__dirname, "_site");

function fixPaths(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            fixPaths(filePath);
        } else if (file.endsWith(".html")) {
            let content = fs.readFileSync(filePath, "utf8");

            // Fix script paths
            content = content.replace(
                /<script src="([^\/"][^"]+\.js)"><\/script>/g,
                (match, scriptPath) => {
                    const relativePath = path.relative(siteDir, dir);
                    const newPath = relativePath
                        ? `${baseUrl}/${relativePath}/${scriptPath}`
                        : `${baseUrl}/${scriptPath}`;
                    return `<script src="${newPath}"></script>`;
                }
            );

            // Fix double slashes
            content = content.replace(
                /\/AIS-Web-Portal\/\//g,
                "/AIS-Web-Portal/"
            );

            fs.writeFileSync(filePath, content);
            console.log(`Fixed paths in ${filePath}`);
        }
    }
}

fixPaths(siteDir);
