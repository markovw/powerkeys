import { useState, type CSSProperties } from 'react'

type Binding = {
  keyId: string
  legend: string
  app?: string
  combo: string
  title: string
  detail: string
  accent: string
}

type KeySpec = {
  id: string
  legend: string
  width?: number
  rowType: 'fn' | 'main' | 'bottom'
}

type PositionedKey = KeySpec & {
  x: number
  y: number
  widthUnits: number
  heightUnits: number
}

const config = {
  description: 'Custom Config',
  manipulators: [
    {
      from: {
        key_code: 'caps_lock',
        modifiers: { optional: ['any'] },
      },
      parameters: {
        basic: {
          to_delayed_action_delay_milliseconds: 0,
          to_if_alone_timeout_milliseconds: 120,
        },
      },
      to: [
        {
          key_code: 'left_shift',
          lazy: true,
          modifiers: ['left_command', 'left_control', 'left_option'],
        },
      ],
      to_if_alone: [
        {
          key_code: 'spacebar',
          modifiers: ['left_control', 'left_option'],
        },
      ],
      type: 'basic',
    },
    {
      from: {
        key_code: 'tab',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'tab', modifiers: ['left_control'] }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'k',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'page_up' }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'j',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'page_down' }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'h',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'left_arrow' }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'l',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'right_arrow' }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'a',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'a', modifiers: ['left_command'] }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'c',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'c', modifiers: ['left_command'] }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'v',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'v', modifiers: ['left_command'] }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'w',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [{ key_code: 'w', modifiers: ['left_command'] }],
      type: 'basic',
    },
    {
      from: {
        key_code: 'return_or_enter',
        modifiers: {
          mandatory: [
            'left_shift',
            'left_command',
            'left_control',
            'left_option',
          ],
          optional: ['any'],
        },
      },
      to: [
        {
          key_code: 'return_or_enter',
          modifiers: ['left_option', 'left_command'],
        },
      ],
      type: 'basic',
    },
  ],
}

const configText = `${JSON.stringify(config, null, 2)}\n`

const bindings: Binding[] = [
  {
    keyId: 'caps',
    legend: 'Caps',
    combo: 'Caps Lock',
    title: 'Hyper key',
    detail: 'Hold for Hyper. Tap alone for Ctrl + Option + Space.',
    accent: 'var(--c-hyper)',
  },
  {
    keyId: '2',
    legend: '2',
    app: 'cmux',
    combo: 'Hyper + 2',
    title: 'Open cmux',
    detail: 'Launches your terminal workspace.',
    accent: 'var(--c-active)',
  },
  {
    keyId: '3',
    legend: '3',
    app: 'Cursor',
    combo: 'Hyper + 3',
    title: 'Open Cursor',
    detail: 'Jumps straight into your coding editor.',
    accent: 'var(--c-active)',
  },
  {
    keyId: '9',
    legend: '9',
    app: 'TickTick',
    combo: 'Hyper + 9',
    title: 'Open TickTick',
    detail: 'Shows your tasks and next actions.',
    accent: 'var(--c-active)',
  },
  {
    keyId: '0',
    legend: '0',
    app: 'Obsidian',
    combo: 'Hyper + 0',
    title: 'Open Obsidian',
    detail: 'Brings up your notes and vault.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'tab',
    legend: 'Tab',
    combo: 'Hyper + Tab',
    title: 'Ctrl + Tab',
    detail: 'Cycles tabs with a lighter reach.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'w',
    legend: 'W',
    combo: 'Hyper + W',
    title: 'Cmd + W',
    detail: 'Closes the current tab or window.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 't',
    legend: 'T',
    app: 'Telegram',
    combo: 'Hyper + T',
    title: 'Open Telegram',
    detail: 'Brings your messages forward instantly.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'a',
    legend: 'A',
    combo: 'Hyper + A',
    title: 'Cmd + A',
    detail: 'Selects everything in the current context.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'h',
    legend: 'H',
    combo: 'Hyper + H',
    title: 'Left Arrow',
    detail: 'Moves left without leaving the home row.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'j',
    legend: 'J',
    combo: 'Hyper + J',
    title: 'Page Down',
    detail: 'Scrolls down a page at a time.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'k',
    legend: 'K',
    combo: 'Hyper + K',
    title: 'Page Up',
    detail: 'Scrolls up a page at a time.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'l',
    legend: 'L',
    combo: 'Hyper + L',
    title: 'Right Arrow',
    detail: 'Moves right without leaving the home row.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'enter',
    legend: 'Enter',
    combo: 'Hyper + Enter',
    title: 'Fill Window',
    detail: 'Fills or maximizes the current window.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'c',
    legend: 'C',
    combo: 'Hyper + C',
    title: 'Cmd + C',
    detail: 'Copies with the same Hyper layer.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'v',
    legend: 'V',
    combo: 'Hyper + V',
    title: 'Cmd + V',
    detail: 'Pastes without moving your hand position.',
    accent: 'var(--c-active)',
  },
  {
    keyId: 'b',
    legend: 'B',
    app: 'Zen',
    combo: 'Hyper + B',
    title: 'Open Zen',
    detail: 'Opens your focused browser.',
    accent: 'var(--c-active)',
  },
]

