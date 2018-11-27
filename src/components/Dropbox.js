import React from 'react';

import update from 'immutability-helper';

import Dropzone from 'react-dropzone';

import Api from '../api';

const States = {
  FileNotProvided: 0,
  FileUploadFailed: 3,
  FileUploaded: 2,
  FileUploading: 1,
};

export default class Dropbox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      media: {
        index: null,
        type_id: props.type_id,
        url: null,
      },

      state: States.FileNotProvided,
    };

    this.handleUpload = this.handleUpload.bind(this);
    this.handleUploadFailure = this.handleUploadFailure.bind(this);

    this.onDropFile = this.onDropFile.bind(this);
  }

  handleUpload(media) {
    this.setState(
      update(this.state, {
        state: { $set: States.FileUploaded },
        media: { $set: media },
      })
    );

    if (this.props.onUpload) {
      this.props.onUpload(media);
    }
  }

  handleUploadFailure(media) {
    this.setState(update(this.state, { state: { $set: States.FileUploadFailed } }));

    if (this.props.onUploadFailure) {
      this.props.onUploadFailure(media);
    }
  }

  onDropFile(acceptedFiles, rejectedFiles) {
    if (acceptedFiles.length === 0) {
      return;
    }

    let file = acceptedFiles[0];

    var params = null;
    if (this.props.type_id) {
      params = params || {};
      params.type_id = this.props.type_id.id;
    }

    if (this.props.index) {
      params = params || {};
      params.index = this.props.index;
    }

    Api.media
      .upload(file, params)
      .then(this.handleUpload)
      .catch(this.handleUploadFailure);

    this.setState(update(this.state, { state: { $set: States.FileUploading } }));
  }

  render() {
    var preview = null;
    let className = 'dropzone';

    if (this.state.state === States.FileUploaded) {
      className += ' preview';
      preview = <img src={this.state.media.url} className="img-fluid" />;
    } else if (this.state.state === States.FileUploading) {
      className += ' uploading';
      preview = <img src={'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif'} className="img-fluid" />;
    } else if (this.state.state === States.FileUploadFailed) {
      className += ' failed';
    }

    return (
      <Dropzone
        multiple={false}
        accept={this.props.type_id ? this.props.type_id.mimetype : '*'}
        onDrop={this.onDropFile}
        className={className}
      >
        {preview}
      </Dropzone>
    );
  }
}
