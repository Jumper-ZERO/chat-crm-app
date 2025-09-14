import { useQuery } from "@tanstack/react-query"
import { useSearch } from "@tanstack/react-router";

import type { ContactQuery } from "@/models/contact.model";
import { Route as RouteContact } from "@/routes/(dashboard)/contacts/route";
import { getContacts } from "@/services/contact.service";

export const useContacts = () => {
  const params = useSearch({ from: RouteContact.id }) as ContactQuery;

  return useQuery({
    queryKey: [RouteContact.id, params],
    queryFn: () => getContacts(params),
    placeholderData: (prev) => prev,
  });
}
