import React from 'react';

export const CardList = props => {
  const children = props.children
    .filter(child => child !== null && (!Array.isArray(child) || child.length > 0))
    .map(child => (
      <li key={child.key} className="list-group-item">
        {child}
      </li>
    ));

  return <ol className="list-group list-group-flush">{children}</ol>;
};

export const CardBody = props => {
  return <div className="card-body">{props.children}</div>;
};

export const CardImage = props => {
  return <div className="card-img-top background-cover" style={{ backgroundImage: `url(${props.src})` }} />;
};

export const Card = props => {
  const titleImage = props.titleImage ? (
    <img src={props.titleImage} className="img-fluid card-title-icon" alt={'Image for ' + props.title} />
  ) : null;
  const title = props.title ? (
    <h4 className="mb-0" style={{ display: 'inline-block' }}>
      {props.title}
    </h4>
  ) : null;
  const titleBlock = !props.title ? null : (
    <div className="row">
      <div className="col-3">{titleImage}</div>
      <div className="col-9 card-body">{title}</div>
    </div>
  );

  let className = (props.className || '') + ' card';

  return (
    <div className={className}>
      {titleBlock}
      {props.children}
    </div>
  );
};
