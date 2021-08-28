Vue.component('basket', {
    data: function () {
        return {
            basket_goods: [],
            quantity: 0,
            total_sum: 0,
        }
    },
    methods: {
        basket_price_sum() {
            return this.basket_goods.reduce((partial_sum, a) => partial_sum + a.price * a.count, 0);
        },
        delete_item(id) {
            var ind = this.basket_goods.findIndex(function (element) {
                return element.id_product === id;
            })
            this.quantity -= this.basket_goods[ind]['count']
            this.basket_goods.splice(ind, 1)

        },
        carttoj(data) {
            this.$root.makePOSTRequest("/addToCart", data)
        }
        ,
        cartdel(data) {
            this.$root.makePOSTRequest("/deleteCart", data)
        }

    },
    mounted() {
        this.$root.$on('add_to_basket', good => {
            if (this.basket_goods.some(o => o.id_product === good.id_product)) {
                this.basket_goods.filter(function (val) {
                    return val.id_product == good.id_product;
                })[0]['count'] += 1

            }
            else {
                good['count'] = 1
                this.basket_goods.push(good)

            }
            this.quantity += 1
            alert(`Вы добавили товар :${good.product_name} в корзину`)

        });
    },
    template: `
    <div id="okno">
          Корзина
          <div class="table-responsive">
          <table class="table table-hover table-bordered">
              <thead >
                  <tr>
                      <th>Название</th>
                      <th>Цена</th>
                      <th>Количество</th>
                      <th>Сумма</th>
                      <th> </th>
                  </tr>
                  <tr v-for="item in basket_goods":data-id="item.id_product">
                       <th>  {{ item.product_name }}</th>
                       <th>  {{ item.price }}</th>
                       <th>  {{ item.count }} </th>
                       <th>  {{ item.price * item.count }}</th>
                       <th>  <button type="button" class="btn btn-danger" v-on:click="delete_item(item.id_product)">Удалить</button>
                       </th>
                    </tr>       
              </thead>
          </table>
      </div>

      <div>Итого: {{quantity}} товаров на {{basket_price_sum()}}  руб.</div>
      <br>
      <button id="order" class="btn btn-info" v-on:click="carttoj(basket_goods)">Оформить заказ</button>
      <button id="order" class="btn btn-info" v-on:click="cartdel()">Удалить заказ заказ</button>
      

         <a href="#" class="close">Закрыть корзину</a>
    </div>`

});