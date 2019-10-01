import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';

import withProviders from './provider';
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
import withSidebar from '../screens/Sidebar';
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
  SETTING: 'setting',
};

const registerScreens = (theme, store) => {
  Navigation.registerComponent(screens.INITIAL, () => {
    return withProviders(Initial, theme, store);
  });
  Navigation.registerComponent(screens.SIGN_IN, () => {
    return withProviders(SignIn, theme, store);
  });
  Navigation.registerComponent(screens.SIGN_UP, () => {
    return withProviders(SignUp, theme, store);
  });
  Navigation.registerComponent(screens.USER_LIST, () => {
    return withProviders(withSidebar(UserList), theme, store);
  });
  Navigation.registerComponent(screens.USER_DETAIL, () => {
    return withProviders(UserDetail, theme, store);
  });
  Navigation.registerComponent(screens.USER_EDIT, () => {
    return withProviders(UserEdit, theme, store);
  });
  Navigation.registerComponent(screens.DOCTOR, () => {
    return withProviders(Doctor, theme, store);
  });
  Navigation.registerComponent(screens.TECHNICIAN, () => {
    return withProviders(Technician, theme, store);
  });
  Navigation.registerComponent(screens.ME, () => {
    return withProviders(Me, theme, store);
  });
  Navigation.registerComponent(screens.SETTING, () => {
    return withProviders(Setting, theme, store);
  });
};

const setupDefaultOptions = theme => {
  return {
    layout: {
      backgroundColor: theme.layoutBackgroundColor,
    },
    statusBar: {
      style: 'light',
      ...Platform.select({
        ios: {
          background: {color: theme.statusBarBackgroundColor},
          hideWithTopBar: false,
          blur: false,
        },
        android: {backgroundColor: theme.statusBarBackgroundColor},
      }),
    },
    topBar: {
      visible: false,
      ...Platform.select({
        ios: {
          background: {
            // color: theme.topBarBackgroundColor,
            translucent: false,
            blur: false,
          },
          noBorder: true,
        },
        android: {},
      }),
      title: {
        color: theme.topBarTitleColor,
        fontFamily: theme.fontSemiBold,
        fontSize: theme.fontSizeDefault,
      },
      subtitle: {
        color: theme.topBarTitleColor,
        fontFamily: theme.fontRegular,
        fontSize: theme.fontSizeSmallest,
      },
      backButton: {
        visible: false,
      },
    },
    bottomTabs: {
      visible: !theme.isTablet,
      backgroundColor: 'white',
      ...Platform.select({
        ios: {
          translucent: false,
          hideShadow: false,
        },
        android: {titleDisplayMode: 'alwaysHide'},
      }),
    },
    bottomTab: {
      fontSize: 12,
      ...Platform.select({
        // ios: { iconInsets: { top: 0, left: 0, bottom: 0, right: 0 } }
      }),
    },
  };
};

const getLayoutComponent = (
  type = screens.INITIAL,
  passProps = {},
  init = false,
) => {
  switch (type) {
    case screens.INITIAL:
      return {
        component: {
          id: screens.INITIAL,
          name: screens.INITIAL,
          options: Initial.options,
          passProps,
        },
      };
    case screens.SIGN_IN:
      return {
        component: {
          id: screens.SIGN_IN,
          name: screens.SIGN_IN,
          options: SignIn.options,
          passProps,
        },
      };
    case screens.SIGN_UP:
      return {
        component: {
          id: screens.SIGN_UP,
          name: screens.SIGN_UP,
          options: SignUp.options,
          passProps,
        },
      };
    case screens.USER_LIST:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.USER_LIST,
                name: screens.USER_LIST,
                options: UserList.options,
                passProps,
              },
            },
          ],
          options: UserList.options,
        },
      };
    case screens.USER_DETAIL:
      return {
        component: {
          id: screens.USER_DETAIL,
          name: screens.USER_DETAIL,
          options: UserDetail.options,
          passProps,
        },
      };
    case screens.DOCTOR:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.DOCTOR,
                name: screens.DOCTOR,
                passProps,
              },
            },
          ],
          options: Doctor.options,
        },
      };
    case screens.TECHNICIAN:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.TECHNICIAN,
                name: screens.TECHNICIAN,
                passProps,
              },
            },
          ],
        },
      };
    case screens.ME:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.ME,
                name: screens.ME,
                passProps,
              },
            },
          ],
          options: Me.options,
        },
      };
    case screens.SETTING:
      return {
        stack: {
          children: [
            {
              component: {
                id: screens.SETTING,
                name: screens.SETTING,
                passProps,
              },
            },
          ],
          options: Setting.options,
        },
      };
    default:
      console.log('unhandle screen component:', type);
      break;
  }
};

export const layoutTypes = {
  OWNER: 'owner',
  DOCTOR: 'doctor',
  TECHNICIAN: 'technician',
  RECEPTIONIST: 'receptionist',
};

const layouts = {
  INIT: {
    stack: {
      children: [getLayoutComponent(screens.INITIAL)],
    },
  },
  OWNER: {
    bottomTabs: {
      id: layoutTypes.OWNER,
      children: [
        getLayoutComponent(screens.USER_LIST, {
          tabIndex: 0,
        }),
        getLayoutComponent(screens.DOCTOR, {
          tabIndex: 1,
        }),
        getLayoutComponent(screens.ME, {
          tabIndex: 2,
        }),
        getLayoutComponent(screens.SETTING, {
          tabIndex: 3,
        }),
      ],
    },
    options: {
      topBar: {
        visible: false,
      },
    },
  },
  DOCTOR: {
    bottomTabs: {
      id: layoutTypes.DOCTOR,
      children: [
        getLayoutComponent(screens.USER_LIST, {
          tabIndex: 0,
        }),
        getLayoutComponent(screens.DOCTOR, {
          tabIndex: 1,
        }),
        getLayoutComponent(screens.ME, {
          tabIndex: 2,
        }),
      ],
    },
  },
  TECHNICIAN: {
    bottomTabs: {
      id: layoutTypes.TECHNICIAN,
      children: [
        getLayoutComponent(screens.TECHNICIAN, {
          tabIndex: 0,
        }),
        getLayoutComponent(screens.ME, {
          tabIndex: 1,
        }),
      ],
    },
  },
  RECEPTIONIST: {
    bottomTabs: {
      id: layoutTypes.RECEPTIONIST,
      children: [
        getLayoutComponent(screens.USER_LIST, {
          tabIndex: 0,
        }),
        getLayoutComponent(screens.ME, {
          tabIndex: 1,
        }),
      ],
    },
  },
};

export const setupLayout = (theme, store) => {
  registerScreens(theme, store);
  const ops = setupDefaultOptions(theme);
  Navigation.setDefaultOptions(ops);
  Navigation.setRoot({root: layouts.INIT});
};

export const gotoPrimaryScreen = (componentId, type) => {
  Navigation.setRoot({root: layouts[type]});
};

export const gotoUserDetail = (componentId, passProps) => {
  Navigation.push(
    componentId,
    getLayoutComponent(screens.USER_DETAIL, passProps),
  );
};

export const popScreen = componentId => {
  Navigation.pop(componentId);
};

export const showSignIn = () => {
  Navigation.showModal({
    stack: {
      children: [getLayoutComponent(screens.SIGN_IN)],
    },
  });
};

export const hideSignIn = componentId => {
  Navigation.dismissModal(componentId);
};

export const gotoSignUp = componentId => {
  Navigation.push(componentId, getLayoutComponent(screens.SIGN_UP));
};
