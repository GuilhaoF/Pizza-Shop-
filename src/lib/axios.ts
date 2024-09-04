import axios from 'axios'

import { env } from '@/env'

export const api = axios.create({
  baseURL: env.VITE_APP_URL,
  withCredentials: true, // serve para enviar os cookies junto com a requisição para o servidor
})
// if (env.VITE_ENABLE_API_DELAY) {
//   api.interceptors.request.use(async (config) => {
//     await new Promise((resolve) =>
//       setTimeout(resolve, Math.round(Math.random() * 4000)),
//     )
//     return config
//   })
// }