DOM = {
  passwInput: document.querySelector('.password-strength__input') };


const getPasswordVal = () => {
  console.log(DOM.passwInput.value);
  return DOM.passwInput.value;
};

DOM.passwInput.addEventListener('input', () => {
  getPasswordVal();
});