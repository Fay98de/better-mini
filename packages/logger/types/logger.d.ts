import { ComponentClass } from 'react'
import { ViewProps } from '@tarojs/components/types/View'

interface LoggerLog {
  id: string
  type: 'log' | 'error'
  text: string
}

export interface LoggerProps extends ViewProps {
  visible?: boolean
  beautify?: boolean
  max?: number
}

export interface LoggerState {
  show: boolean
  currentLogId?: string
  logs: LoggerLog[]
}

declare const Logger: ComponentClass<LoggerProps, LoggerState>

export default Logger
