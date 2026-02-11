import { Builder } from './base.js';
import {
  StructType,
  DocumentStructType,
  NodeChildrenStructType,
  NodePropertiesStructType,
  type Document,
  type ExtractOutputFromTypes,
  type Node,
  type StructTypeParams,
  type Type,
  type Value,
} from '../types/index.js';

export abstract class StructBuilder<
  TIn,
  TMemberIn,
  TMembers extends Record<string, Type<TMemberIn, any>>,
  TType extends StructType<TIn, TMemberIn, TMembers>,
> extends Builder<TIn, ExtractOutputFromTypes<TMembers>, TType> {
  private prefix_: string | undefined;

  constructor(private members_: TMembers) {
    super();
  }

  override get params(): StructTypeParams<TMemberIn, TMembers> {
    return {
      members: this.members_,
      prefix: this.prefix_,
      ...super.params,
    };
  }

  override clone(): this {
    const clone = super.clone();
    clone.members_ = { ...this.members_ };
    clone.prefix_ = this.prefix_;
    return clone;
  }

  prefix(prefix: string | undefined): this {
    const clone = this.clone();
    clone.prefix_ = prefix;
    return clone;
  }

  protected extend_<TExtension extends Record<string, Type<TMemberIn, any>>>(
    newMembers: TExtension,
  ): any {
    const clone = this.clone();
    Object.assign(clone.members_, newMembers);
    return clone as any;
  }
}

export class DocumentStructBuilder<
  TMembers extends Record<string, Type<Node, any>>,
> extends StructBuilder<
  Document,
  Node,
  TMembers,
  DocumentStructType<TMembers>
> {
  override build(): DocumentStructType<TMembers> {
    return new DocumentStructType(this.params);
  }

  extend<TExtension extends Record<string, Type<Node, any>>>(
    extension: TExtension,
  ): DocumentStructBuilder<TMembers & TExtension> {
    return this.extend_(extension);
  }
}

export class NodeChildrenStructBuilder<
  TMembers extends Record<string, Type<Node, any>>,
> extends StructBuilder<
  Node,
  Node,
  TMembers,
  NodeChildrenStructType<TMembers>
> {
  override build(): NodeChildrenStructType<TMembers> {
    return new NodeChildrenStructType(this.params);
  }

  extend<TExtension extends Record<string, Type<Node, any>>>(
    extension: TExtension,
  ): NodeChildrenStructBuilder<TMembers & TExtension> {
    return this.extend_(extension);
  }
}

export class NodePropertiesStructBuilder<
  TMembers extends Record<string, Type<Value, any>>,
> extends StructBuilder<
  Node,
  Value,
  TMembers,
  NodePropertiesStructType<TMembers>
> {
  override build(): NodePropertiesStructType<TMembers> {
    return new NodePropertiesStructType(this.params);
  }

  extend<TExtension extends Record<string, Type<Value, any>>>(
    extension: TExtension,
  ): NodePropertiesStructBuilder<TMembers & TExtension> {
    return this.extend_(extension);
  }
}
