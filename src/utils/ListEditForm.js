import React from 'react';
import update from 'immutability-helper';

import { Card, CardList } from './Card';
import Icon from './Icon';
import Button from './Button';

const Buttons = props => {
  let upDownButtons = (
    <div className="btn-group-vertical mr-2" role="group">
      <Button size="sm" icon="caret-up" onClick={props.moveUp} />
      <Button size="sm" icon="caret-down" onClick={props.moveDown} />
    </div>
  );
  return (
    <span className="pull-right hover-show">
      <Button size="sm" className="mr-2" onClick={props.handleStartEdit}>
        Edit
      </Button>
      <Button size="sm" color="danger" icon="trash" onClick={props.handleDelete} />
    </span>
  );
};

class ListEditForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      editIndex: null,
      editItem: null,
      editItemValid: true,
    };

    if (props.items === undefined || props.items === null) {
      throw new Error("'items' is a required property");
    }

    this.handleStartAdd = this.handleStartAdd.bind(this);
    this.handleStartEdit = this.handleStartEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.onChange = this.onChange.bind(this);
  }

  newItem() {
    if (typeof this.props.newItem === 'function') {
      return this.props.newItem();
    }

    return this.props.newItem;
  }

  onChange(newValue, valid) {
    valid = valid === undefined ? true : valid;
    this.setState(
      update(this.state, {
        editItem: { $set: newValue },
        editItemValid: { $set: valid },
      })
    );
  }

  handleStartAdd() {
    this.handleStartEdit(this.props.items.length, this.newItem());
  }

  handleStartEdit(index, item) {
    this.setState(
      update(this.state, {
        editItemValid: { $set: false },
        editIndex: { $set: index },
        editItem: { $set: item || this.props.items[index] },
      })
    );
  }

  handleDelete(index) {
    let newList = update(this.props.items, { $splice: [[index, 1]] });

    this.props.onUpdate(newList);

    if (index === this.state.editIndex) {
      this.setState(update(this.state, { editIndex: { $set: null } }));
    }
  }

  handleCancelEdit(index, newValue) {
    this.setState(
      update(this.state, {
        editIndex: { $set: null },
        editItem: { $set: null },
      })
    );
  }

  handleCommitEdit(index, newValue) {
    let newList = update(this.props.items, { $splice: [[index, 1, newValue]] });
    this.props.onUpdate(newList);
    this.handleCancelEdit();
  }

  renderItemDisplay(item, index) {
    let itemDisplay = item;

    if (this.props.itemDisplay) {
      itemDisplay = this.props.itemDisplay(item, index);
    }

    return (
      <div key={index} className="row">
        <span className="col-9 align-self-center">{itemDisplay}</span>
        <div className="col-3 align-self-center">
          <Buttons handleStartEdit={() => this.handleStartEdit(index)} handleDelete={() => this.handleDelete(index)} />
        </div>
      </div>
    );
  }

  renderItemEdit(item, index) {
    let ItemEdit = this.props.itemEdit;
    return (
      <div key={this.state.editIndex}>
        <ItemEdit item={this.state.editItem} index={this.state.editIndex} onChange={this.onChange} />
        <div className="form-group mt-2">
          <Button size="sm" color="danger" className="mr-2" onClick={() => this.handleCancelEdit()}>
            Cancel
          </Button>
          <Button
            size="sm"
            color="primary"
            disabled={!this.state.editItemValid}
            onClick={() => this.handleCommitEdit(this.state.editIndex, this.state.editItem)}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }

  renderItem(item, index) {
    if (this.state.editIndex === index) {
      return this.renderItemEdit(item, index);
    } else {
      return this.renderItemDisplay(item, index);
    }
  }

  render() {
    let elements = this.props.items.map(this.renderItem);

    if (this.state.editIndex != null && this.state.editIndex >= this.props.items.length) {
      elements = elements.concat([this.renderItemEdit(this.newItem(), this.state.editIndex)]);
    } else {
      elements = elements.concat([
        <div key="new">
          <button className="btn btn-primary btn-sm pull-right" onClick={() => this.handleStartAdd()}>
            <i className="fa fa-plus" />
          </button>
        </div>,
      ]);
    }

    return (
      <Card>
        {this.props.children}
        <CardList>{elements}</CardList>
      </Card>
    );
  }
}

export default ListEditForm;
