import React from 'react';
import update from 'immutability-helper';

import $ from 'jquery';
import ListEditForm from '../../../utils/ListEditForm';
import { FormControl, SelectFormControl } from '../../../components/FormControl';

class ShownAngleForm extends React.Component {
  constructor(props) {
    super();

    let item = props.item || {};
    this.state = {
      angle: item,
      showDanger: !!item.danger,
      showTarget: !!item.target,
    };

    this.AngleTypes = [
      { value: '', label: 'Select an angle type...' },
      { value: 'ElbowLeft', label: 'ElbowLeft' },
      { value: 'ElbowRight', label: 'ElbowRight' },

      { value: 'ArmpitLeft', label: 'ArmpitLeft' },
      { value: 'ArmpitRight', label: 'ArmpitRight' },

      { value: 'ShoulderLateralLeft', label: 'ShoulderLateralLeft' },
      { value: 'ShoulderLateralRight', label: 'ShoulderLateralRight' },

      { value: 'ForearmLateralLeft', label: 'ForearmLateralLeft' },
      { value: 'ForearmLateralRight', label: 'ForearmLateralRight' },

      { value: 'HipLeft', label: 'HipLeft' },
      { value: 'HipRight', label: 'HipRight' },

      { value: 'KneeLeft', label: 'KneeLeft' },
      { value: 'KneeRight', label: 'KneeRight' },

      { value: 'AnkleLeft', label: 'AnkleLeft' },
      { value: 'AnkleRight', label: 'AnkleRight' },

      { value: 'HipSpread', label: 'HipSpread' },
      { value: 'Spine', label: 'Spine' },

      { value: 'ForearmInclineLeft', label: 'ForearmInclineLeft' },
      { value: 'ForearmInclineRight', label: 'ForearmInclineRight' },
    ];
  }

  handleUpdateAngleType = expression => {
    let newState = update(this.state, expression);
    this.handleUpdate(newState);
  };

  handleUpdateTargetCheck = event => {
    let value = event.target.checked;
    let newState = update(this.state, { showTarget: { $set: value } });
    if (!value) {
      delete newState.target;
    }
    this.setState(newState);
  };

  handleUpdateDangerCheck = event => {
    let value = event.target.checked;
    let newState = update(this.state, { showDanger: { $set: value } });
    if (!value) {
      delete newState.danger;
    }
    this.setState(newState);
  };

  handleUpdate = newState => {
    this.setState(newState);
    this.props.onChange(newState.angle);
  };

  handleTargetMinChange = newMin => {
    let newState = $.extend({}, this.state);
    newState.angle.target = newState.angle.target || {};
    newState.angle.target.min = newMin;
    this.handleUpdate(newState);
  };

  handleTargetMaxChange = newMax => {
    let newState = $.extend({}, this.state);
    newState.angle.target = newState.angle.target || {};
    newState.angle.target.max = newMax;
    this.handleUpdate(newState);
  };

  handleDangerMinChange = newMin => {
    let newState = $.extend({}, this.state);
    newState.angle.danger = newState.angle.danger || {};
    newState.angle.danger.min = newMin;
    this.handleUpdate(newState);
  };

  handleDangerMaxChange = newMax => {
    let newState = $.extend({}, this.state);
    newState.angle.danger = newState.angle.danger || {};
    newState.angle.danger.max = newMax;
    this.handleUpdate(newState);
  };

  render() {
    let angleSelect = (
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="type">Angle</label>
          <SelectFormControl
            name="angle.type"
            handleUpdate={this.handleUpdateAngleType}
            options={this.AngleTypes}
            value={this.state.angle.type}
          />
        </div>
      </div>
    );

    return (
      <form name="angleShownForm">
        {angleSelect}

        <div className="form-row mb-2">
          <div className="col-4 align-self-center">
            <label className="form-check-label">
              <input
                type="checkbox"
                value={this.state.showTarget}
                onChange={this.handleUpdateTargetCheck}
                className="form-check-input"
              />
              Turns Green
            </label>
          </div>

          <span className={'col' + (this.state.showTarget ? '' : ' invisible')}>
            <div className="row">
              <div className="input-group col">
                <FormControl
                  type="number"
                  value={this.state.angle.target ? this.state.angle.target.min : undefined}
                  required
                  placeholder="Min"
                  min="-180"
                  max="180"
                  handleChange={value => this.handleTargetMinChange(value)}
                />
                <span className="input-group-addon">°</span>
              </div>

              <div className="input-group col">
                <FormControl
                  type="number"
                  value={this.state.angle.target ? this.state.angle.target.max : undefined}
                  required
                  placeholder="Max"
                  max="-180"
                  max="180"
                  handleChange={value => this.handleTargetMaxChange(value)}
                />
                <span className="input-group-addon">°</span>
              </div>
            </div>
          </span>
        </div>

        <div className="form-row mb-2">
          <div className="col-4 align-self-center">
            <label className="form-check-label">
              <input
                type="checkbox"
                value={this.state.showDanger}
                onChange={this.handleUpdateDangerCheck}
                className="form-check-input"
              />
              Turns Red
            </label>
          </div>

          <span className={'col' + (this.state.showDanger ? '' : ' invisible')}>
            <div className="row">
              <div className="input-group col">
                <FormControl
                  type="number"
                  value={this.state.angle.danger ? this.state.angle.danger.min : undefined}
                  required
                  placeholder="Min"
                  min="-180"
                  max="180"
                  handleChange={value => this.handleDangerMinChange(value)}
                />
                <span className="input-group-addon">°</span>
              </div>

              <div className="input-group col">
                <FormControl
                  type="number"
                  value={this.state.angle.danger ? this.state.angle.danger.max : undefined}
                  required
                  placeholder="Min"
                  min="-180"
                  max="180"
                  handleChange={value => this.handleDangerMaxChange(value)}
                />
                <span className="input-group-addon">°</span>
              </div>
            </div>
          </span>
        </div>
      </form>
    );
  }
}

class ShownAngleDisplay extends React.Component {
  render() {
    let targetView = this.props.angle.target ? (
      <span className="angle-target mr-2">
        <span className="min">
          {this.props.angle.target.min}
          &deg;
        </span>
        &ndash;
        <span className="max">
          {this.props.angle.target.max}
          &deg;
        </span>
      </span>
    ) : null;

    let dangerView = this.props.angle.danger ? (
      <span className="angle-danger mr-2">
        <span className="min">
          {this.props.angle.danger.min}
          &deg;
        </span>
        &ndash;
        <span className="max">
          {this.props.angle.danger.max}
          &deg;
        </span>
      </span>
    ) : null;

    return (
      <div>
        <span className="angle-type mr-2">{this.props.angle.type}</span>
        {targetView}
        {dangerView}
      </div>
    );
  }
}

export default class AnglesForm extends React.Component {
  constructor() {
    super();

    this.renderAngleDisplay = this.renderAngleDisplay.bind(this);
  }

  renderAngleDisplay(item, index) {
    return <ShownAngleDisplay angle={item} />;
  }

  render() {
    return (
      <ListEditForm
        items={this.props.items}
        itemDisplay={this.renderAngleDisplay}
        itemEdit={ShownAngleForm}
        newItem={() => ({})}
        onUpdate={this.props.onUpdate}
      />
    );
  }
}
