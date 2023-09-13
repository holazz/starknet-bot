import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x030a78fde0a16bd42c544784da840137b5275fdcf96d2e16517862f6269854c0',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x030a78fde0a16bd42c544784da840137b5275fdcf96d2e16517862f6269854c0',
      approved: 0,
    }),
  }
}

export default {
  title: 'Mystis NFT',
  description: '授权 NFT',
  value: 'mystis',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
