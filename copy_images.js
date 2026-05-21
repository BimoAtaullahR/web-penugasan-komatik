const fs = require('fs');
const path = require('path');

const sourceDir = '/home/bimoar/.gemini/antigravity/brain/89a7454e-351a-4951-ac14-ca67f8e149e5';
const targetDir = path.join(__dirname, 'public', 'images', 'jerseys');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir);
files.forEach(file => {
  if (file.endsWith('.png')) {
    let targetName = file;
    if (file.includes('mu_26')) targetName = 'mu_26.png';
    else if (file.includes('rm_26')) targetName = 'rm_26.png';
    else if (file.includes('milan_26')) targetName = 'milan_26.png';
    else if (file.includes('bayern_26')) targetName = 'bayern_26.png';
    else return;
    
    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, targetName));
    console.log(`Copied ${file} to ${targetName}`);
  }
});
