import { Circle } from './circle.model';
import { Line } from './line.model';
import { Rect } from './rect.model';

export interface Point {
  readonly x: number;
  readonly y: number;
}

export enum Type {
  CIRCLE = 'CIRCLE',
  RECT = 'RECT',
  LINE = 'LINE',
}

export interface Shape {
  readonly center: Point;
  readonly type: Type;

  /**
   * Checks if this shape collides with the other shape
   * @param other The other shape of any type
   */
  collides(other: Shape): boolean;
}

/**
 * Gets the distance between two points using distance formula
 * @param start The starting point
 * @param terminal The terminal point
 * @returns The distance between the two points
 */
export function distanceBetween(start: Point, terminal: Point): number {
  return Math.sqrt(
    Math.pow(start.x - terminal.x, 2) + Math.pow(start.y - terminal.y, 2),
  );
}

/**
 * Checks if Circle and Rectangle collide
 */
export function collideCircleRectangle(circle: Circle, rect: Rect): boolean {
  const pointDistance: Point = <Point>{
    x: Math.abs(circle.center.x - rect.center.x),
    y: Math.abs(circle.center.y - rect.center.y),
  };

  if (pointDistance.x > rect.width / 2 + circle.radius) {
    return false;
  } else if (pointDistance.y > rect.height / 2 + circle.radius) {
    return false;
  } else if (pointDistance.x <= rect.width / 2) {
    return true;
  } else if (pointDistance.y <= rect.height / 2) {
    return true;
  }

  const circleToRectDistance =
    Math.pow(pointDistance.x - rect.width / 2, 2) +
    Math.pow(pointDistance.y - rect.height / 2, 2);

  return circleToRectDistance <= Math.pow(circle.radius, 2);
}

export function collideCircleLine(circle: Circle, line: Line): boolean {
  const distanceFromCenterOfCircle = distanceBetween(
    circle.center,
    line.center,
  );
  return circle.radius >= distanceFromCenterOfCircle;
}

export function collideLineRect(rect: Rect, line: Line): boolean {
  const distanceFromCenterOfRect = distanceBetween(rect.center, line.center);
  return (
    distanceFromCenterOfRect < rect.width ||
    distanceFromCenterOfRect < rect.height
  );
}

/**
 * Checks if Circle and Circle collide
 */
export function collideCircleCircle(circle1: Circle, circle2: Circle): boolean {
  const distance = distanceBetween(circle1.center, circle2.center);
  return distance <= circle1.radius + circle2.radius;
}

/**
 * Checks if Rectangle and Rectangle collide
 */
export function collideRectangleRectangle(rect1: Rect, rect2: Rect): boolean {
  let totalDiagnol,
    totalwidth,
    totalHeight = 0;

  // Calculate Diagnol length for both rectangle
  totalDiagnol = Math.sqrt(
    rect1.width * rect1.width + rect1.height * rect1.height,
  );

  totalDiagnol += Math.sqrt(
    rect2.width * rect2.width + rect2.height * rect2.height,
  );

  totalDiagnol = totalDiagnol / 2;
  totalHeight = rect1.height / 2 + rect2.height / 2;
  totalwidth = rect1.width / 2 + rect2.width / 2;

  let lengthBetcenters = distanceBetween(rect1.center, rect2.center);

  return (
    lengthBetcenters <= totalDiagnol ||
    lengthBetcenters <= totalHeight ||
    lengthBetcenters <= totalwidth
  );
}

export function collideLineLine(line1: Line, line2: Line): boolean {
  const distance = distanceBetween(line1.center, line2.center);
  return distance <= line1.width / 2;
}
