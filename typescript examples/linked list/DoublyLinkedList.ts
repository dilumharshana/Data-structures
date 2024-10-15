// ==================================== DOUBLY LINKED LIST IMPLEMENTATION =============================================

class DoublyLinkedList {
  head: DoublyListNode | null;
  tail: DoublyListNode | null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  public insert(value: number): void {
    // if the linked list is empty
    if (this.head === null) {
      const new_node = new DoublyListNode(value, null, null);
      this.head = new_node;
      this.tail = new_node;
      this.size++;
      return;
    }

    if (this.tail) {
      const new_node = new DoublyListNode(value, this.tail, null);
      this.tail.next_node = new_node;
      this.tail = new_node;
      this.size++;
      return;
    }
  }

  //   print all the elements in the linked list
  public printList(): void {
    let temp_head: DoublyListNode | null = this.head;

    let items: string[] = [];

    while (temp_head !== null) {
      items.push(`[${temp_head.value}]`);
      temp_head = temp_head.next_node;
    }

    console.log("\n", "List => ", items, "\n");
  }

  public printListReverse(): void {
    let temp_tail: DoublyListNode | null = this.tail;

    let items: string[] = [];

    while (temp_tail !== null) {
      items.push(`[${temp_tail.value}]`);
      temp_tail = temp_tail.prev_node;
    }

    console.log("\n", "List in reverse => ", items, "\n");
  }
}

// list node class
class DoublyListNode {
  //   value of the list node
  value: number | null;

  //   reference to the next list node
  next_node: DoublyListNode | null;

  //    reference to the previous list node
  prev_node: DoublyListNode | null;

  constructor(
    value: number,
    perv_node: DoublyListNode | null,
    next_node: DoublyListNode | null
  ) {
    this.value = value;
    this.next_node = next_node;
    this.prev_node = perv_node;
  }
}

// ==================================== END OF SINGLY LINKED LIST IMPLEMENTATION =============================================

//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________

// ============================================= LINKED LIST OPERATIONS ======================================================

const doublyLinkedList = new DoublyLinkedList();

console.log("== Empty list ==");
doublyLinkedList.printList();

// adding items
doublyLinkedList.insert(2);
doublyLinkedList.insert(24);
doublyLinkedList.insert(4);
doublyLinkedList.insert(6);
doublyLinkedList.insert(10);
doublyLinkedList.insert(15);
doublyLinkedList.insert(18);
doublyLinkedList.insert(32);

console.log("== Added items to the list ==");
doublyLinkedList.printList();
doublyLinkedList.printListReverse();
