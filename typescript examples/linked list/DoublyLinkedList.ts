// ==================================== DOUBLY LINKED LIST IMPLEMENTATION =============================================

class DoublyLinkedList {
  private head: DoublyListNode | null;
  private tail: DoublyListNode | null;
  private size: number;

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
      const new_node: DoublyListNode = new DoublyListNode(value, null, null);

      this.head = new_node;
      this.tail = new_node;
      this.increaseItemCount();
      return;
    }

    // if linked list is not empty then link new node at the end of it
    // then the new node is the tail of the linked list
    if (this.tail) {
      // creating new list item
      const new_node: DoublyListNode | null = new DoublyListNode(
        value,
        this.tail,
        null
      );

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
      const new_node: DoublyListNode = new DoublyListNode(
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

  //   replace any link list item at a index
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
    const new_node: DoublyListNode = new DoublyListNode(
      value,
      temp_head.prev_node,
      temp_head.next_node
    );

    // setting existing item's -> previous item's -> next item to  -> new item
    temp_head.prev_node.next_node = new_node;

    // breaking the connection to the previous node from the target node
    temp_head.prev_node = null;

    // setting existing item's -> next item's -> previous item to -> new item
    temp_head.next_node.prev_node = new_node;

    // breaking the connection to the next node from the target node
    temp_head.next_node = null;

    return true;
  }

  //   remove the first element of the linked list
  public removeFirst(): boolean {
    if (!this.head) return false;

    let second_node: DoublyListNode | null = this.head?.next_node;

    if (second_node) {
      // breaking connection to the first node from the second node
      second_node.prev_node = null;

      // breaking the connection to the second node from the first node (current head.next)
      this.head.next_node = null;

      // making the second node as the new head
      this.head = second_node;
    } else {
      // if the link list have only head then set the current head to null
      this.head = null;
    }

    this.decreaseItemCount();

    return true;
  }

  //   remove the last element of the linked list
  public removeLast(): boolean {
    if (!this.tail) return false;

    // when linked list contains only one element
    if (this.tail.prev_node === null) return this.removeFirst();

    const second_last_node: DoublyListNode | null = this.tail.prev_node;

    // breaking the connection to the last node (current tail) from the second last node
    second_last_node.next_node = null;

    // breaking the connection to the second last node from the last node (current tail.previous)
    this.tail.prev_node = null;

    // making the second last node as the new tail
    this.tail = second_last_node;

    this.decreaseItemCount();

    return true;
  }

  //   remove list item by given index
  public removeItemByIndex(target_index: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (!this.isValidIndex) return false;

    if (target_index === 0) return this.removeFirst();

    if (target_index === this.size - 1) return this.removeLast();

    let temp_head: DoublyListNode | null = this.head;

    // loop until i equals to target_index
    for (let i = 0; i <= target_index; i++) {
      if (i === target_index) {
        break;
      }

      if (temp_head) {
        temp_head = temp_head.next_node;
      }
    }

    if (!temp_head) return false;

    // node previous to the target node to be remove
    let node_before_target: DoublyListNode | null = temp_head.prev_node;

    // node next to the target node to be remove
    let node_after_target: DoublyListNode | null = temp_head?.next_node;

    if (!temp_head || !node_before_target || !node_after_target) return false;

    temp_head.next_node = null;
    temp_head.prev_node = null;

    // setting the next and the previous connections of the two nodes either side of the target node to be removed
    node_before_target.next_node = node_after_target;
    node_after_target.prev_node = node_before_target;

    this.decreaseItemCount();

    return true;
  }

  //   remove list item by given data
  public removeItemByData(target_value: number): boolean {
    // if linked list is empty
    if (this.head === null) return false;

    // if given target_value equals to head target_value
    if (target_value === this.head?.value) return this.removeFirst();

    // if given target_value equals to tail target_value
    if (target_value === this.tail?.value) return this, this.removeLast();

    let temp_head: DoublyListNode | null = this.head.next_node;
    let target_node_index: number = 1;

    //loop all over the linked list from second node to second last node until temp_head.value equals to target value
    for (let i = 1; i <= this.size - 2; i++) {
      if (temp_head?.value === target_value) {
        target_node_index = i;
        break;
      }

      if (temp_head) {
        temp_head = temp_head?.next_node;
      }
    }

    return this.removeItemByIndex(target_node_index);
  }

  //   search list item by given data
  public searchByData(target_value: number): boolean {
    if (this.head === null) return false;

    if (this.head?.value === target_value) return true;

    if (this.tail?.value === target_value) return true;

    let temp_head: DoublyListNode | null = this.head.next_node;
    let data_found: boolean = false;

    //loop all over the linked list from second node to second last node until temp_head equals to target_value
    for (let i = 1; i <= this.size - 2; i++) {
      // if temp_head value equals to the given target value
      if (temp_head?.value === target_value) {
        data_found = true;
        break;
      }

      if (temp_head) {
        temp_head = temp_head.next_node;
      }
    }

    return data_found;
  }

  //   search list item by given index
  public searchByIndex(target_index: number): DoublyListNode | null {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (!this.isValidIndex(target_index)) return null;

    // if given index is 0 return current head
    if (target_index === 0) return this.head;

    // if given index equals to tail index return current tail
    if (target_index === this.size - 1) return this.tail;

    if (!this.head) return null;

    let temp_head: DoublyListNode | null = this.head.next_node;

    //loop all over the linked list from second node to second last node until i equals to target_index
    for (let i = 1; i < this.size - 2; i++) {
      if (i === target_index) {
        break;
      }

      if (temp_head) {
        temp_head = temp_head.next_node;
      }
    }

    return temp_head;
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

// ==================================== END OF DOUBLY LINKED LIST IMPLEMENTATION =============================================

//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________

// ============================================= LINKED LIST OPERATIONS ======================================================

const doublyLinkedList: DoublyLinkedList = new DoublyLinkedList();

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

// removing first item
console.log("== Removing first item ==");
doublyLinkedList.removeFirst();
doublyLinkedList.printList();

// removing last item
console.log("== Removing last item ==");
doublyLinkedList.removeLast();
doublyLinkedList.printList();

// removing item by index
console.log("== Removing item by index : target index -> 1 ==");
doublyLinkedList.removeItemByIndex(1);
doublyLinkedList.printList();

// removing item by index
console.log("== Removing item by data : target data -> 6  ==");
doublyLinkedList.removeItemByData(6);
doublyLinkedList.printList();

// search linked list item by data
console.log("== Search linked list item by data : target data -> 4  ==");
console.log(
  " 'data - 20' exists in linked list -> ",
  doublyLinkedList.searchByData(20)
);

// search linked list item by index
console.log("== Search linked list item by index : target index -> 2  ==");
console.log(
  " 'index - 2' exists in linked list -> ",
  doublyLinkedList.searchByIndex(2)
);
