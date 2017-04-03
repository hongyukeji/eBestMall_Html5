$(document).ready(function () {
    cartClickEvent();    // Cart Click

    function cartClickEvent() {
        cartGoodsNumber();
    }

    function cartGoodsNumber() {
        var NumberValue = $('.cart-goods-number .goods-number-input');
        NumberValue.on('change', function () {
            var Number = NumberValue.val();
            if (parseInt(Number) <= 0) {
                NumberValue.val(1);
            } else if (parseInt(Number) > 99999) {
                NumberValue.val(99999);
            }
        });

        var BtnIncrease = $('.cart-goods-number .increase');
        var BtnDecrease = $('.cart-goods-number .decrease');
        var inputName = '.goods-number-input';

        BtnIncrease.on('click', function () {
            var _this = this;
            var Number = $(_this).siblings(inputName).val();
            if (parseInt(Number) < 9999) {
                $(_this).siblings(inputName).val(parseInt(Number) + 1);
            }
        });
        BtnDecrease.on('click', function () {
            var _this = this;
            var Number = $(_this).siblings(inputName).val();
            if (parseInt(Number) > 1) {
                $(_this).siblings(inputName).val(parseInt(Number) - 1);
            }
        });
    }
});