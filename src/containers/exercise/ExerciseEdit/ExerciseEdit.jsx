import React from 'react';
import moment from 'moment';
import update from 'immutability-helper';

import { Exercise, TrainerExercise } from 'models';
import Api from '../../../api';
import { SaveButton } from '../../../components';
import Button from '../../../utils/Button';
import JsonPreview from '../../../utils/JsonPreview';
import Alert from '../../../utils/Alert';
import ExerciseForm from './ExerciseForm';

export default class ExerciseEdit extends React.Component {
  constructor(props) {
    super();
    this.state = {
      errors: [],
      exercise: props.exercise,
      saved: props.exercise,
    };
  }

  componentDidMount() {
    if (!this.props.exercise && this.props.exercise_id) {
      Api.trainerExercises
        .one(this.props.exercise_id)
        .then(exercise => {
          this.setExercise(exercise);
          this.setState(
            update(this.state, {
              saved: { $set: new Exercise(exercise) },
              saving: { $set: false },
            })
          );
        })
        .catch(error => {
          this.setState(update(this.state, { error: { $set: 'Failed to load exercise.' } }));
        });
    } else {
      this.setExercise({
        muscle_groups: ['Unknown'],
        name: 'New Exercise',
        workstation_data: {
          rep_counting: {
            count_at: 0,
            steps: [],
          },
        },
      });
    }
  }

  isDirty = () => {
    return JSON.stringify(this.state.saved) !== JSON.stringify(this.state.exercise);
  };

  isNewExercise = () => {
    return !this.state.exercise.id;
  };

  handleUpdate = newExercise => {
    this.setExercise(newExercise);
  };

  setExercise = newExercise => {
    this.setState(update(this.state, { exercise: { $set: newExercise } }));
  };

  saveExercise = () => {
    this.setState(update(this.state, { saving: { $set: true }, errors: { $set: [] } }));

    if (this.isNewExercise()) {
      Api.trainerExercises
        .create(this.state.exercise)
        .then(res => {
          this.setExercise(res.data);
          this.setState(
            update(this.state, {
              saving: { $set: false },
              saved: { $set: res.data },
              alert: { $set: { title: 'Saved.' } },
            })
          );
          window.location.replace('/trainer/exercises/' + res.data.id);
        })
        .catch(error => {
          let errors = [];
          if (error.response && error.response.data) {
            errors = error.response.data.errors;
            if (typeof errors === 'string') {
              errors = [errors];
            }
          } else {
            errors = ['Unknown error while saving.'];
          }

          this.setState(
            update(this.state, {
              saving: { $set: false },
              errors: { $set: errors },
            })
          );
        });
    } else {
      let state = this.state;
      Api.trainerExercises
        .save(this.state.exercise)
        .then(exercise => {
          let newState = update(state, {
            alert: {
              $set: {
                title: 'Save Successful',
                type: 'success',
                text: 'Last saved at ' + moment().format(),
              },
            },
            exercise: { $set: exercise },
            saving: { $set: false },
          });
          this.setState(newState);
        })
        .catch(this.handleError);
    }
  };

  handleError = error => {
    let errors = [];
    if (error.response && typeof error.response.data === 'object') {
      errors = error.response.data.errors;
      if (typeof errors === 'string') {
        errors = [errors];
      }
    } else if (error.response && typeof error.response.data !== 'object') {
      errors = ['Save failed for an unknown reason.'];
    } else {
      errors = ['Failed to connect to server.'];
    }
    this.setState(update(this.state, { saving: { $set: false }, errors: { $set: errors } }));
  };

  handleNameChange = event => {
    let exercise = update(this.state.exercise, {
      name: { $set: event.target.value },
    });
    this.setState(update(this.state, { exercise: { $set: exercise } }));
  };

  renderError = error => {
    return (
      <p key={error} className="alert alert-danger alert-dismissible fade show" role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong className="mr-1">{this.isNewExercise() ? 'Creation' : 'Save'} Failed</strong>
        {error}
      </p>
    );
  };

