function StoreItem(id, name, price, amount) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.amount = amount;
};

const store = {
    items: {},
    warehouse: {},

    addNewItem(storeItem) {
        this.items[storeItem.id] = storeItem;
        if (!this.warehouse.hasOwnProperty(storeItem.id)) {
            this.warehouse[storeItem.id] = new StoreItem(storeItem.id, storeItem.name, storeItem.price, 0);
        }
    },

    addNewItemToWarehouse(storeItem) {
        this.warehouse[storeItem.id] = storeItem;
        if (!this.items.hasOwnProperty(storeItem.id)) {
            this.items[storeItem.id] = new StoreItem(storeItem.id, storeItem.name, storeItem.price, 0);
        }
    },

    takeItem(itemId, amount) {
        let difference = this.items[itemId].amount - amount;
        let amountToGet = 0;
        if (difference < 0) {
            amountToGet = this.items[itemId].amount;
            this.items[itemId].amount = 0;
            if (difference + this.warehouse[itemId].amount < 0) {
                amountToGet += this.warehouse[itemId].amount;
                this.warehouse[itemId].amount = 0;
            } else {
                this.warehouse[itemId].amount += difference;
                amountToGet -= difference;
            }
        } else {
            amountToGet = amount;
            this.items[itemId].amount -= amount;
        }
        return amountToGet;
    }
};

const basket = {
    items: {},
    totalPrice: 0,

    addItemToBasket(storeItem, amount) {
        if (!this.items.hasOwnProperty(storeItem.id)) {
            this.items[storeItem.id] = new StoreItem(storeItem.id, storeItem.name, storeItem.price, amount);
        } else {
            this.items[storeItem.id].amount += amount;
        }
    },

    calculateTotalPrice() {
        this.totalPrice = 0;
        for (item in this.items) {
            this.totalPrice = this.items[item].amount * this.items[item].price;
        }
        return this.totalPrice;
    }
}

function updateItemValues(itemId) {
    const stock = document.getElementById(`store_in_stock_${itemId}`);
    const warehouse = document.getElementById(`store_in_warehouse_${itemId}`);
    const basketObj = document.getElementById(`store_basket_list`);
    const basketList = basketObj.getElementsByTagName("li");
    const basketTotal = document.getElementById("store_basket_total");

    if (store.items[itemId].amount === 0) {
        stock.innerHTML = `In stock: out of stock!`;
        stock.style.color = 'red';
    } else {
        stock.innerHTML = `In stock: ${store.items[itemId].amount} pieces`;
    }

    if (store.warehouse[itemId].amount === 0) {
        warehouse.innerHTML = `At warehouse: out of stock!`;
        warehouse.style.color = 'red';
    } else {
        warehouse.innerHTML = `At warehouse: ${store.warehouse[itemId].amount} pieces`;
    }

    let idIsFound = false;
    for (let item of basketList) {
        let basketItemId = item.id.split("_")[3];
        if (itemId == basketItemId) {
            item.innerHTML = `${basket.items[itemId].amount} pieces of "${basket.items[itemId].name}" for ${basket.items[itemId].price}$ each`;
            idIsFound = true;
        }
    }
    if (!idIsFound) {
        const basket_item = document.createElement("li");
        basket_item.innerHTML = `${basket.items[itemId].amount} pieces of "${basket.items[itemId].name}" for ${basket.items[itemId].price}$ each`;
        basket_item.id = `store_basket_item_${itemId}`;
        basketObj.appendChild(basket_item);
    }

    basketTotal.innerHTML = `Total: ${basket.calculateTotalPrice()}$`;
}

function fillTheStore() {

    store.addNewItem(new StoreItem(0, "Cool Jacket", 200, 10));
    store.addNewItem(new StoreItem(1, "Skirt", 20, 50));
    store.addNewItem(new StoreItem(2, "Some Cap", 5, 100));

    store.addNewItemToWarehouse(new StoreItem(0, "Cool Jacket", 200, 500));
    store.addNewItemToWarehouse(new StoreItem(1, "Skirt", 20, 1000));
    store.addNewItemToWarehouse(new StoreItem(2, "Some Cap", 5, 2000));
    store.addNewItemToWarehouse(new StoreItem(3, "Warehouse Item", 300, 20));

}

