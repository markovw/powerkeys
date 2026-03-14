import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders the launcher heading', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Hyper Launcher',
      })
    ).toBeInTheDocument()
  })

  it('updates the active shortcut when a key receives focus', () => {
    render(<App />)

    fireEvent.focus(
      screen.getByRole('button', { name: 'Hyper + T does Open Telegram' })
    )

    expect(
      screen.getByRole('heading', { level: 2, name: 'Open Telegram' })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Hyper + T • Telegram')
    ).toBeInTheDocument()
  })

  it('copies the Karabiner config to the clipboard', async () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Copy config' }))

    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
    expect(vi.mocked(navigator.clipboard.writeText).mock.calls[0]?.[0]).toContain(
      '"description": "Custom Config"'
    )
    expect(
      await screen.findByText('Karabiner config copied to clipboard')
    ).toBeInTheDocument()
  })
})
