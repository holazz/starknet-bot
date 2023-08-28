import { CallData } from 'starknet'
import { sendTransaction } from '../utils'
import type { Account } from 'starknet'

function getCalls() {
  return {
    contractAddress:
      '0x0454f0bd015e730e5adbb4f080b075fdbf55654ff41ee336203aa2e1ac4d4309',
    entrypoint: 'transaction',
    calldata: CallData.compile({
      to: 'dmailteam@dmail.ai',
      theme: Date.now().toString(),
    }),
  }
}

export default {
  title: 'Dmail',
  description: '向 dmailteam@dmail.ai 发送邮件',
  value: 'dmail',
  calls: getCalls,
  sendTransaction: (account: Account) => sendTransaction(account, getCalls()),
}
