import { Category, IToDo, useToDoStore } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const updateToDo = useToDoStore((state) => state.updateToDo);
  const onClick = (
    event: React.MouseEvent<HTMLButtonElement & { name: Category }>
  ) => {
    const {
      currentTarget: { name },
    } = event;
    updateToDo({ id, category: name, text });
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== "TO_DO" && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== "DONE" && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
