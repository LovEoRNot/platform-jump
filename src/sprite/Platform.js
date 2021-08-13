import Pencil from "./Pencil";
import Sprite, { RIGHT } from "./Sprite";

export default class Platform extends Sprite {
  constructor(context, point, width, height, color, speed) {
    super(context, point, speed, 0)
    this.width = width
    this.height = height
    this.color = color
    this.direction = RIGHT
  }

  getPosition() {
    return {
      top: this.point.y,
      right: this.point.x + this.width,
      bottom: this.point.y + this.height,
      left: this.point.x
    }
  }

  collide() {
    this.direction = -this.direction
  }

  draw() {
    this.update()
    this.pencil.rect(this.point, this.width, this.height, this.color)
  }

  update() {
    if (this.direction === RIGHT) {
      const isMoving = this.moveRight(true)
      if (!isMoving) this.direction = -RIGHT
    } else {
      const isMoving = this.moveLeft(true)
      if (!isMoving) this.moveDirection = RIGHT
    }
  }
}
