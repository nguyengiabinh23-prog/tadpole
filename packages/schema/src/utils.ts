import type { Builder, ExtractTypesFromBuilders } from './builders/index.js';
import type { Type } from './types/index.js';

export function buildrecord<
  TIn,
  TRecord extends Record<string, Builder<TIn, any, Type<TIn, any>>>,
>(record: TRecord): ExtractTypesFromBuilders<TRecord> {
  return Object.entries(record).reduce(
    (o, [key, type]) => {
      o[key] = type.build();
      return o;
    },
    {} as Record<string, Type<TIn, any>>,
  ) as ExtractTypesFromBuilders<TRecord>;
}
