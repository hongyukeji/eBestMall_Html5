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
                CalculatePrice($(_this).siblings(inputName));
            }
        });
        BtnDecrease.on('click', function () {
            var _this = this;
            var Number = $(_this).siblings(inputName).val();
            if (parseInt(Number) > 1) {
                $(_this).siblings(inputName).val(parseInt(Number) - 1);
                CalculatePrice($(_this).siblings(inputName));
            }
        });

        /* Cart Price */
        var cartListItem = '.cart-list-body-info-item-form';
        var cartNumber = $('.goods-number-input');
        var cartUnitPrice = $('.cart-goods-unit-price');
        var cartSubtotal = $('.cart-goods-subtotal');
        var cartTotalPrice = $('.cart-goods-total-price');
        var cartTotalNumber = $('.cart-goods-total-number');
        cartNumber.change(function () {
            var _this = $(this);
            CalculatePrice(_this);
        });

        function CalculatePrice(_this) {
            var _Number = _this.val();
            var _UnitPrice = _this.parents(cartListItem).find(cartUnitPrice).text();
            var _Subtotal = (_UnitPrice * _Number).toFixed(2);
            _this.parents(cartListItem).find(cartSubtotal).text(_Subtotal);
            cartTotal();
        }

        function cartTotal() {
            var _TotalPrice = 0;
            var _TotalNumber = 0;
            cartNumber.each(function () {
                var _NumberThis = $(this);
                _TotalNumber += parseFloat(_NumberThis.val()) * 1;
            });
            cartSubtotal.each(function () {
                var _SubtotalThis = $(this);
                _TotalPrice += parseFloat(_SubtotalThis.text()) * 1;
            });

            cartTotalNumber.text(_TotalNumber);
            cartTotalPrice.text(_TotalPrice.toFixed(2));
        }
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
                if ($(this).parents('.cart-list').siblings('.cart-list').find(cartCheckbox).prop('checked') !== false) {
                    cartCheckboxAll.prop('checked', this.checked);
                }
            } else {
                $('.my-cart').find(cartCheckboxAll).prop('checked', this.checked);
            }
            $(this).parents('.cart-list-body-shop').siblings('.cart-list-body-info-wrap').find('.checkbox').prop('checked', this.checked);
        });

        $('.cart-list-body-info-wrap').find('.checkbox').on('click', function () {
            if ($(this).prop('checked') === true) {
                if ($(this).parents('.cart-list-body-info').siblings('.cart-list-body-info').find('.checkbox').prop('checked') !== false) {
                    $(this).parentsUntil(cartCheckboxWrap).find(cartCheckbox).prop('checked', this.checked);
                    if ($(this).parents('.cart-list').siblings('.cart-list').find(cartCheckbox).prop('checked') === true) {
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