import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x046bfa580e4fa55a38eaa7f51a3469f86b336eed59a6136a07b7adcd095b0eb2',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x046bfa580e4fa55a38eaa7f51a3469f86b336eed59a6136a07b7adcd095b0eb2',
      approved: 0,
    }),
  }
}

export default {
  title: 'Rules NFT',
  description: '授权 NFT',
  value: 'rules',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
