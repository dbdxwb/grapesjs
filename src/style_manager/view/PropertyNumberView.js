import PropertyView from './PropertyView';

export default class PropertyNumberView extends PropertyView {
  templateInput() {
    return '';
  }

  init() {
    const model = this.model;
    this.listenTo(model, 'change:unit', this.onValueChange);
    this.listenTo(model, 'change:units', this.render);
  }

  setValue(value) {
    const parsed = this.model.parseValue(value);
    value = `${parsed.value}${parsed.unit}`;
    this.inputInst?.setValue(value, { silent: 1 });
  }

  onRender() {
    const { ppfx, model, el } = this;

    if (!this.inputInst) {
      const { input } = model;
      input.ppfx = ppfx;
      input.render();
      const fields = el.querySelector(`.${ppfx}fields`);
      fields.appendChild(input.el);
      this.input = input.inputEl.get(0);
      this.inputInst = input;
    }
  }

  clearCached() {
    PropertyView.prototype.clearCached.apply(this, arguments);
    this.inputInst = null;
  }
}
