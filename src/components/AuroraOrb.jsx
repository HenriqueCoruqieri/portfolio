const LABELS = [
  { text: "React",      style: { left: "72%", top: "18%", "--tx": "6px",   "--ty": "-8px",  animationDuration: "5s"   } },
  { text: "Node.js",    style: { left: "78%", top: "55%", "--tx": "-8px",  "--ty": "10px",  animationDuration: "6.5s" } },
  { text: "TypeScript", style: { left: "8%",  top: "28%", "--tx": "10px",  "--ty": "-6px",  animationDuration: "4.5s" } },
  { text: "MongoDB",    style: { left: "12%", top: "65%", "--tx": "-6px",  "--ty": "8px",   animationDuration: "7s"   } },
  { text: "Tailwind",   style: { left: "52%", top: "82%", "--tx": "8px",   "--ty": "-10px", animationDuration: "5.5s" } },
  { text: "Next.js",    style: { left: "28%", top: "12%", "--tx": "-10px", "--ty": "6px",   animationDuration: "6s"   } },
  { text: "Express",    style: { left: "62%", top: "70%", "--tx": "6px",   "--ty": "8px",   animationDuration: "4s"   } },
]

function AuroraOrb() {
  return (
    <div className="aurora-stage">
      <div className="aurora-halo" />

      <div className="aurora-wrap">
        <div className="aurora-layer aurora-layer--blue" />
        <div className="aurora-layer aurora-layer--purple" />
        <div className="aurora-layer aurora-layer--cyan" />
      </div>

      {LABELS.map(({ text, style }) => (
        <span key={text} className="aurora-label" style={style}>
          {text}
        </span>
      ))}
    </div>
  )
}

export default AuroraOrb
