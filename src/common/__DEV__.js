import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';

const spyFunction = msg => {
  // console.log(msg);
};

MessageQueue.spy(spyFunction);

console.disableYellowBox = true;
