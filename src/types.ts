import { MapFn } from 'deep-map-keys/lib/deep-map-keys.d';
import { AnyAction } from 'redux';

export type CaseStyle = 'camelCase' | 'snakeCase' | 'kebabCase';

export interface MiddlewareOption {
  ignoreOnError?: boolean;
  caseStyle: CaseStyle;
}

export interface Transformers {
  camelCase: MapFn;
  kebabCase: MapFn;
  snakeCase: MapFn;
  [key: string]: MapFn;
}

export interface Action extends AnyAction {
  payload: object;
}
