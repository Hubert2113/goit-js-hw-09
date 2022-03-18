import Notiflix from 'notiflix';
Notiflix.Notify.init({
  useIcon: false,
});

const $form = document.querySelector('.form');
const $submitBtn = $form.lastElementChild;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve('success');
      } else {
        reject('failed');
      }
    }, delay);
  });
  return promise;
}

$submitBtn.addEventListener('click', ev => {
  ev.preventDefault();
  let delay = parseInt($form.children[0].firstElementChild.value);
  const step = parseInt($form.children[1].firstElementChild.value);
  const AmountOfPromises = parseInt($form.children[2].firstElementChild.value);
  for (let i = 1; i <= AmountOfPromises; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
});
