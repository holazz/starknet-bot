import { CallData } from 'starknet'

export default {
  title: 'Dmail',
  description: '向 dmailteam@dmail.ai 发送邮件',
  value: 'dmail',
  call: () => ({
    contractAddress:
      '0x0454f0bd015e730e5adbb4f080b075fdbf55654ff41ee336203aa2e1ac4d4309',
    entrypoint: 'transaction',
    calldata: CallData.compile({
      to: 'dmailteam@dmail.ai',
      theme: Date.now().toString(),
    }),
  }),
}
