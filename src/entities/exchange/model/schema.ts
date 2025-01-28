import { Statuses } from '@/shared/model/types'
import { z } from 'zod'

export const RequisiteSchema = z.object({
  crypto: z
    .object({
      address: z.string(),
      destinationTag: z.string().optional().nullable()
    })
    .optional(),
  card: z
    .object({
      number: z.string(),
      holder: z.string()
    })
    .optional()
})

export const CreateExchangeReqSchema = z
  .object({
    currencyFrom: z.string(),
    currencyTo: z.string(),
    amount: z.string(),
    requisite: RequisiteSchema
  })
  .required()

export const CreateExchangeResSchema = z.object({
  id: z.string(),
  requisite: RequisiteSchema
})

export const FetchExchangeSchema = z.object({
  id: z.string()
})

export const OrderSchema = z.object({
  id: z.string(),
  type: z.string(),
  status: z.nativeEnum(Statuses),
  currency: z.string(),
  amount: z.string(),
  successPaid: z.string(),
  fee: z.string()
})

export const ExchangeSchema = z.object({
  id: z.string(),
  status: z.nativeEnum(Statuses),
  rate: z.string(),
  rawRate: z.string(),
  createdAt: z.string().datetime(),
  orders: OrderSchema
})

export const FetchExchangeResSchema = z.object({
  exchange: ExchangeSchema
})

export const FetchAllExchangesResSchema = z.object({
  exchanges: z.array(ExchangeSchema)
})

export const FetchAllExchangesReqSchema = z.object({
  limit: z.string(),
  offset: z.string(),
  status: z.nativeEnum(Statuses),
  createdAtGt: z.string().datetime(),
  createdAtLt: z.string().datetime()
})
