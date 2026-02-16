import { Builder } from './base.js';
import {
  NodeType,
  type ExtractOutputFromTypes,
  type Node,
  type NodeTypeParams,
  type Type,
} from '../types/index.js';

export class NodeBuilder<
  TMap extends Record<string, Type<Node, any>>,
> extends Builder<Node, ExtractOutputFromTypes<TMap>, NodeType<TMap>> {
  constructor(private composition_: TMap) {
    super();
  }

  get composition(): TMap {
    return this.composition_;
  }

  override get params(): NodeTypeParams<TMap> {
    return {
      composition: this.composition_,
      ...super.params,
    };
  }

  override clone(): this {
    const clone = super.clone();
    clone.composition_ = { ...this.composition_ };
    return clone;
  }

  override build(): NodeType<TMap> {
    return new NodeType(this.params);
  }

  extend<TExtension extends Record<string, Type<Node, any>>>(
    extension: TExtension,
  ): NodeBuilder<TMap & TExtension> {
    const clone = this.clone();
    Object.assign(clone.composition_, extension);
    return clone as any;
  }
}
