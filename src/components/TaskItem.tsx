import { Draggable } from "react-beautiful-dnd";
import { Status, TodoItem1, color } from "./model";
import styled from "styled-components";
import { format } from "date-fns";

interface PropsInterface {
  task: TodoItem1;
  index: number;
  toDetail: Function;
}

interface propStyle {
  isDragging: boolean;
}
const Item = styled.div<propStyle>`
  border: 1px solid gray;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 14px;
  background-color: white;
  box-shadow: ${(props) =>
    props.isDragging ? "rgba(0, 0, 0, 0.35) 0px 5px 15px;" : "none"};
  position: relative;
`;

const StatusTag = styled.p`
  color: ${(titltProp) => titltProp.color};
`;
function TaskItem(props: PropsInterface) {
  const formatDate = (val: Date) => {
    return format(val, "yyyy/mm/dd HH:mm:ss");
  };

  const toDetail = (id: string) => {
    props.toDetail(id);
  };
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Item
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <p className="font-bold ">Title:</p>
          <p className="truncate">{props.task.title}</p>
          <p className="font-bold">Description:</p>
          <p className="truncate">{props.task.description}</p>
          <p className="absolute text-xs bottom-5 right-4">
            <StatusTag color={color[props.task.status]}>
              {Status[props.task.status]}
            </StatusTag>
          </p>
          <span className="absolute text-xs top-1 right-1">
            update: {formatDate(props.task.date)}
          </span>
          <div className="pt-4">
            <button
              className="rounded-3xl px-4 mr-2 bg-primary text-white font-bold uppercase h-6"
              onClick={() => toDetail(props.task.id)}
            >
              detail
            </button>
          </div>
        </Item>
      )}
    </Draggable>
  );
}

export default TaskItem;
