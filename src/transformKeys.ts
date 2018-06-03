import deepMapKeys from 'deep-map-keys'
import {MapFn} from 'deep-map-keys/lib/deep-map-keys.d'
export const transformKeys = (target: object, transformer: MapFn): object => deepMapKeys(target, transformer)
