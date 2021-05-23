import {fetchTodoActionTypeName, fetchUpdateSelectActionTypeName } from 'reducers';
import { takeEvery, takeLatest, throttle } from 'redux-saga/effects';
import { fetchTodoWorker } from './../workers/fetchTodoWorker';

/**
 * takeEvery: allows multiple worker instances to be started CONCURRENTLY.
 * takeLatest: cancel pending when there is a new one.
 * throttle: type ahead stuff.
 * /

/**
 * Register Watcher
 */

export function* fetchTodoWatcher() {
    yield takeEvery(
        fetchTodoActionTypeName,
        fetchTodoWorker
    )
}