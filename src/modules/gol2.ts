import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      process.env.NETWORK === 'mainnet'
        ? '0x06a05844a03bb9e744479e3298f54705a35966ab04140d3d8dd797c1f6dc49d0'
        : '0x06dc4bd1212e67fd05b456a34b24a060c45aad08ab95843c42af31f86c7bd093',
    entrypoint: 'evolve',
    calldata: CallData.compile({
      game_id: '39132555273291485155644251043342963441664',
    }),
  }
}

export default {
  title: 'Gol2',
  description: '加入游戏',
  value: 'gol2',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
