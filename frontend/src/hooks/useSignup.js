import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../api/dataService";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();
  const QueryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      QueryClient.invalidateQueries({ queryKey: ["authUser"] });

      if (data.user.isOnboarded) {
        navigate("/");
      } else {
        navigate("/onboarding");
      }
    },
    onError: () => {
      console.error("Error signing up:", error);
    },
  });
  return { isPending, singupMutation: mutate, error };
};

export default useSignup;
