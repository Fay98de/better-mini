const syncPreset: RegExp[] = [/[a-z]Sync$/, /^(on|off)[A-Z]/, /^create[A-Z]/]
const alipaySyncApis: string[] = [
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
]
const taobaoSyncApis: string[] = []
const qianniuMobileSyncApis: string[] = []
const qianniuDesktopSyncApis: string[] = []

const alipayProps: string[] = ['env', 'SDKVersion']
const taobaoProps: string[] = []
const qianniuMobileProps: string[] = []
const qianniuDesktopProps: string[] = []

export default {
  syncPreset,
  syncApis: [
    ...alipaySyncApis,
    ...taobaoSyncApis,
    ...qianniuMobileSyncApis,
    ...qianniuDesktopSyncApis,
  ],
  props: [...alipayProps, ...taobaoProps, ...qianniuMobileProps, ...qianniuDesktopProps],
}
