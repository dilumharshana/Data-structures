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

  //   insert an element in to linked list
  public insert(value: number): void {
    // if the linked list is empty
    if (this.head === null) {
      // creating new list item
      const new_node = new DoublyListNode(value, null, null);

      this.head = new_node;
      this.tail = new_node;
      this.increaseItemCount();
      return;
    }

    // if linked list is not empty then link new node at the end of it
    // then the new node is the tail of the linked list
    if (this.tail) {
      // creating new list item
      const new_node = new DoublyListNode(value, this.tail, null);

      this.tail.next_node = new_node;
      this.tail = new_node;
      this.increaseItemCount();
      return;
    }
  }

  //   insert a list not in to an index in linked list
  public insertAt(value: number, target_index: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (!this.isValidIndex(target_index)) return false;

    // handle first node insertion if given target index is 0
    if (target_index === 0) {
      // creating new list item
      const new_node = new DoublyListNode(value, null, this.head);

      if (this.head) {
        this.head.prev_node = new_node;
      }

      this.head = new_node;
      this.increaseItemCount();
      return true;
    }

    let temp_head: DoublyListNode | null = this.head;

    // loop until the temp head equals to previous index of target index
    for (let i = 0; i < target_index; i++) {
      if (i === target_index - 1) {
        break;
      }

      if (temp_head) {
        temp_head = temp_head?.next_node;
      }
    }

    if (temp_head?.next_node) {
      // creating new list item
      const new_node = new DoublyListNode(
        value,
        temp_head,
        temp_head.next_node
      );

      temp_head.next_node.prev_node = new_node;
      temp_head.next_node = new_node;

      this.increaseItemCount();
      return true;
    }

    return false;
  }

  // replace any link list item at a index
  public replaceItemAt(value: number, target_index: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (!this.isValidIndex(target_index)) return false;

    // if target index is 0 then replacing head
    if (target_index === 0) {
      if (!this.head) return false;

      const new_node = new DoublyListNode(value, null, this.head?.next_node);

      // setting the 1 st index list item's previous node to new node
      if (this.head.next_node) {
        this.head.next_node.prev_node = new_node;
      }

      this.head = new_node;
      return true;
    }

    //if target index equals to tail then replace the tail
    if (target_index === this.size - 1) {
      // creating new list item

      if (!this.tail?.prev_node) return false;

      const new_node = new DoublyListNode(value, this.tail.prev_node, null);
      this.tail.prev_node.next_node = new_node;
      this.tail = new_node;
      return true;
    }

    let temp_head: DoublyListNode | null = this.head;

    // loop until temp_head equals to target_index
    for (let i = 0; i <= target_index; i++) {
      if (i === target_index) {
        break;
      }

      if (temp_head) {
        temp_head = temp_head.next_node;
      }
    }

    // replacing new item with the existing item
    if (!temp_head || !temp_head.prev_node || !temp_head.next_node)
      return false;

    // creating new list item
    const new_node = new DoublyListNode(
      value,
      temp_head.prev_node,
      temp_head.next_node
    );

    // setting existing item's -> previous item's -> next item to  -> new item
    temp_head.prev_node.next_node = new_node;

    // setting existing item's -> next item's -> previous item to -> new item
    temp_head.next_node.prev_node = new_node;

    return true;
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

  //   print linked list in reverse order using previous node link
  public printListReverse(): void {
    let temp_tail: DoublyListNode | null = this.tail;

    let items: string[] = [];

    while (temp_tail !== null) {
      items.push(`[${temp_tail.value}]`);
      temp_tail = temp_tail.prev_node;
    }

    console.log("\n", "List in reverse => ", items, "\n");
  }

  //   user given index validate and head position validate helper function
  private isValidIndex(target_item_index: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (
      this.head === null ||
      target_item_index < 0 ||
      target_item_index > this.size - 1
    )
      return false;

    return true;
  }

  private increaseItemCount(): void {
    this.size++;
  }

  private decreaseItemCount(): void {
    this.size--;
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

console.log("== Added items to the list ==");
doublyLinkedList.printList();
// doublyLinkedList.printListReverse();

// insert data in to a specific index in linked list
console.log(
  "== Insert data in to a specific index in linked list <Start> [value => 1000, index => 0]=="
);
doublyLinkedList.insertAt(1000, 0);
doublyLinkedList.printList();

// insert data in to a specific index in linked list
console.log(
  "== Insert data in to a specific index in linked list <Middle> [value => 2000, index => 3]=="
);
doublyLinkedList.insertAt(2000, 3);
doublyLinkedList.printList();

// insert data in to a specific index in linked list
console.log(
  "== Insert data in to a specific index in linked list <End> [value => 3000, index => 6]=="
);
doublyLinkedList.insertAt(3000, 6);
doublyLinkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <Start> [value => 1, index => 0] =="
);
doublyLinkedList.replaceItemAt(1, 0);
doublyLinkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <Middle> [value => 80, index => 3] =="
);
doublyLinkedList.replaceItemAt(80, 3);
doublyLinkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <End> [value => 55, index => 7] =="
);
doublyLinkedList.replaceItemAt(55, 7);
doublyLinkedList.printList();
