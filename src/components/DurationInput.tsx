import * as React from 'react';
import { ChangeEvent } from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';

import { Duration } from 'models';
import { IResourceEditorProps } from './ResourceEditor';

interface IDurationInputProps extends IResourceEditorProps<Duration> {
  size?: string;
  className?: string;
}

export default class DurationInput extends React.Component<IDurationInputProps> {
  constructor(props: IDurationInputProps) {
    super(props);
    this.handleSecondsChanged = this.handleSecondsChanged.bind(this);
  }

  public render(): React.ReactNode {
    const { value, onChange, ...props } = this.props;
    return (
      <InputGroup {...props}>
        <Input
          type="number"
          min={0}
          step={5}
          value={this.props.value.asMilliseconds() / 1000.0}
          onChange={this.handleSecondsChanged}
        />
        <InputGroupAddon addonType="append">secs</InputGroupAddon>
      </InputGroup>
    );
  }

  public handleSecondsChanged(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      return;
    }

    const newDuration = Duration.Seconds(event.target.valueAsNumber);
    this.props.onChange(newDuration);
  }
}
