export interface ErrorHttpDefinition {
  [x: string]: any
  message: string
  statusCode: number
  status: string
  name?: string
  value?: string
}
