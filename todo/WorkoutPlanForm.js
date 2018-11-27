import React from 'react';
import Api from '../Api';
import $ from 'jquery';
import ExerciseSelectForm from '../utils/ExerciseSelectForm';
import WorkoutPlanExerciseForm from './WorkoutPlanExerciseForm';

class WorkoutPlanForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      exercises: props.exercises || [],
    };

    this.handleUpdate = props.handleUpdate.bind(this);
    this.handleUpdateExercise = this.handleUpdateExercise.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
  }

  deleteExercise(index) {
    if (window.confirm('Are you sure you want to delete this exercise?')) {
      this.handleUpdateExercise(index);
    }
  }

  addExercise(new_exercise) {
    let exercises = this.props.workout_plan.exercises;
    exercises.push({
      id: new_exercise.id,
      images: new_exercise.media.filter(m => m.type_id === 1).map(m => m.url),
      name: new_exercise.name,
      sets: [],
    });
    let updated_workout_plan = $.extend(this.props.workout_plan, {
      exercises: exercises,
    });
    this.handleUpdate(updated_workout_plan);
  }

  handleUpdateExercise(index, replace) {
    let exercises = this.props.workout_plan.exercises;

    if (replace) {
      exercises.splice(index, 1, replace);
    } else {
      exercises.splice(index, 1);
    }

    let updated_workout_plan = $.extend(this.props.workout_plan, {
      exercises: exercises,
    });
    this.handleUpdate(updated_workout_plan);
  }

  componentDidMount() {
    if (this.state.exercises === []) {
      Api.exercises.all().then(exercises => {
        this.setState($.merge(this.state, { exercises: exercises }));
      });
    }
  }

  render() {
    const workout_plan_exercises = this.props.workout_plan
      ? this.props.workout_plan.exercises
      : [];

    function pageIdForExercise(index, exercise) {
      return '' + index + '-' + exercise.id;
    }
    const exercise_forms = workout_plan_exercises.map((exercise, index) => (
      <li
        key={pageIdForExercise(index, exercise)}
        className="mb-4 col-md-6 col-sm-12"
        id={pageIdForExercise(index, exercise)}
      >
        <WorkoutPlanExerciseForm
          index={index}
          exercise={exercise}
          handleUpdateExercise={new_exercise =>
            this.handleUpdateExercise(index, new_exercise)
          }
        />
      </li>
    ));

    const exercise_links = workout_plan_exercises.map((exercise, index) => (
      <li className="nav-item" key={index}>
        <a className="nav-link" href={'#' + pageIdForExercise(index, exercise)}>
          {exercise.name}
        </a>
        <button
          className="btn btn-outline-danger btn-sm pull-right"
          onClick={() => this.deleteExercise(index)}
        >
          <i className="fa fa-trash" />
        </button>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-3 sm-hide" id="navbar-example">
          <ul
            className="nav flex-column nav-list"
            style={{ position: 'fixed' }}
          >
            {exercise_links}
          </ul>
        </div>

        <div className="col-md-9">
          <div>
            <ExerciseSelectForm
              className="mb-4"
              handleExerciseSelected={this.addExercise}
            />
          </div>

          <ul className="list-unstyled row">{exercise_forms}</ul>
        </div>
      </div>
    );
  }
}

export default WorkoutPlanForm;
