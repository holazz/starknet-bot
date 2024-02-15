import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0xfff107e2403123c7df78d91728a7ee5cfd557aec0fa2d2bdc5891c286bbfff',
      approved: 0,
    }),
  }
}

export default {
  title: 'MySwap',
  description: '授权 NFT',
  value: 'myswap',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
