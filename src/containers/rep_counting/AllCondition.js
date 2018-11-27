import React from 'react';

import ConditionDisplay from './ConditionDisplay';
import ConditionForm from './ConditionForm';
import MultiConditionForm from './MultiConditionForm';

export class AllConditionDisplay extends React.Component {
  constructor(props) {
    super();
    this.state = {
      condition: props.condition || { type: 'all', conditions: [] },
    };
  }

  render() {
    let conditions = (this.state.condition.conditions || []).map((condition, index) => (
      <li key={index} className="ml-4">
        <ConditionDisplay condition={condition} />
      </li>
    ));

    return (
      <span>
        <strong>All</strong> of the following must be true:
        <ul className="list-unstyled">{conditions}</ul>
      </span>
    );
  }
}

export const AllConditionForm = props => <MultiConditionForm {...props} type="all" />;
