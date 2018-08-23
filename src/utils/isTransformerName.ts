import { transformers } from '../transformers';

export const isTransformerName = (val: any): boolean =>
  Object.keys(transformers).indexOf(val) !== -1;
