import 'dotenv/config'
import { Provider as StarknetProvider, constants } from 'starknet'
import c from 'picocolors'
import { resolvedWallets } from '../config'
import { getETHPrice } from '../api'
import type { Account, Call } from 'starknet'

export function getProvider() {
  return new StarknetProvider({
    sequencer: {
      network:
        process.env.NETWORK === 'mainnet'
          ? constants.NetworkName.SN_MAIN
          : constants.NetworkName.SN_GOERLI,
    },
  })
}

export async function estimateGasFee(account: Account, calls: Call | Call[]) {
  const [fee, ethPrice] = await Promise.all([
    account.estimateInvokeFee(calls),
    getETHPrice(),
  ])
  return Number(((Number(fee.overall_fee) / 1e18) * ethPrice).toFixed(2))
}

export async function sendTransaction(account: Account, calls: Call | Call[]) {
  const nonce = await account.getNonce()
  const res = await account.execute(calls)
  return {
    address: generateWalletTitle(account.address),
    nonce: Number(nonce),
    tx: res.transaction_hash,
  }
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function randomPick(source: any[]) {
  return source[Math.floor(Math.random() * source.length)]
}

export function shortenAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export function generateWalletTitle(address: string) {
  const wallet = resolvedWallets.find((w) => w.address === address)!
  return `${wallet.label} ${c.dim(`(${shortenAddress(wallet.address)})`)}`
}

export function retry<T>(
  fn: (...args: any[]) => Promise<T>,
  times = 0,
  delay = 0
) {
  return (...args: any[]): Promise<T> =>
    new Promise((resolve, reject) => {
      const attempt = async () => {
        try {
          resolve(await fn(...args))
        } catch (err) {
          if (times-- <= 0) {
            reject(err)
          } else {
            setTimeout(attempt, delay)
          }
        }
      }
      attempt()
    })
}
