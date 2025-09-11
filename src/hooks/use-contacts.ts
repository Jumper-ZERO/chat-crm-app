import { useQuery } from "@tanstack/react-query"

import { getContacts } from "@/services/contact.service"

export const useContacts = (page: number, limit: number = 10) => {
  return useQuery({
    queryKey: ["contacts", page, limit],
    queryFn: () => getContacts(page, limit),
    placeholderData: (previousData) => previousData,
  })
}
