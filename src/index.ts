import c from 'picocolors'
import prompts from 'prompts'
import { Account } from 'starknet'
import { estimateGasFee, getProvider, shortenAddress } from './utils'
import { wallets as rawWallets } from './config'
import modules from './modules'
import type { Call, Provider } from 'starknet'
import type { Wallet } from './types'

async function getConfig() {
  const { project } = (await prompts({
    type: 'select',
    name: 'project',
    message: '请选择交互的项目',
    choices: modules,
  })) as { project: string }

  const { wallets } = (await prompts({
    type: 'multiselect',
    name: 'wallets',
    message: '请选择交互的钱包',
    choices: rawWallets.map((wallet, index) => ({
      title: `${wallet.label || `Account ${index + 1}`} ${c.dim(
        `(${shortenAddress(wallet.address)})`
      )}`,
      value: wallet,
    })),
    instructions: false,
  })) as { wallets: Wallet[] }

  return { project, wallets }
}

async function beforeSubmitTransaction(
  provider: Provider,
  wallet: Wallet,
  calls: Call | Call[]
) {
  const account = new Account(provider, wallet.address, wallet.privateKey)
  const fee = await estimateGasFee(account, calls)
  if (process.env.TRANSCATION_CONFIRM === 'true') {
    const { value } = await prompts({
      type: 'confirm',
      name: 'value',
      message: `预估手续费: ${c.yellow(`$${fee}`)}, 确认交易吗?`,
      initial: true,
    })
    return value
  }
  console.log(`\n${c.bold('预估手续费: ')}${c.yellow(`$${fee}`)}\n`)
  return true
}

async function run() {
  const { project, wallets } = await getConfig()
  const provider = getProvider()
  const callMethod = modules.find((m) => m.value === project)!.call

  const isSubmit = await beforeSubmitTransaction(
    provider,
    wallets[0],
    callMethod(wallets[0])
  )

  if (!isSubmit) return

  const promises = wallets.map(async (wallet, index) => {
    const account = new Account(provider, wallet.address, wallet.privateKey)
    const nonce = await account.getNonce()
    const res = await account.execute(callMethod(wallet))
    return {
      address: `${wallet.label || `Account ${index + 1}`} ${c.dim(
        `(${shortenAddress(wallet.address)})`
      )}`,
      nonce: Number(nonce),
      tx: `${
        process.env.NETWORK === 'mainnet'
          ? 'https://starkscan.co/tx/'
          : 'https://testnet.starkscan.co/tx/'
      }${res.transaction_hash}`,
    }
  })

  const res = await Promise.all(promises)

  res.forEach((r) => {
    console.log(
      `\n${c.bold(r.address)}\n${c.bold('Nonce: ')}${c.yellow(
        r.nonce.toString()
      )}\n${c.bold('Transaction: ')}${c.green(r.tx)}\n`
    )
  })
}

run()
