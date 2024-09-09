import { Link, useRouteError } from 'react-router-dom'
import ErrorPage from '../../public/404.png'


export function Error() {

  const error = useRouteError() as Error
 
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <img src={ErrorPage} alt='pagina nao encontrada' className='w-64 h-64' />
      <h1 className="text-4xl font-bold">Whoops, algo aconteceu...</h1>
      <p>
        Um erro aconteceu ao tentar acessar a página: <strong>{error?.message || JSON.stringify(error)}</strong>
      </p>
      <p className="text-accent-foreground">
       Volte para {' '}
        <Link className="text-sky-500 dark:text-sky-400" to="/">
          Dashboard
        </Link>
      </p>
    </div>
  ) 
}