DOM = {
  passwInput: document.querySelector('.password-strength__input'),
  passwVisibilityBtn: '.password-strength__visibility',
  passwVisibility_icon: '.password-strength__visibility-icon',
  strengthBar: document.querySelector('.password-strength__bar') };


//*** HELPERS

const findParentNode = (elem, parentClass) => {

  while (true) {

    if (!elem.classList.contains(parentClass)) {
      elem = elem.parentNode;
    } else {
      return elem;
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

const testPassw = passw => {

  let strength = 'none';

  const moderate = /(?=.*[A-Z]{2,})(?=.*[a-z]).{5,}|(?=.*[\d]{2,})(?=.*[a-z]).{5,}|(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{5,}/g;
  const strong = /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).{7,}|(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=.*[\d]).{7,}/g;
  const extraStrong = /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]).{9,}/g;

  if (testPasswRegexp(passw, extraStrong)) {
    strength = 'extra';
  } else if (testPasswRegexp(passw, strong)) {
    strength = 'strong';
  } else if (testPasswRegexp(passw, moderate)) {
    strength = 'moderate';
  } else if (passw.length > 0) {
    strength = 'weak';
  }

  return strength;

};

const setStrengthBarValue = (bar, strength) => {

  let strengthValue;

  switch (strength) {
    case 'weak':
      strengthValue = 25;
      bar.setAttribute('aria-valuenow', strengthValue);
      break;

    case 'moderate':
      strengthValue = 50;
      bar.setAttribute('aria-valuenow', strengthValue);
      break;

    case 'strong':
      strengthValue = 75;
      bar.setAttribute('aria-valuenow', strengthValue);
      break;

    case 'extra':
      strengthValue = 100;
      bar.setAttribute('aria-valuenow', strengthValue);
      break;

    default:
      strengthValue = 0;
      bar.setAttribute('aria-valuenow', 0);}


  return strengthValue;

};

const setStrengthBar = (bar, strength) => {

  //setting value
  const strengthValue = setStrengthBarValue(bar, strength);

  //setting styles

};

const passwordStrength = (input, strengthBar) => {

  //getting password
  const passw = getPasswordVal(input);

  //finding strength
  const strength = testPassw(passw);

  //setting strength bar (value and styles)
  setStrengthBar(strengthBar, strength);

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
  passwordStrength(DOM.passwInput, DOM.strengthBar);
});

const passwVisibilityBtn = document.querySelector(DOM.passwVisibilityBtn);

passwVisibilityBtn.addEventListener('click', e => {

  let togglerClass = DOM.passwVisibilityBtn.slice(1, DOM.passwVisibilityBtn.length);
  let toggler = findParentNode(e.target, togglerClass);

  passwVisibilitySwitcher(DOM.passwInput, toggler);

});