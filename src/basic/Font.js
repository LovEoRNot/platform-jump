export default class Font {
  constructor(font, textAlign, baseLine, direction) {
    this.font = font || '10px sans-serif'
    this.textAlign = textAlign || 'start'
    this.baseLine = baseLine || 'alphabetic'
    this.direction = direction || 'inherit'
  }
}