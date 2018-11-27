import * as React from 'react';
import { UncontrolledAlert } from 'reactstrap';
import styled from 'styled-components';

interface IJson {
  title?: string;
  detail: string;
}

interface IAlertsProps {
  messages: IJson[];
  color: string;
}

const Content = styled.p`
  margin: 0;
`;

export default ({ messages, color }: IAlertsProps) => (
  <div>
    {messages.map((message: IJson, index) => (
      <UncontrolledAlert key={index} color={color}>
        {message.title && <h5>{message.title}</h5>}
        <Content>{message.detail}</Content>
      </UncontrolledAlert>
    ))}
  </div>
);
