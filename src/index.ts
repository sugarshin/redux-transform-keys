import { isFSA } from 'flux-standard-action';
import { isBoolean } from 'lodash';
import { transformers } from './transformers';
import { transformKeys } from './transformKeys';
import { isCaseStyleOrElse } from './utils/isCaseStyleOrElse';
import { MapFn } from 'deep-map-keys/lib/deep-map-keys.d';
import { AnyAction, Dispatch, Middleware } from 'redux';

export type CaseStyle = 'camelCase' | 'snakeCase' | 'kebabCase';

export interface IOption {
  ignoreOnError?: boolean;
  caseStyle: CaseStyle;
}

export interface IAction extends AnyAction {
  payload: any;
}

export const createTransformKeysMiddleware = (option: IOption): Middleware => {
  const ignoreOnError: boolean = isBoolean(option.ignoreOnError)
    ? option.ignoreOnError
    : true;
  const caseStyle: CaseStyle = option.caseStyle;
  if (!caseStyle) {
    throw new TypeError(
      "option.caseStyle must be 'camelCase', 'snakeCase' or 'kebabCase'"
    );
  }
  const defaultTransformer = transformers[caseStyle];

  return () => (next: Dispatch) => (action: IAction) => {
    const { meta } = action;
    if (
      isFSA(action) &&
      meta &&
      isCaseStyleOrElse(meta.transformKeys) &&
      !(action.error && ignoreOnError)
    ) {
      const transformer: MapFn =
        transformers[meta.transformKeys] || defaultTransformer;
      return next({
        ...action,
        payload: transformKeys(action.payload, transformer),
      });
    }
    return next(action);
  };
};

export default createTransformKeysMiddleware;
