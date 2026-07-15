import { describe, expect, it } from 'vitest'
import config from '../tailwind.config'

describe('homepage foundation configuration', () => {
  it('defines approved color tokens', () => {
    const colors = config.theme?.extend?.colors as Record<string, any>

    expect(colors.brand).toMatchObject({
      DEFAULT: '#4647AE',
      dark: '#3536A1',
      light: '#6B6CC4',
      tint: '#EFEEFB',
    })
    expect(colors.surface).toMatchObject({ DEFAULT: '#FFFFFF', bg: '#E8EDF2' })
    expect(colors.ink).toMatchObject({
      DEFAULT: '#1E1E1E',
      secondary: '#30454C',
      muted: '#6B7280',
    })
    expect(colors.dark).toMatchObject({
      DEFAULT: '#1E1B4B',
      surface: '#2D2A6E',
      text: '#C7D2FE',
    })
    expect(colors.border).toBe('#E2E8F0')
  })
})
