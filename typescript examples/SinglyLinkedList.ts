// linked list class
class LinkedList {
  private head: ListNode | null;
  private tail: ListNode | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //   insert an element in to linked list
  public insert(value: number): void {
    // creating a new list item
    const new_node = new ListNode(value, null);

    // if the linked list is empty
    if (this.tail === null) {
      this.head = new_node;
      this.tail = new_node;
      this.size += 1;
      return;
    }

    // if the linked list is not empty
    this.tail.next_node = new_node;

    // pointing tail to the newly added item to the linked list
    this.tail = new_node;
    this.size += 1;
  }

  //   insert a list not in to an index in linked list
  public insertAt(value: number, target_index: number): boolean {
    if (!this.isValidIndex(target_index)) return false;

    if (target_index === 0) {
      const new_node = new ListNode(value, this.head);
      this.head = new_node;
      this.size += 1;
      return true;
    }

    if (target_index === this.size - 1) {
      if (this.tail) {
        const new_node = new ListNode(value, null);
        this.tail.next_node = new_node;
        this.tail = new_node;
        this.size += 1;
        return true;
      }
    }

    let temp_head: ListNode | null = this.head;
    let previous_node: ListNode | null = this.head;

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
      const new_node = new ListNode(value, previous_node?.next_node);
      previous_node.next_node = new_node;
      this.size += 1;
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
      const new_node = new ListNode(value, this.head?.next_node);
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
        const new_node = new ListNode(value, null);
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
      const new_node = new ListNode(value, target_node_to_replace.next_node);
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

    let second_last_node: ListNode = this.head;

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
    this.size -= 1;

    return true;
  }

  //   remove the first element in the linked list
  public removeFirst(): boolean {
    if (this.head === null) return false;

    // moving the  head of the linked list to the second item of the linked list
    this.head = this.head.next_node;
    this.size -= 1;

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
    let target_node_to_remove: ListNode | null = this.head;
    let node_before_target: ListNode | null = this.head;

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
      const node_after_target: ListNode | null =
        target_node_to_remove.next_node;

      //   setting previous list item's next value to the next list item of the target list item
      node_before_target.next_node = node_after_target;

      //   setting next link of the target list item to null
      target_node_to_remove.next_node = null;

      this.size = this.size - 1;
      return true;
    }

    return false;
  }

  //   remove list item by it's data
  public removeItemByData(target_item_data: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (this.head === null) return false;

    // we are not moving the actual inked list head for search items
    let temp_head: ListNode | null = this.head;

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

    let temp_head: ListNode | null = this.head;
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
  public searchByIndex(target_item_index: number): ListNode | null {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (!this.isValidIndex(target_item_index)) return null;

    let target_node: ListNode | null = null;
    let temp_head: ListNode | null = this.head;
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
    let temp_head: ListNode | null = this.head;

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
}

// List item class
class ListNode {
  //   reference to the next list item
  next_node: ListNode | null;

  //   value of the list item
  value: number;

  constructor(value, next_node) {
    this.value = value;
    this.next_node = next_node;
  }

  public getValue(): number {
    return this.value;
  }
}

// ================================================= Perform operations on Linked List =========================================================
const linkedList = new LinkedList();

console.log("== Empty list ==");
linkedList.printList();

// adding items
linkedList.insert(2);
linkedList.insert(24);
linkedList.insert(4);
linkedList.insert(6);
linkedList.insert(10);
linkedList.insert(15);
linkedList.insert(18);
linkedList.insert(32);

console.log("== Added items to the list ==");
linkedList.printList();

// removing first item
linkedList.removeFirst();
console.log("== Removing first item ==");
linkedList.printList();

// removing last item
linkedList.removeLast();
console.log("== Removing last item ==");
linkedList.printList();

// removing item by index
linkedList.removeItemByIndex(4);
console.log("== Removing item by index : target index -> 4 ==");
linkedList.printList();

// removing item by index
linkedList.removeItemByData(10);
console.log("== Removing item by data : target data -> 10  ==");
linkedList.printList();

// search linked list item by data
console.log("== Search linked list item by data : target data -> 20  ==");
console.log(
  " 'data - 20' exists in linked list -> ",
  linkedList.searchByData(20)
);

// search linked list item by index
console.log("== Search linked list item by index : target index -> 2  ==");
console.log(
  " 'index - 2' exists in linked list -> ",
  linkedList.searchByIndex(2)
);

// insert data in to a specific index in linked list
console.log(
  "== Insert data in to a specific index in linked list <Start> [value => 1000, index => 0]=="
);
linkedList.insertAt(1000, 0);
linkedList.printList();

// replace data in to a specific index in linked list
console.log(
  "== Replace data in to a specific index in linked list <Middle> [value => 255, index => 3] =="
);
linkedList.insertAt(255, 3);
linkedList.printList();

// replace data in to a specific index in linked list
console.log(
  "== Insert data in to a specific index in linked list <End> [value => 500, index => 6] =="
);
linkedList.insertAt(500, 5);
linkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <Start> [value => 1, index => 0] =="
);
linkedList.replaceValueAt(1, 0);
linkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <Middle> [value => 200, index => 5] =="
);
linkedList.replaceValueAt(200, 5);
linkedList.printList();

// replace data at a specific index in linked list
console.log(
  "== Replace data at a specific index in linked list <End> [value => 88, index => 6]=="
);
linkedList.replaceValueAt(88, 6);
linkedList.printList();
