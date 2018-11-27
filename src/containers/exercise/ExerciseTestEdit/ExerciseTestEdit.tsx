import * as React from 'react';

import Api from '../../../api';
import Button from '../../../utils/Button';

import { Exercise } from 'models';
import ExerciseAutocomplete from '../../../components/ExerciseAutocomplete';
import ExerciseTest from '../../../models/ExerciseTest';

import { RouteComponentProps } from 'react-router-dom';
import { Col, Container, FormGroup, Input, Label, Row } from 'reactstrap';

import update from 'immutability-helper';

interface IProps extends RouteComponentProps<any> {}

interface IState {
  depthConfirm: boolean;
  depthFile: FileList | null;
  error: string | null;
  exerciseTest: ExerciseTest | null;
  exercise: Exercise | null;
  isSaveActive: boolean;
  skeletonsConfirm: boolean;
  skeletonsFile: FileList | null;
}

class ExerciseTestEdit extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      depthConfirm: false,
      depthFile: null,
      error: null,
      exercise: null,
      exerciseTest: null,
      isSaveActive: true,
      skeletonsConfirm: false,
      skeletonsFile: null,
    };
  }

  public componentWillMount() {
    this.loadExerciseTest(this.props.match.params.exerciseTestId);
  }

  loadExerciseTest = (exerciseTestId: string) => {
    return Api.exercise_tests.one(exerciseTestId).then((exerciseTest: ExerciseTest) => {
      const exercise = Api.exercises.get(exerciseTest.exerciseId);
      this.setState({
        exercise,
        exerciseTest,
      });
      return exerciseTest;
    });
  };

  onHandleTextChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      update(this.state, {
        exerciseTest: { [key]: { $set: event.target.value } },
      })
    );
  };

  onExerciseChange = (exercise: Exercise) => {
    this.setState(
      update(this.state, {
        exercise: { $set: exercise },
        exerciseTest: {
          exerciseId: { $set: exercise.id },
          updated: { $set: new Date().toJSON() },
        },
      })
    );
  };

  handleUpload = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length) {
      this.setState(
        update(this.state, {
          [key + 'Confirm']: { $set: true },
          [key + 'File']: { $set: event.target.files },
        })
      );
    }
  };

  onConfirm = (key: string) => (e: any) => {
    const formData = new FormData();

    switch (key) {
      case 'depth':
        if (this.state.depthFile && this.state.exerciseTest) {
          formData.append('file', this.state.depthFile[0]);
          formData.append('filename', this.state.depthFile[0].name);

          Api.exercise_tests.uploadDepth(this.state.exerciseTest.id, formData).then((exerciseTest: ExerciseTest) => {
            const exercise = Api.exercises.get(exerciseTest.exerciseId);
            this.setState(
              update(this.state, {
                depthConfirm: { $set: false },
                exercise: { $set: exercise },
                exerciseTest: {
                  recording: { $set: exerciseTest.recording },
                },
              })
            );
            return exerciseTest;
          });
        }
        break;

      case 'skeletons':
        if (this.state.skeletonsFile && this.state.exerciseTest) {
          formData.append('file', this.state.skeletonsFile[0]);
          formData.append('filename', this.state.skeletonsFile[0].name);

          Api.exercise_tests
            .uploadSkeletons(this.state.exerciseTest.id, formData)
            .then((exerciseTest: ExerciseTest) => {
              const exercise = Api.exercises.get(exerciseTest.exerciseId);
              this.setState(
                update(this.state, {
                  depthConfirm: { $set: false },
                  exercise: { $set: exercise },
                  exerciseTest: {
                    recording: { $set: exerciseTest.recording },
                  },
                })
              );
              return exerciseTest;
            });
        }
        break;
    }
  };

  renderError = (error: string) => {
    const closeAction = () => this.setState(update(this.state, { error: { $set: null } }));

    return (
      <div style={{ marginTop: 40 }}>
        <p key={error} className="alert alert-danger alert-dismissible fade show" role="alert">
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeAction}>
            <span aria-hidden="true">&times;</span>
          </button>
          {error}
        </p>
      </div>
    );
  };

  render() {
    const { exerciseTest, exercise } = this.state;

    if (exerciseTest == null) {
      return <main role="main" />;
    }

    const saveAction = () => {
      this.setState(
        update(this.state, {
          isSaveActive: { $set: false },
        })
      );
      Api.exercise_tests
        .save(exerciseTest)
        .then((test: ExerciseTest) => {
          const exc = Api.exercises.get(test.exerciseId);
          this.setState({
            exercise: exc,
            exerciseTest: test,
            isSaveActive: true,
          });
          return test;
        })
        .catch(error => {
          const errorMessage = error.response.status === 400 ? 'BAD REQUEST' : 'Failed to Save Data';
          this.setState(
            update(this.state, {
              error: { $set: errorMessage },
              isSaveActive: { $set: true },
            })
          );
        });
    };
    const depthRecordingFileName = () => {
      if (this.state.depthConfirm && this.state.depthFile) {
        return <span>{this.state.depthFile[0].name}</span>;
      }

      const str = exerciseTest.recording.depthRecording;
      if (str == null) {
        return <span className="text-secondary">No recording found</span>;
      }

      const start = str.search('.com/') + 5;
      const end = str.search('.dpv?') + 4;
      return (
        <span>
          <a href={str} style={{ color: '#505e6d', textDecoration: 'underline' }}>
            {' '}
            {str.slice(start, end)}{' '}
          </a>
        </span>
      );
    };

    const skeletonsRecordingFileName = () => {
      if (this.state.skeletonsConfirm && this.state.skeletonsFile) {
        return <span>{this.state.skeletonsFile[0].name}</span>;
      }

      const str = exerciseTest.recording.skeletonsRecording;
      if (str == null) {
        return <span className="text-secondary">No recording found</span>;
      }
      const start = str.search('.com/') + 5;
      const end = str.search('.jsonl?') + 6;
      return (
        <span>
          <a href={str} style={{ color: '#505e6d', textDecoration: 'underline' }}>
            {' '}
            {str.slice(start, end)}{' '}
          </a>
        </span>
      );
    };

    const depthUploadButton = () => {
      return (
        <div style={{ marginBottom: 10 }}>
          <input type="file" id="depthUpload" hidden={true} onChange={this.handleUpload('depth')} />
          <Button color="primary">
            <label htmlFor="depthUpload" style={{ marginBottom: 0 }}>
              {exerciseTest.recording.depthRecording ? 'Replace' : 'Upload'}
            </label>
          </Button>
        </div>
      );
    };

    const skeletonsUploadButton = () => {
      return (
        <div style={{ marginBottom: 10 }}>
          <input type="file" id="skeletonUpload" hidden={true} onChange={this.handleUpload('skeletons')} />
          <Button color="primary">
            <label htmlFor="skeletonUpload" style={{ marginBottom: 0 }}>
              {exerciseTest.recording.skeletonsRecording ? 'Replace' : 'Upload'}
            </label>
          </Button>
        </div>
      );
    };

    const depthConfirmButton = this.state.depthConfirm ? (
      <div style={{ marginBottom: 10 }}>
        <Button color="primary" onClick={this.onConfirm('depth')}>
          Confirm
        </Button>
      </div>
    ) : null;
    const skeletonsConfirmButton = this.state.skeletonsConfirm ? (
      <div style={{ marginBottom: 10 }}>
        <Button color="primary" onClick={this.onConfirm('skeletons')}>
          Confirm
        </Button>
      </div>
    ) : null;

    const errorDisplay = this.state.error ? this.renderError(this.state.error) : null;

    return (
      <main role="main">
        <Container style={{ marginTop: 20 }}>
          <Row style={{ alignItems: 'center' }}>
            <img src={require('./ArrowLeft.png')} width="16" height="16" />
            <span style={{ marginLeft: 10 }}>
              <a href="/exercise-tests" style={{ color: '#505e6d', textDecoration: 'underline' }}>
                Exercise Tests
              </a>
            </span>
          </Row>
          {errorDisplay}
          <Row style={{ marginTop: 30 }}>
            <Col>
              <h1>{exerciseTest.title}</h1>
            </Col>
            <Col>
              <Button onClick={saveAction} color="primary" disabled={!this.state.isSaveActive}>
                Save
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm="6">
              <FormGroup>
                <Label>Title</Label>
                <Input
                  name="title"
                  placeholder="Please Input Title of Exercise Test"
                  value={exerciseTest.title == null ? '' : exerciseTest.title}
                  onChange={this.onHandleTextChange('title')}
                />
              </FormGroup>
              <FormGroup>
                <Label>Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  rows="5"
                  placeholder="Please Input Description"
                  value={exerciseTest.description == null ? '' : exerciseTest.description}
                  onChange={this.onHandleTextChange('description')}
                />
              </FormGroup>
              <FormGroup>
                <Label>Exercise</Label>
                <ExerciseAutocomplete
                  exerciseApi={Api.exercises}
                  onChange={this.onExerciseChange}
                  defaultInput={exercise == null ? '' : exercise.name}
                />
              </FormGroup>
            </Col>
            <Col sm="6" style={{ paddingLeft: 30 }}>
              <Label>Recordings</Label>
              <Row style={{ alignItems: 'center', marginBottom: 40 }}>
                <Col sm="4">
                  <Label>Depth Recording</Label>
                </Col>
                <Col sm="5">{depthRecordingFileName()}</Col>
                <Col sm="3">
                  {depthUploadButton()}
                  {depthConfirmButton}
                </Col>
              </Row>
              <Row style={{ alignItems: 'center', marginBottom: 40 }}>
                <Col sm="4">
                  <Label>Skeletons Recording</Label>
                </Col>
                <Col sm="5">{skeletonsRecordingFileName()}</Col>
                <Col sm="3">
                  {skeletonsUploadButton()}
                  {skeletonsConfirmButton}
                </Col>
              </Row>
            </Col>
          </Row>
          {/*<Table>
            <Row>
              <Label>
                Checks (3)
              </Label>
              <Button>
                + New Check
              </Button>
            </Row>
            <tr>
              <td>
              </td>
            </tr>
          </Table>*/}
        </Container>
      </main>
    );
  }
}

export default ExerciseTestEdit;
