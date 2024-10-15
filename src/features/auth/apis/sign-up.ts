import { AuthResponse } from "@/types/api";
import { api } from "@/lib/api-client";
import { useMutation } from "@tanstack/react-query";
import { MutationConfig } from "@/lib/react-query";

export interface SignUpPayload {
  email: string;
  password: string;
  fullName: string;
}

export const signUpByEmail = (
  payload: SignUpPayload,
): Promise<AuthResponse> => {
  return api.post("/auth/sign-up/email", payload);
};

const useSignUpByEmail = ({
  mutationConfig,
}: {
  mutationConfig: MutationConfig<typeof signUpByEmail>;
}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation<AuthResponse, Error, SignUpPayload>({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: signUpByEmail,
  });
};

export default useSignUpByEmail;
