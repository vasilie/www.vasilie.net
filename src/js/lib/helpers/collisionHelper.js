export const checkIsColliding = (box1, box2) => {
  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
}

export const handleCollision = (square1, square2) => {
  let sumM = square1.m + square2.m;
  let newVelocityX = (square1.m - square2.m ) / sumM * square1.velocityX;
  let newVelocityY = square1.velocityY / sumM * square1.velocityY;
  newVelocityX += (2 * square2.m / sumM) * square2.velocityX
  newVelocityY += (2 * square2.m / sumM) * square2.velocityY

  return { newVelocityX, newVelocityY};
}