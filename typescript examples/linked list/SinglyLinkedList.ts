// ==================================== SINGLY LINKED LIST IMPLEMENTATION =============================================

// linked list class
class SinglyLinkedList {
  private head: SinglyNode | null;
  private tail: SinglyNode | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //   insert an element in to linked list
  public insert(value: number): void {
    // creating a new list item
    const new_node = new SinglyNode(value, null);

    // if the linked list is empty
    if (this.head === null) {
      this.head = new_node;
      this.tail = new_node;
      this.increaseItemCount();
      return;
    }

    // if linked list is not empty then link new node at the end of it
    // then the new node is the tail of the linked list
    if (this.tail) {
      this.tail.next_node = new_node;
    }

    // pointing tail to the newly added item to the linked list
    this.tail = new_node;
    this.increaseItemCount();
  }

  //   insert a list not in to an index in linked list
  public insertAt(value: number, target_index: number): boolean {
    if (!this.isValidIndex(target_index)) return false;

    // note here that the linked list is not empty, we just adding a new value at the start of it
    if (target_index === 0) {
      const new_node = new SinglyNode(value, this.head);
      this.head = new_node;
      this.increaseItemCount();
      return true;
    }

    if (target_index === this.size - 1) {
      if (this.tail) {
        const new_node = new SinglyNode(value, null);
        this.tail.next_node = new_node;
        this.tail = new_node;
        this.increaseItemCount();
        return true;
      }
    }

    let temp_head: SinglyNode | null = this.head;
    let previous_node: SinglyNode | null = this.head;

    for (let i = 0; i < target_index; i++) {
      if (i === target_index - 1) {
        previous_node = temp_head;
        break;
      }

      if (temp_head) {
        temp_head = temp_head?.next_node;
      }
    }

    if (previous_node) {
      const new_node = new SinglyNode(value, previous_node?.next_node);
      previous_node.next_node = new_node;
      this.increaseItemCount();
      return true;
    }

    return false;
  }

  // replace any link list item at a index
  public replaceValueAt(value: number, target_index): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (!this.isValidIndex(target_index)) return false;

    // handle replace first linked list item
    if (target_index === 0) {
      if (!this.head) return false;

      const new_node = new SinglyNode(value, this.head.next_node);
      this.head = new_node;
      return true;
    }

    // handle replace last linked list item
    if (target_index === this.size - 1) {
      let temp_head = this.tail;

      // loop to find the second last item of the linked list
      for (let i = 0; i < this.size - 1; i++) {
        if (i === this.size - 2) {
          break;
        }

        if (temp_head) {
          temp_head = temp_head.next_node;
        }
      }

      // replacing last item
      if (temp_head) {
        const new_node = new SinglyNode(value, null);
        temp_head.next_node = new_node;
        this.tail = new_node;
        return true;
      }
    }

    let temp_head = this.head;
    let previous_node = this.head;

    for (let i = 0; i < target_index; i++) {
      if (i == target_index - 1) {
        previous_node = temp_head;
        break;
      }

      if (temp_head) {
        temp_head = temp_head?.next_node;
      }
    }

    if (previous_node?.next_node) {
      const target_node_to_replace = previous_node.next_node;
      const new_node = new SinglyNode(value, target_node_to_replace.next_node);
      target_node_to_replace.next_node = null;
      previous_node.next_node = new_node;
    }

