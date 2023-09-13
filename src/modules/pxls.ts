import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x07f87b400e9cc3f56a3eb26a924a46a053ebae4eea9ba85f58c17f7a09331aa1',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x07f87b400e9cc3f56a3eb26a924a46a053ebae4eea9ba85f58c17f7a09331aa1',
      approved: 0,
    }),
  }
}

export default {
  title: 'Pxls NFT',
  description: '授权 NFT',
  value: 'pxls',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
