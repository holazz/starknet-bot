import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x03dcf5c72ba60eb7b2fe151032769d49dd3df6b04fa3141dffd6e2aa162b7a6e',
    entrypoint: 'withdraw_all_deposit',
    calldata: ['303'],
  }
}

export default {
  title: 'Hashstack',
  description: '移除流动性',
  value: 'hashstack',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