    return false;
  }

  //   remove the last element of the linked list
  public removeLast(): boolean {
    // stop the function if the linked list is empty
    if (this.head === null) return false;

    // if linked list has only one item then call removeFirstMethod
    if (this.size == 1) return this.removeFirst();

    let second_last_node: SinglyNode = this.head;

    // linked list           =   [1], [2], [3], [4], [5], [6]
    // linked list indexes   =    0    1    2    3    4    5

    // linked list size here is = 6
    // the index of the 5 here is = 4
    // so the index of the second last node of a linked list  = size of linked list - 2

    const second_last_index = this.size - 2;

    // getting the list item previous to the last list item
    // the reason we need the second last list item of the linked list is, we can break the next list item link of the second last list item
    // so there is no connection to last list item

    for (let i = 0; i < second_last_index; i++) {
      if (second_last_node?.next_node === null) break;
      second_last_node = second_last_node.next_node;
    }

    second_last_node.next_node = null;
    this.tail = second_last_node;
    this.decreaseItemCount();

    return true;
  }

  //   remove the first element in the linked list
  public removeFirst(): boolean {
    if (this.head === null) return false;

    // moving the  head of the linked list to the second item of the linked list
    this.head = this.head.next_node;
    this.decreaseItemCount();

    return true;
  }

  //   remove list item by it's index
  public removeItemByIndex(target_item_index: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (!this.isValidIndex(target_item_index)) return false;

    //   if target_item_index is equal to the first item index of the list then call the removeFirst method
    if (target_item_index === 0) return this.removeFirst();

    //   if target_item_index is equal to the last item index of the list then call the removeLast method
    if (target_item_index === this.size - 1) return this.removeLast();

    // initializing the target index and the index previous to the target index variables
    let target_node_to_remove: SinglyNode | null = this.head;
    let node_before_target: SinglyNode | null = this.head;

    // loop until value of i reaches the target_item_index -1. In this loop it always stops at the index previous to the target index
    // the reason for stopping at the previous list item is because the target list item don't have link to the previous node.
    for (let i = 0; i < target_item_index; i++) {
      //   keep track of previous list item to target list item
      node_before_target = target_node_to_remove;

      if (node_before_target !== null) {
        //  getting target list item through the previous list item's next value
        target_node_to_remove = node_before_target.next_node;
      }
    }

    if (target_node_to_remove !== null && node_before_target !== null) {
      //    getting the list item next to the target list item
      const node_after_target: SinglyNode | null =
        target_node_to_remove.next_node;

      //   setting previous list item's next value to the next list item of the target list item
      node_before_target.next_node = node_after_target;

      //   setting next link of the target list item to null
      target_node_to_remove.next_node = null;

      this.decreaseItemCount();
      return true;
    }

    return false;
  }

  //   remove list item by it's data
  public removeItemByData(target_item_data: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (this.head === null) return false;

    // we are not moving the actual inked list head for search items
    let temp_head: SinglyNode | null = this.head;

    // loop until a list item contains the target data
    for (let i = 0; i < this.size; i++) {
      if (temp_head === null) return false;

      if (temp_head.value === target_item_data) {
        // here i is the index of the target list item. so we remove the list item by call the removeItemByIndex method by parsing the target item index
        this.removeItemByIndex(i);
        break;
      }

      temp_head = temp_head.next_node;
    }

    return false;
  }

  //   search data in linked list
  public searchByData(target_data: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (this.head === null) return false;

    let temp_head: SinglyNode | null = this.head;
    let data_found: boolean = false;
    let item_count: number = 0;

    while (item_count < this.size) {
      if (!temp_head) break;

      // break the loop and set the data_found variable true only if temp_head's value match to the target data
      if (temp_head.value === target_data) {
        data_found = true;
        break;
      }

      temp_head = temp_head.next_node;
      item_count += 1;
    }

    return data_found;
  }

  //   search item by given index
  public searchByIndex(target_item_index: number): SinglyNode | null {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (!this.isValidIndex(target_item_index)) return null;

    let target_node: SinglyNode | null = null;
    let temp_head: SinglyNode | null = this.head;
    let item_count: number = 0;

    // loop until the item_count equals to target_item_index
    while (item_count <= target_item_index) {
      if (!temp_head) break;

      if (item_count === target_item_index) {
        target_node = temp_head;
        break;
      }

      temp_head = temp_head.next_node;
      item_count += 1;
    }

    return target_node;
  }

  //   print all the elements in the linked list
  public printList(): void {
    let temp_head: SinglyNode | null = this.head;

    let items: string[] = [];

    while (temp_head !== null) {
      items.push(`[${temp_head.value}]`);
      temp_head = temp_head.next_node;
    }

    console.log("\n", "List => ", items, "\n");
  }

  // user given index validate and head position validate helper function
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

  private increaseItemCount() {
    this.size++;
  }

  private decreaseItemCount() {
    this.size--;
  }
}

// List item class
class SinglyNode {
  //   reference to the next list item
  next_node: SinglyNode | null;

  //   value of the list item
  value: number;

  constructor(value: number, next_node: SinglyNode | null) {
    this.value = value;
    this.next_node = next_node;
  }
}

// ==================================== END OF SINGLY LINKED LIST IMPLEMENTATION =============================================

//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________
//____________________________________________________________________________________________________________________________

// ============================================= LINKED LIST OPERATIONS ======================================================

const singlyLinkedList = new SinglyLinkedList();

console.log("== Empty list ==");
singlyLinkedList.printList();

// adding items
singlyLinkedList.insert(2);
singlyLinkedList.insert(24);
singlyLinkedList.insert(4);
singlyLinkedList.insert(6);
singlyLinkedList.insert(10);
singlyLinkedList.insert(15);
singlyLinkedList.insert(18);
singlyLinkedList.insert(32);

console.log("== Added items to the list ==");
singlyLinkedList.printList();

// removing first item
singlyLinkedList.removeFirst();
console.log("== Removing first item ==");
singlyLinkedList.printList();

// removing last item
singlyLinkedList.removeLast();
console.log("== Removing last item ==");
singlyLinkedList.printList();

// removing item by index
singlyLinkedList.removeItemByIndex(4);
console.log("== Removing item by index : target index -> 4 ==");
singlyLinkedList.printList();

// removing item by index
singlyLinkedList.removeItemByData(10);
console.log("== Removing item by data : target data -> 10  ==");
singlyLinkedList.printList();

// search linked list item by data
console.log("== Search linked list item by data : target data -> 20  ==");
console.log(
  " 'data - 20' exists in linked list -> ",
  singlyLinkedList.searchByData(20)
);

// search linked list item by index
console.log("== Search linked list item by index : target index -> 2  ==");
console.log(
  " 'index - 2' exists in linked list -> ",
  singlyLinkedList.searchByIndex(2)
);

// insert data in to a specific index in linked list
console.log(
  "== Insert data in to a specific index in linked list <Start> [value => 1000, index => 0]=="
);
singlyLinkedList.insertAt(1000, 0);
singlyLinkedList.printList();

// replace data in to a specific index in linked list
console.log(
  "== Replace data in to a specific index in linked list <Middle> [value => 255, index => 3] =="
);
singlyLinkedList.insertAt(255, 3);
singlyLinkedList.printList();

// replace data in to a specific index in linked list
console.log(
  "== Insert data in to a specific index in linked list <End> [value => 500, index => 6] =="
);
singlyLinkedList.insertAt(500, 5);
singlyLinkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <Start> [value => 1, index => 0] =="
);
singlyLinkedList.replaceValueAt(1, 0);
singlyLinkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <Middle> [value => 200, index => 5] =="
);
singlyLinkedList.replaceValueAt(200, 5);
singlyLinkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <End> [value => 88, index => 6]=="
);
singlyLinkedList.replaceValueAt(88, 6);
singlyLinkedList.printList();
