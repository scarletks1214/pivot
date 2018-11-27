import React from 'react';

class PenaltyDisplay extends React.Component {
  static TYPES = {};

  render() {
    let Display = PenaltyDisplay.TYPES[this.props.penalty.type];

    if (!Display) {
      return <p>Error</p>;
    }

    return (
      <div className="row">
        <div className="col-3 align-self-center">
          <span className="penalty badge badge-danger">{this.props.penalty.penalty}</span>
        </div>
        <div className="col align-self-center">
          <Display {...this.props} />
        </div>
      </div>
    );
  }
}

export default PenaltyDisplay;
