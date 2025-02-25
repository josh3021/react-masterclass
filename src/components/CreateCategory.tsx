import { useForm } from "react-hook-form";
import { useCategoryStore } from "../atoms";

interface ICreateCategoryForm {
  category: string;
}

function CreateCategory() {
  const { register, handleSubmit, setValue } = useForm<ICreateCategoryForm>();
  const addCategory = useCategoryStore((state) => state.addCategory);
  const onValid = (data: ICreateCategoryForm) => {
    addCategory(data.category);
    setValue("category", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("category", { minLength: 1 })} type="text"></input>
      <button>Add Category</button>
    </form>
  );
}

export default CreateCategory;
