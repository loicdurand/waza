import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSettingsStore = create(
  persist(
    (set) => ({
      hourlyRate: 15, // Default value
      setHourlyRate: (rate) => {
        const newRate = parseFloat(rate);
        if (!isNaN(newRate) && newRate >= 0) {
          set({ hourlyRate: newRate });
        }
      },
    }),
    {
      name: 'craftprice-settings-storage', // name of the item in the storage (must be unique)
    }
  )
);

export default useSettingsStore;
