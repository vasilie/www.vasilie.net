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
  let square1VelocityX = (square1.m - square2.m ) / sumM * square1.velocityX;
  let square1VelocityY = (square1.m - square2.m ) / sumM * square1.velocityY;

  let square2VelocityX = (square2.m - square1.m ) / sumM * square2.velocityX;
  let square2VelocityY = (square2.m - square1.m ) / sumM * square2.velocityY;

  square1VelocityX += (2 * square2.m / sumM) * square2.velocityX;
  square1VelocityY += (2 * square2.m / sumM) * square2.velocityY;
  square2VelocityX += (2 * square1.m / sumM) * square1.velocityX;
  square2VelocityY += (2 * square1.m / sumM) * square1.velocityY;

  square1.velocityX = square1VelocityX;
  square1.velocityY = square1VelocityY;
  square2.velocityX = square2VelocityX;
  square2.velocityY = square2VelocityY;
  console.log("square1VelocityX", square1VelocityX, "square1VelocityY", square1VelocityY);
  console.log("square1VelocityX", square1VelocityX, "square1VelocityY", square1VelocityY);
}
