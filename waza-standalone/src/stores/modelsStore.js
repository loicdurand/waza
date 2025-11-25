import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useModelsStore = create(
  persist(
    (set) => ({
      models: [
        // Example initial data
        {
          id: uuidv4(),
          name: 'Boucles d\'oreilles Origami',
          creationTimeInMinutes: 45,
          composition: [
            // These IDs would need to match materials in the materialsStore
            // This is a simplification for example data.
            // In the real app, we'd ensure these IDs are valid.
          ],
        },
      ],
      addModel: (model) => set((state) => ({
        models: [...state.models, { id: uuidv4(), ...model }],
      })),
      updateModel: (id, updatedModel) => set((state) => ({
        models: state.models.map((model) =>
          model.id === id ? { ...model, ...updatedModel } : model
        ),
      })),
      deleteModel: (id) => set((state) => ({
        models: state.models.filter((model) => model.id !== id),
      })),
    }),
    {
      name: 'craftprice-models-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useModelsStore;
