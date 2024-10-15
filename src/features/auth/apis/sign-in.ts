import { AuthResponse } from "@/types/api";
import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export interface SignInPayLoad {
  email: string;
  password: string;
}

export const signInWithEmail = (
  payload: SignInPayLoad,
): Promise<AuthResponse> => api.post("/auth/sign-in/email", payload);

export const useSignInWithEmail = ({
  mutationConfig,
}: {
  mutationConfig: MutationConfig<typeof signInWithEmail>;
}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation<AuthResponse, Error, SignInPayLoad>({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signInWithEmail,
  });
};
