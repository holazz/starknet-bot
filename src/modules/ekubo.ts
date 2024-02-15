import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x02e0af29598b407c8716b17f6d2795eca1b471413fa03fb145a5e33722184067',
    entrypoint: 'clear',
    calldata: [
      '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    ],
  }
}

export default {
  title: 'Ekubo',
  description: '移除流动性',
  value: 'ekubo',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
