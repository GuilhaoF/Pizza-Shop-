import { setupWorker } from 'msw/browser'

import { env } from '@/env'
import { signInMock } from './sign-in-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount'
import { getMonthReceiptMock } from './get-month-receipt-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getMonthOrdersAmountMock } from './get-month-orders-amount-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount-mock'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'


// import { handlers } from './handlers'

export const worker = setupWorker(
  signInMock,
  getDayOrdersAmountMock,
  getPopularProductsMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getDailyRevenueInPeriodMock,
  getMonthReceiptMock,
  registerRestaurantMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}