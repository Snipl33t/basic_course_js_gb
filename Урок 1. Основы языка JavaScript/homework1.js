function translateToFahrenheit(tc) {
    // Явно пишу формулу, можно сразу писать в алерте
    let tf = 9 / 5 * tc + 32;
    alert("Температура в Цельсиях = " + tc + ", в Фаренгейтах это будет " + tf);
};

function copyNameToAdmin(inputName) {
    // Явно задаю переменные. что требуется в дз
    let name, admin;
    name = inputName;
    admin = name;
    alert("Введена строка " + inputName + " в переменную name, переменная admin = " + admin)
}