const path = require('path');

module.exports = {
  resolveModuleName(moduleName, containingFile, compilerOptions) {
    const baseUrl = compilerOptions.baseUrl || '.';
    const paths = compilerOptions.paths || {};

    // Check for path mapping
    for (const [key, value] of Object.entries(paths)) {
      const matchPattern = key.replace('*', '');
      if (moduleName.startsWith(matchPattern)) {
        const replacement = value[0].replace(/\*/g, '');
        const resolvedPath = path.resolve(baseUrl, replacement, moduleName.replace(matchPattern, ''));
        return { resolvedModule: { resolvedFileName: resolvedPath } };
      }
    }

    return null;
  }
};
