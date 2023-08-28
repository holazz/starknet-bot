import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      process.env.NETWORK === 'mainnet'
        ? '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af'
        : '0x0783a9097b26eae0586373b2ce0ed3529ddc44069d1e0fbc4f66d42b69d6850d',
    entrypoint: 'mint',
    calldata: [Math.floor(1e12 * Math.random())],
  }
}

export default {
  title: 'Stark.id',
  description: '铸造 Starknet.id NFT',
  value: 'starkId',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
