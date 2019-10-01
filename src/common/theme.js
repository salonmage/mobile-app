export const LightTheme = {
  isTablet: false,

  primaryColor: '#1890ff',
  layoutBackgroundColor: 'white',
  statusBarBackgroundColor: '#0C59FB',
  topBarBackgroundColor: '#0C59FB',
  topBarTitleColor: 'white',
  touchBackgroundColor: 'white',

  iconSizeDefault: 24,
  avatarSizeDefault: 40,

  primaryTextColor: 'black',

  button: {
    backgroundColor: {
      primary: '#ff6000',
      secondary: '#ffebe5',
    },
  },

  fontRegular: 'OpenSans-Regular',
  fontSemiBold: 'OpenSans-SemiBold',
  fontBold: 'OpenSans-Bold',
  fontItalic: 'OpenSans-Italic',
  fontLight: 'OpenSans-Light',

  fontSizeLarge: 18,
  fontSizeDefault: 16,
  fontSizeSmall: 14,
  fontSizeSmaller: 13,
  fontSizeSmallest: 12,
};

export const DarkTheme = {
  ...LightTheme,
  // topBarBackgroundColor: 'white'
};
