import React from 'react';
import Highlight from 'react-highlight';

function JsonPreview(props) {
  return <Highlight className="json">{JSON.stringify(props.json, null, 4)}</Highlight>;
}

export default JsonPreview;
