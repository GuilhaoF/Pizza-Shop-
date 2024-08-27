import { api } from "@/lib/axios";


export interface SignInForm {
  email: string;
}

export async function signIn({email}: SignInForm) {
  await api.post("/authenticate",{
    email
  });
}