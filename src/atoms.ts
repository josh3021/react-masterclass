import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Category = "TO_DO" | "DOING" | "DONE" | string;

export interface IToDo {
  text: string;
  id: number;
  category: Category;
}

interface IUseToDoState {
  toDos: IToDo[];
  addToDo: (newToDo: IToDo) => void;
  updateToDo: (toDo: IToDo) => void;
  isReady: boolean;
  setIsReady: () => void;
}

// ✅ Zustand에서 useToDoStore를 만들어 React가 상태를 감지하도록 수정
export const useToDoStore = create<IUseToDoState>()(
  persist(
    (set) => ({
      toDos: [],
      isReady: false,
      setIsReady: () => set({ isReady: true }),
      addToDo: (newToDo: IToDo) =>
        set((state) => ({ toDos: [...state.toDos, newToDo] })), // ✅ concat 대신 spread 연산자 사용
      updateToDo: (toDo: IToDo) =>
        set((state) => ({
          toDos: state.toDos.map((item) => (item.id === toDo.id ? toDo : item)), // ✅ reduce 대신 map 사용 (더 간결하고 성능도 더 좋음)
        })),
    }),
    {
      name: "toDo-storage",
      onRehydrateStorage: () => (state) => {
        if (state) state.setIsReady(); // ✅ 로컬스토리지 로드 후 `isReady` true로 설정
      },
    }
  )
);

interface IUseCategoryState {
  categories: Category[];
  selectedCategory: Category;
  setCategory: (category: Category) => void;
  addCategory: (category: Category) => void;
}

// ✅ Zustand의 useCategory 훅도 `useCategoryStore`로 변경하여 구독 가능하도록 수정
export const useCategoryStore = create<IUseCategoryState>()(
  persist(
    (set) => ({
      categories: ["TO_DO", "DOING", "DONE"],
      selectedCategory: "TO_DO",
      setCategory: (c: Category) => set(() => ({ selectedCategory: c })),
      addCategory: (c: Category) =>
        set((state) => ({
          categories: state.categories.includes(c)
            ? state.categories
            : [...state.categories, c],
        })),
    }),
    {
      name: "category-storage",
    }
  )
);

// ✅ React에서 상태 변경을 감지하도록 `useToDoStore`로 변경
export const useFilteredToDos = () => {
  const toDos = useToDoStore((state) => state.toDos); // ✅ `getState()` 대신 Zustand 훅을 사용해 React가 리렌더링하도록 변경
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  return toDos.filter((toDo) => toDo.category === selectedCategory);
};
