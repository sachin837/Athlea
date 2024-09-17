import { create } from 'zustand'

interface AnimationMessageState {
  isAnimationMessageExpanded: boolean;
  setIsAnimationMessageExpanded: (expanded: boolean) => void;
}

export const useAnimationMessage = create<AnimationMessageState>((set) => ({
  isAnimationMessageExpanded: false,
  setIsAnimationMessageExpanded: (expanded) =>
    set((state) => {
      if (state.isAnimationMessageExpanded !== expanded) {
        return { isAnimationMessageExpanded: expanded }
      }
      return state
    }),
}))
