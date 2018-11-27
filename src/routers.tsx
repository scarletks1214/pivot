import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Redirect, RouteProps } from 'react-router-dom';

import Api from './api';

import App from './containers/app/App';
import ClassSessionBrowse from './containers/class_sessions/ClassSessionBrowse';
import ClassSessionEditorRoute from './containers/class_sessions/ClassSessionEditorRoute';
import Exercises from './containers/exercise/Exercises';
import ExerciseDetail from './containers/exercise/ExerciseDetail';
import ExerciseTestSuiteRunDetail from './containers/exercise/ExerciseTestSuiteRunDetail';
import ExerciseRevisionDesigner from './containers/exercise/ExerciseRevisionDesigner';
import ExerciseTestEdit from './containers/exercise/ExerciseTestEdit';
import ExerciseTests from './containers/exercise/ExerciseTests';
import Home from './containers/Home';
import Login from './containers/Login';
import Route404 from './containers/Route404';
import ExerciseEdit from './containers/exercise/ExerciseEdit';

const PrivateRoute: React.StatelessComponent<RouteProps> = ({ component, ...rest }) => {
  const renderFn = (Component?: any) => (props: RouteProps) => {
    if (!Component) {
      return null;
    }

    if (Api.isLoggedIn()) {
      return <Component {...props} />;
    }

    const redirectProps = {
      to: {
        pathname: '/login',
        state: { from: props.location },
      },
    };

    return <Redirect {...redirectProps} />;
  };

  return <Route {...rest} render={renderFn(component)} />;
};

export default () => {
  const exerciseEdit = (props: any) => (
    <ExerciseEdit exercise_id={props.match.params.exercise_id === 'new' ? null : props.match.params.exercise_id} />
  );
  return (
    <App>
      <Switch>
        <Route exact={true} path="/login" component={Login} />
        <PrivateRoute exact={true} path="/" component={Home} />
        <PrivateRoute exact={true} path="/class-sessions/" component={ClassSessionBrowse} />
        <PrivateRoute exact={true} path="/exercises/" component={Exercises} />
        <PrivateRoute exact={true} path="/exercise-tests/" component={ExerciseTests} />
        <PrivateRoute exact={true} path="/exercise-tests/:exerciseTestId" component={ExerciseTestEdit} />
        <PrivateRoute exact={true} path="/exercises/:exercise_id" component={ExerciseDetail} />
        <PrivateRoute exact={true} path="/exercises/:exercise_id/edit" component={exerciseEdit} />
        <PrivateRoute exact={true} path="/exercises/:exerciseId/revisions/new" component={ExerciseRevisionDesigner} />
        <PrivateRoute exact={true} path="/tests/suite_runs/:suiteRunId" component={ExerciseTestSuiteRunDetail} />
        <PrivateRoute path="/class-sessions/:classSessionId" component={ClassSessionEditorRoute} />
        <Route component={Route404} />
      </Switch>
    </App>
  );
};
