import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import user, { UserActionTypes, __REDUX_STATE_KEY__ as __USER_REDUX_STATE_KEY__ } from './user';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [__USER_REDUX_STATE_KEY__, __USER_REDUX_STATE_KEY__],
};

const userPersistConfig = {
  key: __USER_REDUX_STATE_KEY__,
  storage: AsyncStorage,
  whitelist: ['userToken', 'walletRetrievePassword', 'walletLabel'],
};

import genericModal, {
  GenericModalActionTypes,
  __REDUX_STATE_KEY__ as __GENERIC_MODAL_REDUX_STATE_KEY__,
} from './genericModal';

const appReducer = combineReducers({
  [__USER_REDUX_STATE_KEY__]: persistReducer(userPersistConfig, user),
  [__GENERIC_MODAL_REDUX_STATE_KEY__]: genericModal,
});

const appReducerPersist = persistReducer(rootPersistConfig, appReducer);

export const rootReducer = (state: RootState | undefined, action: ActionTypes) => {
  return appReducerPersist(state, action);
};

// test param for testing purposes only
export default () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));

  const persistor = persistStore(store);
  return { store, persistor };
};

export type RootState = ReturnType<typeof appReducerPersist>;

type ActionTypes = UserActionTypes | GenericModalActionTypes;
