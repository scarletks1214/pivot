import * as React from 'react';

export interface IJsonApiError {
  code: number;
  title: string;
  detail: string;
}

export interface IErrorAlertsProps {
  errors: IJsonApiError[];
}

export default class ErrorAlerts extends React.Component<IErrorAlertsProps> {
  constructor(props: any) {
    super(props);

    this.renderError = this.renderError.bind(this);
  }

  public render() {
    const errors = this.props.errors.map(this.renderError);

    return <ul className="list-unstyled">{errors}</ul>;
  }

  private renderError(error: IJsonApiError, index: number) {
    return (
      <li className="alert alert-danger" role="alert" key={index}>
        <h5 className="alert-heading">{error.title}</h5>
        <p className="mb-0">{error.detail}</p>
      </li>
    );
  }
}
