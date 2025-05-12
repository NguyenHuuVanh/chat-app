import { QueryClient, useMutation } from "@tanstack/react-query";
import { signup } from "../api/dataService";

const useSignup = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: () => QueryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: () => {
      console.error("Error signing up:", error);
    },
  });
  return { isPending, singupMutation: mutate, error };
};

export default useSignup;
