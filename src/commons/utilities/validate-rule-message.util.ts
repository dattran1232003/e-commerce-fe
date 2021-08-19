// react-hook-form rule
export type RHFRule = {
  value: string | number
  message: string
}
const createMessage = (value: string | number, message: string) => ({
  value,
  message,
})

const minLength = (value: number, fieldName: string): RHFRule =>
  createMessage(value, `${fieldName} must be more than 6 characters`)

export const message = {
  /** This function create message for minLength rule */
  minLength,
}

message.minLength
