"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var previousOperationText = document.querySelector('#previous-operation');
var currentOperationText = document.querySelector('#current-operation');
var buttons = document.querySelectorAll('#buttons-container button');

var Calculator =
/*#__PURE__*/
function () {
  function Calculator(previousOperationText, currentOperationText) {
    _classCallCheck(this, Calculator);

    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  _createClass(Calculator, [{
    key: "addDigit",
    value: function addDigit(digit) {
      if (digit === "." && this.currentOperationText.innerText.includes(".")) {
        return;
      }

      ;
      this.currentOperation = digit;
      this.updateScreen();
    }
  }, {
    key: "processOperation",
    value: function processOperation(operation) {
      if (this.currentOperationText.innerText === "" && operation !== "C") {
        if (this.previousOperationText.innerText !== "") {
          this.changeOperation(operation);
        }

        return;
      }

      var operationValue;
      var previous = +this.previousOperationText.innerText.split(" ")[0];
      var current = +this.currentOperationText.innerText;

      switch (operation) {
        case "+":
          operationValue = previous + current;
          this.updateScreen(operationValue, operation, current, previous);
          break;

        case "-":
          operationValue = previous - current;
          this.updateScreen(operationValue, operation, current, previous);
          break;

        case "/":
          operationValue = previous / current;
          this.updateScreen(operationValue, operation, current, previous);
          break;

        case "*":
          operationValue = previous * current;
          this.updateScreen(operationValue, operation, current, previous);
          break;

        case "DEL":
          this.processDelOperator();
          break;

        case "CE":
          this.processClearCurrentOperation();
          break;

        case "C":
          this.processClearOperation();
          break;

        case "=":
          this.processequalOperation();
          break;

        default:
          return;
      }
    }
  }, {
    key: "updateScreen",
    value: function updateScreen() {
      var operationValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var operation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var current = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var previous = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      console.log(operationValue, operation, current, previous);

      if (operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
      } else {
        if (previous === 0) {
          operationValue = current;
        }

        this.previousOperationText.innerText = "".concat(operationValue, " ").concat(operation);
        this.currentOperationText.innerText = "";
      }
    }
  }, {
    key: "changeOperation",
    value: function changeOperation(operation) {
      var mathOperations = ["+", "-", "*", "/"];

      if (!mathOperations.includes(operation)) {
        return;
      }

      this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }
  }, {
    key: "processDelOperator",
    value: function processDelOperator() {
      this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
  }, {
    key: "processClearCurrentOperation",
    value: function processClearCurrentOperation() {
      this.currentOperationText.innerText = "";
    }
  }, {
    key: "processClearOperation",
    value: function processClearOperation() {
      this.currentOperationText.innerText = "";
      this.previousOperationText.innerText = "";
    }
  }, {
    key: "processequalOperation",
    value: function processequalOperation() {
      var operation = previousOperationText.innerHTML.split(" ")[1];
      this.processOperation(operation);
    }
  }]);

  return Calculator;
}();

var calc = new Calculator(previousOperationText, currentOperationText);
buttons.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var value = e.target.innerText;

    if (+value >= 0 || value === '.') {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});