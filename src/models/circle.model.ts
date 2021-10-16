import { Line } from './line.model';
import { Rect } from './rect.model';
import {
  collideCircleCircle,
  collideCircleLine,
  collideCircleRectangle,
  distanceBetween,
  Point,
  Shape,
  Type,
} from './shape.model';

export class Circle implements Shape {
  readonly center: Point;
  readonly radius: number;
  readonly type: Type;

  constructor(x: number, y: number, radius: number) {
    this.center = <Point>{ x, y };
    this.type = Type.CIRCLE;
    this.radius = radius;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        const _other = <Circle>(<any>other);
        return collideCircleCircle(_other, this);
      case Type.RECT:
        const rect: Rect = Rect.fromShape(other);
        return collideCircleRectangle(this, rect);
      case Type.LINE:
        const line: Line = Line.fromShape(other);
        return collideCircleLine(this, line);
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Circle object
   */
  static fromShape(other: Shape): Circle {
    const polymorph = <any>other;
    if (!polymorph.radius) {
      throw new Error('Shape is invalid! Cannot convert to a Circle');
    }

    return new Circle(polymorph.center.x, polymorph.center.y, polymorph.radius);
  }
}
