import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x01435498bf393da86b4733b9264a86b58a42b31f8d8b8ba309593e5c17847672',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      approved_address:
        '0x3a2fc8b0db9a9ef748227ef61ed254897cb40ad39575a9bde734dc78073f779',
      is_approved: '0',
    }),
  }
}

export default {
  title: 'briq',
  description: '授权 NFT',
  value: 'briq',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
