import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { logout } from "../api/dataService";

const useLogout = () => {
  const queryClient = useQueryClient();
  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return {
    isPending,
    logoutMutation,
    error,
  };
};

export default useLogout;
