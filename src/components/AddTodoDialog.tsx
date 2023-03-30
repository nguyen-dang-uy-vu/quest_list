import { useState, useEffect } from "react";
import { Status, StatusInterface } from "./model";
interface PropsInterface {
  oncancel: Function;
  addTodo: Function;
  masterData: StatusInterface[];
}

interface FormInterface {
  title: string;
  description: string;
  status: Status;
}

function AddTodoDialog(props: PropsInterface) {
  const [form, setForm] = useState<FormInterface>({
    title: "",
    description: "",
    status: Status.NEW,
  });

  return (
    <div className="absolute w-screen h-screen bg-opacity-20 bg-black">
      <div
        className="absolute top-1/2 left-1/2 w-1/3 opacity-100 bg-white h-1/2 p-28"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <form action="">
          <label>title</label>
          <input
            className="w-full"
            value={form.title}
            onChange={({ target }) =>
              setForm((prevForm) => ({ ...prevForm, title: target.value }))
            }
          />
          <label>description</label>
          <input
            className="w-full"
            value={form.description}
            onChange={({ target }) =>
              setForm((prevForm) => ({
                ...prevForm,
                description: target.value,
              }))
            }
          />

          <select
            className="w-full"
            value={form.status}
            onChange={(e) => {
              setForm((prevForm) => ({
                ...prevForm,
                status: Number(e.target.value),
              }));
            }}
          >
            {props.masterData.map((item) => (
              <option value={item.value}>{item.label}</option>
            ))}
          </select>
        </form>
        <div className="w-full">
          <button className="w-full" onClick={() => props.oncancel()}>
            CANCEL
          </button>
          <button className="w-full" onClick={() => props.addTodo(form)}>
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodoDialog;
