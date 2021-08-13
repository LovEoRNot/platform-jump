// 判断给定的两个坐标点是否相互覆盖
// 判断两个集合是否覆盖
function isCover(pos1, pos2, _pos1, _pos2) {
  return (pos1 >= _pos1 && pos2 <= _pos2) || (_pos1 >= pos1 && _pos1 <= pos2)
}

// 垂直方向碰撞
export function verticalCollide(position1, position2) {
  const { top, right, left, bottom } = position1
  const { top: _top, right: _right, left: _left, bottom: _bottom } = position2

  return ((top <= _bottom && top >= _top) || (bottom >= _top && bottom <= _bottom)) && isCover(left, right, _left, _right)
}

// 水平方向碰撞
export function horizontalCollide(position1, position2) {
  const { top, right, left, bottom } = position1
  const { top: _top, right: _right, left: _left, bottom: _bottom } = position2

  return ((right >= _left && left <= _left) || (left <= _right && right >= _right)) && isCover(top, bottom, _top, _bottom)
}

// 内部垂直方向碰撞
export function innerVerticalCollide(position1, position2) {
  const { top, right, left, bottom } = position1
  const { top: _top, right: _right, left: _left, bottom: _bottom } = position2

  return ((top <= _top && bottom >= _top) || (bottom >= _bottom && top <= _bottom)) && isCover(left, right, _left, _right)
}

// 内部水平方向碰撞
export function innerHorizontalCollide(position1, position2) {
  const { top, right, left, bottom } = position1
  const { top: _top, right: _right, left: _left, bottom: _bottom } = position2

  return ((left <= _left && right >= _left) || (right >= _right && left <= _right)) && isCover(top, bottom, _top, _bottom)
}