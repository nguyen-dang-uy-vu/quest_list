import React, { ChangeEvent, useEffect, useState } from "react";
import { Status, StatusInterface, TodoItem1 } from "./model";
import { uid } from "uid";
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
    id: uid(5),
    title: "",
    description: "",
    status: Status.NEW,
    date: new Date(),
  });

  const [editMode, setEditMode] = useState<Boolean>(false);
  const [messageValidate, setMessageValidate] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (props.detailData?.id) {
      setForm(props.detailData);
    }
  }, [props.detailData]);

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

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-opacity-20 bg-black">
      <div
        className="absolute top-1/2 left-1/2 w-1/3 opacity-100 bg-white p-28"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <form>
          <label className="text-lg uppercase font-bold">title</label>
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

          <label className="text-lg uppercase font-bold">description</label>
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

          <label className="text-lg uppercase font-bold">status</label>

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
                className="w-full rounded-3xl font-bold mb-4"
                onClick={() => props.onupdate(props.detailData?.id, form)}
              >
                UPDATE
              </button>
            ) : (
              <button
                className="w-full rounded-3xl font-bold mb-4"
                onClick={() => setEditMode(true)}
              >
                EDIT MODE
              </button>
            )}

            <button
              className="w-full rounded-3xl font-bold"
              onClick={() => props.oncancel()}
            >
              CLOSE
            </button>

            <button
              className="w-full rounded-3xl font-bold"
              onClick={() => props.ondelete()}
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
