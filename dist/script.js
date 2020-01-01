DOM = {
  passwInput: document.querySelector('.password-strength__input'),
  passwVisibilityBtn: '.password-strength__visibility',
  passwVisibility_icon: '.password-strength__visibility-icon' };


//*** HELPERS

const findParentNode = (elem, parentClass) => {

  while (true) {

    if (!elem.classList.contains(parentClass)) {
      elem = elem.parentNode;
    } else {
      return elem;
      break;
    }

  }

};

//*** MAIN CODE

const getPasswordVal = input => {
  console.log(input.value);
  return input.value;
};

const testPasswRegexp = (passw, regexp) => {

  return regexp.test(passw);

};

const passwordStrength = input => {

  //getting password
  const passw = getPasswordVal(input);

  //finding strength
  let strength = 0;

  const middle = /[a-zA-Z]/ig;

  const testResult = testPasswRegexp(passw, middle);

  console.log(testResult);

};

const passwordVisible = passwField => {

  const passwType = passwField.getAttribute('type');

  let visibilityStatus;

  if (passwType === 'text') {

    passwField.setAttribute('type', 'password');

    visibilityStatus = 'hidden';

  } else {

    passwField.setAttribute('type', 'text');

    visibilityStatus = 'visible';

  }

  return visibilityStatus;

};

const changeVisibiltyBtnIcon = (btn, status) => {

  const hiddenPasswIcon = btn.querySelector(`${DOM.passwVisibility_icon}[data-visible="hidden"]`);

  const visibilePasswIcon = btn.querySelector(`${DOM.passwVisibility_icon}[data-visible="visible"]`);

  if (status === 'visible') {
    visibilePasswIcon.classList.remove('js-hidden');
    hiddenPasswIcon.classList.add('js-hidden');
  } else if (status === 'hidden') {
    visibilePasswIcon.classList.add('js-hidden');
    hiddenPasswIcon.classList.remove('js-hidden');
  }

};

const passwVisibilitySwitcher = (passwField, visibilityToggler) => {

  const visibilityStatus = passwordVisible(passwField);

  changeVisibiltyBtnIcon(visibilityToggler, visibilityStatus);
};


//*** EVENT LISTENERS
DOM.passwInput.addEventListener('input', () => {
  passwordStrength(DOM.passwInput);
});

const passwVisibilityBtn = document.querySelector(DOM.passwVisibilityBtn);

passwVisibilityBtn.addEventListener('click', e => {

  let togglerClass = DOM.passwVisibilityBtn.slice(1, DOM.passwVisibilityBtn.length);
  let toggler = findParentNode(e.target, togglerClass);

  passwVisibilitySwitcher(DOM.passwInput, toggler);

});