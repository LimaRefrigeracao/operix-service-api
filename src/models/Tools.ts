// @ts-nocheck
export default class Tool {
  constructor({
    id = null,
    name = "",
  }: any = {}) {
    this.id = id;
    this.name = name;
  }

  static fromRequest(body: any = {}) {
    return new Tool({
      id: body.id || null,
      name: body.name,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