const keyRows: KeySpec[][] = [
  [
    { id: 'esc', legend: 'Esc', rowType: 'fn' },
    { id: 'f1', legend: 'F1', rowType: 'fn' },
    { id: 'f2', legend: 'F2', rowType: 'fn' },
    { id: 'f3', legend: 'F3', rowType: 'fn' },
    { id: 'f4', legend: 'F4', rowType: 'fn' },
    { id: 'f5', legend: 'F5', rowType: 'fn' },
    { id: 'f6', legend: 'F6', rowType: 'fn' },
    { id: 'f7', legend: 'F7', rowType: 'fn' },
    { id: 'f8', legend: 'F8', rowType: 'fn' },
    { id: 'f9', legend: 'F9', rowType: 'fn' },
    { id: 'f10', legend: 'F10', rowType: 'fn' },
    { id: 'f11', legend: 'F11', rowType: 'fn' },
    { id: 'f12', legend: 'F12', rowType: 'fn' },
    { id: 'deleteTop', legend: 'Del', width: 1.1, rowType: 'fn' },
  ],
  [
    { id: 'grave', legend: '`', rowType: 'main' },
    { id: '1', legend: '1', rowType: 'main' },
    { id: '2', legend: '2', rowType: 'main' },
    { id: '3', legend: '3', rowType: 'main' },
    { id: '4', legend: '4', rowType: 'main' },
    { id: '5', legend: '5', rowType: 'main' },
    { id: '6', legend: '6', rowType: 'main' },
    { id: '7', legend: '7', rowType: 'main' },
    { id: '8', legend: '8', rowType: 'main' },
    { id: '9', legend: '9', rowType: 'main' },
    { id: '0', legend: '0', rowType: 'main' },
    { id: 'hyphen', legend: '-', rowType: 'main' },
    { id: 'equal', legend: '=', rowType: 'main' },
    { id: 'backspace', legend: 'Backspace', width: 1.75, rowType: 'main' },
  ],
  [
    { id: 'tab', legend: 'Tab', width: 1.55, rowType: 'main' },
    { id: 'q', legend: 'Q', rowType: 'main' },
    { id: 'w', legend: 'W', rowType: 'main' },
    { id: 'e', legend: 'E', rowType: 'main' },
    { id: 'r', legend: 'R', rowType: 'main' },
    { id: 't', legend: 'T', rowType: 'main' },
    { id: 'y', legend: 'Y', rowType: 'main' },
    { id: 'u', legend: 'U', rowType: 'main' },
    { id: 'i', legend: 'I', rowType: 'main' },
    { id: 'o', legend: 'O', rowType: 'main' },
    { id: 'p', legend: 'P', rowType: 'main' },
    { id: 'leftBracket', legend: '[', rowType: 'main' },
    { id: 'rightBracket', legend: ']', rowType: 'main' },
    { id: 'backslash', legend: '\\', width: 1.45, rowType: 'main' },
  ],
  [
    { id: 'caps', legend: 'Caps', width: 1.95, rowType: 'main' },
    { id: 'a', legend: 'A', rowType: 'main' },
    { id: 's', legend: 'S', rowType: 'main' },
    { id: 'd', legend: 'D', rowType: 'main' },
    { id: 'f', legend: 'F', rowType: 'main' },
    { id: 'g', legend: 'G', rowType: 'main' },
    { id: 'h', legend: 'H', rowType: 'main' },
    { id: 'j', legend: 'J', rowType: 'main' },
    { id: 'k', legend: 'K', rowType: 'main' },
    { id: 'l', legend: 'L', rowType: 'main' },
    { id: 'semicolon', legend: ';', rowType: 'main' },
    { id: 'quote', legend: "'", rowType: 'main' },
    { id: 'enter', legend: 'Enter', width: 2.05, rowType: 'main' },
  ],
  [
    { id: 'shiftLeft', legend: 'Shift', width: 2.2, rowType: 'main' },
    { id: 'z', legend: 'Z', rowType: 'main' },
    { id: 'x', legend: 'X', rowType: 'main' },
    { id: 'c', legend: 'C', rowType: 'main' },
    { id: 'v', legend: 'V', rowType: 'main' },
    { id: 'b', legend: 'B', rowType: 'main' },
    { id: 'n', legend: 'N', rowType: 'main' },
    { id: 'm', legend: 'M', rowType: 'main' },
    { id: 'comma', legend: ',', rowType: 'main' },
    { id: 'period', legend: '.', rowType: 'main' },
    { id: 'slash', legend: '/', rowType: 'main' },
    { id: 'shiftRight', legend: 'Shift', width: 2.25, rowType: 'main' },
  ],
  [
    { id: 'fn', legend: 'fn', width: 1.2, rowType: 'bottom' },
    { id: 'control', legend: 'ctrl', width: 1.2, rowType: 'bottom' },
    { id: 'optionLeft', legend: 'opt', width: 1.2, rowType: 'bottom' },
    { id: 'commandLeft', legend: 'cmd', width: 1.35, rowType: 'bottom' },
    { id: 'space', legend: '', width: 5.45, rowType: 'bottom' },
    { id: 'commandRight', legend: 'cmd', width: 1.35, rowType: 'bottom' },
    { id: 'optionRight', legend: 'opt', width: 1.2, rowType: 'bottom' },
  ],
]

