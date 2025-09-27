import { searchUsers } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useSearchUsers(search: string) {
  return useQuery({
    queryKey: ["users", search],
    queryFn: () => searchUsers(search),
  });
}
