function checkValue() {
    var a = 2;
    var x = 1 + (a *= 2);
    alert("Х равен " + x);
};

function compareValues(a, b) {
    if (a >= 0 && b >= 0) {
        alert(a - b);
    } else if (a < 0 && b < 0) {
        alert(a * b);
    } else {
        alert(a + b);
    }
};

function switchTest(a) {
    // Не до конца понял текст задания, но решил что должно быть как то так (если бы явно было написано, что делат через ретерны, то было бы по другому). 
    // Брэйков специально нет, тк тогда будут выводиться число одно за другим.

    switch (a) {
        case 0:
            alert(a++);
        case 1:
            alert(a++);
        case 2:
            alert(a++);
        case 3:
            alert(a++);
        case 4:
            alert(a++);
        case 5:
            alert(a++);
        case 6:
            alert(a++);
        case 7:
            alert(a++);
        case 8:
            alert(a++);
        case 9:
            alert(a++);
        case 10:
            alert(a++);
        case 11:
            alert(a++);
        case 12:
            alert(a++);
        case 13:
            alert(a++);
        case 14:
            alert(a++);
        case 15:
            alert(a);
            break;
        default:
            alert("Number should me in range [0..15]!")
            break;
    }

};

function sum(a, b) {
    return a + b;
}

function substraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    return a / b;
}

function basicArithmetics(a, b) {
    alert("Сложение a + b: " + sum(a, b) + "\nВычитание a - b: " + substraction(a, b) + "\nУмножение a * b: " + multiplication(a, b) + "\nДеление a / b: " + division(a, b));
};

function mathOperation(arg1, arg2, operation) {
    // break; здесь не нужен, тк return
    switch (operation) {
        case "sum":
            return sum(arg1, arg2);
        case "substraction":
            return substraction(arg1, arg2);
        case "multiplication":
            return multiplication(arg1, arg2);
        case "division":
            return division(arg1, arg2);
        default:
            alert("Enter a correct operation: sum, substraction, multiplication, division");
            return null;
    }
}

function zeroAndNull() {
    return 0 === null;
}

function power(val, pow) {
    return pow <= 1 ? val : val * power(val, pow - 1);
}

// function copyNameToAdmin(inputName) {
//     // Явно задаю переменные. что требуется в дз
//     let name, admin;
//     name = inputName;
//     admin = name;
//     alert("Введена строка " + inputName + " в переменную name, переменная admin = " + admin)
// }
