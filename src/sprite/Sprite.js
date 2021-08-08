import Point from "../basic/Point";
import { getCanvasWidthAndHeight } from "../getContext";
import Pencil from "./Pencil";

const deceleration = 0.4; // 减速度
const gravity = 0.6

// 判断给定的两个坐标点是否相互覆盖
function isCover(pos1, pos2, _pos1, _pos2) {
  return (pos1 >= _pos1 && pos2 <= _pos2) || (_pos1 >= pos1 && _pos1 <= pos2)
}

// 垂直方向碰撞
function verticalCollide(position1, position2) {
  const { top, right, left, bottom } = position1
  const { top: _top, right: _right, left: _left, bottom: _bottom } = position2

  return ((top <= _bottom && top >= _top) || (bottom >= _top && bottom <= _bottom)) && isCover(left, right, _left, _right)
}

// 水平方向碰撞
function horizontalCollide(position1, position2) {
  const { top, right, left, bottom } = position1
  const { top: _top, right: _right, left: _left, bottom: _bottom } = position2

  return ((right >= _left && left <= _left) || (left <= _right && right >= _right)) && isCover(top, bottom, _top, _bottom)
}

export default class Sprite {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Point} point
   * @param {number} speed
   * @param {number} acceleration 加速度
   */
  constructor(context, point, speed, acceleration) {
    this.context = context;
    this.pencil = new Pencil(context);
    this.point = point;
    this.originalSpeed = speed;
    this.speed = speed || 0; // 移动速度，单位像素
    this.accel = acceleration || 0;
    this.isMoving = false;

    this.isInnerCollide = false

    this.isStop = false
  }

  // 粗略的获取当前的位置信息
  getPosition() {
    return { top: 0, right: 0, bottom: 0, left: 0 }
  }

  /**
   * 碰撞检测
   * @param {Sprite} sprite
   */
  isCollided(sprite) {
    const currentPosition = this.getPosition()
    const otherPosition = sprite.getPosition()
    // if (this.isInnerCollide) {
    //   return !(top >= _top && left >= _left && right <= _right && bottom <= _bottom)
    // }
    return verticalCollide(currentPosition, otherPosition) || horizontalCollide(currentPosition, otherPosition)
  }

  stop() {
    this.speed = 0
    this.isStop = true
  }

  start() {
    this.isStop = false
  }

  draw() {}

  update() {}

    /**
   * 垂直方向移动
   * @param {bool} isAccel 是否是加速
   * @param {*} direction 方向，向上或向下， 1为上，0为下
   * @returns bool
   */
  __verticalMove(isAccel, direction) {
    if (this.isStop) return false


    if (isAccel) {
      this.speed += this.accel;
    } else {
      this.speed -= gravity;
    }

    if (this.speed <= 0) {
      this.speed = 0;
    }
    if (direction === 1) {
      this.point.y -= this.speed;
    } else {
      this.point.y += this.speed;
    }

    return true
  }

  /**
   * 水平方向移动
   * @param {bool} isAccel 是否是加速
   * @param {*} direction 方向，向左或向右
   * @returns bool
   */
   __horizontalMove(isAccel, direction) {
    if (this.isStop) return false

    // 加速时直接加上加速度否则减去
    if (isAccel) {
      this.speed += this.accel;
    } else {
      this.speed -= deceleration;
    }

    // 速度小于0时重置为0
    if (this.speed <= 0) {
      this.speed = 0;
    }
    if (direction === 1) {
      this.point.x += this.speed;
    } else {
      this.point.x -= this.speed;
    }
    return true;
  }

  // 上移
  moveUp(isAccel) {
    if (this.point.y <= 0) {
      this.point.y = 0;
      if (this.accel) {
        this.speed = 0;
      }
      return false;
    }

    return this.__verticalMove(isAccel, 1);
  }

  // 下移
  moveDown(isAccel) {
    const canvasHeight = getCanvasWidthAndHeight().height;

    // 判断当前节点是否出界了，如果出界的则把当前位置重置到边界上，如果物体有加速度的话，速度直接清0
    if (this.point.y >= canvasHeight) {
      this.point.y = canvasHeight;
      if (this.accel) {
        this.speed = 0;
      }
      return false;
    }

    return this.__verticalMove(isAccel, 0);
  }

  // 左移
  moveLeft(isAccel) {
    if (this.point.x <= 0) {
      this.point.x = 0;
      if (this.accel) {
        this.speed = 0;
      }
      return false;
    }

    return this.__horizontalMove(isAccel, 0);
  }

  // 右移
  moveRight(isAccel) {
    const canvasWidth = getCanvasWidthAndHeight().width;

    // 判断当前节点是否出界了，如果出界的则把当前位置重置到边界上，如果物体有加速度的话，速度直接清0
    if (this.point.x >= canvasWidth) {
      this.point.x = canvasWidth;
      if (this.accel) {
        this.speed = 0;
      }
      return false;
    }

    return this.__horizontalMove(isAccel, 1);
  }
}
