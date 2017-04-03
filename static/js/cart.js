$(document).ready(function () {
    cartClickEvent();    // Cart Click

    function cartClickEvent() {
        cartGoodsNumber();
        cartCheckbox();
    }

    /* Cart Goods Number */
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

    /* Cart Checkbox */
    function cartCheckbox(){
        console.log(1);
    }

    function cartCheckbox_old() {
        var cartCheckboxAll = $('.cart-checkbox-all');
        cartCheckboxAll.on('click', function () {
            var _this = $(this);
            if($(_this).is(':checked')) {
                $('.my-cart').find('.checkbox').attr("checked",true);
            }else {
                $('.my-cart').find('.checkbox').attr("checked",false);
            }
        });

        var cartCheckboxWrap = $('.cart-list');
        var cartCheckbox = $('.cart-checkbox-list-all .checkbox');

        cartCheckboxWrap.find(cartCheckbox).on('click', function () {
            var _this = $(this);
            if($(_this).is(':checked')) {
                _this.parents('.cart-list-body-shop').siblings('.cart-list-body-info-wrap').find('.checkbox').attr("checked","checked");
            }else {
                $('.cart-checkbox-all').attr("checked",false);
                _this.parents('.cart-list-body-shop').siblings('.cart-list-body-info-wrap').find('.checkbox').attr("checked",false);
            }
        })
    }

});