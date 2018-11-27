import React from 'react';
import $ from 'jquery';
import { Card, CardList } from '../utils/Card';
import WorkoutPlanSetForm from './WorkoutPlanSetForm';

const WorkoutPlanSetDisplay = props => {
  let text =
    props.workout_set.reps +
    ' reps' +
    (props.workout_set.weight ? ' @' + props.workout_set.weight + ' kg' : '');
  return (
    <div>
      <div
        onClick={props.onClick}
        className="form-control-plaintext"
        style={{ display: 'inline-block' }}
      >
        {text}
      </div>
      <span className="pull-right hover-show">
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={props.onClick}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={props.handleDelete}
        >
          <i className="fa fa-trash" />
        </button>
      </span>
    </div>
  );
};

class WorkoutPlanExerciseForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      collapsed: false,
      edit_index: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleAddSet = this.handleAddSet.bind(this);
    this.handleUpdateExercise = props.handleUpdateExercise.bind(this);
  }

  handleDelete(index) {
    let sets = this.props.exercise.sets;
    sets.splice(index, 1);

    this.handleUpdateExercise($.extend(this.props.exercise, { sets: sets }));
    this.setState({ edit_index: null });
  }

  handleClick(index) {
    this.setState({ edit_index: index });
  }

  handleEdit(index, newSet) {
    let sets = this.props.exercise.sets.slice();
    sets[index] = newSet;

    this.handleUpdateExercise(
      $.extend({}, this.props.exercise, { sets: sets })
    );
    this.setState({ edit_index: null });
  }

  handleAddSet() {
    let sets = this.props.exercise.sets;
    let newSet;
    if (sets.length === 0) {
      newSet = { reps: 0 };
    } else {
      newSet = sets[sets.length - 1];
    }

    sets.push(newSet);

    this.handleUpdateExercise($.extend(this.props.exercise, { sets: sets }));
    this.setState({
      edit_index: sets.length - 1,
    });
  }

  render() {
    const sets = this.props.exercise.sets.map((workout_set, index) => {
      return (
        <div key={index}>
          {this.state.edit_index === index ? (
            <WorkoutPlanSetForm
              workout_set={workout_set}
              handleClick={this.handleEdit.bind(index)}
              handleUpdateSet={set => this.handleEdit(index, set)}
            />
          ) : (
            <WorkoutPlanSetDisplay
              onClick={() => this.handleClick(index)}
              workout_set={workout_set}
              handleDelete={this.handleDelete.bind(index)}
            />
          )}
        </div>
      );
    });

    sets.push(
      <button
        key={'add'}
        type="button"
        className="btn btn-primary pull-right"
        onClick={this.handleAddSet}
      >
        <i className="fa fa-plus" /> Add Set
      </button>
    );

    return (
      <Card
        title={this.props.index + 1 + '. ' + this.props.exercise.name}
        titleImage={this.props.exercise.images[0]}
      >
        {this.state.collapsed ? null : <CardList>{sets}</CardList>}
      </Card>
    );
  }
}

export default WorkoutPlanExerciseForm;