function createPage() {
    const storeBox = document.getElementById("store_box");

    storeBox.addEventListener('click', ({ target }) => {
        if (target.tagName === 'BUTTON') {
            let itemId = target.id.split("_")[2];
            let availableAmount = store.takeItem(itemId, +document.getElementById(`basket_input_${itemId}`).value);
            basket.addItemToBasket(store.items[itemId], availableAmount);
            updateItemValues(itemId);
        }
    });

    storeBox.style.display = "grid";
    storeBox.style.gridTemplateColumns = "repeat(auto-fit, minmax(300px, 1fr))";
    storeBox.style.gridColumnGap = "50px";
    storeBox.style.gridRowGap = "20px";

    for (let id in store.items) {
        if (store.items.hasOwnProperty(id)) {
            const itemDiv = document.createElement("div");
            const itemImg = document.createElement("img");
            const itemName = document.createElement("h4");
            const itemPrice = document.createElement("p");
            const itemStock = document.createElement("p");
            const itemWarehouse = document.createElement("p");
            const itemInput = document.createElement("input");
            const itemAddToBascet = document.createElement("button");


            itemDiv.style.display = "inline-grid";
            itemDiv.style.boxSizing = "border-box";
            itemDiv.style.padding = "44px 32px";
            itemDiv.style.border = "1px solid black";

            itemImg.style.alignSelf = "center";
            itemImg.style.marginBottom = "51px";
            itemImg.alt = `Picture of ${store.items[id].name}`;

            itemName.style.fontSize = "20px";
            itemName.style.marginBottom = "14px";
            itemName.innerHTML = store.items[id].name;

            itemPrice.style.fontSize = "14px";
            itemPrice.style.marginBottom = "14px";
            itemPrice.innerHTML = `Price: ${store.items[id].price}$`;

            itemStock.style.fontSize = "14px";
            itemStock.style.marginBottom = "14px";
            itemStock.innerHTML = `In stock: ${store.items[id].amount} pieces`;
            itemStock.id = `store_in_stock_${id}`;

            itemWarehouse.style.fontSize = "14px";
            itemWarehouse.style.marginBottom = "14px";
            itemWarehouse.innerHTML = `At warehouse: ${store.warehouse[id].amount} pieces`;
            itemWarehouse.id = `store_in_warehouse_${id}`;

            itemAddToBascet.innerHTML = "Add to basket";
            itemAddToBascet.id = `basket_btn_${id}`;

            itemInput.id = `basket_input_${id}`;
            itemInput.type = "number";

            itemDiv.appendChild(itemImg);
            itemDiv.appendChild(itemName);
            itemDiv.appendChild(itemPrice);
            itemDiv.appendChild(itemStock);
            itemDiv.appendChild(itemWarehouse);
            itemDiv.appendChild(itemInput);
            itemDiv.appendChild(itemAddToBascet);
            storeBox.appendChild(itemDiv);
        }
    }
}

fillTheStore();
createPage();




// function numberToObject(number) {
//     if (number < 0) {
//         console.log("Число меньше 0!");
//     } else if (number > 999) {
//         console.log("Число больше 999!");
//     } else {
//         let ones = Math.trunc(number % 10);
//         let tens = Math.trunc(number / 10 % 10);
//         let hundreds = Math.trunc(number / 100 % 10);
//         return { "единицы": ones, "десятки": tens, "сотни": hundreds };
//     }
//     return {};
// };

// function ShopItem(id, name, price, amount) {
//     this.id = id;
//     this.name = name;
//     this.price = price;
//     this.amount = amount;
// };

// const basket = {
//     htmlAnchor: null,
//     items: [],
//     totalPrice: 0,
//     attachAnchor(anchor) {
//         this.htmlAnchor = anchor;
//     },

//     countTotalPrice() {
//         let sum = 0;

//         for (let i = 0; i < this.items.length; i++) {
//             let curItem = this.items[i];
//             sum += curItem.price * curItem.amount;
//         }

//         this.totalPrice = Math.round(sum * 100) / 100;
//     },

//     getTotalPrice() {
//         return this.totalPrice;
//     },

//     saveElement() {
//         let elementId = this.items.length + 1;
//         const newElementName = this.htmlAnchor.id + "_element_" + elementId;
//         const name_el = document.getElementById(newElementName + '_name');
//         const price_el = document.getElementById(newElementName + '_price');
//         const amount_el = document.getElementById(newElementName + '_amount');

//         //Почитал в интернете про методы прототипирования, старый вариант оставлен ниже
//         this.items.push(new ShopItem(elementId, name_el.value, Number(price_el.value), Number(amount_el.value)))


//         // this.items.push(
//         //     {
//         //         id: elementId,
//         //         name: name_el.value,
//         //         price: Number(price_el.value),
//         //         amount: Number(amount_el.value)
//         //     }
//         // );


//         // Здесь я тестировал преобразование инпута в текст, сохранил себе.

//         // name_el.replaceWith(this.items[elementId - 1].name);
//         // price_el.replaceWith(this.items[elementId - 1].price);
//         // amount_el.replaceWith(this.items[elementId - 1].amount);
//     },

//     createElement() {
//         let newElementName = this.htmlAnchor.id + "_element_" + ++numberOfListElements;
//         let li = document.createElement('LI');
//         li.id = newElementName;

//         let input_name = document.createElement('INPUT');
//         input_name.type = "text";
//         input_name.id = newElementName + "_name";

//         let input_price = document.createElement('INPUT');
//         input_price.type = "number";
//         input_price.id = newElementName + "_price";

//         let input_amount = document.createElement('INPUT');
//         input_amount.type = "number";
//         input_amount.id = newElementName + "_amount";

//         li.innerHTML += input_name.outerHTML + ": цена за шт: " + input_price.outerHTML + ", количество: " + input_amount.outerHTML;
//         this.htmlAnchor.appendChild(li);
//     }
// };
