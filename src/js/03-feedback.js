import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const localStorageKey = 'feedback-form-state';

const saveFormState = () => {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(localStorageKey, JSON.stringify(formData));
};

const loadFormState = () => {
  const savedFormData = localStorage.getItem(localStorageKey);

  if (savedFormData) {
    const formData = JSON.parse(savedFormData);
    emailInput.value = formData.email;
    messageInput.value = formData.message;
  }
};

const clearFormState = () => {
  localStorage.removeItem(localStorageKey);
  emailInput.value = '';
  messageInput.value = '';
};

const submitForm = (event) => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);
  clearFormState();
};

form.addEventListener('input', throttle(saveFormState, 500));
window.addEventListener('load', loadFormState);
form.addEventListener('submit', submitForm);
