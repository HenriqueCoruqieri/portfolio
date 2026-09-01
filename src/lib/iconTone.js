const SAMPLE_SIZE = 32
const MIN_ALPHA = 32
const CHROMA_THRESHOLD = 0.15
const MAX_COLORED_RATIO = 0.1
const DARK_LUMINANCE = 0.35
const LIGHT_LUMINANCE = 0.65

const TONE_CLASSES = {
  dark: "dark:invert",
  light: "light:invert",
  colored: "",
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.crossOrigin = "anonymous"
    image.onload = () => resolve(image)
    image.onerror = () =>
      reject(new Error(`Não foi possível ler o ícone ${src}`))
    image.src = src
  })
}

function readPixels(image) {
  const canvas = document.createElement("canvas")
  canvas.width = SAMPLE_SIZE
  canvas.height = SAMPLE_SIZE

  const context = canvas.getContext("2d", { willReadFrequently: true })
  context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE)

  return context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE).data
}

function classify(pixels) {
  let opaque = 0
  let colored = 0
  let luminanceSum = 0

  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] < MIN_ALPHA) continue

    const red = pixels[i] / 255
    const green = pixels[i + 1] / 255
    const blue = pixels[i + 2] / 255
    const chroma = Math.max(red, green, blue) - Math.min(red, green, blue)

    opaque += 1
    if (chroma > CHROMA_THRESHOLD) colored += 1
    luminanceSum += 0.2126 * red + 0.7152 * green + 0.0722 * blue
  }

  if (opaque === 0) return "colored"
  if (colored / opaque > MAX_COLORED_RATIO) return "colored"

  const luminance = luminanceSum / opaque
  if (luminance < DARK_LUMINANCE) return "dark"
  if (luminance > LIGHT_LUMINANCE) return "light"

  return "colored"
}

export async function detectIconTone(src) {
  try {
    return classify(readPixels(await loadImage(src)))
  } catch (error) {
    console.error(error)
    return "colored"
  }
}

export function iconToneClass(tone) {
  return TONE_CLASSES[tone] ?? ""
}
