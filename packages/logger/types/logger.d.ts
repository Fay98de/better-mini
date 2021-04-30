import { ComponentClass } from 'react'
import { ViewProps } from '@tarojs/components/types/View'
// import LoggerComponent from '../src/components/logger'

interface LoggerLog {
  id: string
  type: 'log' | 'error'
  text: string
}

export interface LoggerProps extends ViewProps {
  visible?: boolean
  expand?: boolean
  beautify?: boolean
  max?: number
  height?: number
}

export interface LoggerState {
  expand: boolean
  currentLogId?: string
  logs: LoggerLog[]
}

interface LoggerComponent extends ComponentClass<LoggerProps, LoggerState> {
  log: (...args: any[]) => void
  error: (...args: any[]) => void
}

declare const Logger: LoggerComponent

export default Logger
