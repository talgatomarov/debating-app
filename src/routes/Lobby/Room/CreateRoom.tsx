import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { v1 as uuid } from "uuid";

const CreateRoom: React.FC<RouteComponentProps> = (props) => {
  async function create(name: any) {
    // const id = uuid();
    props.history.push(`${props.match.url}/room`);
  }

  return <button onClick={create}>Create room</button>;
};

export default CreateRoom;
