const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

alice1.animate(aliceTumbling, aliceTiming);

//使用Promise实现但存在回调地狱
function animateElement(element) {
  return new Promise((resolve, reject) => {
    const animation = element.animate(aliceTumbling, aliceTiming);
    animation.finished.then(() => resolve());
  });
}
/*
使用Promise实现但存在回调地狱
animateElement(alice1)
  .then(() => animateElement(alice2))
  .then(() => animateElement(alice3))
  .catch((error) => console.error(error));

使用Promise链式调用，避免“回调地狱”
alice1.animate(aliceTumbling, aliceTiming).finished
  .then(() => alice2.animate(aliceTumbling, aliceTiming).finished)
  .then(() => alice3.animate(aliceTumbling, aliceTiming).finished)
  .catch(error => console.error(error));
*/

//使用async/await实现，避免“回调地狱”
async function animateElements() {
  await animateElement(alice1);
  await animateElement(alice2);
  await animateElement(alice3);
}
animateElements().catch((error) => console.error(error));
