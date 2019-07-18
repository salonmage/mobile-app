import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';

import withProviders from './provider';
import theme from './theme';
import Initial from '../screens/Root/Initial';
import SignIn from '../screens/Root/SignIn';
import SignUp from '../screens/Root/SignUp';
import UserList from '../screens/User/List';
import UserDetail from '../screens/User/Detail';
import UserEdit from '../screens/User/Edit';
import Doctor from '../screens/Work/Doctor';
import Technician from '../screens/Work/Technician';
import Me from '../screens/Me';
import Setting from '../screens/Setting';
//-----------------------------------------------

export const screens = {
  INITIAL: 'initial',
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  USER_LIST: 'user_list',
  USER_DETAIL: 'user_detail',
  USER_EDIT: 'user_edit',
  DOCTOR: 'doctor',
  TECHNICIAN: 'technician',
  ME: 'me',
  SETTING: 'setting'
};

const registerScreens = store => {
  Navigation.registerComponent(screens.INITIAL, () => {
    return withProviders(Initial, store);
  });
  Navigation.registerComponent(screens.SIGN_IN, () => {
    return withProviders(SignIn, store);
  });
  Navigation.registerComponent(screens.SIGN_UP, () => {
    return withProviders(SignUp, store);
  });
  Navigation.registerComponent(screens.USER_LIST, () => {
    return withProviders(UserList, store);
  });
  Navigation.registerComponent(screens.USER_DETAIL, () => {
    return withProviders(UserDetail, store);
  });
  Navigation.registerComponent(screens.USER_EDIT, () => {
    return withProviders(UserEdit, store);
  });
  Navigation.registerComponent(screens.DOCTOR, () => {
    return withProviders(Doctor, store);
  });
  Navigation.registerComponent(screens.TECHNICIAN, () => {
    return withProviders(Technician, store);
  });
  Navigation.registerComponent(screens.ME, () => {
    return withProviders(Me, store);
  });
  Navigation.registerComponent(screens.SETTING, () => {
    return withProviders(Setting, store);
  });
};

const defaultOptions = {
  layout: {
    backgroundColor: theme.statusBarBackgroundColor
  },
  statusBar: {
    style: 'light',
    ...Platform.select({
      ios: { hideWithTopBar: false, blur: true },
      android: { backgroundColor: theme.statusBarBackgroundColor }
    })
  },
  topBar: {
    visible: false,
    ...Platform.select({
      ios: { background: { translucent: false, blur: false } }
    }),
    title: {
      color: 'black',
      fontFamily: theme.fontSemiBold,
      fontSize: theme.fontSizeDefault
    },
    subtitle: {
      color: 'black',
      fontFamily: theme.fontRegular,
      fontSize: theme.fontSizeSmallest
    },
    backButton: {
      visible: false
    },
    leftButtons: [],
    background: {
      color: theme.topBarBackgroundColor,
      translucent: true,
      blur: true
    }
  }
};

