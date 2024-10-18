function pauseNSeconds(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("finished");
    }, 1000 * n);
  });
}

async function testAwait() {
  console.log("About to wait");
  await pauseNSeconds(5);
  console.log("Finished the 5 seconds wait");
}

testAwait();

async function testAwait2() {
  // async allows other functions to be run at the same time while a fetch is in progress.
  console.log("test 2 about to wait");
  await pauseNSeconds(2);
  console.log("finished the 3 seconds wait");
}
g;
testAwait2();
