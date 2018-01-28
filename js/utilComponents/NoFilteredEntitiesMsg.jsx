// @flow

import React from 'react';

const NoFilteredEntitiesMsg = (props: {
  entities: UserFilteredEntities,
  entitiesType?: 'greenspaces' | 'farmers' | 'default'
}) => {
  const messages = {
    default: "Sorry, it doesn't look like we have what you're looking for.",
    greenspaces: "Sorry, we don't have any greenspaces like that yet.",
    farmers: "Sorry, we don't have any farmers like that yet."
  };

  const msgToRender = <h2>{props.entitiesType ? messages[props.entitiesType] : messages.default}</h2>;
  return <section>{!props.entities.length ? msgToRender : null}</section>;
};

NoFilteredEntitiesMsg.defaultProps = {
  entitiesType: 'default'
};

export default NoFilteredEntitiesMsg;
