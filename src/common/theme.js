export const LightTheme = {
  primaryColor: '#1890ff',
  statusBarBackgroundColor: 'white',
  topBarBackgroundColor: 'white',
  touchBackgroundColor: 'white',

  iconSizeDefault: 24,
  avatarSizeDefault: 40,

  primaryTextColor: 'black',

  button: {
    backgroundColor: {
      primary: '#ff6000',
      secondary: '#ffebe5'
    }
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
  fontSizeSmallest: 12
};

export const DarkTheme = {
  ...LightTheme
  // topBarBackgroundColor: 'white'
};

let theme = { ...LightTheme };

export const setTheme = obj => {
  theme = obj;
};
export default theme;
