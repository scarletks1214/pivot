import React from 'react';

import SkeletonCondition from '../../models/SkeletonCondition';
import ConditionDisplay from '../rep_counting/ConditionDisplay';
import PenaltyDisplay from './PenaltyDisplay';
import PenaltyForm from './PenaltyForm';
import FormControl from '../../components/FormControl';

import update from 'immutability-helper';

export class AtLeastPenaltyDisplay extends React.Component {
  render() {
    return (
      <span>
        The following must be true for at least <strong>{this.props.penalty.percentage * 100.0 + '%'}</strong> of the
        frames in a rep:
        <ul className="list-unstyled ml-4">
          <ConditionDisplay condition={this.props.penalty.condition} />
        </ul>
      </span>
    );
  }
}

PenaltyDisplay.TYPES.at_least = AtLeastPenaltyDisplay;

export class AtLeastPenaltyForm extends React.Component {
  handleUpdate(expression) {
    let newState = update(this.props, expression);
    this.props.onChange(newState.item, this.formValid(newState));
  }

  formValid(result) {
    return result !== undefined && result.percentage !== undefined && SkeletonCondition.validate(result.condition);
  }

  render() {
    return (
      <div className="form-row">
        <div className="form-group col mb-2">
          <label>Percentage</label>
          <FormControl
            suffix="%"
            type="number"
            required
            name="item.percentage"
            value={this.props.item.percentage}
            min="0.0"
            max="1.0"
            step="0.05"
            handleUpdate={expression => this.handleUpdate(expression)}
          />
        </div>
      </div>
    );
  }
}

PenaltyForm.TYPES.at_least = AtLeastPenaltyForm;
