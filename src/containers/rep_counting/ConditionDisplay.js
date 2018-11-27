import React from 'react';

class ConditionDisplay extends React.Component {
  static TYPES = {};

  render() {
    const type = this.props.condition ? this.props.condition.type : '';
    let Display = ConditionDisplay.TYPES[type];

    if (!Display) {
      return <p>Error</p>;
    }

    return <Display {...this.props} />;
  }
}

export default ConditionDisplay;
