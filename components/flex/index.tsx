import { ReactNode } from 'react'

interface FlexProps {
  children: ReactNode
  className?: string
}

export function Flex({ children, className = '' }: FlexProps) {
  return <div className={`flex ${className}`}>{children}</div>
}
