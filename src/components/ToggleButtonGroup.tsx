import * as React from 'react';

import { Button, ButtonGroup } from 'reactstrap';

import IEquatable from '../utils/IEquatable';

interface IProps<T extends IEquatable<T>> {
  options: T[];
  keyName: string;
  onChange?: (value: T) => void;
  color?: string;
  selected?: T;
  size?: string;
}

interface IState<T extends IEquatable<T>> {
  selected?: T;
}

class ToggleButtonGroup<T extends IEquatable<T>> extends React.Component<IProps<T>, IState<T>> {
  public static defaultProps = {
    color: 'primary',
  };

  constructor(props: IProps<T>) {
    super(props);

    this.state = {
      selected: props.selected,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  public render() {
    const size = this.props.size || 'md';

    const optionButtons = this.props.options.map(o => {
      const handleClick = () => this.handleButtonClick(o);
      return (
        <Button
          key={o[this.props.keyName]}
          onClick={handleClick}
          outline={!o.equals(this.state.selected)}
          size={size}
          color={this.props.color}
        >
          {o[this.props.keyName]}
        </Button>
      );
    });

    return <ButtonGroup size={size}>{optionButtons}</ButtonGroup>;
  }

  private handleButtonClick(option: T) {
    this.setState({ selected: option });

    if (this.props.onChange) {
      this.props.onChange(option);
    }
  }
}

export default ToggleButtonGroup;
