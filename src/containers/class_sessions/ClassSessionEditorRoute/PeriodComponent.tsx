import * as React from 'react';
import update from 'immutability-helper';
import { Input, Button } from 'reactstrap';

import { WorkoutPlanPeriod, WorkoutPlanCircuit } from 'models';
import { IResourceEditorProps } from '../../../components/ResourceEditor';
import { Icon } from '../../../components';
import CircuitComponent from './CircuitComponent';
import CircuitWizardModal from './CircuitWizardModal';

export default class PeriodComponent extends React.Component<
  IResourceEditorProps<WorkoutPlanPeriod>,
  { modal: boolean }
> {
  constructor(props: IResourceEditorProps<WorkoutPlanPeriod>) {
    super(props);
    this.state = { modal: false };
  }

  handleTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(update(this.props.value, { title: { $set: event.target.value } }));
  };

  handleCircuitChanged = (index: number, newValue: WorkoutPlanCircuit) => {
    this.props.onChange(
      update(this.props.value, {
        circuits: { $splice: [[index, 1, newValue]] },
      })
    );
  };

  handleNewCircuitClicked = () => {
    this.props.onChange(
      update(this.props.value, {
        circuits: { $push: [new WorkoutPlanCircuit()] },
      })
    );
  };

  handleNewCircuitWizardClicked = () => {
    this.setState({ modal: true });
  };

  handleNewCircuitWizardClosed = (newCircuit: WorkoutPlanCircuit | undefined) => {
    this.setState({ modal: false });
    if (newCircuit) {
      this.props.onChange(
        update(this.props.value, {
          circuits: { $push: [newCircuit] },
        })
      );
    }
  };

  render() {
    const period = this.props.value;
    return (
      <div>
        <CircuitWizardModal isOpen={this.state.modal} onClose={this.handleNewCircuitWizardClosed} />
        <Input type="text" value={period.title} onChange={this.handleTitleChanged} />
        <Button outline={true} color="primary" onClick={this.handleNewCircuitClicked}>
          <Icon type="plus" /> New Circuit
        </Button>
        <Button outline={true} color="primary" onClick={this.handleNewCircuitWizardClicked}>
          <Icon type="plus" /> New Circuit Wizard
        </Button>
        {period.circuits.map((circuit, index) => (
          <CircuitComponent key={index} value={circuit} onChange={this.handleCircuitChanged.bind(this, index)} />
        ))}
      </div>
    );
  }
}
