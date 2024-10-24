// ==================================== QUEUE IMPLEMENTATION =============================================

class Queue {
  private start: QueueNode | null;
  private rear: QueueNode | null;
  private size: number;

  constructor() {
    this.start = null;
    this.rear = null;
    this.size = 0;
  }

  public enqueue(value: number): boolean {
    // if queue is empty
    const new_node: QueueNode = new QueueNode(value);

    if (this.size === 0) {
      this.start = new_node;
      this.rear = new_node;
      this.increaseItemCount();
      return true;
    }

    if (!this.rear) return false;

    this.rear.next_node = new_node;
    this.rear = new_node;
    this.increaseItemCount();

    return true;
  }

  public dequeue(): number | boolean {
    if (!this.start) return false;

    const current_start_value: number = this.start.value;

    this.start = this.start.next_node;
    this.decreaseItemCount();

    return current_start_value;
  }

  public printQueue(): void {
    let temp_start: QueueNode | null = this.start;

    const queue: string[] = [];

    while (temp_start) {
      queue.push(`${temp_start.value} -> `);
      temp_start = temp_start.next_node;
    }

    console.log(queue);
  }

  public increaseItemCount(): void {
    this.size++;
  }

  public decreaseItemCount(): void {
    this.size--;
  }
}

class QueueNode {
  value: number;
  next_node: QueueNode;

  constructor(value: number) {
    this.value = value;
  }
}

// ==================================== END OF QUEUE LIST IMPLEMENTATION =============================================

//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________

// ============================================= QUEUE  OPERATIONS ======================================================

const queue: Queue = new Queue();

console.log("== Empty queue ==");
queue.printQueue();

// adding items
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(4);
queue.enqueue(6);
queue.enqueue(50);

console.log("== Added items to the queue ==");
queue.printQueue();

// removing items
console.log("Dequeueing -> ", queue.dequeue());
console.log("Dequeueing -> ", queue.dequeue());
console.log("Dequeueing -> ", queue.dequeue());

console.log("== Queue after removing items ==");
queue.printQueue();
