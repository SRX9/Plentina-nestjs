import { Circle } from './circle.model';
import { Line } from './line.model';
import {
  collideCircleRectangle,
  collideLineRect,
  collideRectangleRectangle,
  Point,
  Shape,
  Type,
} from './shape.model';

export class Rect implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        const circle: Circle = Circle.fromShape(other);
        return collideCircleRectangle(circle, this);
      case Type.RECT:
        const rect: Rect = Rect.fromShape(other);
        return collideRectangleRectangle(this, rect);
      case Type.LINE:
        const line: Line = Line.fromShape(other);
        return collideLineRect(this, line);
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Rect {
    const polymorph = <any>other;
    if (!polymorph.width || !polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Rectangle');
    }

    return new Rect(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.width,
      polymorph.height,
    );
  }
}
