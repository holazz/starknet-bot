import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x012f8e318fe04a1fe8bffe005ea4bbd19cb77a656b4f42682aab8a0ed20702f0',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x012f8e318fe04a1fe8bffe005ea4bbd19cb77a656b4f42682aab8a0ed20702f0',
      approved: 0,
    }),
  }
}

export default {
  title: 'StarkRocks NFT',
  description: '授权 NFT',
  value: 'starkRocks',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
