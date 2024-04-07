const { execSync } = require('child_process');
const fs = require('fs');

// Install necessary packages
console.log('Installing necessary packages...');
try {
    execSync('npm install express body-parser mysql', { stdio: 'inherit' });
} catch (error) {
    console.error('Error installing packages:', error);
    process.exit(1);
}

// Check if package.json exists
if (!fs.existsSync('./package.json')) {
    console.error('package.json not found. Make sure you are in the correct directory.');
    process.exit(1);
}

// Start the server
console.log('Starting the server...');
try {
    execSync('node app.js', { stdio: 'inherit' });
} catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
}
