import {
  Category,
  useCategoryStore,
  useFilteredToDos,
  useToDoStore,
} from "../atoms";
import CreateCategory from "./CreateCategory";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const categories = useCategoryStore((state) => state.categories);
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setCategory = useCategoryStore((state) => state.setCategory);
  const isReady = useToDoStore((state) => state.isReady);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  const onInput = (
    event: React.ChangeEvent<HTMLSelectElement & { value: Category }>
  ) => {
    setCategory(event.currentTarget.value);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={selectedCategory} onInput={onInput}>
        {/* <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option> */}
        {categories.map((category) => (
          <option value={category} key={category}>
            {category.replace("_", " ")}
          </option>
        ))}
      </select>
      <CreateToDo />
      <CreateCategory />
      <CategorySection />
      <hr />
    </div>
  );
}

function CategorySection() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const filteredToDos = useFilteredToDos();
  return (
    <section>
      <h2>{selectedCategory.replace("_", " ")}</h2>
      <ul>
        {filteredToDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </section>
  );
}

export default ToDoList;
