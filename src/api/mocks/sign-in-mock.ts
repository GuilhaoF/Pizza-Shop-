
import { http, HttpResponse } from 'msw'
import { SignInForm } from '../sign-in'


export const signInMock = http.post<never,SignInForm>(
  '/authenticate',
  async ({request}) => {
    const { email } = await request.json()

    if(email === 'luis@gmail.com'){
      return new HttpResponse(null,{
        status:200,
        headers:{
          'Set-Cookie':'auth=sample-jwt',
        }
      })
    }
    return new HttpResponse(null,{ status : 401})

  }
)