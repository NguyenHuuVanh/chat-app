import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../api/dataService";
import { useNavigate } from "react-router-dom";

// const useSignup = () => {
//   const { mutate, isPending, error } = useMutation({
//     mutationFn: signup,
//     onSuccess: () => QueryClient.invalidateQueries({ queryKey: ["authUser"] }),
//     onError: () => {
//       console.error("Error signing up:", error);
//     },
//   });
//   return { isPending, signupMutation: mutate, error };
// };

const useSignup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Signup successful:", data);

      // Lưu token vào localStorage nếu không được lưu trong dataService
      if (data && data.token) {
        localStorage.setItem("token", data.token);
      }

      // Cập nhật cache của react-query
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      console.log("User onboarded status:", data.user?.isOnboarded);

      // Chuyển hướng ngay lập tức
      if (data.user && data.user.isOnboarded === true) {
        navigate("/");
      } else {
        // Thêm delay nhỏ để đảm bảo token được lưu trước
        setTimeout(() => {
          navigate("/onboarding");
        }, 300);
      }
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });

  return {
    isPending,
    signupMutation: mutate,
    error,
  };
};

export default useSignup;
