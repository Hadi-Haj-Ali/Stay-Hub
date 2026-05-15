import { useQuery } from '@tanstack/react-query';
import { getHouses } from '@/services/housingService';

export function useHouses() {
  return useQuery({
    queryKey: ['houses'],
    queryFn: getHouses,
  });
}