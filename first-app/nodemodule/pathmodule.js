// The path module provides utilities for working with file and directory paths.
///Using path build in module
const path = require('path');

var pathObj= path.parse(__filename);

console.log(pathObj);