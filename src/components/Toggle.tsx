import * as React from 'react';

import Button from '../utils/Button';

export interface IToggleProps<T> {
  selected?: T;

  values: string[];

  selectedColor?: string;
  unselectedColor?: string;
  color?: string;

  className?: string;

  beforeUpdate(oldValue: T): boolean;
  onUpdate(newValue: T): void;
}

export interface IToggleState<T> {
  selected?: T;
  selectedColor?: string;
  unselectedColor?: string;
  color?: string;
}

class Toggle extends React.Component<IToggleProps<string>, IToggleState<string>> {
  constructor(props: IToggleProps<string>) {
    super(props);

    this.state = {
      selected: props.selected,
    };

    this.renderButton = this.renderButton.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  public render() {
    return (
      <div className="btn-group toggle" role="group">
        {this.props.values.map(this.renderButton)}
      </div>
    );
  }

  private handleUpdate(value: string) {
    if (this.props.beforeUpdate && this.props.beforeUpdate(value) === false) {
      return;
    }

    this.setState({ selected: value });

    if (this.props.onUpdate) {
      this.props.onUpdate(value);
    }
  }

  private renderButton(value: string) {
    const selected = this.state.selected === value;

    const {
      onUpdate: onUpdate,
      values: values,
      beforeUpdate: beforeUpdate,
      selectedColor: selectedColor,
      unselectedColor: unselectedColor,
      color: color,
      className: className,
      ...forwardProps
    } = this.props;

    const resultColor = (selected ? '' : 'outline-') + (this.props.color || 'secondary');

    const resultClassName = (className || '') + (selected ? ' disabled' : '');

    const handleClick = () => this.handleUpdate(value);

    return (
      <Button
        key={value}
        color={resultColor}
        className={resultClassName}
        onClick={handleClick}
        disabled={selected}
        {...forwardProps}
      >
        {value}
      </Button>
    );
  }
}

export default Toggle;
