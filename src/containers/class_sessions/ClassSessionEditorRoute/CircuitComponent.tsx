import * as React from 'react';
import update from 'immutability-helper';
import { Button, Input } from 'reactstrap';
import { arrayMove, SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

import { Duration, WorkoutPlanCircuit, WorkoutPlanEvent, WorkoutPlanRestEvent } from 'models';
import { Icon } from '../../../components';
import { IResourceEditorProps } from '../../../components/ResourceEditor';
import EventComponent from './EventComponent';
import './CircuitComponent.scss';

export default class CircuitComponent extends React.Component<IResourceEditorProps<WorkoutPlanCircuit>> {
  handleSortEnded = (indices: { oldIndex: number; newIndex: number }) => {
    this.props.onChange(
      update(this.props.value, {
        events: {
          $set: arrayMove(this.props.value.events, indices.oldIndex, indices.newIndex),
        },
      })
    );
  };

  handleTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(update(this.props.value, { title: { $set: event.target.value } }));
  };

  handleEventChanged = (newValue: WorkoutPlanEvent, oldValue?: WorkoutPlanEvent) => {
    if (!oldValue) {
      return;
    }

    const index = this.props.value.events.indexOf(oldValue);
    this.props.onChange(update(this.props.value, { events: { $splice: [[index, 1, newValue]] } }));
  };

  handleNewEventClicked = () => {
    const newEvent = new WorkoutPlanRestEvent(Duration.Seconds(30));
    this.props.onChange(update(this.props.value, { events: { $push: [newEvent] } }));
  };

  render() {
    const circuit = this.props.value;

    const DragHandle = SortableHandle(() => (
      <i className="reorder-grip">
        <Icon type="bars" />
      </i>
    ));

    const SortableItem = SortableElement((props: { value: WorkoutPlanEvent; index: number }) => {
      return (
        <EventComponent value={props.value} onChange={this.handleEventChanged}>
          <DragHandle />
        </EventComponent>
      );
    });

    const SortableList = SortableContainer((props: { items: WorkoutPlanEvent[] }) => {
      return (
        <ol className="list-unstyled">
          {props.items.map((value: WorkoutPlanEvent, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} />
          ))}
        </ol>
      );
    });

    return (
      <div>
        <Input type="text" value={circuit.title} onChange={this.handleTitleChanged} />
        <Button outline={true} color="primary" onClick={this.handleNewEventClicked}>
          <Icon type="plus" /> New Event
        </Button>
        <SortableList items={this.props.value.events} onSortEnd={this.handleSortEnded} useDragHandle={true} />
      </div>
    );
  }
}
