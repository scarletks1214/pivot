import styled from 'styled-components';
import { Table as ReactstrapTable } from 'reactstrap';

export const SubHeader = styled.h3`
  button {
    margin-left: 10px;
  }
`;

export const Table = styled(ReactstrapTable)`
  thead {
    border-bottom: 1px solid lightgray;
  }

  tbody tr.summary {
    cursor: pointer;
  }
`;
