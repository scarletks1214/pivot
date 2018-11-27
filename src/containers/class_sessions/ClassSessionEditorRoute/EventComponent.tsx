import * as React from 'react';
import { ChangeEvent } from 'react';
import update, { Query } from 'immutability-helper';
import { Input, InputGroup, InputGroupAddon, Form, Button, Label } from 'reactstrap';

import { Duration, Exercise, WorkoutPlanSetEvent, ModelReference, WorkoutPlanEvent } from 'models';
import { IResourceEditorProps } from '../../../components/ResourceEditor';
import { ExercisePicker, DurationInput } from '../../../components';
import './EventComponent.css';

class EventTypeSelectComponent extends React.Component<IResourceEditorProps<WorkoutPlanEvent>> {
  render() {
    return <Label className="type">{this.props.value.type[0].toUpperCase()}</Label>;
  }
}

export default class EventComponent extends React.Component<
  IResourceEditorProps<WorkoutPlanEvent>,
  { event: WorkoutPlanEvent }
> {
  constructor(props: IResourceEditorProps<WorkoutPlanSetEvent>) {
    super(props);
    this.state = { event: props.value };
  }

  handleRepsChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.valueAsNumber) {
      this.handleChange({ reps: { $set: event.target.valueAsNumber } });
    }
  };

  handleWeightChanged = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.valueAsNumber) {
      this.handleChange({ weight: { value: { $set: event.target.valueAsNumber / 100.0 } } });
    }
  };

  handleWeightToggle = () => {
    const event = this.state.event;

    if (event.type !== 'set') {
      return;
    }

    if (event.weight) {
      this.handleChange({ weight: { $set: undefined } });
      this.handleSubmit();
    } else {
      this.handleChange({ weight: { $set: { type: '%1rm', value: undefined } } });
    }
  };

  handleRepsToggle = () => {
    const event = this.state.event;

    if (event.type !== 'set') {
      return;
    }

    if (event.reps) {
      this.handleChange({ reps: { $set: undefined } });
      this.handleSubmit();
    } else {
      this.handleChange({ reps: { $set: 1 } });
    }
  };

  handleDurationChanged = (newDuration: Duration) => {
    this.handleChange({ duration: { $set: newDuration } });
  };

  handleExerciseChanged = (newExercise: Exercise) => {
    const newEvent = this.handleChange({
      exercise: { $set: new ModelReference<Exercise>(newExercise.id) },
      resolvedExercise: { $set: newExercise },
    });
    this.submit(newEvent);
  };

  handleChange = (query: Query<WorkoutPlanEvent>): WorkoutPlanEvent => {
    const newSetEvent = update(this.state.event, query);
    this.setState({ event: newSetEvent });
    return newSetEvent;
  };

  handleFocus = (event: any) => {
    // Triggers selection on click so you can replace the number by typing.
    event.target.select();
  };

  submit = (newEvent: WorkoutPlanEvent) => {
    this.props.onChange(newEvent, this.props.value);
  };

  handleSubmit = (event?: any) => {
    this.submit(this.state.event);
    if (event && event.preventDefault) {
      event.preventDefault();
    }
  };

  render() {
    const event = this.state.event;

    const controls: React.ReactNode[] = [<Button type="submit" style={{ display: 'none' }} />];

    if (event.type === 'set') {
      controls.push(
        <InputGroup size="sm" className="exercise-picker">
          <ExercisePicker value={event.resolvedExercise} onChange={this.handleExerciseChanged} />
        </InputGroup>
      );

      controls.push(
        <InputGroup size="sm">
          <Input
            type="number"
            min={1}
            step={1}
            max={50}
            value={event.reps}
            disabled={event.reps === undefined}
            onChange={this.handleRepsChanged}
            onFocus={this.handleFocus}
            onBlur={this.handleSubmit}
          />
          <InputGroupAddon addonType="append" onClick={this.handleRepsToggle}>
            reps
          </InputGroupAddon>
        </InputGroup>
      );

      controls.push(
        <InputGroup size="sm">
          <Input
            type="number"
            min={0}
            step={5}
            max={100}
            value={event.weight ? event.weight.value * 100.0 : undefined}
            disabled={!event.weight}
            onChange={this.handleWeightChanged}
            onFocus={this.handleFocus}
            onBlur={this.handleSubmit}
          />
          <InputGroupAddon addonType="append" onClick={this.handleWeightToggle}>
            %1RM
          </InputGroupAddon>
        </InputGroup>
      );
    }
    return [
      <li className="workout-plan-event list-unstyled" key="editor">
        <Form inline={true} onSubmit={this.handleSubmit}>
          <EventTypeSelectComponent onChange={this.props.onChange} value={event} />
          <DurationInput value={event.duration} onChange={this.handleDurationChanged} size="sm" className="duration" />
          {controls}
          {this.props.children}
        </Form>
      </li>,
    ];
  }
}
