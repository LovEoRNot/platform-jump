import Sprite, { RIGHT, BOTTOM, LEFT, TOP } from "./Sprite";
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

  /**
   * @param {Sprite} sprite 
   */
  collide(sprite, isInnerCollide) {
    const { top, left, right, bottom } = sprite.getPosition()
    const gap = this.radius + 1
    switch(this.direction) {
      case TOP:
        this.point.y = (isInnerCollide ? top : bottom) + gap
        break;
      case RIGHT:
        this.point.x = (isInnerCollide ? right : left) - gap
        break;
      case BOTTOM:
        this.point.y = (isInnerCollide ? bottom : top) - gap
        break;
      case LEFT:
        this.point.x = (isInnerCollide ? left : right) + gap
    }

    this.speed = 0
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
        break
    }
  }

  onPlayerMove(event, isAccel) {
    const keyCode = event.keyCode || event.which

    this.currenKeyCode = keyCode
    this.isAccel = isAccel
  }

}