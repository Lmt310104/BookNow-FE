import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  signInByEmail,
  SignInByEmailInput,
  signInByEmailSchema,
} from "@/features/auth/apis/sign-in";
import { useToast } from "@/hooks/use-toast";
interface SignInFormProps {
  onSuccess: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  // const {setUser} = useUser();
  const {toast} = useToast();

  const form = useForm<SignInByEmailInput>({
    resolver: zodResolver(signInByEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(values: SignInByEmailInput) {
    const res = await signInByEmail(values);
    console.log(res);
    if(res) {
      
      onSuccess();
    }
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email/Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit">Sign in</button>
        </form>
      </Form>
    </>
  );
};

export default SignInForm;
