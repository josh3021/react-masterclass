import { useForm } from "react-hook-form";
import { useToDoStore } from "../atoms";

interface IToDoList {
  toDo: string;
}

function CreateToDo() {
  const addToDo = useToDoStore.getState().addToDo;
  const { register, handleSubmit, setValue } = useForm<IToDoList>();
  const onValid = (data: IToDoList) => {
    addToDo({
      text: data.toDo,
      id: Date.now(),
      category: "TO_DO",
    });
    setValue("toDo", "");
  };
  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit(onValid)}
    >
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
