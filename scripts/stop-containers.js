const { execSync } = require('child_process');

const networkName = 'test_network';

function stopContainers() {
  try {
    execSync(`docker rm -f -v test_blockchain`, { encoding: 'utf-8' });
    execSync(`docker rm -f -v postgres`, { encoding: 'utf-8' });
    execSync(`docker network rm ${networkName}`, { encoding: 'utf-8' });
  } catch (error) {
    if (
      !error.message.includes(`No such network: ${networkName}`) &&
      !error.message.includes('not found')
    ) {
      console.error(`Error stopping and removing containers: ${error.message}`);
      process.exit(1);
    }
  }
}

stopContainers();