function positionKeyboard(rows: KeySpec[][]) {
  const layoutRows = [
    { offset: 0.48, gap: 0.16, height: 0.72, y: 0 },
    { offset: 0, gap: 0.18, height: 1, y: 1.2 },
    { offset: 0.46, gap: 0.18, height: 1, y: 2.38 },
    { offset: 0.68, gap: 0.18, height: 1, y: 3.56 },
    { offset: 1.04, gap: 0.18, height: 1, y: 4.74 },
    { offset: 0.1, gap: 0.24, height: 1.08, y: 6.08 },
  ]

  const positioned: PositionedKey[] = []
  let width = 0

  rows.forEach((row, rowIndex) => {
    const meta = layoutRows[rowIndex]
    let x = meta.offset

    row.forEach((key) => {
      const keyWidth = key.width ?? 1
      positioned.push({
        ...key,
        x,
        y: meta.y,
        widthUnits: keyWidth,
        heightUnits: meta.height,
      })
      x += keyWidth + meta.gap
    })

    width = Math.max(width, x - meta.gap + meta.offset)
  })

  return {
    width,
    height: 7.16,
    keys: positioned,
  }
}

const keyboardLayout = positionKeyboard(keyRows)
const bindingMap = new Map(bindings.map((binding) => [binding.keyId, binding]))

