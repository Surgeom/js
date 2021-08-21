Vue.component('vue-comp-1', {
    props: ['props1', 'props2', 'count'],
    template: `<div>
      <h3>vue-comp-1 created</h3>
      <p>{{var1}}</p>
      <p>{{props1}}</p>
      <p>{{props2}}</p>
      <button type="button" @click="add()">+</button>
      <button type="button" @click="subtract()">-</button>
    </div>`,
    data: () => ({
        var1: 'vue-comp-1 data',
    }),
    methods: {
        add() {
            this.count++;
            this.$emit('increment', this.count);
        },
        subtract() {
            this.count--;
            this.$emit('minus', this.count);
        }
    },
});

Vue.component('vue-parent', {
    template: `
    <div>
      <h3>vue-parent created</h3>
      <p>{{count}}</p>
      <vue-comp-1 :props1="var1" :props2="var2" :count="count" @increment="event" @minus="event"></vue-comp-1>
    </div>`,
    data: () => ({
        var1: 'parent data 1',
        var2: 'parent data 2',
        count: 0,
    }),
    methods: {
        event($event) {
            this.count = $event;
        },
    }
})

Vue.component('vue-wrapper', {
    template: `
    <div class="wrapper">
      <slot></slot>
    </div>`
})

Vue.component('vue-comp-2', {
    template: `<div>
    <p class=>vue-comp-2</p>
    <p>{{count}}</p>
    <button type="button" @click="add()">+</button>
    <button type="button" @click="subtract()">-</button>
    </div>`,
    data: () => ({
        var1: 'vue-comp-2 data',
        count: 0,
    }),
    methods: {
        add() {
            this.count++;
        },
        subtract() {
            this.count--;
        }
    },
    mounted() {
        this.count = 10;
    }
})




Vue.component('vue-header', {
    template: `<div class="">
    <slot></slot>
    </div> `,
});

Vue.component('search');
Vue.component('backet');
Vue.component('backet-item');

Vue.component('goods-item', {
    props: ['good'],
    template: `
      <div class="goods-item">
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
      </div>
    `,
    methods: {
        add(item) {

        }
    }
});

const app = new Vue({
    el: '#app',
    data: {

    }
});

