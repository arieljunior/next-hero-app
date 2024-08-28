import { create } from 'zustand'

interface PaginationState {
  page: number,
  limitPage: number,
  setPage: (newPage: number) => void
}

export const usePagination = create<PaginationState>((set) => ({
  page: 1,
  limitPage: 8,
  setPage: (newPage: number) => set(() => ({ page: newPage })),
}))