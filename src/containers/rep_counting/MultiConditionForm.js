import React from 'react';

import ConditionDisplay from './ConditionDisplay';
import ConditionForm from './ConditionForm';
import ListEditForm from '../../utils/ListEditForm';

import update from 'immutability-helper';

export class MultiConditionForm extends React.Component {
  constructor(props) {
    super();

    let condition;
    if (props.item.type === props.type && Array.isArray(props.item.conditions)) {
      condition = props.item;
    } else {
      condition = { type: props.type, conditions: [] };
    }

    this.state = {
      condition: condition,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(newList) {
    let newState = update(this.state, {
      condition: { conditions: { $set: newList } },
    });
    this.setState(newState);
    this.props.onChange(newState.condition);
  }

  renderConditionDisplay(condition, index) {
    return <ConditionDisplay condition={condition} />;
  }

  formValid() {
    return this.state.condition.conditions.length > 0;
  }

  render() {
    return (
      <div>
        <strong>{this.state.condition.conditions.length}</strong> conditions
        <ListEditForm
          items={this.state.condition.conditions}
          itemDisplay={this.renderConditionDisplay}
          itemEdit={ConditionForm}
          newItem={() => ({ type: 'angle' })}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default MultiConditionForm;
