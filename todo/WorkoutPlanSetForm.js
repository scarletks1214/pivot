import React from 'react';
import $ from 'jquery';
import update from 'immutability-helper';

class WorkoutPlanSetForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      workout_set: $.extend({}, props.workout_set),
    };

    this.handleRepsChange = this.handleRepsChange.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleUpdateSet = props.handleUpdateSet.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRepsChange(event) {
    let value = event.target.value ? parseFloat(event.target.value) : undefined;
    this.setState(
      update(this.state, { workout_set: { reps: { $set: value } } })
    );
  }

  handleWeightChange(event) {
    let value = event.target.value ? parseFloat(event.target.value) : undefined;
    this.setState(
      update(this.state, { workout_set: { weight: { $set: value } } })
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleUpdateSet(this.state.workout_set);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-row">
          <div className="input-group col mb-2 mb-sm-0">
            <input
              type="number"
              min="1"
              step="1"
              name="reps"
              value={this.state.workout_set.reps}
              className="form-control"
              onChange={this.handleRepsChange}
              autoFocus="autofocus"
              required
            />
            <div className="input-group-addon">reps</div>
          </div>
          <div className="input-group col mb-2 mb-sm-0">
            <input
              type="number"
              min="1"
              step="1"
              name="weight"
              value={this.state.workout_set.weight}
              className="form-control"
              onChange={this.handleWeightChange}
            />
            <div className="input-group-addon">kg</div>
          </div>
          <div className="group col-3">
            <button className="btn btn-block btn-primary">Save</button>
          </div>
        </div>
      </form>
    );
  }
}

export default WorkoutPlanSetForm;
