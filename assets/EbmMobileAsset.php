<?php

namespace ebestmall\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class EbmMobileAsset extends AssetBundle
{
    public $sourcePath = '@vendor/hongyukeji/ebestmall-html/mobile/static/';
    public $css = [
        'css/app.css',
    ];
    public $js = [
        'js/app.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];
}
