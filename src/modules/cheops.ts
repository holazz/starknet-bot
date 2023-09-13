import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x048e95d3d7b12348819fa28dc43bcdf50f9774dabd4f5b622c4a25a0b7c30c45',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x048e95d3d7b12348819fa28dc43bcdf50f9774dabd4f5b622c4a25a0b7c30c45',
      approved: 0,
    }),
  }
}

export default {
  title: 'Cheops NFT',
  description: '授权 NFT',
  value: 'cheops',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
