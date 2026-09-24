import { create } from 'zustand';

/**
 * Global UI state (mobile navigation).
 */
export const useUiStore = create((set) => ({
  mobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
}));
