/**
 * @param r1 Object{x, width,height}
 * @param r2 Object{x, width,height}
 * @return Boolean
 */

export function rectCollision(r1, r2) {
	return (
		r1.x < r2.x + r2.width &&
		r2.x < r1.x + r1.width &&
		r1.y < r2.y + r2.height &&
		r2.y < r1.y + r1.height
	);
}
