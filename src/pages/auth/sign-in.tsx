import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserSquareIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const signInForm = z.object({
  email: z.string().email(),
});
type signInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInForm>();

  async function handleSignIn(data: signInForm) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    toast.success("Enviamos um link de autenticação para o seu email");
  }

  return (
    <div>
      <Helmet title="Sign-In" />
      <a
        href="/sign-up"
        className={twMerge(
          buttonVariants({ variant: 'destructive' }),
          'absolute right-4 top-4 md:right-8 md:top-8',
        )}
      >
        Novo estabelecimento
      </a>
      <div className="p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <UserSquareIcon className="mx-auto h-10 w-10 text-primary" />
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm">Acompanhe suas vendas pelo painel</p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu Email</Label>
              <Input id="email" type="email" {...register} />
            </div>
            <Button disabled={isSubmitting} type="submit">
              {" "}
              Acessar Painel
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
