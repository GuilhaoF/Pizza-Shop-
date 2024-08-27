import { signIn } from "@/api/sign-in";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { UserSquareIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const signInForm = z.object({
  email: z.string().email(),
});
type signInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const [searchParams] = useSearchParams() // useSearchParams é um hook do React Router que retorna um objeto com os parâmetros da URL

  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInForm>({
    defaultValues: {
      email: searchParams.get("email") ?? "", // O valor padrão do campo de email é o valor do parâmetro email da URL
    },
  });

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  });
  /*
  useMutation é um hook do React Query que é usado para lidar com operações de mutação (como POST, PUT, DELETE). Ele retorna um objeto com várias propriedades e métodos, incluindo mutateAsync.
  A propriedade mutationFn é a função que será chamada quando a mutação for executada. Neste caso, signIn é a função que realiza a operação de login
  */

  async function handleAutenticate({ email }: signInForm) {
    try {
      await authenticate({ email });
      toast.success("Enviamos um link de autenticação para seu e-mail.", {
        action: {
          label: "Reenviar",
          onClick: () => authenticate({ email }),
        },
      });
    } catch (error) {
      toast.error("Erro ao efetuar login");
    }
  }

  return (
    <div>
      <Helmet title="Sign-In" />
      <a
        href="/sign-up"
        className={twMerge(
          buttonVariants({ variant: "destructive" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
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

          <form
            onSubmit={handleSubmit(handleAutenticate)}
            className="space-y-4"
          >
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
