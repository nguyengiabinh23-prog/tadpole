import type { IEvaluator } from './actions/base.js';
import type { EvaluatorContext } from './context.js';

export const withPrefix = (prefix: string | undefined, key: string) =>
  prefix ? `${prefix}${key}` : `${key}`;

export function clampDelta(
  currentPos: number,
  targetPos: number,
  viewportSize: number,
  contentSize: number,
) {
  const maxScroll = Math.max(0, contentSize - viewportSize);
  const clampedTarget = Math.max(0, Math.min(maxScroll, targetPos));
  return clampedTarget - currentPos;
}

export function reduceEvaluators(
  evaluators: IEvaluator[],
  ctx: EvaluatorContext,
  input?: string,
) {
  return evaluators.reduce((input, evaluator) => {
    return evaluator.toJS(input, ctx);
  }, input ?? ctx.rootInput);
}
