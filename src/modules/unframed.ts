import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x051734077ba7baf5765896c56ce10b389d80cdcee8622e23c0556fb49e82df1b',
    entrypoint: 'cancel_orders',
    calldata: CallData.compile({
      order_nonces: ['0'],
    }),
  }
}

export default {
  title: 'Unframed',
  description: '取消订单',
  value: 'unframed',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
