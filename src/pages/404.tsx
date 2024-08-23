import { Link } from 'react-router-dom'
import ErrorPage from '../../public/404.png'
export function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <img src={ErrorPage} alt='pagina nao encontrada' className='w-64 h-64' />
      <h1 className="text-4xl font-bold">Pagina nao encontrada</h1>
      <p className="text-accent-foreground">
       Volte para {' '}
        <Link className="text-sky-500 dark:text-sky-400" to="/">
          Dashboard
        </Link>
      </p>
    </div>
  ) 
}