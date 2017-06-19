new Vue({
    el: "#content",
    data: {
        totalMoney: 0,
        storeList: []
    },
    filters: {
    },
    mounted: function () {
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods: {
        cartView: function () {
            var _this = this;
            this.$http.get("data/storeData.json", {"id": 1}).then(function (res) {
                _this.storeList = res.body.result.storeList;
            });
        },
        changeNumber: function (goods) {
            if (isNaN(goods.goodsNumber)){
                goods.goodsNumber = 1;
            }
            if (goods.goodsNumber > 9999) {
                goods.goodsNumber = 9999;
            }
            if (goods.goodsNumber <= 0) {
                goods.goodsNumber = 1;
            }
            console.log(goods.goodsNumber);
            console.log('此处执行ajax更新购物车列表中商品数量');
        },
        operationNumber: function (goods, way) {
            if (way > 0) {
                goods.goodsNumber++;
            } else {
                goods.goodsNumber--;
            }
            this.changeNumber(goods);
        },
        selectedGoods: function (item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, "checked", true);
            } else {
                item.checked = !item.checked;
            }
        },
        calcTotalPrice: function () {
            var _this = this;
        }
    }
});
Vue.filter("money", function (value) {
    return value.toFixed(2);
});