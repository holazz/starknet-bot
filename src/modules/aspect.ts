import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x03090623ea32d932ca1236595076b00702e7d860696faf300ca9eb13bfe0a78c',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x3090623ea32d932ca1236595076b00702e7d860696faf300ca9eb13bfe0a78c',
      approved: 0,
    }),
  }
}

export default {
  title: 'Aspect NFT',
  description: '授权 NFT',
  value: 'aspect',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
