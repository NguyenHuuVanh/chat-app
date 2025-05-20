import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../api/dataService";
import { useNavigate } from "react-router-dom";

// const useLogout = () => {
//   const queryClient = useQueryClient();
//   const {
//     mutate: logoutMutation,
//     isPending,
//     error,
//   } = useMutation({
//     mutationFn: logout,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["authUser"] });
//     },
//   });
//   return {
//     isPending,
//     logoutMutation,
//     error,
//   };
// };

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Xóa cache của react-query
      queryClient.clear();
      // Hoặc invalidate query cụ thể:
      // queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // Chuyển hướng về trang login
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Vẫn chuyển về trang login ngay cả khi API thất bại
      navigate("/login");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return { logoutMutation: handleLogout, isLoading: logoutMutation.isPending };
};

export default useLogout;
