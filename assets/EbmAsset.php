<?php

namespace ebestmall\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 * use ebestmall\web\EbmAsset;
 * EbmAsset::register($this);
 * $baseUrl = $this->assetBundles[EbmAsset::className()]->baseUrl;
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
        'yii\bootstrap\BootstrapAsset',
    ];
}
