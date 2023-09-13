import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x0740f5cc111d47b21dadd2bb191e19a188b1b10e094d6a1a66ba563b9f1ae976',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x0740f5cc111d47b21dadd2bb191e19a188b1b10e094d6a1a66ba563b9f1ae976',
      approved: 0,
    }),
  }
}

export default {
  title: 'Bobble Pop! NFT',
  description: '授权 NFT',
  value: 'bobblePop',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
