import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";

export type VerificationEmailInput = {
  token: string;
};
export type VerificationEmailResponse = {
  message: string;
};
export const verificationEmail = (
  data: VerificationEmailInput,
): Promise<VerificationEmailResponse> => {
  return api.post("auth/verify-email", data);
};
const useVerificationEmail = ({
  mutationConfig,
}: {
  mutationConfig: MutationConfig<typeof verificationEmail>;
}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation<VerificationEmailResponse, Error, VerificationEmailInput>({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: verificationEmail,
  });
};

export default useVerificationEmail;
