import { camelCase, kebabCase, snakeCase } from 'lodash';
import { MapFn } from 'deep-map-keys/lib/deep-map-keys.d';

export interface ITransformers {
  camelCase: MapFn;
  kebabCase: MapFn;
  snakeCase: MapFn;
  [key: string]: MapFn;
}

export const transformers: ITransformers = { camelCase, kebabCase, snakeCase };
