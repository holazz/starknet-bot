import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls(address: string) {
  return {
    contractAddress:
      '0x06182278e63816ff4080ed07d668f991df6773fd13db0ea10971096033411b11',
    entrypoint: 'transfer',
    calldata: CallData.compile({
      recipient: address,
      amount: 0,
      _: 0,
    }),
  }
}

export default {
  title: 'Spirit Stone',
  description: '转给自己地址 0 SPIST',
  value: 'spiritStone',
  calls: (address: string) => getCalls(address),
  sendTransaction: (account: Account) =>
    sendTransaction(account, getCalls(account.address)),
}
