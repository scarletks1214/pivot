import React from 'react';

import Highlight from 'react-highlight';

export const JsonPreview = (props: { json: any }) => {
  return <Highlight className="json">{JSON.stringify(props.json, undefined, 4)}</Highlight>;
};
