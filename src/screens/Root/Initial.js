import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { gotoPrimaryScreen, popScreen, showSignIn } from '../../common/layout';

import { selectors } from '../../store/models';
//-----------------------------------------------

export default function Initial(props) {
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
}
