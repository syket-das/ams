'use client'
import { IconType } from 'react-icons'
import { LuMoon, LuSun, LuMonitor } from 'react-icons/lu'

import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  const nextTheme: any = {
    light: 'dark',
    dark: 'system',
    system: 'light'
  }

  const ThemeIcon = {
    undefined: LuSun,
    light: LuSun,
    dark: LuMoon,
    system: LuMonitor
  }[theme!] as IconType

  useEffect(() => {
    if (theme === 'system') {
      setTheme('light')
    }
  }, [theme])

  return (
    <Button
      variant='ghost'
      className='rounded-full'
      size='icon'
      suppressHydrationWarning
      onClick={() => {
        const newTheme = nextTheme[theme as string]

        setTheme(newTheme)
      }}
    >
      <ThemeIcon className='text-xl' suppressHydrationWarning />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
