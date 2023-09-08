import { randomPick, sendTransaction } from '../utils'
import type { Account } from 'starknet'

const entrypoint = randomPick(['deposit_liquidity', 'withdraw_liquidity'])

function getCalls() {
  return {
    contractAddress:
      '0x076dbabc4293db346b0a56b29b6ea9fe18e93742c73f12348c8747ecfc1050aa',
    entrypoint,
    calldata: [
      '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
      '0x053C91253BC9682c04929cA02ED00b3E423f6710D2ee7e0D5EBB06F3eCF368A8',
      '0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7',
      '0',
      '0',
      '0',
    ],
  }
}

export default {
  title: 'Carmine Finance',
  description: entrypoint === 'deposit_liquidity' ? '添加流动性' : '移除流动性',
  value: 'carmine',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
