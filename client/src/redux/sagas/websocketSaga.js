import {
  all,
  call,
  fork,
  put,
  race,
  select,
  take,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { activeUserUuidSelector } from '../selectors/activeUserSelector';

import {
  START_WEBSOCKET,
  STOP_WEBSOCKET,
} from '../actions-type';

const WEBSOCKET_PING_TIME = 20000;

let ws;


function createEventChannel(userUuid) {
  return eventChannel((emit) => {
    const { hostname, port, protocol } = window.location;
    const setProtocol = protocol === 'https:' ? 'wss' : 'ws';
    let heartbeat;

    ws = new WebSocket(
      `${setProtocol}://${hostname}:${port}/ws?userUuid=${userUuid}`
    );

    ws.onopen = () => {
      heartbeat = setInterval(() => {
        const message = JSON.stringify({ type: 'HEALTH', message: 'ping' });
        ws.send(message);
      }, WEBSOCKET_PING_TIME);

      emit({
        type: 'SET_SOCKET_CONNECTION_STATUS',
        readyState: ws.readyState,
      });
    };

    ws.onerror = () => {
      emit({
        type: 'SET_SOCKET_CONNECTION_STATUS',
        readyState: ws.readyState,
      });
    };

    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);

      if (result.type !== 'HEALTH') {
        return emit(result);
      }
    };

    ws.onclose = (event) => {
      clearInterval(heartbeat);

      if (event.code === 1005) {
        emit({
          type: 'SET_SOCKET_CONNECTION_STATUS',
          readyState: ws.readyState,
        });
      } else {
        clearInterval(heartbeat);

        emit({
          type: 'SET_SOCKET_CONNECTION_STATUS',
          readyState: ws.readyState,
        });
      }
    };

    return () => {
      ws.close();
    };
  });
}

function* initializeWebSocketsChannel() {
  const userUuid = yield select(activeUserUuidSelector);
  const channel = yield call(createEventChannel, userUuid);
  while (true) {
    const message = yield take(channel);

    yield put(message);
  }
}

function* startStopChannel() {
  while (true) {
    yield take(START_WEBSOCKET);
    yield race({
      task: call(initializeWebSocketsChannel),
      cancel: take(STOP_WEBSOCKET),
    });
  }
}

export function* websocketSaga() {
  yield fork(startStopChannel);
  yield all([

  ]);
}
