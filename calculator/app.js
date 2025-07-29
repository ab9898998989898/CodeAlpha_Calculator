document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('button'));
    let currentInput = '';
    let operator = '';
    let firstOperand = null;

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.innerText;

            if (value === 'C') {
                clear();
            } else if (value === '=') {
                calculate();
            } else if (['+', '−', '×', '÷'].includes(value)) {
                setOperator(value);
            } else {
                appendToDisplay(value);
            }
        });
    });

    function appendToDisplay(value) {
        currentInput += value;
        display.value = currentInput;
    }

    function setOperator(value) {
        if (currentInput === '') return;
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else {
            calculate();
        }
        operator = value;
        currentInput = '';
    }

    function calculate() {
        if (firstOperand === null || currentInput === '') return;
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '−':
                result = firstOperand - secondOperand;
                break;
            case '×':
                result = firstOperand * secondOperand;
                break;
            case '÷':
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        display.value = result;
        currentInput = '';
        firstOperand = result;
        operator = '';
    }

    function clear() {
        currentInput = '';
        firstOperand = null;
        operator = '';
        display.value = '';
    }

    // Keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (!isNaN(key)) {
            appendToDisplay(key);
        } else if (['+', '-', '*', '/'].includes(key)) {
            appendToDisplay(key);
        } else if (key === 'Enter' || key === '=') {
            calculate();
            event.preventDefault();
        } else if (key === 'Backspace') {
            // Remove last character
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (key.toLowerCase() === 'c') {
            clear();
        } else if (key === '.') {
            appendToDisplay('.');
        }
    });
});