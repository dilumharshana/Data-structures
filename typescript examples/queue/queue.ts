class Queue {}

class QueueNode {
  value: number;
  next: QueueNode | null;

  constructor(value) {
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }
}
