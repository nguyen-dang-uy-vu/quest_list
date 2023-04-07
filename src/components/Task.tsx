import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { listItem, color, Status } from "./model";
import TaskItem from "./TaskItem";

interface PropsInterface {
  tasks: listItem[] | undefined;
  column: {
    id: string;
    title: string;
    taskIds: string[];
    status: Status;
  };
  toDetail: Function;
}
type titltProp = {
  color: string;
};

const Container = styled.div<titltProp>`
  margin: 8px;
  border: 1px solid;
  border-color: ${(titltProp) => titltProp.color};
`;

const Title = styled.h3<titltProp>`
  color: ${(titltProp) => titltProp.color};
  padding: 8px;
  font-weight: 900;
`;

const TaskList = styled.div`
  padding: 8px;
  width: 350px;
`;

function Task(props: PropsInterface) {
  const toDetail = (id: string) => {
    props.toDetail(id);
  };
  return (
    <Container color={color[props.column.status]}>
      <Title color={color[props.column.status]}>{props.column.title}</Title>
      <Droppable droppableId={props.column.id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {props.tasks?.map((item, index) => (
              <TaskItem
                key={item.id}
                task={item}
                index={index}
                toDetail={toDetail}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}

export default Task;
