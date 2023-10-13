import type { Wallet } from './types'

export const wallets: Wallet[] = [
  {
    privateKey: '', // 私钥
    address: '', // 地址
  },
]

export const resolvedWallets: Wallet[] = wallets.map((wallet, index) => ({
  label: wallet.label || `Account ${index + 1}`,
  ...wallet,
}))
