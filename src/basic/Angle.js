export default class Angle {
  constructor(angle) {
    this.angle = angle
  }

  getRadians() {
    const radix = this.angle / 180

    return radix * Math.PI
  }

  getAngle() {
    return this.angle
  }
}