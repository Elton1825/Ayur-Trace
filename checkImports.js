const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Recursively get all JS/JSX files
function getFiles(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      files.push(fullPath);
    }
  });
  return files;
}

// Check if import paths match real filenames (case-sensitive)
function checkImports() {
  const files = getFiles(srcDir);
  let errors = [];

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const importRegex = /import\s+(?:.*?\s+from\s+)?['"](.+?)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      let importPath = match[1];

      // Only relative paths
      if (!importPath.startsWith('.')) continue;

      const resolvedPath = path.join(path.dirname(file), importPath);

      // Try resolving with extensions
      const possibleExts = ['', '.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx'];
      let found = false;

      for (const ext of possibleExts) {
        const fullPath = resolvedPath + ext;
        if (fs.existsSync(fullPath)) {
          // Compare actual filename casing
          const actualName = fs.readdirSync(path.dirname(fullPath)).find(f =>
            f.toLowerCase() === path.basename(fullPath).toLowerCase()
          );
          if (actualName !== path.basename(fullPath)) {
            errors.push({
              file,
              importPath,
              expected: actualName,
              actual: path.basename(fullPath)
            });
          }
          found = true;
          break;
        }
      }

      if (!found) {
        errors.push({ file, importPath, missing: true });
      }
    }
  });

  if (errors.length === 0) {
    console.log('✅ No import errors found. All paths match filenames.');
  } else {
    console.log('❌ Import errors detected:');
    errors.forEach(err => {
      if (err.missing) {
        console.log(`  MISSING: ${err.importPath} in ${err.file}`);
      } else {
        console.log(`  CASE MISMATCH: ${err.importPath} in ${err.file} (expected: ${err.expected}, actual: ${err.actual})`);
      }
    });
  }
}

checkImports();
