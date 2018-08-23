import { isTransformerName } from './isTransformerName';

export const isCaseStyleOrElse = (value: any): boolean =>
  isTransformerName(value) || value === true;
