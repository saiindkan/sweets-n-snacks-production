// Tax calculation utility
export interface TaxCalculation {
  subtotal: number
  shipping: number
  tax: number
  total: number
  taxRate: number
  taxState: string
}

export const calculateTaxAndShipping = (
  subtotal: number, 
  state: string
): TaxCalculation => {
  // Fixed shipping cost
  const shipping = 15.00
  
  // State-specific tax rates
  let taxRate = 0
  let taxState = 'No Tax'
  
  switch (state?.toUpperCase()) {
    case 'NJ':
    case 'NEW JERSEY':
      taxRate = 0.06625 // 6.625%
      taxState = 'NJ'
      break
    case 'NY':
    case 'NEW YORK':
      taxRate = 0.08875 // 8.875%
      taxState = 'NY'
      break
    default:
      taxRate = 0
      taxState = 'No Tax'
  }
  
  // Calculate tax on subtotal + shipping
  const taxableAmount = subtotal + shipping
  const tax = taxableAmount * taxRate
  const total = subtotal + shipping + tax
  
  return {
    subtotal,
    shipping,
    tax,
    total,
    taxRate,
    taxState
  }
}

export const getTaxRateForState = (state: string): number => {
  switch (state?.toUpperCase()) {
    case 'NJ':
    case 'NEW JERSEY':
      return 0.06625
    case 'NY':
    case 'NEW YORK':
      return 0.08875
    default:
      return 0
  }
}

export const getTaxStateName = (state: string): string => {
  switch (state?.toUpperCase()) {
    case 'NJ':
    case 'NEW JERSEY':
      return 'New Jersey'
    case 'NY':
    case 'NEW YORK':
      return 'New York'
    default:
      return 'No Tax'
  }
}
