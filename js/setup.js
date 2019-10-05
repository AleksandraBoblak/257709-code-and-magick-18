'use strict';
(function () {
  var WIZARD_COUNT = 4;
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYE_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  var setupElement = document.querySelector('.setup');
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
    window.util.show(setupElement.querySelector('.setup-similar'));
  };

  var setRandomColor = function (element, colorsArray) {
    element.style.fill = getRandomElement(colorsArray);
  };

  var init = function () {
    renderWizardsToDOM(generateRandomWizards());
    showSetupSimilar();
  };

  init();

  var submitForm = function () {
    formElement.submit();
  };

  setupUserNameElement.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
  });

  setupSubmitElement.addEventListener('click', function () {
    submitForm();
  });


  setupSubmitElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, submitForm);
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
})();
