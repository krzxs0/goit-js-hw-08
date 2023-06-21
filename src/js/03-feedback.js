import storage from './storage';
import throttle from 'lodash/throttle';

const formRef = document.querySelector('form');

function loadFormFromLocalStorage() {
  if (localStorage.getItem('feedback-form-state')) {
    const formInfo = storage.load('feedback-form-state');
    const localStorageArr = Object.keys(formInfo);

    localStorageArr.forEach(name => {
      formRef.elements[name].value = formInfo[name];
    });
  }
}

function updateLocalStorage() {
  const feedback = {};
  const formData = new FormData(formRef);
  formData.forEach((value, name) => {
    feedback[name] = value;
  });
  storage.save('feedback-form-state', feedback);
}

function clearFormAndLocalStorage(event) {
  if (event.currentTarget.elements.message.value) {
    event.preventDefault();
    localStorage.clear();
    formRef.reset();
  } else {
    alert('Заполните все поля');
  }
}

loadFormFromLocalStorage();

formRef.addEventListener('input', throttle(updateLocalStorage, 1000));
formRef.addEventListener('submit', clearFormAndLocalStorage);

