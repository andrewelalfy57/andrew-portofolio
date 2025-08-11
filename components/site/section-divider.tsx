"use client"

type Props = {
  position?: "top" | "bottom"
}
export function SectionDivider({ position = "bottom" }: Props) {
  return (
    <div aria-hidden="true" className="relative z-0">
      <svg
        className={position === "top" ? "rotate-180 block w-full" : "block w-full"}
        viewBox="0 0 1440 120"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <path
          d="M0,64 C240,128 480,0 720,32 C960,64 1200,128 1440,64 L1440,120 L0,120 Z"
          fill="url(#grad)"
          fillOpacity="0.15"
        />
      </svg>
    </div>
  )
}
