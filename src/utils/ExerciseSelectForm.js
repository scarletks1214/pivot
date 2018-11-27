import Api from '../api';
import Autosuggest from 'react-autosuggest';
import React from 'react';
import update from 'immutability-helper';

class ExerciseSelectForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      exercises: props.exercises || [],
      exercisesByName: this.exercisesByName(props.exercises),
      suggestions: [],
      value: '',
    };

    this.renderInputComponent = this.renderInputComponent.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.handleExerciseSelected = this.handleExerciseSelected.bind(this);
  }

  exercisesByName(exercises) {
    return (exercises || []).reduce((map, exercise) => {
      map[exercise.name] = exercise;
      return map;
    }, {});
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const maxItemsToShow = 10;
    return inputLength === 0
      ? []
      : this.state.exercises
          .filter(e => e.name.toLowerCase().slice(0, inputLength) === inputValue)
          .slice(0, maxItemsToShow);
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleExerciseSelected(event) {
    event.preventDefault();
    if (this.state.value === '') {
      return;
    }

    var match = this.state.exercisesByName[this.state.value];
    if (!match) {
      window.console.log('No match found for ' + this.state.value);
      return;
    }

    if (this.props.handleExerciseSelected) {
      this.props.handleExerciseSelected(match);
      this.setState({
        value: '',
      });
    }
  }

  componentDidMount() {
    Api.trainerExercises.all().then(exercises => {
      window.console.log('Loaded ' + exercises.length + ' exercises.');
      this.setState(
        update(this.state, {
          exercises: { $set: exercises },
          exercisesByName: { $set: this.exercisesByName(exercises) },
        })
      );
    });
  }

  renderSuggestion(exercise, query) {
    return <div>{exercise.name}</div>;
  }

  renderInputComponent(props) {
    props.className = props.className + ' form-control';
    return (
      <form className="input-group mb-4" onSubmit={this.handleExerciseSelected}>
        <input {...props} />
        <span className="input-group-btn">
          <button className="btn btn-primary" type="submit">
            <i className="fa fa-plus" />
          </button>
        </span>
      </form>
    );
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      onChange: this.onChange,
      placeholder: 'Type an exercise name',
      value,
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={exercise => exercise.name}
        renderSuggestion={this.renderSuggestion}
        renderInputComponent={this.renderInputComponent}
        inputProps={inputProps}
      />
    );
  }
}

export default ExerciseSelectForm;
