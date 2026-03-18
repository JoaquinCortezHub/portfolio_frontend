/** macOS-style dock icons — rounded superellipse shapes with gradients and detail */

const ICON_SIZE = 44

function IconBase({
  children,
  id: baseId,
  gradientStops,
}: {
  children: React.ReactNode
  id: string
  gradientStops: React.ReactNode
}) {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`bg-${baseId}`} x1="60" y1="4" x2="60" y2="116" gradientUnits="userSpaceOnUse">
          {gradientStops}
        </linearGradient>
        <linearGradient id={`shine-${baseId}`} x1="60" y1="4" x2="60" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Inner shadow for depth */}
        <filter id={`ishadow-${baseId}`}>
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="black" floodOpacity="0.3" />
        </filter>
      </defs>
      {/* Background shape */}
      <rect x="4" y="4" width="112" height="112" rx="26" fill={`url(#bg-${baseId})`} />
      {/* Edge highlight */}
      <rect x="4" y="4" width="112" height="112" rx="26" stroke="white" strokeOpacity="0.1" strokeWidth="1" fill="none" />
      {/* Top shine overlay */}
      <rect x="4" y="4" width="112" height="60" rx="26" fill={`url(#shine-${baseId})`} />
      {children}
    </svg>
  )
}

/** Terminal — dark with glowing prompt and subtle screen */
export function TerminalIcon() {
  return (
    <IconBase
      id="terminal"
      gradientStops={
        <>
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </>
      }
    >
      {/* Screen area */}
      <rect x="18" y="22" width="84" height="76" rx="6" fill="#0d0d0d" opacity="0.6" />
      {/* Chevron prompt */}
      <path
        d="M32 50 L50 64 L32 78"
        stroke="#00ff41"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#glow-term)"
      />
      {/* Cursor underscore */}
      <line x1="56" y1="78" x2="82" y2="78" stroke="#00ff41" strokeWidth="5.5" strokeLinecap="round" />
      {/* Glow filter for the green */}
      <defs>
        <filter id="glow-term" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </IconBase>
  )
}

/** Finder — classic two-tone face */
export function FinderIcon() {
  return (
    <IconBase
      id="finder"
      gradientStops={
        <>
          <stop offset="0%" stopColor="#6ec6ff" />
          <stop offset="50%" stopColor="#2196f3" />
          <stop offset="100%" stopColor="#1565c0" />
        </>
      }
    >
      {/* Face shape — tall rounded rect */}
      <rect x="32" y="24" width="56" height="76" rx="12" fill="white" opacity="0.93" />
      {/* Left half tint */}
      <path d="M32 36 C32 29.4 37.4 24 44 24 H60 V100 H44 C37.4 100 32 94.6 32 88 V36Z" fill="#c5e1f5" opacity="0.5" />
      {/* Left eye */}
      <ellipse cx="47" cy="52" rx="5.5" ry="8" fill="#1565c0" />
      {/* Left eye highlight */}
      <ellipse cx="45.5" cy="49" rx="2" ry="2.5" fill="white" opacity="0.5" />
      {/* Right eye */}
      <ellipse cx="73" cy="52" rx="5.5" ry="8" fill="#1565c0" />
      {/* Right eye highlight */}
      <ellipse cx="71.5" cy="49" rx="2" ry="2.5" fill="white" opacity="0.5" />
      {/* Nose / center divider */}
      <line x1="60" y1="46" x2="60" y2="70" stroke="#1976d2" strokeWidth="2.5" strokeLinecap="round" />
      {/* Upper lip / divider */}
      <line x1="40" y1="70" x2="80" y2="70" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      {/* Smile */}
      <path d="M42 76 Q52 86 60 86 Q68 86 78 76" stroke="#1565c0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Brow lines */}
      <path d="M39 40 Q44 36 52 38" stroke="#1976d2" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M81 40 Q76 36 68 38" stroke="#1976d2" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
    </IconBase>
  )
}

