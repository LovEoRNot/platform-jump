import Point from "../basic/Point";
import { getCanvasWidthAndHeight } from "../getContext";
import Pencil from "./Pencil";
import { horizontalCollide, verticalCollide, innerHorizontalCollide, innerVerticalCollide } from '../utils/collide'

const deceleration = 0.4; // 减速度

export const LEFT = 1
export const RIGHT = -1
export const TOP = 2
export const BOTTOM = -2

// const gravity = 0.6

export default class Sprite {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Point} point
   * @param {number} speed
   * @param {number} acceleration 加速度
   */
  constructor(context, point, speed, acceleration, maxSpeed) {
    this.context = context;
    this.pencil = new Pencil(context);
    this.point = point;
    this.originalSpeed = speed;
    this.speed = speed || 0; // 移动速度，单位像素
    this.accel = acceleration || 0;
    this.isMoving = false;
    this.maxSpeed = maxSpeed || Infinity

    this.direction = TOP

    this.isStop = false
  }

  // 粗略的获取当前的位置信息
  getPosition() {
    return { top: 0, right: 0, bottom: 0, left: 0 }
  }
  collide() { }
  draw() { }
  update() { }

  /**
   * 碰撞检测
   * @param {Sprite} sprite
   */
  isCollided(sprite, isInnerCollide) {
    const currentPosition = this.getPosition()
    const otherPosition = sprite.getPosition()

    if (isInnerCollide) {
      return innerHorizontalCollide(currentPosition, otherPosition) || innerVerticalCollide(currentPosition, otherPosition)
    }

    return verticalCollide(currentPosition, otherPosition) || horizontalCollide(currentPosition, otherPosition)
  }

  stop() {
    this.speed = 0
    this.isStop = true
  }

  start() {
    this.isStop = false
  }

  /**
   * 移动
   * @param {number} accel 加速度
   * @returns bool
   */
  __basicMove(accel) {
    if (this.isStop) return false

    this.speed += accel
    if (this.speed >= this.maxSpeed) {
      this.speed = this.maxSpeed
    } else if (this.speed <= -this.maxSpeed) {
      this.speed = -this.maxSpeed
    }

    if ([TOP, BOTTOM].includes(this.direction)) {
      // 位置移动，因为y轴坐标从上到下递增，所以此处坐标也要反着来
      this.point.y -= this.speed;
    } else if ([LEFT, RIGHT].includes(this.direction)) {
      this.point.x += this.speed;
    }

    return true;
  }

  positiveMove(isAccel) {
    if (this.speed <= 0) {
      if (!isAccel) {
        this.speed = 0
        return false
      }
      this.speed = -this.speed
    }
    let accel = 0
    if (this.accel) {
      accel = isAccel ? this.accel : -deceleration
    }

    return this.__basicMove(accel);
  }

  negativeMove(isAccel) {
    if (this.speed >= 0) {
      if (!isAccel) {
        this.speed = 0
        return false
      }
      this.speed = -this.speed
    }
    
    let accel = 0
    if (this.accel) {
      accel = isAccel ? -this.accel : deceleration
    }

    return this.__basicMove(accel);
  }

  // 上移
  moveUp(isAccel) {
    this.direction = TOP
    return this.positiveMove(isAccel);
  }

  // 下移
  moveDown(isAccel) {
    this.direction = BOTTOM
    return this.negativeMove(isAccel)
  }

  // 左移
  moveLeft(isAccel) {
    this.direction = LEFT
    return this.negativeMove(isAccel)
  }

  // 右移
  moveRight(isAccel) {
    this.direction = RIGHT
    return this.positiveMove(isAccel);
  }
}
