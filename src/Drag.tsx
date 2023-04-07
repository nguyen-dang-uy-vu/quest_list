import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Task from "./components/Task";
import { useEffect, useState } from "react";

import data from "./mock/data";
import { Status, StatusInterface, TodoItem1 } from "./components/model";
import AddTodoDialog from "./components/AddTodoDialog";
import styled from "styled-components";
import { uid } from "uid";

const Main = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(250, 250, 250);
  overflow: hidden;
  position: relative;
`;

const DEFAULT_FORM = {
  id: "",
  status: Status.NEW,
  description: "",
  title: "",
  date: new Date(),
  todos: [],
};

function Drag() {
  const [list, setList] = useState(data);
  const [visible, setVisible] = useState<Boolean>(false);
  const [detailDate, setDetailData] = useState<TodoItem1>(DEFAULT_FORM);

  const statusList: StatusInterface[] = [
    {
      label: "NEW",
      value: Status.NEW,
    },
    {
      label: "INPROGRESS",
      value: Status.INPROGRESS,
    },
    {
      label: "DONE",
      value: Status.DONE,
    },
    {
      label: "ACTCHIVE",
      value: Status.ACTCHIVE,
    },
  ];

  useEffect(() => {
    if (!visible) {
      setDetailData(DEFAULT_FORM);
    }
  }, [visible]);

  const dragEnded = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = Object.values(list.columns).find(
      (i) => i.id === source.droppableId
    );

    const finish = Object.values(list.columns).find(
      (i) => i.id === destination.droppableId
    );

    if (!start || !finish) {
      return;
    }

    if (start === finish) {
      let newTaskIds = Array.from(start?.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      let newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...list,
        columns: {
          ...list.columns,
          [newColumn.id]: newColumn,
        },
      };

      setList(newState);
      return;
    }

    const startTaskIds = Array.from(start?.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish?.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newTask = list.task.filter(
      (item) => item.id !== Array.from(start?.taskIds)[source.index]
    );

    const newState = {
      ...list,
      task: [
        ...newTask,
        {
          ...list.task.filter(
            (item) => item.id === Array.from(start?.taskIds)[source.index]
          )[0],
          status: finish.status,
          date: new Date(),
        },
      ],
      columns: {
        ...list.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setList(newState);
  };

  const cancelDialog = () => {
    setVisible(false);
  };

  const onAddTodo = (form: TodoItem1) => {
    const columnIndex = Object.values(list.columns).findIndex(
      (i) => i.status === form.status
    );

    const columnData = Object.values(list.columns)[columnIndex];

    const columnName = Object.keys(list.columns)[columnIndex];
    const idTask = uid(10);

    if (columnName) {
      setList((prevList) => ({
        ...prevList,
        task: [...prevList.task, { ...form, id: idTask }],
        columns: {
          ...prevList.columns,
          [columnName]: {
            ...columnData,
            taskIds: [...columnData.taskIds, idTask],
          },
        },
      }));
      cancelDialog();
    }
  };

  const onUpdateToDo = (id: string, form: TodoItem1) => {
    const indexOldTask = list.task.findIndex((i) => i.id === id);

    let newTaskList = list.task;
    newTaskList.splice(indexOldTask, 1, { ...form, date: new Date() });

    setList((prevList) => ({
      ...prevList,
      task: newTaskList,
    }));

    const addTaskColumn = Object.values(list.columns).find(
      (i) => i.status === form.status
    );
    const deleteTaskColumn = Object.values(list.columns).find(
      (i) => i.status === detailDate.status
    );

    if (form.status !== detailDate.status) {
      if (addTaskColumn && deleteTaskColumn) {
        setList((prevList) => ({
          ...prevList,
          columns: {
            ...list.columns,
            [addTaskColumn.id]: {
              ...addTaskColumn,
              taskIds: [...addTaskColumn.taskIds, form.id],
            },
            [deleteTaskColumn.id]: {
              ...deleteTaskColumn,
              taskIds: deleteTaskColumn.taskIds.filter((i) => i !== form.id),
            },
          },
        }));
      }
    }
    setVisible(false);
  };

  const onDeleteTodo = (id: string) => {
    setList((prevList) => ({
      ...prevList,
      task: prevList.task.filter((i) => i.id !== id),
    }));
    setVisible(false);
  };

  const toDetail = (id: string) => {
    const data = list.task.find((i) => i.id === id);

    data && setDetailData(data);

    setVisible(true);
  };

  return (
    <Main>
      <div className="flex justify-center py-4">
        <button
          className="rounded-3xl px-4 uppercase font-bold text-white bg-green"
          onClick={() => setVisible(true)}
        >
          Add work
        </button>
      </div>

      <div className="flex justify-center">
        <DragDropContext onDragEnd={dragEnded}>
          {Object.values(list.columns).map((columnId) => {
            let task: TodoItem1[] = [];
            columnId.taskIds.forEach((taskId) => {
              const item = list.task.find((item) => item.id === taskId);
              item && task.push(item);
            });

            return (
              <Task
                key={columnId.id}
                column={columnId}
                tasks={task}
                toDetail={toDetail}
              />
            );
          })}
        </DragDropContext>
      </div>
      {visible && (
        <AddTodoDialog
          masterData={statusList}
          detailData={detailDate}
          oncancel={cancelDialog}
          addTodo={onAddTodo}
          onupdate={onUpdateToDo}
          ondelete={onDeleteTodo}
        />
      )}
    </Main>
  );
}

export default Drag;
