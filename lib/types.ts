export type Plan = 'none' | 'v2_tool' | 'v2_course' | 'v2_combo' | 'full'
export type ProductId = 'terminal' | 'course' | 'dictionary' | 'bizbooks'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  meridian_key: string | null
  plan: Plan
  created_at: string
  updated_at: string
}

export interface ProductAccess {
  id: string
  user_id: string
  product: ProductId
  granted_at: string
}

export interface GasLicense {
  valid: boolean
  plan?: Plan
  hasTool?: boolean
  hasCourse?: boolean
  email?: string
  since?: string
  reason?: string
}

export interface GasUserInfo {
  email: string
  license: GasLicense
}

export interface ProductCard {
  id: ProductId
  name: string
  icon: string
  tagline: string
  description: string
  url: string
  selarUrl: string
  isBuilt: boolean
  comingSoonLabel?: string
}
