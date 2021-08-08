export function getCanvasWidthAndHeight() {
  const { innerHeight: height, innerWidth: width } = window
  return { width, height }
}

export default function getContext(selector) {
  const canvas = document.querySelector(selector)
  
  const { width, height } = getCanvasWidthAndHeight()
  canvas.width = width
  canvas.height = height
  
  const context = canvas.getContext('2d')

  return context
}