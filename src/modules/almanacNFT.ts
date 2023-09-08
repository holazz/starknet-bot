import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x07d4dc2bf13ede97b9e458dc401d4ff6dd386a02049de879ebe637af8299f91d',
    entrypoint: 'setApprovalForAll',
    calldata: CallData.compile({
      operator:
        '0x7d4dc2bf13ede97b9e458dc401d4ff6dd386a02049de879ebe637af8299f91d',
      approved: '0',
    }),
  }
}

export default {
  title: 'Almanac NFT',
  description: '授权 NFT',
  value: 'almanacNFT',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
