<?php

namespace ebestmall\web;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class EbmAsset extends AssetBundle
{
    public $sourcePath = '@vendor/hongyukeji/ebestmall-html/static/';
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
