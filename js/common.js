"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  rangeSliderAction();
  formAction();
  mobMenuAction();
  $('#select-price').select2({
    allowClear: false,
    minimumResultsForSearch: Infinity
  });
})(window, document);
function rangeSliderAction() {
  var slider = document.getElementById('slider-round');
  noUiSlider.create(slider, {
    start: 1000,
    animate: false,
    step: 1000,
    connect: 'lower',
    range: {
      min: 1000,
      max: 3000
    }
  });
  slider.noUiSlider.on('update', function (values, handle) {
    var valElem = document.querySelector('#valueRange');
    var value = values[handle];
    valElem.innerHTML = Math.round(value);
  });
}
function formAction() {
  var forms = document.querySelectorAll('form');
  var _iterator = _createForOfIteratorHelper(forms),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var form = _step.value;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (validationForm(this) == true) {
          window.open('https://www.google.com/', '_blank');
        }
      });
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  function validationForm(form) {
    var result = true;
    var inputs = form.querySelectorAll('input');
    var _iterator2 = _createForOfIteratorHelper(inputs),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var input = _step2.value;
        if (input.value == '' && input.type != 'checkbox') {
          input.closest('.field').classList.add('error');
          createMessage(errorMessage('name'));
          result = false;
          return result;
        }
        if (input.value.length < 5 && input.type != 'checkbox') {
          input.closest('.field').classList.add('error');
          createMessage(errorMessage('short'));
          result = false;
          return result;
        }
        if (input.type == 'checkbox' && !input.checked) {
          createMessage(errorMessage('checkbox'));
          result = false;
          return result;
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return result;
  }
  function createMessage(text) {
    clearTimeout(removeBlock);
    if (document.querySelector('.message-block') == null) {
      var div = document.createElement('div');
      div.classList.add('message-block');
      document.body.append(div);
    }
    var elem = document.querySelector('.message-block');
    elem.innerHTML = text;
    var animSet = {
      duration: 300,
      easing: "cubic-bezier(.21,.27,.46,.97)"
    };
    elem.animate([{
      transform: "translate(-50%, 50%)"
    }], animSet).onfinish = function () {
      elem.style.transform = "translate(-50%, 50%)";
    };
    var removeBlock = setTimeout(function () {
      elem.animate([{
        transform: "translate(-50%, -100%)"
      }], animSet).onfinish = function () {
        elem.style.transform = "translate(-50%, -100%)";
      };
    }, 5000);
  }
  function errorMessage(err) {
    var typeOfMessage = {
      "short": 'Name length must be more than 5 characters',
      name: 'Please enter full name',
      checkbox: 'Check checkbox'
    };
    return typeOfMessage[err];
  }
}
function mobMenuAction() {
  var hmBtn = document.querySelector('#hmBtn');
  var closePanel = document.querySelector('#closePanel');
  hmBtn.addEventListener('click', function () {
    document.body.classList.add('menu-open');
  });
  closePanel.addEventListener('click', function () {
    document.body.classList.remove('menu-open');
  });
  document.addEventListener('click', function (event) {
    if (!hmBtn.contains(event.target) && !document.querySelector('.m-panel').contains(event.target)) {
      document.body.classList.remove('menu-open');
    }
  });
}