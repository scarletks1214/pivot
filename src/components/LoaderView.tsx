import * as React from 'react';

import { Jumbotron } from 'reactstrap';

import Loader, { LoadingStates } from '../utils/Loader';

export interface IProps<T> {
  promise: Promise<T>;
  component: (t: T) => JSX.Element;
  message: string;
  failureMessage: string;
}

export interface IState<T> {
  model: Loader<T>;
  detail: string;
}

export default class LoaderView<T> extends React.Component<IProps<T>, IState<T>> {
  private mounted: boolean = false;

  constructor(props: IProps<T>) {
    super(props);

    this.state = {
      model: LoadingStates.Loading,
      detail: '',
    };
  }

  public componentWillMount() {
    this.mounted = true;

    this.props.promise
      .then((model: T) => {
        if (this.mounted) {
          this.setState({ model });
        }
      })
      .catch((e: any) => {
        if (this.mounted) {
          const detail: string = e instanceof Error ? e.message : '';
          this.setState({ model: LoadingStates.LoadFailed, detail });

          if (e instanceof Error) {
            throw e;
          }
        }
      });
  }

  public componentWillUnmount() {
    this.mounted = false;
  }

  public renderFailure() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">{this.props.failureMessage}</h1>
          <p>{this.state.detail}</p>
        </Jumbotron>
      </div>
    );
  }

  public renderLoading() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">{this.props.message}</h1>
        </Jumbotron>
      </div>
    );
  }

  public render() {
    if (this.state.model === LoadingStates.Loading) {
      return this.renderLoading();
    } else if (this.state.model === LoadingStates.LoadFailed) {
      return this.renderFailure();
    } else if (this.state.model === LoadingStates.NotLoading) {
      return <h1>Not Loading!</h1>;
    } else {
      return this.props.component(this.state.model);
    }
  }
}
