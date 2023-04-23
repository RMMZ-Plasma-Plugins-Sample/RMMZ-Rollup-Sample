// Plasma_ThinMessageWindow 1.1.0
// Copyright (c) 2023 Plasma
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2023/04/23 1.1.0 スイッチと幅をパラメータ化する
 * 2023/04/16 1.0.0 公開
 */

/*:
 * @plugindesc メッセージウィンドウの幅を変更する
 * @author Plasma
 * @license MIT
 *
 * @target MZ
 * @url https://github.com/elleonard/DarkPlasma-MZ-Plugins/tree/release
 *
 * @param thinMessageWindowSwitch
 * @desc このスイッチがONのとき、メッセージウィンドウの幅を細くします。
 * @text スイッチ
 * @type switch
 * @default 0
 *
 * @param thinMessageWindowWidth
 * @desc 細くなったメッセージウィンドウの幅を指定します。
 * @text 幅
 * @type number
 * @default 350
 *
 * @help
 * version: 1.1.0
 * 指定したスイッチがONの時、メッセージウィンドウの幅を細くします。
 */

(() => {
  'use strict';

  const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
  });

  const pluginParameters = PluginManager.parameters(pluginName);

  const settings = {
    thinMessageWindowSwitch: Number(pluginParameters.thinMessageWindowSwitch || 0),
    thinMessageWindowWidth: Number(pluginParameters.thinMessageWindowWidth || 350),
  };

  /**
   * メッセージウィンドウの幅を細くするスイッチ
   */
  const THIN_MESSAGE_WINDOW_SWITCH = settings.thinMessageWindowSwitch;

  /**
   * 細くなったメッセージウィンドウの幅
   */
  const THIN_MESSAGE_WINDOW_WIDTH = settings.thinMessageWindowWidth;

  function Window_Message_ThinMessageWindowMixIn(windowClass) {
    const _initialize = windowClass.initialize;
    windowClass.initialize = function (rect) {
      _initialize.call(this, rect);
      this._defaultWidth = rect.width;
    };

    const _updatePlacement = windowClass.updatePlacement;
    windowClass.updatePlacement = function () {
      if (this.windowWidth() !== this.width) {
        /**
         * ウィンドウを作ったときに設定した幅、x座標を再設定し
         * 描画範囲を再度生成する
         */
        this.width = this.windowWidth();
        this.x = (Graphics.boxWidth - this.width) / 2;
        this.createContents();
      }
      _updatePlacement.call(this);
    };

    windowClass.windowWidth = function () {
      return $gameSwitches.value(THIN_MESSAGE_WINDOW_SWITCH) ? THIN_MESSAGE_WINDOW_WIDTH : this._defaultWidth;
    };  
  }

  Window_Message_ThinMessageWindowMixIn(Window_Message.prototype);

})();
