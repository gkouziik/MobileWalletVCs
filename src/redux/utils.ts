import { RootState } from 'src/redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type ThunkDispatchType = ThunkDispatch<RootState, null, AnyAction>;

export type SimpleAction<Type, Payload = {}> = {
  readonly type: Type;
  readonly payload: Payload;
};

export function simpleAction<T extends string>(type: T): { type: T; payload: any };
export function simpleAction<Type extends string, Payload extends {}>(
  type: Type,
  payload: Payload
): { type: Type; payload: Payload };
export function simpleAction<Type extends string, Payload>(type: Type, payload?: Payload) {
  return {
    type,
    payload,
  };
}
