const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('test_2.txt');
  let m = new Number(-1);
  let n = new Number(0);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    m++;
    if (line.search(/#/) != -1) {
      n = Number(line.search(/#/)) + 1;
      console.log(`сундук расположен в ячейке ${m}, ${n}`)
      return
    }
  }
}

processLineByLine();