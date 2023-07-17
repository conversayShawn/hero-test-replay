const { execSync } = require('child_process');

const getBrowser = () => {
  try {
    const browser = execSync('echo $CYPRESS_BROWSER').toString().trim();
    return browser;
  } catch (error) {
    console.error('Failed to extract browser information:', error);
    process.exit(1);
  }
};

console.log(getBrowser());