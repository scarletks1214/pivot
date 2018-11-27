import * as React from 'react';

import Toggle, { IToggleProps, IToggleState } from './Toggle';

import update from 'immutability-helper';

export default class BooleanToggle extends React.Component<IToggleProps<boolean>, IToggleState<boolean>> {
  constructor(props: IToggleProps<boolean>) {
    super(props);

    if (props.values.length !== 2) {
      throw new Error('Only 2 values (false, true) may be provided to BooleanToggle.');
    }

    const selectedColor = props.selectedColor || 'success';
    const unselectedColor = props.unselectedColor || 'secondary';

    this.state = {
      color: props.selected ? selectedColor : unselectedColor,
      selectedColor,
      unselectedColor,
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.beforeUpdate = this.beforeUpdate.bind(this);
  }

  public render() {
    const { onUpdate: onUpdate, beforeUpdate: beforeUpdate, selected: selected, ...forwardProps } = this.props;

    return (
      <Toggle
        {...forwardProps}
        selected={selected ? this.props.values[1] : this.props.values[0]}
        color={this.state.color}
        onUpdate={this.handleUpdate}
        beforeUpdate={this.beforeUpdate}
      />
    );
  }

  private beforeUpdate(value: string) {
    const booleanValue = value === this.props.values[1];
    if (this.props.beforeUpdate && this.props.beforeUpdate(booleanValue) === false) {
      return false;
    }
    return true;
  }

  private handleUpdate(value: string) {
    const booleanValue = value === this.props.values[1];

    this.setState(
      update(this.state, {
        color: {
          $set: booleanValue ? this.state.selectedColor : this.state.unselectedColor,
        },
      })
    );

    if (this.props.onUpdate) {
      this.props.onUpdate(booleanValue);
    }
  }
}
