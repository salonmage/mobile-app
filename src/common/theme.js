export const LightTheme = {
  primaryColor: '#1890ff',
  statusBarBackgroundColor: 'white',
  topBarBackgroundColor: '#ff6000',
  touchBackgroundColor: '#ff9000',

  iconSizeDefault: 24,

  button: {
    backgroundColor: {
      primary: '#ff6000',
      secondary: '#ffebe5'
    }
  }
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
