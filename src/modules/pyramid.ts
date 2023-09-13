import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x0364847c4f39b869760a8b213186b5b553127e9420e594075d13d1ce8a1d9157',
    entrypoint: 'cancelMakerOrder',
    calldata: CallData.compile({
      orderNonce: 0,
    }),
  }
}

export default {
  title: 'Pyramid NFT Marketplace',
  description: '在 Pyramid NFT Marketplace 下架 NFT',
  value: 'pyramid',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
