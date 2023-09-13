import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x01c7607659020c0f128fe677a1d7be9c3b9f66cedfe50296aca146b003875ee5',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x01c7607659020c0f128fe677a1d7be9c3b9f66cedfe50296aca146b003875ee5',
      approved: 0,
    }),
  }
}

export default {
  title: 'Starki NFT',
  description: '授权 NFT',
  value: 'starki',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
