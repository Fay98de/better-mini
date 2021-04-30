const syncPreset: RegExp[] = [/[a-z]Sync$/, /^(on|off)[A-Z]/, /^create[A-Z]/]
const syncApis: string[] = [
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
]
const props: string[] = ['env']

export default { syncPreset, syncApis, props }
