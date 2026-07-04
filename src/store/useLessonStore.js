import { create } from 'zustand';

const useLessonStore = create((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    closeSidebar: () => set({ isSidebarOpen: false }),

    isAutoplay: true,
    toggleAutoplay: () => set((state) => ({ isAutoplay: !state.isAutoplay })),
    setAutoplay: (value) => set(() => ({ isAutoplay: value })),

    expandedSections: [], 
    toggleSection: (sectionId) => set((state) => {
        const isExists = state.expandedSections.includes(sectionId);
        if (isExists) {
            return { expandedSections: state.expandedSections.filter(id => id !== sectionId) };
        }
        return { expandedSections: [...state.expandedSections, sectionId] };
    }),
    setExpandedSections: (sections) => set({ expandedSections: sections }), 
}));

export default useLessonStore;