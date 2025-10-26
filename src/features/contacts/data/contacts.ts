import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { Route as ContactRoute } from "@/routes/_authenticated/contacts";
import { getContacts } from "@/services/contact.service";

const params = useSearch({ from: ContactRoute.id });

export const { data: contacts, isLoading, error } = useQuery({
  queryKey: [ContactRoute.id, params],
  queryFn: () => getContacts(params),
  placeholderData: (prev) => prev,
});
