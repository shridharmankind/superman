import {takeEvery} from 'redux-saga/effects';
import {
  updateTodoDataActions,
  fetchStatusSliceActions,
  fetchTodoActionTypeName,
} from './todoSlice';
import {call, put, select} from 'redux-saga/effects';
import {todoSelector} from './todoSelector';
import {FetchEnumStatus} from 'reducers';
import axios from 'axios';

/**
 * takeEvery: allows multiple worker instances to be started CONCURRENTLY.
 * takeLatest: cancel pending when there is a new one.
 * throttle: type ahead stuff.
 * /

/**
 * Register Watcher
 */

export function* fetchTodoWatcher() {
  yield takeEvery(fetchTodoActionTypeName, fetchTodoWorker);
}

/**
 * a worker (generator)
 */
export function* fetchTodoWorker(action) {
  /**
   * get Start Index for this fetching
   */
  const getStartIndex = yield select(todoSelector.makePageStartIndexSelector());

  /**
   * get Start Index for this fetching
   */
  const getEndIndex = yield select(todoSelector.makePageEndIndexSelector());

  /**
   * get Todos for this fetching
   */
  const getTodos = yield select(todoSelector.makeGetPagedTodos());

  /**
   * get Todos Total for this fetching
   */
  const getTodosTotal = yield select(todoSelector.makeGetTodosTotal());

  /**
   * Update status for fetching state
   */
  yield put(fetchStatusSliceActions.update(FetchEnumStatus.FETCHING));

  /**
   * fetch Data
   */
  try {
    let targetUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

    //start Fetching
    const response = yield call(axios, {
      method: 'get',
      url: targetUrl,
    });

    /**
     * Update todo state
     */
    yield put(
      updateTodoDataActions.merge({
        todos: {
          data: response.data,
        },
      }),
    );

    /**
     * Update fetch Status failed
     */
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.SUCCESS));
  } catch (error) {
    console.log(error);

    /**
     * Update fetch Status failed
     */
    yield put(fetchStatusSliceActions.update(FetchEnumStatus.FAILED));
  }
}