  importExercise = button => {
    var reader = new FileReader();
    var files = button.target.files;
    if (!files.length) {
      return;
    }

    var file = files[0];

    let mergeExercise = newExercise => {
      this.setState(update(this.state, { exercise: { $merge: newExercise } }));
    };

    let me = this;
    reader.onloadend = function(evt) {
      if (evt.target.readyState === FileReader.DONE) {
        // DONE == 2
        var text = evt.target.result;
        try {
          var exerciseJson = JSON.parse(text);
        } catch (e) {
          alert(file.name + ' is not valid JSON.');
          return;
        }

        if (exerciseJson.rep_counting) {
          exerciseJson = { workstation_data: exerciseJson };
        }

        var updateStep = step => {
          if (step.condition && (step.type === 'all' || step.type === 'any')) {
            step.conditions = step.condition.map(updateStep);
            delete step.condition;
          } else if (step.condition && step.type === 'angle') {
            step.angle_type = step.condition.angle_type;
            step.min = step.condition.min;
            step.max = step.condition.max;
            delete step.condition;
          }

          return step;
        };

        exerciseJson.workstation_data.rep_counting.steps = exerciseJson.workstation_data.rep_counting.steps.map(
          updateStep
        );

        mergeExercise(TrainerExercise.fromJson(exerciseJson));

        me.setState(
          update(me.state, {
            alert: {
              $set: {
                title: 'Import Successful',
                type: 'success',
                text: 'Successful import from ' + file.name,
              },
            },
          })
        );
      }
    };

    reader.readAsText(file, 'utf-8');
  };

  dismissAlert = () => {
    this.setState(update(this.state, { alert: { $set: null } }));
  };

  render() {
    let children;
    let downloadButton = this.state.exercise ? (
      <a
        className="ml-2 pull-right btn btn-lg btn-secondary"
        href={'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.state.exercise.toJson()))}
        download={this.state.exercise.name + '.json'}
      >
        Download
      </a>
    ) : null;

    let alert = this.state.alert ? (
      <Alert type={this.state.alert.type} title={this.state.alert.title} text={this.state.alert.text}>
        <button type="button" className="close" onClick={() => this.dismissAlert()}>
          <span aria-hidden="true">&times;</span>
        </button>
      </Alert>
    ) : null;

    if (this.state.exercise) {
      children = (
        <div>
          <h1>
            {this.state.exercise.name} &nbsp;
            {downloadButton}
            <label className="ml-2 btn btn-lg btn-secondary">
              <input type="file" name="file" id="load-button" onChange={this.importExercise} hidden />
              Import
            </label>
            <SaveButton
              onClick={this.saveExercise}
              saving={this.state.saving}
              saveLabel={this.isNewExercise() ? 'Create' : 'Save'}
              savingLabel={this.isNewExercise() ? 'Creating' : 'Saving'}
            />
          </h1>

          {alert}

          <ExerciseForm onChange={this.handleUpdate} value={this.state.exercise} />
        </div>
      );
    } else if (this.state.error) {
      children = <div className="alert alert-danger">Failed to load exercise.</div>;
    } else {
      children = (
        <div className="jumbotron text-center">
          <h1 className="display-9">Loading...</h1>
          <div style={{ fontSize: '3em' }}>
            <i className="fa fa-spinner fa-spin" />
          </div>
        </div>
      );
    }

    let errorsDisplay = this.state.errors ? this.state.errors.map(this.renderError) : null;

    let jsonPreview = this.state.exercise ? (
      <section className="mt-4">
        <JsonPreview json={this.state.exercise} />
      </section>
    ) : null;

    return (
      <main id="content" role="main">
        <div className="container my-5">
          {errorsDisplay}
          {children}
          {jsonPreview}
        </div>
      </main>
    );
  }
}
