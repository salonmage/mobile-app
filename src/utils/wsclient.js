const WS = options => {
  const ws = {};
  const defaultOptions = {
    debug: false,
    reconnectInterval: 1000,
    maxReconnectInterval: 30000,
    reconnectDecay: 1.5,
    timeoutInterval: 10000,
    maxReconnectAttempts: 20,
    commitInterval: 2000,
    pickUrl: function(done) {
      return done('');
    }
  };
  Object.assign(ws, defaultOptions, options || {});
  ws.onconnected = ws.onerror = ws.onopen = ws.onclose = function() {};
  ws.msgQ = [];
  ws.url = options.url || '';
  ws.connection_id = options.initConnection || '';
  ws.reconnectAttempts = -1;
  ws.state = 'running';

  ws.debugInfo = function(a, b) {
    if (ws.debug || WS.debugAll) console.debug('WS', ws.url, a, b);
  };

  ws.destroy = function() {
    ws.state = 'dead';
    ws.ws && ws.ws.close();
  };

  ws.loopsend = function() {
    var h = setInterval(function() {
      if (ws.state === 'dead') clearInterval(h);
      if (!ws.ws || ws.ws.readyState !== WebSocket.OPEN) return;
      if (ws.msgQ.length === 0) return;
      var max = getMax(ws.msgQ);
      ws.debugInfo('send', max);
      ws.ws.send(max + '');
      ws.msgQ.length = 0;
    }, ws.commitInterval);
  };

  ws.commit = function(offset) {
    ws.msgQ.push(offset);
  };

  ws.dispatch = function(eventType, event) {
    ws.debugInfo({ eventType: eventType, event: event });
    switch (eventType) {
      case 'open':
        ws.reconnectAttempts = -1;
        break;
      case 'close':
        ws.onclose(event);
        ws.reconnect();
        break;
      case 'message':
        var mes = ws.parseMessage(event.data);
        console.log(mes);

        if (mes && mes.type === 'init') {
          var id = (mes.data && mes.data.id) || '';
          if (!id) {
            ws.onerror(event, 'err: invalid message, missing connection id');
            ws.onclose(event);
            ws.connection_id = '';
            ws.reconnect();
            break;
          }

          ws.connection_id = id;
          ws.onconnected(undefined, ws.connection_id);
          ws.onopen(event, ws.connection_id);
          break;
        }

        if (mes && mes.event && mes.offset) {
          ws.onmessage(event, mes.event, mes.offset);
        }
        break;
      case 'error':
        ws.onerror(event, event);
        ws.onclose(event);
        ws.reconnect();
        break;
    }
  };

  ws.parseMessage = function(data) {
    var message;
    try {
      message = JSON.parse(data);
    } catch (e) {}
    return message;
  };

  ws.reconnect = function() {
    // make sure to kill the last ws
    if (ws.state === 'dead') return;
    if (ws.ws) ws.ws.close();
    ws.ws = undefined;

    var delay = ws.calculateNextBackoff();
    setTimeout(function() {
      if (ws.ws) throw 'should not hapend, library miss-used';
      if (ws.connection_id) ws.connect(ws.connection_id);
      else {
        ws.pickUrl(function(url) {
          if (ws.ws) throw 'should not happed, libaray missused';
          ws.url = url;
          ws.connect('');
        });
      }
    }, delay);
    ws.reconnectAttempts++;
  };

  ws.calculateNextBackoff = function() {
    if (ws.reconnectAttempts === -1) return 0; // first time connect
    var delaytime =
      ws.reconnectInterval * Math.pow(ws.reconnectDecay, ws.reconnectAttempts);
    return Math.min(ws.maxReconnectInterval, delaytime);
  };

  ws.connect = function(id) {
    if (ws.ws) return;
    if (id) ws.onconnected(undefined, ws.connection_id);

    var url = id ? ws.url + '?connection_id=' + id : ws.url;
    var wsclient = (ws.ws = new WebSocket(url));
    var timeout = setTimeout(function() {
      wsclient = undefined;
      ws.dispatch('error', 'timeout');
    }, ws.timeoutInterval);

    var dispatch = function(type, event) {
      clearTimeout(timeout);
      if (wsclient && wsclient === ws.ws) ws.dispatch(type, event);
    };

    wsclient.onopen = function(ev) {
      dispatch('open', ev);
    };
    wsclient.onclose = function(ev) {
      dispatch('close', ev);
    };
    wsclient.onerror = function(ev) {
      dispatch('error', ev);
    };
    wsclient.onmessage = function(ev) {
      dispatch('message', ev);
    };
  };
  ws.loopsend();
  ws.reconnect();
  return ws;
};

function getMax(arr) {
  if (!arr) return;
  var max = arr[0];
  for (var i in arr) if (max < arr[i]) max = arr[i];
  return max;
}

export default WS;
