import React from 'react';
import update from 'immutability-helper';
import { Card } from '../../utils/Card';
import FormControl from '../../components/FormControl';
import ConditionDisplay from '../rep_counting/ConditionDisplay';
import ConditionForm from '../rep_counting/ConditionForm';
import ListEditForm from '../../utils/ListEditForm';
import SkeletonCondition from '../../models/SkeletonCondition';

class PenaltyForm extends React.Component {
  static TYPES = {};

  constructor(props) {
    super();
    this.handleUpdateCondition = this.handleUpdateCondition.bind(this);
    this.handleUpdatePenaltyChange = this.handleUpdatePenaltyChange.bind(this);
    this.handleUpdateTitleChange = this.handleUpdateTitleChange.bind(this);
    this.handleUpdateStepType = this.handleUpdateStepType.bind(this);
  }

  handleUpdateCondition(newCondition) {
    this.props.onChange(
      update(this.props.item, { condition: { $set: newCondition } }),
      SkeletonCondition.validate(newCondition)
    );
  }

  handleUpdateStepType(newStepType) {
    this.props.onChange(update(this.props.item, { type: { $set: newStepType } }));
  }

  handleUpdatePenaltyChange(expression) {
    let newState = update(this.props, expression);
    this.props.onChange(newState.item);
  }

  handleUpdateTitleChange(expression) {
    let newState = update(this.props, expression);
    this.props.onChange(newState.item);
  }

  render() {
    let buttons = Object.entries(PenaltyForm.TYPES).map(kv => (
      <button
        key={kv[0]}
        className={'btn btn-secondary ' + (this.props.item && this.props.item.type === kv[0] ? 'active' : '')}
        type="button"
        onClick={() => this.handleUpdateStepType(kv[0])}
      >
        {kv[0]}
      </button>
    ));

    let Form = this.props.item && this.props.item.type ? PenaltyForm.TYPES[this.props.item.type] : null;
    let form = Form ? <Form {...this.props} /> : null;

    return (
      <div className="mb-2">
        <div className="form-row">
          <div className="form-group col mb-2">
            <label>Penalty</label>
            <FormControl
              type="text"
              required
              name="item.title"
              value={this.props.item.title}
              handleUpdate={this.handleUpdateTitleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col mb-2">
            <label>Name</label>
            <FormControl
              type="number"
              required
              name="item.penalty"
              value={this.props.item.penalty}
              min="-100"
              max="0"
              step="1"
              handleUpdate={this.handleUpdatePenaltyChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Penalty Type</label>
          <div className="btn-group btn-group-justified">{buttons}</div>
        </div>

        {form}

        <div className="form-group">
          <label>Condition</label>
          <ConditionForm
            item={this.props.item.condition || { type: 'all' }}
            onChange={expression => this.handleUpdateCondition(expression)}
          />
        </div>
      </div>
    );
  }
}

export default PenaltyForm;
