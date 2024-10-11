import { http, HttpResponse } from 'msw'
import { GetDailyReceiptInPeriodResponse } from '../get-daily-receipt-in-period'



export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyReceiptInPeriodResponse
>('/metrics/daily-receipt-in-period', async () => {
  return HttpResponse.json([
    { date: '01/01/2024', receipt: 2000 },
    { date: '02/01/2024', receipt: 3000 },
    { date: '03/01/2024', receipt: 4000 },
    { date: '04/01/2024', receipt: 5000 },
    { date: '05/01/2024', receipt: 6000 },
    { date: '06/01/2024', receipt: 7000 },
    { date: '07/01/2024', receipt: 8000 },
    { date: '08/01/2024', receipt: 9000 },
    { date: '09/01/2024', receipt: 10000 },
    { date: '10/01/2024', receipt: 11000 },
    { date: '11/01/2024', receipt: 12000 },
    { date: '12/01/2024', receipt: 13000 },
    { date: '13/01/2024', receipt: 14000 },
    { date: '14/01/2024', receipt: 15000 },
    { date: '15/01/2024', receipt: 16000 },
    { date: '16/01/2024', receipt: 17000 },
    { date: '17/01/2024', receipt: 18000 },
    { date: '18/01/2024', receipt: 19000 },
    { date: '19/01/2024', receipt: 20000 },
    { date: '20/01/2024', receipt: 21000 },
    { date: '21/01/2024', receipt: 22000 },
    { date: '22/01/2024', receipt: 23000 },
    { date: '23/01/2024', receipt: 24000 },
    { date: '24/01/2024', receipt: 25000 },
    { date: '25/01/2024', receipt: 26000 },
    { date: '26/01/2024', receipt: 27000 },
    { date: '27/01/2024', receipt: 28000 },
    { date: '28/01/2024', receipt: 29000 },
    { date: '29/01/2024', receipt: 30000 },
  ])
})