import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls(address: string) {
  return {
    contractAddress:
      process.env.NETWORK === 'mainnet'
        ? '0x060582df2cd4ad2c988b11fdede5c43f56a432e895df255ccd1af129160044b8'
        : '0x075cca7baf8b5985c16a44092c492c28f76e2c617324dc0ab7d1d499c5d47161',
    entrypoint: 'publicMint',
    calldata: CallData.compile({
      to: address,
    }),
  }
}

export default {
  title: 'StarkVerse',
  description: '铸造 StarkVerse NFT',
  value: 'starkVerse',
  calls: (address: string) => getCalls(address),
  sendTransaction: (account: Account) =>
    sendTransaction(account, getCalls(account.address)),
}
