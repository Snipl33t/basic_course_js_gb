const chessBoard = {
    columnNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    fields: {},

    createCell(rowElement, row, column, color) {
        if (column === 'A') {
            const cell = document.createElement('th');
            cell.innerHTML = row;
            cell.style.borderRight = '1px solid #000';
            cell.style.padding = '0.5em';
            rowElement.appendChild(cell);
            this.fields[row] = {};
        }
        const cell = document.createElement('td');
        switch (row) {
            case 8:
                cell.style.borderTop = '1px solid #000';
                switch (column) {
                    case 'A':
                    case 'H':
                        cell.innerHTML = '♜';
                        break;
                    case 'B':
                    case 'G':
                        cell.innerHTML = '♞';
                        break;
                    case 'C':
                    case 'F':
                        cell.innerHTML = '♝';
                        break;
                    case 'D':
                        cell.innerHTML = '♛';
                        break;
                    case 'E':
                        cell.innerHTML = '♚';
                        break;
                }
                break;
            case 1:
                cell.style.borderBottom = '1px solid #000';
                switch (column) {
                    case 'A':
                    case 'H':
                        cell.innerHTML = '♖';
                        break;
                    case 'B':
                    case 'G':
                        cell.innerHTML = '♘';
                        break;
                    case 'C':
                    case 'F':
                        cell.innerHTML = '♗';
                        break;
                    case 'D':
                        cell.innerHTML = '♕';
                        break;
                    case 'E':
                        cell.innerHTML = '♔';
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                cell.innerHTML = '♙';
                break;
            case 7:
                cell.innerHTML = '♟';
                break;
            default:
                break;
        }

        if (column === 'H') {
            cell.style.borderRight = '1px solid #000';
        }
        cell.style.width = '1.5em';
        cell.style.height = '1.5em';
        cell.style.textAlign = 'center';
        cell.style.fontSize = '32px';
        cell.style.lineHeight = '0';
        cell.style.backgroundColor = color;
        rowElement.appendChild(cell);

        // На будущее, вдруг надо сделать ходы и тд...
        this.fields[row][column] = cell;
    },

    createBoard(anchor) {
        let prevField = '';
        const tableElement = document.createElement('table');
        tableElement.style.margin = 'auto';
        tableElement.style.borderSpacing = '0';
        tableElement.style.borderCollapse = 'collapse';
        const tableBody = document.createElement('tbody');
        for (let row = 9; row > 0; row--) {
            const rowElement = document.createElement('tr');
            if (row === 9) {
                const emptyCell = document.createElement('th');
                rowElement.appendChild(emptyCell);
                for (const column of this.columnNames) {
                    const cell = document.createElement('th');
                    cell.style.padding = '0.5em';
                    cell.style.borderBottom = '1px solid #000';
                    cell.innerHTML = column;
                    rowElement.appendChild(cell);
                }
                tableBody.appendChild(rowElement);
            } else {
                if (row % 2 === 0) {
                    prevField = '#fd4800'
                } else {
                    prevField = 'white'
                }
                for (const column of this.columnNames) {
                    if (prevField === 'white') {
                        prevField = '#fd4800';
                    } else {
                        prevField = 'white';
                    }
                    this.createCell(rowElement, row, column, prevField);
                }
                tableBody.appendChild(rowElement);
            }
        }

        tableElement.appendChild(tableBody);
        anchor.appendChild(tableElement);
    },
}



function numberToObject(number) {
    if (number < 0) {
        console.log("Число меньше 0!");
    } else if (number > 999) {
        console.log("Число больше 999!");
    } else {
        let ones = Math.trunc(number % 10);
        let tens = Math.trunc(number / 10 % 10);
        let hundreds = Math.trunc(number / 100 % 10);
        return { "единицы": ones, "десятки": tens, "сотни": hundreds };
    }
    return {};
};

function ShopItem(id, name, price, amount) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
};

const basket = {
    htmlAnchor: null,
    items: [],
    totalPrice: 0,
    attachAnchor(anchor) {
        this.htmlAnchor = anchor;
    },

    countTotalPrice() {
        let sum = 0;

        for (let i = 0; i < this.items.length; i++) {
            let curItem = this.items[i];
            sum += curItem.price * curItem.amount;
        }

        this.totalPrice = Math.round(sum * 100) / 100;
    },

    getTotalPrice() {
        return this.totalPrice;
    },

    saveElement() {
        let elementId = this.items.length + 1;
        const newElementName = this.htmlAnchor.id + "_element_" + elementId;
        const name_el = document.getElementById(newElementName + '_name');
        const price_el = document.getElementById(newElementName + '_price');
        const amount_el = document.getElementById(newElementName + '_amount');

        //Почитал в интернете про методы прототипирования, старый вариант оставлен ниже
        this.items.push(new ShopItem(elementId, name_el.value, Number(price_el.value), Number(amount_el.value)))


        // this.items.push(
        //     {
        //         id: elementId,
        //         name: name_el.value,
        //         price: Number(price_el.value),
        //         amount: Number(amount_el.value)
        //     }
        // );


        // Здесь я тестировал преобразование инпута в текст, сохранил себе.

        // name_el.replaceWith(this.items[elementId - 1].name);
        // price_el.replaceWith(this.items[elementId - 1].price);
        // amount_el.replaceWith(this.items[elementId - 1].amount);
    },

    createElement() {
        let newElementName = this.htmlAnchor.id + "_element_" + ++numberOfListElements;
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
        this.htmlAnchor.appendChild(li);
    }
};
