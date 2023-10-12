import axios from 'axios'
import type { NFTInfo } from '../types'

// export async function getETHPrice() {
//   const res = await axios.get('https://api.binance.com/api/v3/ticker/price', {
//     params: {
//       symbol: 'ETHUSDT',
//     },
//   })
//   return Number(res.data.price)
// }

export async function getETHPrice() {
  const res = await axios.get('https://min-api.cryptocompare.com/data/price', {
    params: {
      fsym: 'ETH',
      tsyms: 'USD',
    },
  })
  return res.data.USD
}

export async function getLatestTransaction(address: string) {
  const res = await axios.get('https://api.starkscan.co/api/v0/transactions', {
    params: {
      limit: 1,
      contract_address: address,
      order_by: 'desc',
    },
    headers: {
      'x-api-key': process.env.STARKSCAN_API_KEY,
    },
  })
  return res.data.data
}

export async function getNFTs(address: string): Promise<NFTInfo[]> {
  const res = await axios.get('https://api.starkscan.co/api/v0/nfts', {
    params: {
      limit: 100,
      owner_address: address,
    },
    headers: {
      'x-api-key': process.env.STARKSCAN_API_KEY,
    },
  })
  return res.data.data
}

export async function waitForTransactionReceipt(txHash: string) {
  const res = await axios.get(
    'https://alpha-mainnet.starknet.io/feeder_gateway/get_transaction_receipt',
    {
      params: {
        transactionHash: txHash,
      },
    }
  )
  let { status } = res.data
  while (status !== 'ACCEPTED_ON_L2') {
    const res = await axios.get(
      'https://alpha-mainnet.starknet.io/feeder_gateway/get_transaction_receipt',
      {
        params: {
          transactionHash: txHash,
        },
      }
    )
    status = res.data.status
  }
}
