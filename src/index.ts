import c from 'picocolors'
import prompts from 'prompts'
import { Account } from 'starknet'
import { estimateGasFee, generateWalletTitle, getProvider } from './utils'
import { resolvedWallets } from './config'
import modules from './modules'
import type { Call, Provider } from 'starknet'
import type { Wallet } from './types'

async function getConfig() {
  const input = process.argv.slice(2)

  let project = modules.find((m) => m.value === input[0])?.value

  if (project) {
    console.log(
      `${c.green('✔')} ${c.bold('请选择交互的项目')} ${c.dim('›')} ${c.bold(
        modules.find((m) => m.value === input[0])?.title
      )}`
    )
  } else {
    const { project: p } = await prompts({
      type: 'select',
      name: 'project',
      message: '请选择交互的项目',
      choices: modules,
    })
    project = p
  }

  let wallets = resolvedWallets.filter((w) =>
    input[1]?.split(',').includes(w.address)
  )

  if (wallets.length) {
    console.log(
      `${c.green('✔')} ${c.bold('请选择交互交互的钱包')} ${c.dim('›')} ${c.bold(
        wallets.map((w) => generateWalletTitle(w.address)).join(', ')
      )}`
    )
  } else {
    const { wallets: w } = await prompts({
      type: 'multiselect',
      name: 'wallets',
      message: '请选择交互的钱包',
      choices: resolvedWallets.map((wallet) => ({
        title: generateWalletTitle(wallet.address),
        value: wallet,
      })),
      instructions: false,
    })
    wallets = w
  }

  return { project, wallets }
}

async function beforeSubmitTransaction(
  provider: Provider,
  wallet: Wallet,
  calls: Call | Call[]
) {
  const account = new Account(provider, wallet.address, wallet.privateKey)
  const fee = await estimateGasFee(account, calls)
  if (process.env.TRANSACTION_CONFIRM === 'true') {
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
  const module = modules.find((m) => m.value === project)!

  const isSubmit = await beforeSubmitTransaction(
    provider,
    wallets[0],
    await module.calls(wallets[0].address)
  )

  if (!isSubmit) return

  const promises = wallets.map(async (wallet) => {
    const account = new Account(provider, wallet.address, wallet.privateKey)
    return module.sendTransaction(account)
  })

  const res = await Promise.all(promises)

  res.flat().forEach((r) => {
    console.log(
      `\n${c.bold(r.address)}\n${c.bold('Nonce: ')}${c.yellow(
        r.nonce.toString()
      )}\n${c.bold('Transaction: ')}${c.green(
        `${
          process.env.NETWORK === 'mainnet'
            ? 'https://starkscan.co/tx/'
            : 'https://testnet.starkscan.co/tx/'
        }${r.tx}`
      )}\n`
    )
  })
}

run()
