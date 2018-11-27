import React from 'react';
import Dropzone from 'react-dropzone';
import update, { Query } from 'immutability-helper';

import { Exercise, WeightType, MediaTypes } from 'models';
import { ConditionDisplay, ConditionForm } from '../../rep_counting';
import ListEditForm from '../../../utils/ListEditForm';
import { FormGroup, SelectFormControl } from '../../../components/FormControl';
import { IResourceEditorProps } from '../../../components/ResourceEditor';
import AnglesForm from './AnglesForm';
import './ExerciseForm.css';

interface IExerciseFormProps extends IResourceEditorProps<Exercise> {}

export default class ExerciseForm extends React.Component<IExerciseFormProps> {
  static ExerciseWeightTypes = [
    { label: 'Other', value: WeightType.Other },
    { label: 'Barbell', value: WeightType.Barbell },
    { label: 'Dumbbell', value: WeightType.Dumbbell },
    { label: 'Bodyweight', value: WeightType.Bodyweight },
  ];

  static MuscleGroups = [
    { value: 'Unknown', label: 'Unknown' },
    { value: 'Abs', label: 'Abs' },
    { value: 'Biceps', label: 'Biceps' },
    { value: 'Lower Back', label: 'Lower Back' },
    { value: 'Upper Back', label: 'Upper Back' },
    { value: 'Legs', label: 'Legs' },
    { value: 'Chest', label: 'Chest' },
    { value: 'Shoulders', label: 'Shoulders' },
    { value: 'Triceps', label: 'Triceps' },
  ];

  handleUpdate = (expression: Query<Exercise>) => {
    let newValue = update(this.props.value, expression);
    this.props.onChange(newValue);
  };

  handleUpdateRepCounting = (newSteps: any) => {
    this.handleUpdate({
      workstationData: { rep_counting: { steps: { $set: newSteps } } },
    });
  };

  handleUpdateAngles = (newValue: any) => {
    this.handleUpdate({ workstationData: { angles: { $set: newValue } } });
  };

  handleUpdateCountAt = (newValue: any) => {
    this.handleUpdate({
      workstationData: { rep_counting: { count_at: { $set: newValue } } },
    });
  };

  renderStep = (step: any, index: number) => {
    let countAfter = this.props.value.workstationData.repCounting.count_at === index;
    let indexClass = 'index btn ' + (countAfter ? 'btn-primary' : 'btn-secondary');
    return (
      <div className="row" key={index}>
        <div className="col-2 align-self-center">
          <button className={indexClass} onClick={() => this.handleUpdateCountAt(index)}>
            {index + 1}
          </button>
        </div>
        <div className="col align-self-center">
          <ConditionDisplay condition={step} />
        </div>
      </div>
    );
  };

  onDropImage = (index: number, url: string, acceptedFiles: any[], rejectedFiles: any[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
  };

  renderExerciseImage = (image: any, index: number) => {
    return (
      <li className="col-lg-3 col-md-3 col-sm-6" key={image.url}>
        <Dropzone
          multiple={false}
          accept="image/jpeg"
          onDrop={(acceptedFiles, rejectedFiles) => this.onDropImage(index, image.url, acceptedFiles, rejectedFiles)}
          className={'dropzone' + (image.url ? ' preview' : ' upload')}
        >
          <img src={image.url} className="img-fluid" />
        </Dropzone>
      </li>
    );
  };

  render() {
    const weightType = (
      <div className="form-group">
        <label htmlFor="weight-type">Weight Type</label>
        <SelectFormControl
          id="weight-type"
          name="weightType"
          handleUpdate={this.handleUpdate}
          options={ExerciseForm.ExerciseWeightTypes}
          value={this.props.value.weightType}
        />
      </div>
    );

    const muscleGroups = (
      <div className="form-group">
        <label htmlFor="muscle-groups">Muscle Group</label>
        <SelectFormControl
          multiple={true}
          id="muscle-groups"
          name="muscleGroups"
          handleUpdate={this.handleUpdate}
          options={ExerciseForm.MuscleGroups}
          value={this.props.value.muscleGroups}
        />
      </div>
    );

    let images: any[] = [];

    if (this.props.value) {
      images = this.props.value.media.allOfType(MediaTypes.ExerciseImage).map(this.renderExerciseImage);
    }

    images.push(this.renderExerciseImage({ url: null }, images.length));

    const video = this.props.value.media.firstOfType(MediaTypes.ExerciseVideo);

    return (
      <div>
        <section className="mt-4">
          <FormGroup
            id="name"
            name="exercise.name"
            label="Name"
            placeholder="Enter the name of the exercise"
            handleUpdate={this.handleUpdate}
            value={this.props.value.name}
          />
          {weightType}
          {muscleGroups}
        </section>
        <section className="mt-4">
          <label>Images</label>

          <ul className="row list-unstyled">{images}</ul>
        </section>
        <section className="mt-4">
          <label>Video</label>
          {video ? (
            <p className="alert alert-info">No video found for exercise {this.props.value.name}</p>
          ) : (
            <div>
              <video width="360" height="360" controls preload="auto">
                <source src={video} type="video/mp4" />
              </video>
            </div>
          )}
        </section>
        <section className="mt-4">
          <div className="row">
            <div className="col-md-6">
              <h4>Rep Counting</h4>
              <ListEditForm
                items={
                  this.props.value.workstationData && this.props.value.workstationData.repCounting
                    ? this.props.value.workstationData.repCounting.steps
                    : []
                }
                itemDisplay={this.renderStep}
                itemEdit={ConditionForm}
                newItem={() => ({ type: 'angle' })}
                onUpdate={this.handleUpdateRepCounting}
              />
            </div>

            <div className="col-md-6">
              <h4>Angles Shown</h4>
              <AnglesForm
                items={this.props.value.workstationData ? this.props.value.workstationData.angles : []}
                onUpdate={this.handleUpdateAngles}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}
