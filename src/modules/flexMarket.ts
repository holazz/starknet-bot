import { sendTransaction } from '../utils'
import { getNFTs, waitTransactionReceipt } from '../api'
import type { Account } from 'starknet'

async function getCalls(address: string) {
  const nfts = await getNFTs(address)

  if (nfts.length === 0) return []

  return [
    {
      contractAddress: nfts[0].contract_address,
      entrypoint: 'setApprovalForAll',
      calldata: [
        '0x0044cf6f308cb181e0f0a6aeb3601802f45eda2714f3334aded57b3e9dbb1a20',
        '1',
      ],
    },
    {
      contractAddress:
        '0x04b1b3fdf34d00288a7956e6342fb366a1510a9387d321c87f3301d990ac19d4',
      entrypoint: 'cancelMakerOrder',
      calldata: ['20'],
    },
  ]
}

async function run(account: Account) {
  const [approve, cancelOrder] = await getCalls(account.address)
  const approveRes = await sendTransaction(account, approve)
  await waitTransactionReceipt(approveRes.tx)
  const cancelOrderRes = await sendTransaction(account, cancelOrder)

  return [approveRes, cancelOrderRes]
}

export default {
  title: 'Flex Marketplace',
  description: '在 Flex Marketplace 上架和下架 NFT',
  value: 'flexMarket',
  calls: (address: string) => getCalls(address),
  sendTransaction: (account: Account) => run(account),
}
