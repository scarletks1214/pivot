import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';

import { ClassSession } from 'models';

interface IClassSessionCardProperties {
  classSession: ClassSession;
}

export default (props: IClassSessionCardProperties) => {
  const instructorSubtitle = props.classSession.instructor
    ? props.classSession.instructor.firstName + ' ' + props.classSession.instructor.lastName
    : 'Instructor TBD';

  return (
    <Card>
      <CardImg top={true} width="100%" src={props.classSession.thumbnail} alt="Card image cap" />
      <CardBody>
        <CardTitle>{props.classSession.title}</CardTitle>
        <CardSubtitle>{instructorSubtitle}</CardSubtitle>
        <CardText />

        <Link className="btn btn-secondary" to={`/class-sessions/${props.classSession.id}`}>
          Edit
        </Link>
      </CardBody>
    </Card>
  );
};
