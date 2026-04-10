const fs = require('fs');
const path = require('path');

// Read source files
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const tailwind = fs.readFileSync(path.join(__dirname, 'nmtwind.css'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Build final HTML - inline both CSS files (Tailwind first, then custom styles)
let finalHtml = html;

// Replace Tailwind CSS link
finalHtml = finalHtml.replace(
  /<link rel="stylesheet" href="nmtwind\.css">/,
  `<style>\n${tailwind}\n</style>`
);

// Replace custom CSS link
finalHtml = finalHtml.replace(
  /<link rel="stylesheet" href="styles\.css">/,
  `<style>\n${css}\n</style>`
);

// Replace JS script
finalHtml = finalHtml.replace(
  /<script src="app\.js"><\/script>/,
  `<script>\n${js}\n</script>`
);

// Write to nmti.html
const outputPath = path.join(__dirname, 'nmti.html');
fs.writeFileSync(outputPath, finalHtml, 'utf8');

console.log('✅ Build complete! Output: nmti.html');
console.log(`   HTML: ${html.length} chars`);
console.log(`   Tailwind: ${tailwind.length} chars`);
console.log(`   Custom CSS: ${css.length} chars`);
console.log(`   JS: ${js.length} chars`);
console.log(`   Total: ${finalHtml.length} chars`);
