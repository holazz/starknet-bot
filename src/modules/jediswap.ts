import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x04d367b511dec42e5207c616e50afc8471ee8bdf53f46d1def9fc7d8411f1eec',
    // '0x00287d2ff1c39a44cd18d9dc7ed5617c9cb16b65090db6a0f689aa14755e4e5e',
    entrypoint: 'set_approval_for_all',
    calldata: CallData.compile({
      operator:
        '0x04d367b511dec42e5207c616e50afc8471ee8bdf53f46d1def9fc7d8411f1eec',
      approved: 0,
    }),
  }
}

export default {
  title: 'JediSwap',
  description: '授权 NFT',
  value: 'jediswap',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
