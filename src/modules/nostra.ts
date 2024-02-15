import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls(address: string) {
  return {
    contractAddress:
      '0x07170f54dd61ae85377f75131359e3f4a12677589bb7ec5d61f362915a5c0982',
    entrypoint: 'approve',
    calldata: CallData.compile({
      spender: address,
      amount: 0,
      _: 0,
    }),
  }
}

export default {
  title: 'Nostra',
  description: '授权代币',
  value: 'nostra',
  calls: getCalls,
  sendTransaction: (account: Account) =>
    sendTransaction(account, getCalls(account.address)),
}
