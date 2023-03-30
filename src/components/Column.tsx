import { useState, useEffect } from "react";
import { Status, StatusInterface } from "./model";

interface Todo {
  title: string;
  description: string;
  status: Status;
}

interface PropsInterface {
  data: Todo[];
  statusList: StatusInterface[];
}
function Column(props: PropsInterface) {
  return (
    <div className="flex flex-col w-80 p-4">
      {props.data.map((item) => (
        <div className=" rounded p-4 mt-2 w-full shadow-lg bg-white">
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{Status[item.status]}</p>
        </div>
      ))}
    </div>
  );
}

export default Column;
