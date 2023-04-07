import { useEffect, useState } from "react";
import { Status, StatusInterface, TodoItem1 } from "./model";
interface PropsInterface {
  oncancel: Function;
  addTodo: Function;
  masterData: StatusInterface[];
  detailData: TodoItem1;
  onupdate: Function;
  ondelete: Function;
}

function AddTodoDialog(props: PropsInterface) {
  const [form, setForm] = useState<TodoItem1>({
    id: "",
    title: "",
    description: "",
    status: Status.NEW,
    date: new Date(),
    todos: [],
  });

  const [editMode, setEditMode] = useState<Boolean>(false);
  const [messageValidate, setMessageValidate] = useState({
    title: "",
    description: "",
  });
  const [todoContent, setTodoContent] = useState<string>("");

  useEffect(() => {
    if (props.detailData?.id) {
      setForm(props.detailData);
    }
  }, [props.detailData]);

  useEffect(() => {
    let scrolling: HTMLElement | null = document.getElementById("special");

    if (scrolling) {
      console.log(scrolling);
      scrolling.scrollIntoView();
    }
  }, [form.todos]);

  const validate = (name: string, value: string) => {
    const field = Object.keys(form).find((i) => i === name);
    let valid;

    if (!field) return;
    if (!value) {
      setMessageValidate((prevMessageValidate) => ({
        ...prevMessageValidate,
        [field]: `${field} is a required`,
      }));
      valid = false;
    } else {
      setMessageValidate((prevMessageValidate) => ({
        ...prevMessageValidate,
        [field]: "",
      }));
      valid = true;
    }

    return valid;
  };

  const validateSubmit = () => {
    const listError = [
      validate("title", form.title),
      validate("description", form.description),
    ];

    return !listError.some((i) => !i);
  };

  const removeTodoContent = (index: number) => {
    setForm((prevForm) => ({
      ...prevForm,
      todos: prevForm.todos.filter((_, idx) => idx !== index),
    }));
  };

  const addTodoContent = () => {
    setForm((prevForm) => ({
      ...prevForm,
      todos: [...prevForm.todos, todoContent],
    }));
    setTodoContent("");
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full max-h-screen overflow-hidden bg-opacity-20 bg-black">
      <div
        className="absolute top-1/2 left-1/2 w-1/3 opacity-100 bg-white p-28"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <h1 className="text-center font-black mb-8">ADD WORK</h1>
        <form>
          <label className="text-sm pt-4 block uppercase font-bold">
            title
          </label>
          {props.detailData?.id && !editMode ? (
            <p className="mb-5">{form.title}</p>
          ) : (
            <>
              <input
                className="w-full"
                name="title"
                value={form.title}
                onChange={(e) => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    title: e.target.value,
                  }));
                  validate(e.target.name, e.target.value);
                }}
              />
              <p className="text-red text-xs">{messageValidate.title}</p>
            </>
          )}

          <label className="text-sm pt-4 block uppercase font-bold">
            description
          </label>
          {props.detailData?.id && !editMode ? (
            <p className="mb-5">{form.description}</p>
          ) : (
            <>
              <textarea
                rows={7}
                className="w-full"
                name="description"
                value={form.description}
                onChange={(e) => {
                  setForm((prevForm) => ({
                    ...prevForm,
                    description: e.target.value,
                  }));
                  validate(e.target.name, e.target.value);
                }}
              />
              <p className="text-red text-xs">{messageValidate.description}</p>
            </>
          )}

          <label className="text-sm pt-4 block uppercase font-bold">
            status
          </label>

          {props.detailData?.id && !editMode ? (
            <p>{Status[form.status]}</p>
          ) : (
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
          )}

          <label className="text-sm pt-4 block uppercase font-bold">
            list todo:
          </label>

          {!!form.todos.filter((i) => !!i).length ? (
            <>
              <ul
                id="list"
                className={`max-h-40 ${
                  (!form.id || editMode) && "overflow-auto"
                }`}
              >
                {form.todos.map(
                  (item, index) =>
                    item && (
                      <li
                        id={index === form.todos.length - 1 ? "special" : ""}
                        className="flex items-center w-full justify-between"
                      >
                        <p>{item}</p>
                        {(!form.id || editMode) && (
                          <button
                            className="bg-white uppercase text-red"
                            onClick={(e) => {
                              e.preventDefault();
                              removeTodoContent(index);
                            }}
                          >
                            remove
                          </button>
                        )}
                      </li>
                    )
                )}
              </ul>
            </>
          ) : (
            <p className="italic text-xs">List todo has no data</p>
          )}

          {(!form.id || editMode) && (
            <div className="flex justify-center items-center">
              <input
                type="text"
                value={todoContent}
                className="w-full"
                onChange={({ target }) => setTodoContent(target.value)}
              />
              <button
                disabled={!todoContent}
                className="bg-green font-bold text-white uppercase w-48"
                onClick={(e) => {
                  e.preventDefault();
                  addTodoContent();
                }}
              >
                add content
              </button>
            </div>
          )}
        </form>

        {!props.detailData?.id ? (
          <div className="w-full my-10">
            <button
              type="submit"
              className="w-full rounded-3xl bg-primary mb-4 text-white font-bold"
              onClick={() => {
                validateSubmit() && props.addTodo(form);
              }}
            >
              ADD
            </button>
            <button
              className="w-full rounded-3xl font-bold"
              onClick={() => props.oncancel()}
            >
              CANCEL
            </button>
          </div>
        ) : (
          <div className="mt-8">
            {editMode ? (
              <button
                className="w-full rounded-3xl font-bold mb-4 bg-orange text-white"
                onClick={() => props.onupdate(props.detailData?.id, form)}
              >
                UPDATE
              </button>
            ) : (
              <button
                className="w-full rounded-3xl font-bold mb-4 bg-primary text-white"
                onClick={() => setEditMode(true)}
              >
                EDIT MODE
              </button>
            )}

            <button
              className="w-full rounded-3xl font-bold mb-4"
              onClick={() => props.oncancel()}
            >
              CLOSE
            </button>

            <button
              className="w-full rounded-3xl font-bold bg-red text-white"
              onClick={() => props.ondelete(form.id)}
            >
              DELETE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTodoDialog;
