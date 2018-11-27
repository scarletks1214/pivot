import React from 'react';
import update from 'immutability-helper';
import { Card } from '../../utils/Card';

class ConditionForm extends React.Component {
  static TYPES = {};

  handleUpdateStepType(newStepType) {
    this.props.onChange(update(this.props.item, { $set: { type: newStepType } }));
  }

  render() {
    let buttons = Object.entries(ConditionForm.TYPES).map(kv => (
      <button
        key={kv[0]}
        className={'btn btn-secondary ' + (this.props.item && this.props.item.type === kv[0] ? 'active' : '')}
        type="button"
        onClick={() => this.handleUpdateStepType(kv[0])}
      >
        {kv[0]}
      </button>
    ));

    let Form = this.props.item.type ? ConditionForm.TYPES[this.props.item.type] : null;
    let form = Form ? <Form {...this.props} /> : null;

    return (
      <div className="mb-2">
        <div className="form-group">
          <label>Step Type</label>
          <div className="btn-group btn-group-justified">{buttons}</div>
        </div>

        {form}
      </div>
    );
  }
}

export default ConditionForm;
