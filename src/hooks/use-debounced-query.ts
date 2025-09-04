import { useState, useEffect } from "react";
import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

export const useDebouncedQuery = <TQueryFnData, TError = unknown>(
  queryKey: QueryKey,
  queryFn: () => Promise<TQueryFnData>,
  delay: number,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TQueryFnData, QueryKey>,
    "queryKey"
  >
) => {
  const [debouncedKey, setDebouncedKey] = useState<QueryKey>(queryKey);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKey(queryKey);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [queryKey, delay]);

  return useQuery<TQueryFnData, TError>({
    ...options,
    queryKey: debouncedKey,
    queryFn,
    enabled:
      JSON.stringify(queryKey) === JSON.stringify(debouncedKey) &&
      (options?.enabled ?? true),
  });
};
