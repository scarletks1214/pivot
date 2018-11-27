import React from 'react';

import ConditionDisplay from './ConditionDisplay';
import ConditionForm from './ConditionForm';
import MultiConditionForm from './MultiConditionForm';

export class NoneConditionDisplay extends React.Component {
  constructor(props) {
    super();
    this.state = {
      condition: props.condition || { type: 'none', conditions: [] },
    };
  }

  render() {
    let conditions = this.state.condition.conditions
      ? this.state.condition.conditions.map((condition, index) => (
          <li key={index} className="ml-4">
            <ConditionDisplay condition={condition} />
          </li>
        ))
      : [];

    return (
      <span>
        <strong>All</strong> of the following must be <strong>false</strong>:
        <ul className="list-unstyled">{conditions}</ul>
      </span>
    );
  }
}

export const NoneConditionForm = props => <MultiConditionForm {...props} type="none" />;
