'use strict';
(function () {
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var dialogHandler = setupElement.querySelector('.upload');

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    window.util.show(setupElement);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    window.util.hide(setupElement);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
      setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (dragEvt) {
          dragEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
