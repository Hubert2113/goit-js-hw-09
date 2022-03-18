import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

const $datetimePicker = document.querySelector('input#datetime-picker');
const $timer = document.querySelector('.timer');
const $fields = document.querySelectorAll('.field');
const $startBtn = $datetimePicker.nextElementSibling;

$datetimePicker.style.width = '300px';
$datetimePicker.style.height = '35px';
$datetimePicker.style.fontWeight = '500';
$datetimePicker.style.fontSize = '25px';

$startBtn.style.width = '80px';
$startBtn.style.height = '35px';
$startBtn.style.fontSize = '25px';
$startBtn.setAttribute('disabled', null);

$timer.style.display = 'flex';
$timer.style.width = '300px';
$timer.style.justifyContent = 'space-between';
$timer.style.marginTop = '20px';
for (const $field of $fields) {
  $field.style.display = 'flex';
  $field.style.flexWrap = 'wrap';
  $field.style.marginRight = '20px';
  $field.style.justifyContent = 'center';
  $field.firstElementChild.style.fontWeight = 'bold';
  $field.firstElementChild.style.fontSize = '40px';
  $field.lastElementChild.style.fontWeight = '600';
  $field.lastElementChild.style.fontSize = '20px';
}

const instance = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      $startBtn.removeAttribute('disabled');
      $startBtn.addEventListener('click', () => {
        const countdown = setInterval(() => {
          $fields[0].firstElementChild.textContent = convertMs(
            selectedDates[0].getTime() - new Date().getTime(),
          ).days;
          if ($fields[0].firstElementChild.textContent < 10) {
            $fields[0].firstElementChild.textContent =
              '0' + $fields[0].firstElementChild.textContent;
          }
          $fields[1].firstElementChild.textContent = convertMs(
            selectedDates[0].getTime() - new Date().getTime(),
          ).hours;
          if ($fields[1].firstElementChild.textContent < 10) {
            $fields[1].firstElementChild.textContent =
              '0' + $fields[1].firstElementChild.textContent;
          }
          $fields[2].firstElementChild.textContent = convertMs(
            selectedDates[0].getTime() - new Date().getTime(),
          ).minutes;
          if ($fields[2].firstElementChild.textContent < 10) {
            $fields[2].firstElementChild.textContent =
              '0' + $fields[2].firstElementChild.textContent;
          }
          $fields[3].firstElementChild.textContent = convertMs(
            selectedDates[0].getTime() - new Date().getTime(),
          ).seconds;
          if ($fields[3].firstElementChild.textContent < 10) {
            $fields[3].firstElementChild.textContent =
              '0' + $fields[3].firstElementChild.textContent;
          }
          if (
            $fields[0].firstElementChild.textContent === '00' &&
            $fields[1].firstElementChild.textContent === '00' &&
            $fields[2].firstElementChild.textContent === '00' &&
            $fields[3].firstElementChild.textContent === '00'
          ) {
            clearInterval(countdown);
          }
        }, 1000);
      });
    }
  },
});
console.log(Date());
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60; // 60 000
  const hour = minute * 60; // 3 600 000
  const day = hour * 24; // 86 400 000

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
