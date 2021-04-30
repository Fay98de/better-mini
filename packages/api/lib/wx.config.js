"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var syncPreset = [/[a-z]Sync$/, /^(on|off)[A-Z]/, /^create[A-Z]/];
var syncApis = [
    'canIUse',
    'base64ToArrayBuffer',
    'arrayBufferToBase64',
    'getUpdateManager',
    'getRealtimeLogManager',
    'getLogManager',
    'nextTick',
    'getMenuButtonBoundingClientRect',
    'getBackgroundAudioManager',
    'getRecorderManager',
    'getFileSystemManager',
    'reportMonitor',
    'reportEvent',
    'reportAnalytics',
    'reportPerformance',
    'getPerformance',
    'getNFCAdapter',
];
var props = ['env'];
exports.default = { syncPreset: syncPreset, syncApis: syncApis, props: props };
//# sourceMappingURL=wx.config.js.map