import { create } from "zustand";

interface GlobalStore {
  addModalOpen: boolean;
  toggleAddModal: () => void;
  addFieldOrder: number | null;
  setAddFieldOrder: (addFieldOrder: number) => void
}

const useGlobalStore = create<GlobalStore>((set) => ({
  addModalOpen: false,
  toggleAddModal: () => set((state) => ({ addModalOpen: !state.addModalOpen })),
  addFieldOrder: null,
  setAddFieldOrder: (addFieldOrder) => set(() => ({ addFieldOrder })),
}));

export default useGlobalStore;