/** Figma — accurate multi-colored logo with proper proportions */
export function FigmaIcon() {
  return (
    <IconBase
      id="figma"
      gradientStops={
        <>
          <stop offset="0%" stopColor="#333333" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </>
      }
    >
      {/* Figma logo — precisely positioned 5 shapes */}
      {/* Top-left (red-orange) */}
      <path d="M47 26 H60 V48 H47 A11 11 0 0 1 47 26Z" fill="#F24E1E" />
      {/* Top-right (peach/salmon) */}
      <path d="M60 26 H73 A11 11 0 0 1 73 48 H60 V26Z" fill="#FF7262" />
      {/* Middle-left (purple) */}
      <path d="M47 48 H60 V70 H47 A11 11 0 0 1 47 48Z" fill="#A259FF" />
      {/* Middle-right (blue circle) */}
      <circle cx="71" cy="59" r="11" fill="#1ABCFE" />
      {/* Bottom-left (green) */}
      <path d="M47 70 H60 V81 A11 11 0 0 1 36 81 V81 A11 11 0 0 1 47 70Z" fill="#0ACF83" />
      {/* Subtle shadow under logo */}
      <ellipse cx="60" cy="96" rx="18" ry="3" fill="black" opacity="0.15" />
    </IconBase>
  )
}

/** Safari — detailed compass with tick marks and ring */
export function SafariIcon() {
  return (
    <IconBase
      id="safari"
      gradientStops={
        <>
          <stop offset="0%" stopColor="#6dd5fa" />
          <stop offset="50%" stopColor="#2196f3" />
          <stop offset="100%" stopColor="#0d47a1" />
        </>
      }
    >
      {/* Outer compass ring */}
      <circle cx="60" cy="60" r="36" fill="none" stroke="white" strokeWidth="2.5" opacity="0.85" />
      {/* Inner circle */}
      <circle cx="60" cy="60" r="33" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />

      {/* Major tick marks (N, E, S, W) */}
      <line x1="60" y1="22" x2="60" y2="30" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <line x1="60" y1="90" x2="60" y2="98" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <line x1="22" y1="60" x2="30" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
      <line x1="90" y1="60" x2="98" y2="60" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

      {/* Minor tick marks (NE, SE, SW, NW) */}
      <line x1="84" y1="33" x2="80" y2="37" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="84" y1="87" x2="80" y2="83" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="36" y1="33" x2="40" y2="37" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <line x1="36" y1="87" x2="40" y2="83" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

      {/* Even smaller ticks at 30° increments */}
      <line x1="73" y1="25" x2="71" y2="29" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="47" y1="25" x2="49" y2="29" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="93" y1="47" x2="89" y2="49" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="93" y1="73" x2="89" y2="71" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="27" y1="47" x2="31" y2="49" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="27" y1="73" x2="31" y2="71" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="73" y1="95" x2="71" y2="91" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="47" y1="95" x2="49" y2="91" stroke="white" strokeWidth="1" opacity="0.35" />

      {/* Compass needle — red half (north) */}
      <polygon points="60,28 66,56 60,62 54,56" fill="#ff3b30" />
      {/* Compass needle — white half (south) */}
      <polygon points="60,92 54,64 60,58 66,64" fill="white" opacity="0.9" />

      {/* Shadow under needle */}
      <polygon points="60,28 66,56 60,62 54,56" fill="black" opacity="0.1" transform="translate(1,1)" />

      {/* Center dot */}
      <circle cx="60" cy="60" r="3" fill="white" />
      <circle cx="60" cy="60" r="1.5" fill="#ff3b30" />
    </IconBase>
  )
}

