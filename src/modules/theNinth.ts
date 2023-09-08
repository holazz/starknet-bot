import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x0274a2ef0e6aadb781777954ec78832fbe490de0f0f1484354b99f328f74ab36',
    entrypoint: 'pray',
    calldata: [
      '2967174050445828070862061291903957281356339325911846264948421066253307482040',
      '0',
      '0',
      '0',
      '0',
      '9',
      '0',
    ],
  }
}

export default {
  title: 'The Ninth',
  description: '加入游戏',
  value: 'theNinth',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
