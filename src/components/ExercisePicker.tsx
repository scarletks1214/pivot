import * as React from 'react';

import { Exercise } from 'models';
import Api from '../api';
import { IResourcePickerProps } from './ResourceEditor';
import ExerciseAutocomplete from './ExerciseAutocomplete';

export default class ExercisePicker extends React.Component<
  IResourcePickerProps<Exercise | undefined>,
  { open: boolean }
> {
  constructor(props: IResourcePickerProps<Exercise>) {
    super(props);
    this.state = { open: props.value === undefined };
  }

  handleChange = (newExercise: Exercise) => {
    this.props.onChange(newExercise);
  };

  open = () => {
    this.setState({ open: true });
  };

  close = () => {
    this.setState({ open: false });
  };

  render(): React.ReactNode {
    if (this.state.open) {
      return <ExerciseAutocomplete exerciseApi={Api.exercises} onChange={this.handleChange} onBlur={this.close} />;
    } else {
      return <span onClick={this.open}>{this.props.value ? this.props.value.name : ''}</span>;
    }
  }
}
