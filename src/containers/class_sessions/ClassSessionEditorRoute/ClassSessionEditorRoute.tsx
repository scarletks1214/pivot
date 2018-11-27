import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { ClassSession } from 'models';
import Api from '../../../api';
import { ResourceEditorRoute } from '../../../components';
import ClassSessionEditor from './ClassSessionEditor';

type ClassSessionResourceEditorRoute = new () => ResourceEditorRoute<ClassSession>;
const ClassSessionResourceEditorRoute = ResourceEditorRoute as ClassSessionResourceEditorRoute;

export default class ClassSessionEditorRoute extends React.Component<RouteComponentProps<any>> {
  renderEditor = (onChange: (newValue: ClassSession) => void, value: ClassSession) => {
    return <ClassSessionEditor onChange={onChange} value={value} />;
  };

  save = (): Promise<ClassSession> => {
    return Promise.reject('Not implemented.');
  };

  load = (props: RouteComponentProps<any>): Promise<ClassSession> => {
    const id: string | undefined = props.match.params.classSessionId;

    if (!id) {
      return Promise.reject(new Error('No id was provided in the route.'));
    }

    return Api.classSessions.one(id);
  };

  render() {
    return (
      <ClassSessionResourceEditorRoute
        message="Loading class session..."
        failureMessage="Failed to load class session"
        load={() => this.load(this.props)}
        save={this.save}
        renderEditor={this.renderEditor}
      />
    );
  }
}
