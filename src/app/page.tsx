"use client"

import ListCharacters from '@/components/ListCharacters';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {


  return (
    <QueryClientProvider client={queryClient}>
      <ListCharacters />
    </QueryClientProvider>
  );
}
