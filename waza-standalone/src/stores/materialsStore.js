import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useMaterialsStore = create(
  persist(
    (set) => ({
      materials: [
        // Example initial data
        { id: uuidv4(), name: 'Fermoir argenté', purchasePrice: 12, purchaseQuantity: 28, unit: 'pièces' },
        { id: uuidv4(), name: 'Papier Washi', purchasePrice: 10, purchaseQuantity: 50, unit: 'feuilles' },
      ],
      addMaterial: (material) => set((state) => ({
        materials: [...state.materials, { id: uuidv4(), ...material }],
      })),
      updateMaterial: (id, updatedMaterial) => set((state) => ({
        materials: state.materials.map((material) =>
          material.id === id ? { ...material, ...updatedMaterial } : material
        ),
      })),
      deleteMaterial: (id) => set((state) => ({
        materials: state.materials.filter((material) => material.id !== id),
      })),
    }),
    {
      name: 'craftprice-materials-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useMaterialsStore;
