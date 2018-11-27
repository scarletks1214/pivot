import React from 'react';

import ConditionDisplay from './ConditionDisplay';
import ConditionForm from './ConditionForm';
import MultiConditionForm from './MultiConditionForm';

export class AnyConditionDisplay extends React.Component {
  constructor(props) {
    super();
    this.state = {
      condition: props.condition || { type: 'any', conditions: [] },
    };
  }

  render() {
    let conditions = (this.state.condition.conditions || []).map((condition, index) => (
      <li key={index} className="ml-4">
        <ConditionDisplay condition={condition} />
      </li>
    ));

    return (
      <div>
        <strong>Any</strong> of the following must be true:
        <ul className="list-unstyled">{conditions}</ul>
      </div>
    );
  }
}

export const AnyConditionForm = props => <MultiConditionForm {...props} type="any" />;
