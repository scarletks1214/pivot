import { Exercise } from 'models';
import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import { IExerciseApi } from '../api/ExerciseApi';
import Nullable from '../utils/Nullable';

interface IProps {
  exerciseApi: IExerciseApi;
  onChange?: (exercise: Exercise) => void;
  defaultInput?: string;
  disabled?: boolean;
  onBlur?: () => void;
}

interface IState {
  exercises: Nullable<Exercise[]>;
}

export default class ExerciseAutocomplete extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { exercises: null };
  }

  componentDidMount() {
    (this.props.exerciseApi as IExerciseApi).all().then(exercises => this.setState({ exercises }));
  }

  handleChange = (exercises: any[]) => {
    if (exercises.length === 0) {
      return;
    }

    const match = this.props.exerciseApi.get(exercises[0].id);

    if (this.props.onChange && match !== null) {
      this.props.onChange(match);
    }
  };

  render() {
    let options: any[] = [];
    if (this.state.exercises !== null) {
      options = this.state.exercises.map(e => {
        return { id: e.id, name: e.name };
      });
    }

    return (
      <Typeahead
        labelKey="name"
        multiple={false}
        options={options}
        onChange={this.handleChange}
        onBlur={this.props.onBlur}
        placeholder="Choose an exercise"
        disabled={this.props.disabled || this.state.exercises === null}
        defaultInputValue={this.props.defaultInput}
      />
    );
  }
}
