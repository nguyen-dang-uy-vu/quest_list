import { useState, useEffect } from "react";
import "./App.css";
import AddTodoDialog from "./components/AddTodoDialog";
import Column from "./components/Column";
import { StatusInterface } from "./components/model";
import { Status } from "./components/model";

interface TodoItem {
  title: string;
  description: string;
  status: Status;
}

function App() {
  const [listTodo, setListTodo] = useState<TodoItem[]>([]);
  const [visible, setVisible] = useState<Boolean>(false);

  useEffect(() => {
    setListTodo(() => [
      {
        title: "title 1",
        description: "description 1",
        status: Status.NEW,
      },
      {
        title: "title 1",
        description: "description 1",
        status: Status.NEW,
      },
      {
        title: "INPROGRESS title 3",
        description: "INPROGRESS description 3",
        status: Status.INPROGRESS,
      },
      {
        title: "INPROGRESS title 3",
        description: "INPROGRESS description 3",
        status: Status.INPROGRESS,
      },
      {
        title: "INPROGRESS title 3",
        description: "INPROGRESS description 3",
        status: Status.INPROGRESS,
      },
    ]);
  }, []);

  const cancelDialog = () => {
    setVisible(false);
  };

  const onAddTodo = (form: TodoItem) => {
    setListTodo((prevListTodo) => [...prevListTodo, form]);
    cancelDialog();
  };

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

  return (
    <div className="flex flex-col justify-start items-center bg-slate-50 w-screen h-screen">
      <button
        className="bg-cyan-300 p-4 uppercase text-white border-0 cursor-pointer"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Todo
      </button>
      <div className="flex">
        {statusList.map((status) => (
          <div className="w-full text-center">
            <h1>{status.label}</h1>
            <Column
              statusList={statusList}
              data={listTodo.filter((item) => item.status === status.value)}
            />
          </div>
        ))}
      </div>
      {visible && (
        <AddTodoDialog
          masterData={statusList}
          oncancel={cancelDialog}
          addTodo={onAddTodo}
        />
      )}
    </div>
  );
}

export default App;
