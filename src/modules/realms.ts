import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls(address: string) {
  return {
    contractAddress:
      '0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49',
    entrypoint: 'approve',
    calldata: CallData.compile({
      spender: address,
      amount: 0,
      _: 0,
    }),
  }
}

export default {
  title: 'Realms',
  description: '授权 LORDS',
  value: 'realms',
  calls: (address: string) => getCalls(address),
  sendTransaction: (account: Account) =>
    sendTransaction(account, getCalls(account.address)),
}
