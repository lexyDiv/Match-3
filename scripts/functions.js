function getDistanse(obj, target) {
  const a = target.x - obj.x;
  const b = target.y - obj.y;
  const c = Math.sqrt(a * a + b * b);
  return { deltaX: a, deltaY: b, dis: c };
}
