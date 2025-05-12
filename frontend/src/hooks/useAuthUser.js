import { getAuthUser } from "../api/dataService";
import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false, // auth check
  });

  return {
    authUser: authUser.data?.user,
    isLoading: authUser.isLoading,
  };
};

export default useAuthUser;
