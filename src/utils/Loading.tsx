import * as React from 'react';

import Icon from './Icon';

interface ILoadingProps<T> {
  promise?: Promise<T>;
}

interface ILoadingState {
  failed: boolean;
  loading: boolean;
}

class Loading<T> extends React.Component<ILoadingProps<T>, ILoadingState> {
  constructor(props: ILoadingProps<T>) {
    super(props);

    this.state = {
      failed: false,
      loading: true,
    };

    if (props.promise) {
      this.setState({ loading: true });
      props.promise
        .then(() => {
          this.setState({ loading: false, failed: false });
        })
        .catch(() => {
          this.setState({ loading: false, failed: true });
        });
    }
  }

  public render() {
    if (this.state.loading) {
      return (
        <div className="jumbotron text-center">
          <h1 className="display-9">Loading...</h1>
          <div style={{ fontSize: '3em' }}>
            <Icon spin={true} type="spinner" />
          </div>
        </div>
      );
    } else if (this.state.failed) {
      return (
        <div className="jumbotron text-center">
          <h1 className="display-9">Failed to load.</h1>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Loading;