const getLayoutComponent = (type, passProps) => {
  passProps = passProps || {};

  switch (type) {
    case screens.INITIAL:
      return {
        component: {
          id: screens.INITIAL,
          name: screens.INITIAL,
          passProps
        }
      };
    case screens.SIGN_IN:
      return {
        component: {
          id: screens.SIGN_IN,
          name: screens.SIGN_IN,
          options: SignIn.options,
          passProps
        }
      };
    case screens.SIGN_UP:
      return {
        component: {
          id: screens.SIGN_UP,
          name: screens.SIGN_UP,
          options: SignUp.options,
          passProps
        }
      };
    case screens.USER_LIST:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.USER_LIST,
                name: screens.USER_LIST,
                passProps
              }
            }
          ],
          options: {
            bottomTab: {
              icon: require('@src/assets/icons/users.png'),
              selectedIconColor: '#286efa',
              iconInsets: { bottom: -10 }
            }
          }
        }
      };
    case screens.USER_DETAIL:
      return {
        component: {
          id: screens.USER_DETAIL,
          name: screens.USER_DETAIL,
          passProps
        }
      };
    case screens.DOCTOR:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.DOCTOR,
                name: screens.DOCTOR,
                passProps
              }
            }
          ],
          options: {
            bottomTab: {
              icon: require('@src/assets/icons/doctor.png'),
              selectedIconColor: '#286efa',
              iconInsets: { bottom: -10 }
            }
          }
        }
      };
    case screens.TECHNICIAN:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.TECHNICIAN,
                name: screens.TECHNICIAN,
                passProps
              }
            }
          ],
          options: {
            bottomTab: {
              icon: require('@src/assets/icons/back.png'),
              selectedIconColor: '#286efa',
              iconInsets: { bottom: -10 }
            }
          }
        }
      };
    case screens.ME:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.ME,
                name: screens.ME,
                passProps
              }
            }
          ],
          options: {
            bottomTab: {
              icon: require('@src/assets/icons/me.png'),
              selectedIconColor: '#286efa',
              iconInsets: { bottom: -10 }
            }
          }
        }
      };
    case screens.SETTING:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.SETTING,
                name: screens.SETTING,
                passProps
              }
            }
          ],
          options: {
            bottomTab: {
              icon: require('@src/assets/icons/menu.png'),
              selectedIconColor: '#286efa',
              iconInsets: { bottom: -10 }
            }
          }
        }
      };
    default:
      console.log('unhandle screen component:', type);
      break;
  }
};

const bottomTabsOptions = {
  topBar: {
    visible: false
  },
  bottomTabs: {
    ...Platform.select({
      ios: {
        translucent: true,
        hideShadow: false
      },
      android: { titleDisplayMode: 'alwaysHide' }
    })
  },
  bottomTab: {
    selectedIconColor: '#286efa',
    ...Platform.select({
      ios: { iconInsets: { top: 0, left: 0, bottom: 0, right: 0 } }
    })
  }
};

export const layoutTypes = {
  OWNER: 'owner',
  DOCTOR: 'doctor',
  TECHNICIAN: 'technician',
  RECEPTIONIST: 'receptionist'
};

const layouts = {
  INIT: {
    stack: {
      children: [getLayoutComponent(screens.INITIAL)]
    }
  },
  OWNER: {
    bottomTabs: {
      id: layoutTypes.OWNER,
      children: [
        getLayoutComponent(screens.USER_LIST),
        getLayoutComponent(screens.DOCTOR),
        getLayoutComponent(screens.ME),
        getLayoutComponent(screens.SETTING)
      ],
      options: bottomTabsOptions
    }
  },
  DOCTOR: {
    bottomTabs: {
      id: layoutTypes.DOCTOR,
      children: [
        getLayoutComponent(screens.USER_LIST),
        getLayoutComponent(screens.DOCTOR),
        getLayoutComponent(screens.ME)
      ],
      options: bottomTabsOptions
    }
  },
  TECHNICIAN: {
    bottomTabs: {
      id: layoutTypes.TECHNICIAN,
      children: [
        getLayoutComponent(screens.TECHNICIAN),
        getLayoutComponent(screens.ME)
      ],
      options: bottomTabsOptions
    }
  },
  RECEPTIONIST: {
    bottomTabs: {
      id: layoutTypes.RECEPTIONIST,
      children: [
        getLayoutComponent(screens.USER_LIST),
        getLayoutComponent(screens.ME)
      ],
      options: bottomTabsOptions
    }
  }
};

export const setupLayout = store => {
  registerScreens(store);
  Navigation.setDefaultOptions(defaultOptions);
  Navigation.setRoot({ root: layouts.INIT });
};

export const gotoPrimaryScreen = (componentId, type) => {
  Navigation.push(componentId, layouts[type]);
};

export const popScreen = componentId => {
  Navigation.pop(componentId);
};

export const showSignIn = () => {
  Navigation.showModal({
    stack: {
      children: [getLayoutComponent(screens.SIGN_IN)]
    }
  });
};

export const hideSignIn = componentId => {
  Navigation.dismissModal(componentId);
};

export const gotoSignUp = componentId => {
  Navigation.push(componentId, getLayoutComponent(screens.SIGN_UP));
};
