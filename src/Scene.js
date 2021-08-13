import Point from "./basic/Point"
import { getCanvasWidthAndHeight } from "./getContext"
import Sprite from "./sprite/Sprite"

export default class Scene extends Sprite {
  /**
   * @param {CanvasRenderingContext2D} context
   * @param {Sprite} player 
   */
  constructor(context, player) {
    super(context)
    this.sprites = []
    this.player = player
    this.update()
  }

  getPosition() {
    const { width, height } = getCanvasWidthAndHeight()
    return { top: 0, right: width, bottom: height, left: 0 }
  }

  /**
   * @param {Sprite} sprite 
   */
  addElement(sprite) {
    this.sprites.push(sprite)
  }

  draw(width, height) {
    this.pencil.rect(new Point(0, 0), width, height, '#aaa')
  }

  update() {
    const { width, height } = getCanvasWidthAndHeight()
    this.context.clearRect(0, 0, width, height)
    // 绘制背景
    this.draw(width, height)
    // 绘制角色
    this.player.draw()
    if (this.player.isCollided(this, true)) {
      this.player.collide(this, true)
    }
    // 绘制其他元素
    this.sprites.forEach(sprite => {
      sprite.draw()
      if (this.player.isCollided(sprite)) {
        this.player.collide(sprite)
      }
      if (sprite.isCollided(this, true)) {
        sprite.collide(this, true)
      }
    })

    console.log(this.player.direction)
    window.requestAnimationFrame(() => {
      this.update()
    })
  }
}