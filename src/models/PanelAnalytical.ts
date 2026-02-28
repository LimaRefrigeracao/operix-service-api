// @ts-nocheck
export default class PanelAnalytical {
  constructor({
    id = null,
  }: any = {}) {
    this.id = id;
  }

  toJSON() {
    return {
      id: this.id,
    };
  }
}
