let numberOfListElements = 1;

async function displaySimpleUptoHundred(element) {
    simpleNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    for (let i = 0; i < simpleNumbers.length; i++) {
        element.innerHTML = simpleNumbers[i];
        await delay(500);
    }
};

// Захотелось разобраться с DOM немного
function createNewElement(list) {
    let newElementName = list.id + "_element_" + ++numberOfListElements;
    let li = document.createElement('LI');
    li.id = newElementName;

    let input_name = document.createElement('INPUT');
    input_name.type = "text";
    input_name.id = newElementName + "_name";

    let input_price = document.createElement('INPUT');
    input_price.type = "number";
    input_price.id = newElementName + "_price";

    let input_amount = document.createElement('INPUT');
    input_amount.type = "number";
    input_amount.id = newElementName + "_amount";

    li.innerHTML += input_name.outerHTML + ": цена за шт: " + input_price.outerHTML + ", количество: " + input_amount.outerHTML;
    list.appendChild(li);
};

// Массив явно не реализовывал, т.к. как я считаю мое решение получилось тоже вполне себе интересным, но в целом добавить массив - не проблема
// Пожалуйста, если не сложно, посмотрите еще саму страницу html :)
function countBasketPrice(list) {
    let sum = Number(0);
    for (let i = 1; i <= list.getElementsByTagName('li').length; i++) {
        sum += document.getElementById(list.id + "_element_" + i + "_price").value * document.getElementById(list.id + "_element_" + i + "_amount").value;
    }
    return sum;
}

// Просто экспериментирую с функциями, это для введения задержки в отображении чисел
function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
};

function outputFrom0To9() {
    for (let i = 0; i <= 9; alert(i++)) { }
};

async function logPyramid() {
    let sum = 'x';
    for (let i = 0; i < 20; i++) {
        console.log(sum);
        sum += 'x';
    }
};