/** Notes — detailed notepad with folded corner and handwriting-style text */
export function NotesIcon() {
  return (
    <IconBase
      id="notes"
      gradientStops={
        <>
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="100%" stopColor="#f9a825" />
        </>
      }
    >
      {/* Paper shadow */}
      <rect x="26" y="27" width="68" height="72" rx="5" fill="black" opacity="0.1" />
      {/* Paper */}
      <rect x="24" y="25" width="68" height="72" rx="5" fill="#fffde7" />
      {/* Folded corner */}
      <path d="M78 25 L92 25 L92 39 Z" fill="#f5f5dc" />
      <path d="M78 25 L78 39 L92 39 Z" fill="#e8e0c0" />
      <path d="M78 25 L92 39" stroke="#d4c89a" strokeWidth="0.5" />

      {/* Red margin line */}
      <line x1="38" y1="25" x2="38" y2="97" stroke="#ef9a9a" strokeWidth="1" opacity="0.6" />

      {/* Ruled lines */}
      <line x1="28" y1="42" x2="88" y2="42" stroke="#c8c0a8" strokeWidth="0.8" />
      <line x1="28" y1="52" x2="88" y2="52" stroke="#c8c0a8" strokeWidth="0.8" />
      <line x1="28" y1="62" x2="88" y2="62" stroke="#c8c0a8" strokeWidth="0.8" />
      <line x1="28" y1="72" x2="88" y2="72" stroke="#c8c0a8" strokeWidth="0.8" />
      <line x1="28" y1="82" x2="88" y2="82" stroke="#c8c0a8" strokeWidth="0.8" />

      {/* Handwriting-style scribbles */}
      <path d="M42 40 Q50 38 58 40 Q66 42 74 40" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42 50 Q54 48 66 50" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42 60 Q56 58 70 60 Q78 62 84 60" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M42 70 Q50 68 58 70" stroke="#555" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </IconBase>
  )
}

/** Mail — detailed envelope with gradient flap and shadow */
export function MailIcon() {
  return (
    <IconBase
      id="mail"
      gradientStops={
        <>
          <stop offset="0%" stopColor="#64b5f6" />
          <stop offset="100%" stopColor="#1565c0" />
        </>
      }
    >
      {/* Envelope shadow */}
      <rect x="22" y="42" width="76" height="48" rx="6" fill="black" opacity="0.15" transform="translate(1,2)" />
      {/* Envelope body */}
      <rect x="22" y="40" width="76" height="48" rx="6" fill="white" opacity="0.95" />
      {/* Bottom fold lines */}
      <line x1="22" y1="82" x2="50" y2="64" stroke="#bbdefb" strokeWidth="1" opacity="0.5" />
      <line x1="98" y1="82" x2="70" y2="64" stroke="#bbdefb" strokeWidth="1" opacity="0.5" />
      {/* Flap */}
      <path d="M22 46 L60 70 L98 46" fill="none" stroke="#1565c0" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Flap fill — top triangle */}
      <path d="M23 40 L60 62 L97 40 Z" fill="#e3f2fd" opacity="0.5" />
      {/* Subtle horizontal lines (letter content preview) */}
      <line x1="34" y1="72" x2="66" y2="72" stroke="#bbdefb" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="34" y1="78" x2="56" y2="78" stroke="#bbdefb" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    </IconBase>
  )
}

/** Spotify — tilted arcs matching brand style */
export function SpotifyIcon() {
  return (
    <IconBase
      id="spotify"
      gradientStops={
        <>
          <stop offset="0%" stopColor="#1ed760" />
          <stop offset="100%" stopColor="#1db954" />
        </>
      }
    >
      {/* Black inner circle (Spotify's actual shape) */}
      <circle cx="60" cy="60" r="34" fill="#191414" opacity="0.25" />

      {/* Three arcs — slightly tilted like real Spotify logo */}
      <g transform="rotate(-8, 60, 60)">
        {/* Top arc (largest) */}
        <path
          d="M34 48 Q60 36 86 48"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Middle arc */}
        <path
          d="M38 62 Q60 52 82 62"
          stroke="white"
          strokeWidth="5.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Bottom arc (smallest) */}
        <path
          d="M44 75 Q60 67 76 75"
          stroke="white"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </IconBase>
  )
}
