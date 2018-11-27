import * as React from 'react';
import update, { Query } from 'immutability-helper';

import { Exercise, WorkstationData } from 'models';

import { IResourceEditorProps } from '../../../components/ResourceEditor';
import ListEditForm from '../../../utils/ListEditForm';
import { ConditionDisplay, ConditionForm } from '../../rep_counting';

interface IWorkstationDataFormProps extends IResourceEditorProps<WorkstationData> {}

export class WorkstationDataForm extends React.Component<IWorkstationDataFormProps> {
  constructor(props: IWorkstationDataFormProps) {
    super(props);
    this.renderStep = this.renderStep.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateRepCounting = this.handleUpdateRepCounting.bind(this);
    this.handleUpdateCountAt = this.handleUpdateCountAt.bind(this);
  }

  public handleUpdate(expression: Query<Exercise>) {
    const newValue = update(this.props.value, expression);
    this.props.onChange(newValue);
  }

  public handleUpdateRepCounting(newSteps: any) {
    if (this.props.value.repCounting && this.props.value.repCounting.steps) {
      this.handleUpdate({
        repCounting: { steps: { $set: newSteps } },
      });
    } else {
      this.handleUpdate({
        repCounting: { $set: { steps: newSteps } },
      });
    }
  }

  handleUpdateCountAt = (newValue: any) => {
    this.handleUpdate({
      repCounting: { count_at: { $set: newValue } },
    });
  };

  renderStep = (step: any, index: number) => {
    const countAfter = this.props.value.repCounting.count_at === index;
    const indexClass = 'index btn ' + (countAfter ? 'btn-primary' : 'btn-secondary');
    const handleClickCountAt = () => this.handleUpdateCountAt(index);

    return (
      <div className="row" key={index}>
        <div className="col-2 align-self-center">
          <button className={indexClass} onClick={handleClickCountAt}>
            {index + 1}
          </button>
        </div>
        <div className="col align-self-center">
          <ConditionDisplay condition={step} />
        </div>
      </div>
    );
  };

  render() {
    const newRepCountItem = () => ({ type: 'angle' });
    return (
      <section className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <h4>Rep Counting</h4>
            <ListEditForm
              items={this.props.value.repCounting ? this.props.value.repCounting.steps : []}
              itemDisplay={this.renderStep}
              itemEdit={ConditionForm}
              newItem={newRepCountItem}
              onUpdate={this.handleUpdateRepCounting}
            />
          </div>
        </div>
      </section>
    );
  }
}
