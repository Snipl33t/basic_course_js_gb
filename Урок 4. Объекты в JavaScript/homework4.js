// К сожалению времени особо нынче нет, экзамены в универе, поэтому не получилось сделать свою игру, но игра работает если ввести game.start().

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
