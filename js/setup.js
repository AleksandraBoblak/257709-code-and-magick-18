'use strict';

var WIZARD_COUNT = 4;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialogElement = document.querySelector('.setup');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var showUserDialog = function () {
  userDialogElement.classList.remove('hidden');
};

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
  userDialogElement.querySelector('.setup-similar').classList.remove('hidden');
};

var init = function () {
  showUserDialog();
  renderWizardsToDOM(generateRandomWizards());
  showSetupSimilar();
};

init();
