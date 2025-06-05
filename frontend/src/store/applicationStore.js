import { create } from "zustand";

const useApplicationStore = create((set) => ({

    applications: [],
    setApplications: (applications) => set({ applications }),

}));

export default useApplicationStore;