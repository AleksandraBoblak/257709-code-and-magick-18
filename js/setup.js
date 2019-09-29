'use strict';

var WIZARD_COUNT = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var HIDDEN_CLASS = 'hidden';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialogElement = document.querySelector('.setup');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var setupOpenElement = document.querySelector('.setup-open');
var setupElement = document.querySelector('.setup');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupUserNameElement = setupElement.querySelector('.setup-user-name');
var setupSubmitElement = setupElement.querySelector('.setup-submit');
var formElement = setupElement.querySelector('.setup-wizard-form');
var wizardCoatElement = formElement.querySelector('.wizard-coat');
var wizardEyesElement = formElement.querySelector('.wizard-eyes');
var fireballWrapElement = formElement.querySelector('.setup-fireball-wrap');
var fireballInputElement = fireballWrapElement.querySelector('input[name="fireball-color"]');

var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var generateWizard = function () {
  return {
    name: getRandomElement(NAMES),
    lastName: getRandomElement(LAST_NAMES),
    coatColor: getRandomElement(COAT_COLORS),
    eyesColor: getRandomElement(EYE_COLORS)
  };
};

var generateRandomWizards = function () {
  var wizards = [];
  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizards.push(generateWizard());
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardsToDOM = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var showSetupSimilar = function () {
  userDialogElement.querySelector('.setup-similar').classList.remove(HIDDEN_CLASS);
};

var setRandomColor = function (element, colorsArray) {
  element.style.fill = getRandomElement(colorsArray);
};

var init = function () {
  renderWizardsToDOM(generateRandomWizards());
  showSetupSimilar();
};

init();

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setupElement.classList.remove(HIDDEN_CLASS);
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupElement.classList.add(HIDDEN_CLASS);
  document.removeEventListener('keydown', onPopupEscPress);
};

var submitForm = function () {
  formElement.submit();
};

setupOpenElement.addEventListener('click', function () {
  openPopup();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closePopup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupUserNameElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

setupSubmitElement.addEventListener('click', function () {
  submitForm();
});


setupSubmitElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    submitForm();
  }
});

wizardCoatElement.addEventListener('click', function () {
  setRandomColor(wizardCoatElement, COAT_COLORS);
});

wizardEyesElement.addEventListener('click', function () {
  setRandomColor(wizardEyesElement, EYE_COLORS);
});

fireballWrapElement.addEventListener('click', function () {
  var fireballColor = getRandomElement(FIREBALL_COLORS);
  fireballWrapElement.style.backgroundColor = fireballColor;
  fireballInputElement.value = fireballColor;
});
