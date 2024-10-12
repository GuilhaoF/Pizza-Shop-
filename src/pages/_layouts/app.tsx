import { Header } from "@/components/header";
import { api } from "@/lib/axios";
import { isAxiosError } from "axios";
import { useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function AppLayout() {

  const navigate = useNavigate()
  // useLayoutEffect serve para executar um efeito colateral após a renderização do componente
  useLayoutEffect(() => {
    // cria um interceptor para capturar erros de requisição
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error)) {
          const status = error.response?.status
          const code = error.response?.data.code

          if (status === 401 && code === 'UNAUTHORIZED') {
            navigate('/sign-in', {replace: true,})
          } else{
            throw error
          }
        }

        return Promise.reject(error)
      },
    )

    // retorna uma função que será executada quando o componente for desmontado
    // essa função remove o interceptor que foi criado para nao causar memory leak
    return () => {
      api.interceptors.response.eject(interceptorId)
    }
  }, [navigate])




  return (
    <div className="flex min-h-screen flex-col antialiased">
        <Header />
      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
