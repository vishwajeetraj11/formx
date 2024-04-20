import { create } from "zustand";

interface GlobalStore {
  addModalOpen: boolean;
  toggleAddModal: () => void;
}

const useGlobalStore = create<GlobalStore>((set) => ({
  addModalOpen: false,
  toggleAddModal: () => set((state) => ({ addModalOpen: !state.addModalOpen })),
}));

export default useGlobalStore;
