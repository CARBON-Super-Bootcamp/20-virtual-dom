import { SERVICE_BASEURL } from './config';

export interface State {
  loading: boolean;
  error: string | null;
  workers: Worker[];
}

export interface Worker {
  id: number;
  name: string;
  photo: string;
  bio: string;
}

interface ActionObject {
  type: string;
}

interface ActionObjectError extends ActionObject {
  payload: string;
}

interface ActionObjectRegistered extends ActionObject {
  payload: Worker;
}

interface ActionObjectRemoved extends ActionObject {
  payload: number | string;
}
// setup state
const initialState: State = {
  loading: false,
  error: null,
  workers: [],
};

function loading(state: State): void {
  state.loading = true;
  state.error = null;
}

function error(state: State, action: ActionObjectError): void {
  state.loading = false;
  state.error = action.payload;
}

function clearError(state: State): void {
  state.error = null;
}

function registered(state: State, action: ActionObjectRegistered): State {
  const worker = action.payload;
  state.workers.push({
    id: worker.id,
    name: worker.name,
    photo: `${SERVICE_BASEURL}/photo/${worker.photo}`,
    bio: worker.bio,
  });
  state.loading = false;
  state.error = null;
  return state;
}

function removed(state: State, action: ActionObjectRemoved): State {
  const idx = state.workers.findIndex((t) => t.id === action.payload);
  state.workers.splice(idx, 1);
  state.loading = false;
  state.error = null;
  return state;
}

function workersLoaded(state, action) {
  state.workers = action.payload.map((worker) => ({
    id: worker.id,
    name: worker.name,
    photo: `${SERVICE_BASEURL}/photo/${worker.photo}`,
    bio: worker.bio,
  }));
  state.loading = false;
  state.error = null;
  return state;
}

module.exports = {
  initialState,
  registered,
  removed,
  workersLoaded,
  error,
  loading,
  clearError,
};
