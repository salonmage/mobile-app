import memoizeOne from 'memoize-one';
import find from 'lodash/find';
import has from 'lodash/has';
import trancate from 'lodash/truncate';
import isEqual from 'lodash/isEqual';
//-----------------------------------------------

export const getUserName = memoizeOne(user => {
  let name = getUserAttribute(user.attributes, 'fullname');
  if (name && name.trim().length > 0) {
    name = name.trim();
  } else {
    const shortId = user.id.substr(user.id.length - 4, 4);
    if ((city = getUserAttribute(user.attributes, 'trace_city_name'))) {
      name = `${city} #${shortId}`;
    } else if (
      (country = getUserAttribute(user.attributes, 'trace_country_name'))
    ) {
      name = `${country} #${shortId}`;
    } else {
      name = `User #${shortId}`;
    }
  }
  return trancate(name.trim(), { length: 24 });
}, isEqual);

export const getUserAttribute = memoizeOne((attributes, key) => {
  let value = null;
  find(attributes, attr => {
    if (attr.key === key) {
      find(['text', 'number', 'boolean', 'datetime', 'list'], type => {
        if (has(attr, type)) {
          value = attr[type];
          return true;
        }
      });
      return true;
    }
  });
  return value;
}, isEqual);
