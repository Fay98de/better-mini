"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var syncPreset = [/[a-z]Sync$/, /^(on|off)[A-Z]/, /^create[A-Z]/];
var alipaySyncApis = [
    'ap.navigateToAlipayPage',
    'ap.openCardLis',
    'ap.updateAlipayClient',
    'canIUse',
    'clearStorage',
    'getBackgroundAudioManager',
    'getUpdateManager',
    'hideAddToDesktopMenu',
    'hideAllAddToDesktopMenu',
    'hideBackHome',
    'hideKeyboard',
    'hideLoading',
    'hideNavigationBarLoading',
    'makePhoneCall',
    'navigateBack',
    'openCardDetail',
    'openCardList',
    'openCardList',
    'openKBVoucherDetail',
    'openMerchantCardList',
    'openMerchantCardList',
    'openMerchantTicketList',
    'openMerchantVoucherList',
    'openTicketDetail',
    'openTicketList',
    'openVoucherDetail',
    'openVoucherList',
    'reportAnalytics',
    'setCanPullDown',
    'showNavigationBarLoading',
    'showSharePanel',
];
var taobaoSyncApis = [];
var qianniuMobileSyncApis = [];
var qianniuDesktopSyncApis = [];
var alipayProps = ['env', 'SDKVersion'];
var taobaoProps = [];
var qianniuMobileProps = [];
var qianniuDesktopProps = [];
exports.default = {
    syncPreset: syncPreset,
    syncApis: __spreadArray(__spreadArray(__spreadArray(__spreadArray([], alipaySyncApis), taobaoSyncApis), qianniuMobileSyncApis), qianniuDesktopSyncApis),
    props: __spreadArray(__spreadArray(__spreadArray(__spreadArray([], alipayProps), taobaoProps), qianniuMobileProps), qianniuDesktopProps),
};
//# sourceMappingURL=my.config.js.map