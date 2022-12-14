document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("What's Your Name");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Aktb Asmak next time";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  document.getElementById("start").play();
  // let myInterval = setInterval(timer, 1000);
};

// Timer Variables

let timerSpan = document.querySelector(".timer span");
timerSpan.onclick = function () {
  console.log("opennnnn");
  a();
};
// Game Block Variables
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
// let orderRange = [...Array(blocks.length).keys()];
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

// Add CSS Order Property
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];

  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

//   FUNCTIONS

// Start Timer Function
let a = function timer() {
  setInterval(function () {
    timerSpan.innerHTML -= 1;
    if (timerSpan.innerHTML == 0) {
      clearInterval(a);
    }
  }, 1000);
};

//Flip Block Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      document.getElementById("fail").play();
    }, 100);

    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
  }
}

// Stop Clicking Function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Shuffle Function
function shuffle(array) {
  let current = orderRange.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
}