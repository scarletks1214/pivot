import * as React from 'react';

import { Container } from 'reactstrap';

import LoaderView from './LoaderView';
export { IResourceEditorProps } from './ResourceEditor';

export interface IResourceEditorRouteProps<T> {
  message: string;
  failureMessage: string;

  load(): Promise<T>;
  save(newValue: T): Promise<T>;

  renderEditor(onChange: (newValue: T) => void, value: T): JSX.Element;
}

export interface IResourceEditorRouteState<T> {
  promise?: Promise<T>;
  value?: T;
}

export default class ResourceEditorRoute<T> extends React.Component<
  IResourceEditorRouteProps<T>,
  IResourceEditorRouteState<T>
> {
  constructor(props: IResourceEditorRouteProps<T>) {
    super(props);

    this.state = {
      promise: undefined,
      value: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public componentWillMount() {
    const promise = this.props.load().then((value: T) => {
      this.setState({ value });
      return value;
    });
    this.setState({ promise });
  }

  public render(): React.ReactNode {
    let component: React.ReactNode;

    if (!this.state.promise) {
      component = <div>Promise could not be loaded.</div>;
    } else {
      const loaderComponent = (value: T) => this.props.renderEditor(this.handleChange, value);
      component = (
        <LoaderView
          message={this.props.message}
          failureMessage={this.props.failureMessage}
          promise={this.state.promise}
          component={loaderComponent}
        />
      );
    }

    return (
      <main role="main">
        <Container className="my-5">{component}</Container>
      </main>
    );
  }

  private handleChange(newValue: T): void {
    this.setState({ value: newValue });
  }
}
