import { Circle } from './circle.model';
import { Rect } from './rect.model';
import {
  collideCircleLine,
  collideCircleRectangle,
  collideLineLine,
  collideLineRect,
  collideRectangleRectangle,
  Point,
  Shape,
  Type,
} from './shape.model';

export class Line implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number) {
    this.center = <Point>{ x, y };
    this.width = width;
    this.type = Type.LINE;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.LINE:
        const line: Line = Line.fromShape(other);
        return collideLineLine(line, this);
      case Type.CIRCLE:
        const circle: Circle = Circle.fromShape(other);
        return collideCircleLine(circle, this);
      case Type.RECT:
        const rect: Rect = Rect.fromShape(other);
        return collideLineRect(rect, this);
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Line {
    const polymorph = <any>other;
    if (!polymorph.center && (!polymorph.radius || !polymorph.width)) {
      throw new Error('Shape is invalid! Cannot convert to a Line');
    }

    return new Line(
      polymorph.center.x,
      polymorph.center.y,
      !polymorph.radius ? polymorph.width : polymorph.radius,
    );
  }
}
