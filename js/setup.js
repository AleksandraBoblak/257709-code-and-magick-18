'use strict';
(function () {
  var WIZARD_COUNT = 4;
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

  var setRandomColor = function (element, colorsArray) {
    element.style.fill = getRandomElement(colorsArray);
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizardsToDOM = function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARD_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var showSetupSimilar = function () {
    window.util.show(setupElement.querySelector('.setup-similar'));
  };

  var loadSuccessHandler = function (wizards) {
    renderWizardsToDOM(wizards);

    setupElement.querySelector('.setup-similar').classList.remove('hidden');

    if (document.querySelector('.error-message')) {
      document.querySelector('.error-message').remove();
    }
  };

  var saveSuccessHandler = function () {
    window.dialog.closePopup();
    if (document.querySelector('.error-message')) {
      document.querySelector('.error-message').remove();
    }
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 15px; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var init = function () {
    window.backend.load(loadSuccessHandler, errorHandler);
    showSetupSimilar();
  };

  var submitForm = function () {
    window.backend.save(new FormData(formElement), saveSuccessHandler, errorHandler);
  };

  init();

  setupUserNameElement.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, function () {
      evt.stopPropagation();
    });
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

  formElement.addEventListener('submit', function (evt) {
    submitForm();
    evt.preventDefault();
  });

})();
