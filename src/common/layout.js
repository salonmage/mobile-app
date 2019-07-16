import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import memoizeOne from 'memoize-one';
import deepmerge from 'deepmerge';

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
      ios: { hideWithTopBar: false },
      android: { backgroundColor: theme.statusBarBackgroundColor }
    })
  },
  topBar: {
    title: {
      color: 'white'
      // fontFamily: theme.fontSemiBold,
      // fontSize: theme.fontSizeDefault
    },
    subtitle: {
      color: 'white'
      // fontFamily: theme.fontRegular,
      // fontSize: theme.fontSizeSmallest
    },
    backButton: {
      // visible: false
    },
    leftButtons: [],
    background: {
      color: theme.topBarBackgroundColor,
      translucent: true,
      blur: true
    }
  }
};

export const memoizeMerge = memoizeOne((a, b) => deepmerge(a, b));

export const applyOptions = customOptions => {
  return deepmerge(defaultOptions, customOptions);
};

const components = {
  USER_LIST: {
    stack: {
      children: [
        {
          component: {
            id: screens.USER_LIST,
            name: screens.USER_LIST
          }
        }
      ],
      options: applyOptions({
        bottomTabs: {
          translucent: true,
          hideShadow: false,
          ...Platform.select({ android: { titleDisplayMode: 'alwaysShow' } })
        }
      })
    },
    options: applyOptions({
      bottomTab: {
        text: 'Khách hàng',
        icon: require('@src/assets/icons/home_selected.png'),
        fontSize: 10
      }
    })
  },
  USER_DETAIL: {
    id: screens.USER_DETAIL,
    name: screens.USER_DETAIL
  },
  DOCTOR: {
    stack: {
      children: [
        {
          component: {
            id: screens.DOCTOR,
            name: screens.DOCTOR
          }
        }
      ]
    },
    options: applyOptions({
      bottomTab: {
        text: 'Khách hàng',
        icon: require('@src/assets/icons/home_selected.png'),
        fontSize: 10
      }
    })
  },
  TECHNICIAN: {
    stack: {
      children: [
        {
          component: {
            id: screens.TECHNICIAN,
            name: screens.TECHNICIAN
          }
        }
      ]
    },
    options: applyOptions({
      bottomTab: {
        text: 'Khách hàng',
        icon: require('@src/assets/icons/home_selected.png'),
        fontSize: 10
      }
    })
  },
  ME: {
    stack: {
      children: [
        {
          component: {
            id: screens.ME,
            name: screens.ME
          }
        }
      ]
    },
    options: applyOptions({
      bottomTab: {
        text: 'Tôi',
        icon: require('@src/assets/icons/home_selected.png'),
        fontSize: 10
      }
    })
  },
  SETTING: {
    stack: {
      children: [
        {
          component: {
            id: screens.SETTING,
            name: screens.SETTING
          }
        }
      ]
    },
    options: applyOptions({
      bottomTab: {
        text: 'Khách hàng',
        icon: require('@src/assets/icons/home_selected.png'),
        fontSize: 10
      }
    })
  }
};

const layouts = {
  OWNER: {
    bottomTabs: {
      children: [
        components.USER_LIST,
        components.DOCTOR,
        components.ME,
        components.SETTING
      ]
    }
  },
  DOCTOR: {
    bottomTabs: {
      children: [components.USER_LIST, components.DOCTOR, components.ME]
    }
  },
  TECHNICIAN: {
    bottomTabs: {
      children: [components.TECHNICIAN, components.ME]
    }
  },
  RECEPTIONIST: {
    children: [components.USER_LIST, components.ME]
  }
};

const initialLayout = {
  root: {
    stack: {
      children: [
        {
          component: {
            id: screens.INITIAL,
            name: screens.INITIAL
          }
        }
      ]
    }
  }
};

export const setupLayout = store => {
  registerScreens(store);
  Navigation.setDefaultOptions(defaultOptions);
  Navigation.setRoot(initialLayout);
};

export const setPrimaryLayout = type => {
  Navigation.setRoot(layouts[type]);
};

export const gotoSignIn = componentId => {
  Navigation.push(componentId, {
    component: {
      id: screens.SIGN_IN,
      name: screens.SIGN_IN,
      options: applyOptions({
        topBar: {
          visible: false
        }
      })
    }
  });
};

export const gotoSignUp = componentId => {
  Navigation.push(componentId, {
    component: {
      id: screens.SIGN_UP,
      name: screens.SIGN_UP,
      options: applyOptions({
        topBar: {
          visible: false
        }
      })
    }
  });
};
