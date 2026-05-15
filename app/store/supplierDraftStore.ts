import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SupplierFormData } from "../types/pharma";

interface SupplierDraftStore {
  draft: SupplierFormData;
  setDraft: (note: SupplierFormData) => void;
  clearDraft: () => void;
}
const initialDraft: SupplierFormData = {
  name: '',
  address: '',
  suppliers: '',
  date: '',
  amount: 0,
  status: 'Active',
};
export const useSupplierDraftStore = create<SupplierDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (supplier) => set(() => ({ draft: supplier })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "supplier-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);