const fs = require('fs');
const path = require('path');

function createTextFileOfSize(filePath, sizeInBytes) {
  try {
    const fileHandle = fs.openSync(filePath, 'w');
    fs.writeSync(fileHandle, Buffer.alloc(1), 0, 1, sizeInBytes - 1);
    fs.closeSync(fileHandle);
    console.log(`✅ File "${filePath}" created successfully with size ${sizeInBytes} bytes.`);
  } catch (error) {
    console.error('❌ Error creating file:', error);
  }
}

// CLI Arguments
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  console.log(`
Usage:
  node create_file.js <filename> <size><unit>
  
Examples:
  node create_file.js file1.txt 1kb
  node create_file.js test.txt 100kb
  node create_file.js big.txt 1mb

Or:
  node create_file.js --all   # Create 1kb, 100kb, and 1mb test files
`);
  process.exit(0);
}

if (args[0] === '--all') {
  createTextFileOfSize('file_1kb.txt', 1024);
  createTextFileOfSize('file_100kb.txt', 1024 * 100);
  createTextFileOfSize('file_1mb.txt', 1024 * 1024);
} else {
  const filename = args[0];
  const sizeInput = args[1].toLowerCase();

  const match = sizeInput.match(/^(\d+)(kb|mb|b)$/);
  if (!match) {
    console.error('❌ Invalid size format. Use <number><kb|mb|b>, e.g., 1kb, 100mb, etc.');
    process.exit(1);
  }

  const [_, num, unit] = match;
  let multiplier = 1;
  if (unit === 'kb') multiplier = 1024;
  else if (unit === 'mb') multiplier = 1024 * 1024;

  const sizeInBytes = parseInt(num) * multiplier;
  createTextFileOfSize(filename, sizeInBytes);
}
