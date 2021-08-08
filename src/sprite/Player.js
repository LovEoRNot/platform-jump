import Sprite from "./Sprite";
import Point from "../basic/Point";
import Pencil from "./Pencil";
import Angle from "../basic/Angle";

export default class Player extends Sprite {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Point} point
   * @param {number} speed
   * @param {number} accel
   */
  constructor(context, point, speed, accel) {
    super(context, point, speed, accel)

    window.addEventListener('keydown', (e) => this.onPlayerMove(e, true))
    window.addEventListener('keyup', (e) => this.onPlayerMove(e, false))

    this.currenKeyCode = ''
    this.radius = 20
    this.color = 'red'
    this.isAccel = true
  }

  getPosition() {
    return {
      top: this.point.y - this.radius,
      right: this.point.x + this.radius,
      bottom: this.point.y + this.radius,
      left: this.point.x - this.radius
    }
  }

  draw() {
    this.update()
    this.pencil.arc(this.point, this.radius, new Angle(0), new Angle(360), this.color)
  }

  update() {
    switch (this.currenKeyCode) {
      case 37:
        this.moveLeft(this.isAccel)
        break;
      case 39:
        this.moveRight(this.isAccel)
        break;
      case 40:
        this.moveDown(this.isAccel)
        break
      case 38:
      case 32:
        this.moveUp(this.isAccel)
        // 如果上抛速度将为0的话，则开始降落
        // if (!this.speed) {
        //   this.currenKeyCode = 40
        //   this.accel = true
        // }
        break
    }
  }

  onPlayerMove(event, isAccel) {
    const keyCode = event.keyCode || event.which

    this.currenKeyCode = keyCode
    this.isAccel = isAccel
  }

}