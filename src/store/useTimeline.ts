import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface Milestone {
  id: string;
  year: number;
  title: string;
  summary: string;
  provinceCode?: string;
  image?: string;
  lat?: number;
  lng?: number;
}

interface TimelineState {
  activeMilestoneId: string | null;
  milestones: Milestone[];
  setActiveMilestone: (id: string | null) => void;
  setMilestones: (milestones: Milestone[]) => void;
  getActiveMilestone: () => Milestone | null;
}

export const useTimelineStore = create<TimelineState>()(
  devtools(
    (set, get) => ({
      activeMilestoneId: null,
      milestones: [],

      setActiveMilestone: (id) => set({ activeMilestoneId: id }),

      setMilestones: (milestones) => set({ milestones }),

      getActiveMilestone: () => {
        const { activeMilestoneId, milestones } = get();
        return milestones.find(m => m.id === activeMilestoneId) || null;
      },
    }),
    {
      name: 'timeline-store',
    }
  )
);

