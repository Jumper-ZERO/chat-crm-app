import { useQuery } from "@tanstack/react-query"

import { getContacts } from "@/services/contact.service";
import { useSearch } from "@tanstack/react-router";

export const useContacts = () => {

  // const route = getRouteApi('/_authenticated/contacts/')
  const params = useSearch({ from: "/_authenticated/contacts/" });

  return useQuery({
    queryKey: ['contacts', params],
    queryFn: () => getContacts(params),
    placeholderData: (prev) => prev,
  });
}
