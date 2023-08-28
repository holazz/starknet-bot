export interface Wallet {
  privateKey: string
  address: string
  label?: string
}

export interface NFTInfo {
  nft_id: string
  contract_address: string
  token_id: string
  name: string
  description: string
  external_url: string
  attributes: Record<string, string>[]
  image_url: string
  image_small_url: string
  image_medium_url: string
  animation_url: string
  minted_by_address: string
  minted_at_transaction_hash: string
  minted_at_timestamp: number
}