export default function App() {
  const [activeKeyId, setActiveKeyId] = useState(bindings[0].keyId)
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [showHelp, setShowHelp] = useState(false)

  const activeBinding =
    bindings.find((binding) => binding.keyId === activeKeyId) ?? bindings[0]

  const handleCopyConfig = async () => {
    try {
      await navigator.clipboard.writeText(configText)
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  const copyLabel =
    copyState === 'copied'
      ? 'Copied'
      : copyState === 'failed'
        ? 'Copy failed'
        : 'Copy config'

  return (
    <main className="page">
      <div className="gridPattern" aria-hidden="true" />
      <div className="window">
        <header className="titlebar">
          <div className="windowDots" aria-hidden="true">
            <span className="dot dot--close" />
            <span className="dot dot--min" />
            <span className="dot dot--max" />
          </div>

          <div className="titlebarInfo">
            <span className="titlebarEyebrow">Karabiner Layer</span>
            <h1 className="titlebarHeading">Hyper Launcher</h1>
          </div>

          <div className="titlebarActions">
            <div className="titlebarActionsRow">
              <button
                type="button"
                className="helpButton"
                onClick={() => setShowHelp(true)}
                aria-label="Setup instructions"
              >
                ?
              </button>
              <button type="button" className="copyButton" onClick={handleCopyConfig}>
                {copyLabel}
              </button>
            </div>
            <p className="copyHint" aria-live="polite">
              {copyState === 'idle'
                ? 'Copy Karabiner JSON config'
                : copyState === 'copied'
                  ? 'Karabiner config copied to clipboard'
                  : 'Clipboard permission was not available'}
            </p>
          </div>
        </header>

        <section className="keyboardDeck" aria-label="Keyboard layout">
          <div className="keyboardStage">
            {keyboardLayout.keys.map((key) => {
              const binding = bindingMap.get(key.id)
              const classes = [
                'keycap',
                `keycap--${key.rowType}`,
                binding ? 'keycap--active' : 'keycap--muted',
                key.id === 'caps' ? 'keycap--hyper' : '',
                activeKeyId === key.id ? 'keycap--selected' : '',
              ]
                .filter(Boolean)
                .join(' ')

              const style = {
                left: `${(key.x / keyboardLayout.width) * 100}%`,
                top: `${(key.y / keyboardLayout.height) * 100}%`,
                width: `${(key.widthUnits / keyboardLayout.width) * 100}%`,
                height: `${(key.heightUnits / keyboardLayout.height) * 100}%`,
              } as CSSProperties

              if (!binding) {
                return (
                  <div key={key.id} className={classes} style={style} aria-hidden="true">
                    <span className="keyLegend">{key.legend}</span>
                  </div>
                )
              }

              return (
                <button
                  key={key.id}
                  type="button"
                  className={classes}
                  style={style}
                  onMouseEnter={() => setActiveKeyId(key.id)}
                  onFocus={() => setActiveKeyId(key.id)}
                  aria-label={`${binding.combo} does ${binding.title}`}
                >
                  <span className="keyLegend">{key.legend}</span>
                  {binding.app ? <span className="keyApp">{binding.app}</span> : null}
                  <span className="tooltip" role="tooltip">
                    <strong>{binding.title}</strong>
                    <span>{binding.detail}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="infoStrip">
            <div className="infoCombo">
              <span className="infoKbd">Caps Lock</span>
              <span className="infoPlus">+</span>
              <span className="infoKbd">{activeBinding.legend}</span>
            </div>
            <div className="infoContent">
              <h2 className="infoTitle">{activeBinding.title}</h2>
              <p className="infoDetail">{activeBinding.detail}</p>
              <p className="infoMeta">
                {activeBinding.combo}
                {activeBinding.app ? ` • ${activeBinding.app}` : ''}
              </p>
            </div>
          </div>
        </section>
      </div>

      {showHelp && (
        <div className="helpOverlay" onClick={() => setShowHelp(false)} role="dialog" aria-modal="true" aria-label="Setup instructions">
          <div className="helpModal" onClick={(e) => e.stopPropagation()}>
            <div className="helpHeader">
              <h2 className="helpTitle">Setup</h2>
              <button type="button" className="helpClose" onClick={() => setShowHelp(false)} aria-label="Close">✕</button>
            </div>
            <ol className="helpSteps">
              <li className="helpStep">
                <span className="helpStepNum">1</span>
                <div>
                  <p className="helpStepTitle">Install the apps</p>
                  <code className="helpCode">brew install --cask karabiner-elements</code>
                  <code className="helpCode">brew install --cask raycast</code>
                </div>
              </li>
              <li className="helpStep">
                <span className="helpStepNum">2</span>
                <div>
                  <p className="helpStepTitle">Paste config into Karabiner</p>
                  <p className="helpStepDesc">Copy the JSON config above, then open Karabiner-Elements → Complex Modifications → Add rule → paste it in.</p>
                </div>
              </li>
              <li className="helpStep">
                <span className="helpStepNum">3</span>
                <div>
                  <p className="helpStepTitle">Set up Hyper key shortcuts in Raycast</p>
                  <p className="helpStepDesc">In Raycast settings, bind each shortcut using Hyper (⌃⌥⇧⌘) + the key shown in the config.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      )}
    </main>
  )
}
