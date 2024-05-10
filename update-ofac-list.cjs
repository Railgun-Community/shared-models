const fs = require('fs');
const path = require('path');

const BLOCKED_ADDRESSES_FILE_PATH = path.join(
  __dirname,
  'src',
  'models',
  'blocked-address.ts',
);


const UPDATE_FILE_URL =
  'https://raw.githubusercontent.com/Railgun-Community/ofac-scraper/main/blocked-addresses.ts';
function readChunks(reader) {
  return {
    async *[Symbol.asyncIterator]() {
      let readResult = await reader.read();
      while (!readResult.done) {
        yield readResult.value;
        readResult = await reader.read();
      }
    },
  };
}
async function downloadFile(url, outputPath) {
  const response = await fetch(url, {
    responseType: 'stream',
  });
  if (response.status !== 200) {
    throw new Error('Failed to fetch update file.');
  }
  const reader = response.body.getReader();
  let output = '';
  for await (const chunk of readChunks(reader)) {
    output += new TextDecoder().decode(chunk);
  }
  fs.writeFileSync(outputPath, output);
}

const main = async () => {
  const tmpNewFile = 'tmp_blocked-addresses.ts;';
  await downloadFile(UPDATE_FILE_URL, tmpNewFile);
  const oldFileContent = fs.readFileSync(BLOCKED_ADDRESSES_FILE_PATH, 'utf-8');
  const newFileContent = fs
    .readFileSync(tmpNewFile, 'utf-8')
    // incoming file will have " instead of '
    .replace(/"/g, "'");

  if (oldFileContent !== newFileContent) {
    fs.writeFileSync(BLOCKED_ADDRESSES_FILE_PATH, newFileContent);
    console.log('Lists are different, Updating...');
  } else {
    console.log('Lists are identical. No updates needed.');
  }
  fs.unlinkSync(tmpNewFile);
};

main()
  .then(() => console.log('OFAC Address Update Completed.'))
  .catch(error => console.error('Error:', error));
