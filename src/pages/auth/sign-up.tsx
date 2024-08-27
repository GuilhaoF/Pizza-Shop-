import { RegisterRestaurant } from "@/api/sign-up";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  email: z.string().email(),
  phone: z.string(),
});
type signUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signUpForm>();
  const navigate = useNavigate();

  async function handleRegisteRestaurant({
    restaurantName,
    managerName,
    email,
    phone,
  }: signUpForm) {
    try {
      await RegisterRestaurant({ restaurantName, managerName, email, phone })
      toast.success("Enviamos um link de autenticação para o seu email",{
        action: {
          label: "Login",
          onClick: () => {
            navigate(`/sign-in?email=${email}`);
          },
        }
      });
    } catch (error) {
      toast.error("Erro ao cadastrar restaurante");
    }
  }

  return (
    <div className="lg:p-8">
      <Helmet title="Sign-Up" />
      <UserRound className="mx-auto h-10 w-10 text-primary" />
      <a
        href="/sign-in"
        className={twMerge(
          buttonVariants({ variant: "destructive" }),
          "absolute right-4 top-4 md:right-8 md:top-8",
        )}
      >
        Fazer login
      </a>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Criar conta grátis
          </h1>
          <p className="text-sm text-muted-foreground">
            Seja um parceiro <span className="font-semibold">pizza.shop</span> e
            comece suas vendas!
          </p>
        </div>

        <div className="grid gap-6">
          <form onSubmit={handleSubmit(handleRegisteRestaurant)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do negócio</Label>
                <Input
                  id="name"
                  type="text"
                  autoCorrect="off"
                  {...register("restaurantName")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="managerName">Seu nome</Label>
                <Input
                  id="managerName"
                  type="text"
                  autoCorrect="off"
                  {...register("managerName")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Seu e-mail</Label>
                <Input
                  id="email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  {...register("email")}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Celular</Label>
                <Input
                  id="phone"
                  placeholder="(99) 99999-9999"
                  type="tel"
                  {...register("phone")}
                />
              </div>

              <Button type="submit" disabled={isSubmitting}>
                Finalizar cadastro
              </Button>
            </div>
          </form>
        </div>

        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
          Ao continuar, você concorda com nossos{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Termos de serviço
          </a>{" "}
          e{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Políticas de privacidade
          </a>
          .
        </p>
      </div>
    </div>
  );
}
