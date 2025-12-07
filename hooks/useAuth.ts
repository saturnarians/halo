import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchMe, logout as logoutAction, User } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store";
import type { RootState } from "@/store";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMe());
    }
  }, [dispatch, status]);

  const logout = async () => {
    await fetch("/api/auth/logout"); // clear cookie/session
    dispatch(logoutAction());
  };

  return {
    admin: user?.role === "admin" ? user : null,
    user,
    loading: status === "loading",
    logout,
  };
}
