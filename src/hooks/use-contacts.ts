import { useQuery } from "@tanstack/react-query"

import { getContacts } from "@/services/contact.service"

// export const useContacts = () => {
//   return useQuery({
//     queryKey: ["contacts"],
//     queryFn: getContacts,
//   })
// }

export const useContacts = (page: number, limit: number = 10) => {
  return useQuery({
    queryKey: ["contacts", page, limit],
    queryFn: () => getContacts(page, limit),
    placeholderData: (previousData) => previousData,
    // keepPreviousData: true, // mantiene los datos mientras carga la nueva página
  })
}
