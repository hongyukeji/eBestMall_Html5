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
    function cartCheckbox() {
        var cartCheckboxAll = $('.cart-checkbox-all');
        var cartCheckboxWrap = $('.cart-list');
        var cartCheckbox = $('.cart-checkbox-list-all .checkbox');

        cartCheckboxAll.on('click', function () {
            $('.my-cart').find($('.checkbox')).prop('checked', this.checked);
        });

        cartCheckboxWrap.find(cartCheckbox).on('click', function () {
            if ($(this).prop('checked') === true) {
                if ($(this).parents().parents().parents('.cart-list').siblings('.cart-list').find(cartCheckbox).prop('checked') === true) {
                    cartCheckboxAll.prop('checked', this.checked);
                }
            } else {
                $('.my-cart').find(cartCheckboxAll).prop('checked', this.checked);
            }
            $(this).parents('.cart-list-body-shop').siblings('.cart-list-body-info-wrap').find('.checkbox').prop('checked', this.checked);
        });

        $('.cart-list-body-info-wrap').find('.checkbox').on('click', function () {
            if ($(this).prop('checked') === true) {
                if ($(this).parents().parents().parents('.cart-list-body-info').siblings('.cart-list-body-info').find('.checkbox').prop('checked') === true) {
                    $(this).parentsUntil(cartCheckboxWrap).find(cartCheckbox).prop('checked', this.checked);
                    if ($(this).parents().parents().parents('.cart-list').siblings('.cart-list').find(cartCheckbox).prop('checked') === true) {
                        cartCheckboxAll.prop('checked', this.checked);
                    }
                }
            } else {
                cartCheckboxAll.prop('checked', this.checked);
                $(this).parentsUntil(cartCheckboxWrap).find(cartCheckbox).prop('checked', this.checked);
            }
        });
    }
});