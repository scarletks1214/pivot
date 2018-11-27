import * as React from 'react';

import { Button } from 'reactstrap';

import Loader, { LoadingStates } from '../utils/Loader';

interface ISaveButtonProps {
  save: () => Promise<any>;
  color?: string;
}

interface ISaveButtonState {
  saveStatus: Loader<any>;
}

export default class SaveButton extends React.Component<ISaveButtonProps, ISaveButtonState> {
  constructor(props: ISaveButtonProps) {
    super(props);

    this.state = {
      saveStatus: LoadingStates.NotLoading,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    const text = this.state.saveStatus === LoadingStates.Loading ? 'Saving...' : 'Save';
    return (
      <Button
        color={this.props.color || 'primary'}
        onClick={this.handleClick}
        disabled={this.state.saveStatus === LoadingStates.Loading}
      >
        {text}
      </Button>
    );
  }

  private handleClick() {
    // TODO: also save class session
    this.props
      .save()
      .then((saveStatus: any) => this.setState({ saveStatus: LoadingStates.NotLoading }))
      .catch((e: any) => this.setState({ saveStatus: LoadingStates.LoadFailed }));
    this.setState({ saveStatus: LoadingStates.Loading });
  }
}
