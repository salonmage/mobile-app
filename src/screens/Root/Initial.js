import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { gotoPrimaryScreen, popScreen, showSignIn } from '../../common/layout';

import { selectors } from '../../store/models';
//-----------------------------------------------

const Initial = React.memo(props => {
  const isAthenticated = useSelector(selectors.isAuthenticatedSelector);
  const type = useSelector(selectors.staffTypeSelector);

  useEffect(() => {
    if (isAthenticated === null) return;
    if (isAthenticated) {
      gotoPrimaryScreen(props.componentId, type);
    } else {
      if (type) {
        popScreen(type);
      }
      showSignIn();
    }
  }, [isAthenticated]);

  return null;
});

Initial.options = {
  topBar: {
    visible: false,
    backButton: {
      visible: false
    }
  }
};

export default Initial;
