class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}
function sum(arr) {
    return arr.reduce(function (a, b) {
        return a + b;
    }, 0);
}
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    items_sum() {
        return sum(this.goods.map(function (a) { return a.price; }))
    }
}


class Basket {
    constructor() {
        this.items = []
    }

    additem(item) {
        this.items.additem(item)
    }
}

class BasketItem {
    remove_from_basket() {
    }

}



const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.items_sum())