import React from 'react';

import ConditionDisplay from './ConditionDisplay';
import ConditionForm from './ConditionForm';
import { FormControl } from '../../components/FormControl';

import update from 'immutability-helper';

export class AngleConditionDisplay extends React.Component {
  render() {
    let minText = this.props.condition.min + '°';
    let maxText = this.props.condition.max + '°';
    return (
      <span>
        <span className="angle-type">{this.props.condition.angle_type}</span> between
        <span className="badge badge-secondary">{minText}</span> and
        <span className="badge badge-secondary">{maxText}</span>
      </span>
    );
  }
}

export class AngleConditionForm extends React.Component {
  constructor(props) {
    super();
    this.AngleTypes = [
      'ElbowLeft',
      'ElbowRight',

      'ArmpitLeft',
      'ArmpitRight',

      'ShoulderLateralLeft',
      'ShoulderLateralRight',

      'ForearmLateralLeft',
      'ForearmLateralRight',

      'HipLeft',
      'HipRight',

      'KneeLeft',
      'KneeRight',

      'AnkleLeft',
      'AnkleRight',

      'HipSpread',
      'Spine',

      'ForearmInclineLeft',
      'ForearmInclineRight',
    ];

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleAngleTypeChange = this.handleAngleTypeChange.bind(this);
  }

  handleUpdate(expression) {
    let newState = update(this.props, expression);
    this.props.onChange(newState.item);
  }

  handleAngleTypeChange(event) {
    let result = update(this.props.item, {
      angle_type: { $set: event.target.value },
    });
    this.props.onChange(result, this.formValid(result));
  }

  formValid(result) {
    return result.angle_type && result.min && result.max && result.min < result.max;
  }

  render() {
    let angleOptions = this.AngleTypes.map(type => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
    return (
      <div>
        <div className="form-group">
          <label htmlFor="type">Angle</label>
          <select
            className="form-control"
            required
            value={this.props.item.angle_type}
            onChange={this.handleAngleTypeChange}
          >
            <option value="">Select angle type...</option>
            {angleOptions}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group col-6 mb-2">
            <label>Min</label>
            <FormControl
              suffix="°"
              type="number"
              required
              name="item.min"
              value={this.props.item.min}
              min="-360.0"
              max={this.props.item.max}
              valid={(this.props.item.min && !this.props.item.max) || this.props.item.min < this.props.item.max}
              handleUpdate={this.handleUpdate}
            />
          </div>
          <div className="form-group col-6 mb-2">
            <label>Max</label>
            <FormControl
              suffix="°"
              type="number"
              required
              name="item.max"
              valid={(this.props.item.max && !this.props.item.min) || this.props.item.max > this.props.item.min}
              value={this.props.item.max}
              min={this.props.item.min}
              max="360.0"
              handleUpdate={this.handleUpdate}
            />
          </div>
        </div>
      </div>
    );
  }
}
