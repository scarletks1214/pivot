import React from 'react';
import $ from 'jquery';

export const FormGroup = props => {
  let label = props.label;
  let modifiedProps = $.extend({}, props);
  delete modifiedProps.label;

  let className = (modifiedProps.className || '') + ' form-group';
  if (modifiedProps.className) {
    delete modifiedProps.className;
  }

  let input = <FormControl {...modifiedProps} />;

  return (
    <div className={className}>
      <label htmlFor={modifiedProps.id}>{label}</label>
      {input}
    </div>
  );
};

export class FormControl extends React.Component {
  constructor(props) {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  /**
   * Creates an update expression for this value for immutability-helper
   * update() function.
   */
  generateUpdateExpression(newValue) {
    let steps = this.props.name.split('.');
    let result = {};
    let current = result;
    steps.forEach(step => {
      current[step] = {};
      current = current[step];
    });

    current.$set = newValue;

    return result;
  }

  handleUpdate(event) {
    let value = event.target.type === 'number' ? parseFloat(event.target.value, 10) : event.target.value;
    if (this.props.handleUpdate) {
      this.props.handleUpdate(this.generateUpdateExpression(value));
    } else if (this.props.handleChange) {
      this.props.handleChange(value);
    }
  }

  render() {
    const defaultProps = {
      type: 'text',
    };
    let resultprops = $.extend(defaultProps, this.props);

    const validClass = 'is-valid';
    const invalidClass = 'is-invalid';

    resultprops.className = 'form-control' + (resultprops.className || ' ');
    if (this.props.valid !== undefined) {
      if (this.props.value && this.props.valid) {
        resultprops.className = resultprops.className + validClass;
      } else if (this.props.value && !this.props.valid) {
        resultprops.className = resultprops.className + invalidClass;
      }

      delete resultprops.valid;
    }

    delete resultprops.handleUpdate;
    delete resultprops.handleChange;

    let result;

    if (resultprops.suffix) {
      let suffix = resultprops.suffix;
      delete resultprops.suffix;
      result = (
        <div className="input-group">
          <input {...resultprops} onChange={this.handleUpdate} />
          <span className="input-group-addon">{suffix}</span>
        </div>
      );
    } else {
      result = <input {...resultprops} onChange={this.handleUpdate} />;
    }

    return result;
  }
}

export class SelectFormControl extends React.Component {
  constructor(props) {
    super();
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  /**
   * Creates an update expression for this value for immutability-helper
   * update() function.
   */
  generateUpdateExpression(newValue) {
    let steps = this.props.name.split('.');
    let result = {};
    let current = result;
    steps.forEach(step => {
      current[step] = {};
      current = current[step];
    });

    current.$set = newValue;

    return result;
  }

  handleUpdate(event) {
    if (this.props.multiple) {
      let value = Array.from(event.target.options)
        .filter(o => o.selected)
        .map(o => o.value);
      this.props.handleUpdate(this.generateUpdateExpression(value));
    } else {
      let value = event.target.value;
      if (typeof this.props.options[0].value === 'number') {
        value = parseFloat(value);
      }
      this.props.handleUpdate(this.generateUpdateExpression(value));
    }
  }

  render() {
    const defaultProps = {
      options: [],
      type: 'text',
    };
    let resultprops = $.extend(defaultProps, this.props);

    resultprops.className = 'form-control ' + resultprops.className;

    let options = resultprops.options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
    delete resultprops.options;
    delete resultprops.handleUpdate;

    return (
      <select {...resultprops} onChange={this.handleUpdate}>
        {options}
      </select>
    );
  }
}
