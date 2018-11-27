import * as React from 'react';
import update from 'immutability-helper';
import { Container } from 'reactstrap';

import Api from '../../../api';
import Button from '../../../utils/Button';
import { Card, CardBody, CardImage } from '../../../utils/Card';
import TrainerExercise from '../../../models/TrainerExercise';
import { BooleanToggle } from '../../../components';
import './Exercises.css';

const ExerciseCard = (props: any) => {
  const href = '/exercises/' + props.exercise.id;

  let image = <CardImage src={props.exercise.media.exerciseThumbnail} />;

  const badges = props.exercise.muscle_groups ? (
    <div>
      {!props.exercise.countsReps ? <span className="badge badge-danger mr-1">No Rep Counting</span> : null}
      {props.exercise.media.length === 0 ? <span className="badge badge-danger mr-1">No Video</span> : null}
      {props.exercise.media.length === 0 ? <span className="badge badge-danger mr-1">No Images</span> : null}
    </div>
  ) : null;

  let title = <h4>{props.exercise.name}</h4>;
  if (props.editable) {
    title = (
      <a className="card-title" href={href}>
        {title}
      </a>
    );
    image = (
      <a className="card-img-top" href={href}>
        {image}
      </a>
    );
  }

  return (
    <div className="col-lg-3 col-md-4">
      <Card className="mb-2 exercise">
        {image}

        <CardBody>
          {title}

          {badges}
          <p>{props.exercise.description}</p>
          {props.children}
        </CardBody>
      </Card>
    </div>
  );
};

interface IExercisesState {
  myExercises: TrainerExercise[] | null;
  myExercisesPromise?: Promise<TrainerExercise[]>;
}

export default class Exercises extends React.Component<any, IExercisesState> {
  constructor(props: any) {
    super(props);
    this.state = {
      myExercises: null,
      myExercisesPromise: undefined,
    };
  }

  componentDidMount() {
    const myExercisesPromise = Api.trainerExercises.all().then((exercises: TrainerExercise[]) => {
      const sortedExercises = exercises.sort((a, b) => a.name.localeCompare(b.name));
      this.setState({ myExercises: sortedExercises });
      return exercises;
    });

    this.setState({ myExercisesPromise });
  }

  onClickDelete = (exercise: TrainerExercise) => {
    if (window.confirm('Are you sure you want to delete ' + exercise.name + '?')) {
      Api.trainerExercises.delete(exercise.id).then(res => {
        if (this.state.myExercises !== null) {
          const index = this.state.myExercises.indexOf(exercise);
          this.setState(
            update(this.state, {
              myExercises: { $splice: [[index, 1]] },
            })
          );
        }
      });
    }
  };

  onChangePublishExercise = (exercise: TrainerExercise, published: boolean) => {
    if (published) {
      Api.trainerExercises.makePublic(exercise.id);
    } else {
      Api.trainerExercises.makePrivate(exercise.id);
    }
  };

  render() {
    const myExercisesCards = (this.state.myExercises || []).map(e => {
      const handleUpdate = (published: boolean) => this.onChangePublishExercise(e, published);

      const handleBeforeUpdate = (published: boolean) =>
        !published || window.confirm('Are you sure you want to publish ' + e.name + ' ?');
      const handleClick = () => this.onClickDelete(e);
      return (
        <ExerciseCard key={e.id} exercise={e} editable={true}>
          <div className="mb-2">
            <BooleanToggle
              selectedColor="success"
              values={['Testing', 'Live']}
              onUpdate={handleUpdate}
              beforeUpdate={handleBeforeUpdate}
            />
            <Button color="outline-danger" className="card-link ml-2" icon="trash" onClick={handleClick} />
          </div>
        </ExerciseCard>
      );
    });

    return (
      <main role="main">
        <Container className="my-5">
          <h1 className="mb-4">
            My Exercises{' '}
            <a className="btn btn-primary" href="/exercises/new">
              New Exercise
            </a>
          </h1>
          {this.state.myExercises && this.state.myExercises.length === 0 ? (
            <p className="alert alert-info">No custom exercises have been created.</p>
          ) : null}
          <ul className="list-unstyled row">{myExercisesCards}</ul>
        </Container>
      </main>
    );
  }
}
