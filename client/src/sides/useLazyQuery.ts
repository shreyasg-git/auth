import { useQuery } from "react-query";

export default function useLazyQuery(key: any, fn: any, options = {}) {
  const query = useQuery(key, fn, {
    ...options,
    enabled: false,
  });

  return [query.refetch, query];
}
