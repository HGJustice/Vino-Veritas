import { useQuery } from '@apollo/client';

export default function useCustomQuery(query, variables = {}, options = {}) {
  const { data, error, loading, refetch } = useQuery(query, {
    variables,
    ...options,
  });

  return { data, error, loading, refetch };
}
