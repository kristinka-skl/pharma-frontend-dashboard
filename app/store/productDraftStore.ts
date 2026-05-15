import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductFormData } from "../types/pharma"; 

interface ProductDraftStore {
  draft: ProductFormData;
  setDraft: (product: ProductFormData) => void;
  clearDraft: () => void;
}

const initialDraft: ProductFormData = {
  name: '',
  category: '',
  stock: 0,
  suppliers: '',
  price: 0,
};

export const useProductDraftStore = create<ProductDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (product) => set(() => ({ draft: product })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "product-draft", 
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);