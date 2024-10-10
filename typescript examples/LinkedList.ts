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
    const newNode = new ListNode(value, null);

    // if the linked list is empty
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
      this.size += 1;
      return;
    }

    // if the linked list is not empty
    this.tail.nextNode = newNode;

    // pointing tail to the newly added item to the linked list
    this.tail = newNode;
    this.size += 1;
  }

  //   remove the last element of the linked list
  public removeLast(): boolean {
    // stop the function if the linked list is empty
    if (this.head === null) return false;

    // if linked list has only one item then call removeFirstMethod
    if (this.size == 1) return this.removeFirst();

    let secondLastNode: ListNode = this.head;

    // linked list           =   [1], [2], [3], [4], [5], [6]
    // linked list indexes   =    0    1    2    3    4    5

    // linked list size here is = 6
    // the index of the 5 here is = 4
    // so the index of the second last node of a linked list  = size of linked list - 2

    const secondLastIndex = this.size - 2;

    // getting the list item previous to the last list item
    // the reason we need the second last list item of the linked list is, we can break the next list item link of the second last list item
    // so there is no connection to last list item

    for (let i = 0; i < secondLastIndex; i++) {
      if (secondLastNode?.nextNode === null) break;
      secondLastNode = secondLastNode.nextNode;
    }

    secondLastNode.nextNode = null;
    this.size -= 1;

    return true;
  }

  //   remove the first element in the linked list
  public removeFirst(): boolean {
    if (this.head === null) return false;

    // moving the  head of the linked list to the second item of the linked list
    this.head = this.head.nextNode;
    this.size -= 1;

    return true;
  }

  //   remove list item by it's index
  public removeItemByIndex(target_item_index: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (
      this.head === null ||
      target_item_index < 0 ||
      target_item_index > this.size
    )
      return false;

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
        target_node_to_remove = node_before_target.nextNode;
      }
    }

    if (target_node_to_remove !== null && node_before_target !== null) {
      //    getting the list item next to the target list item
      const node_after_target: ListNode | null = target_node_to_remove.nextNode;

      //   setting previous list item's next value to the next list item of the target list item
      node_before_target.nextNode = node_after_target;

      //   setting next link of the target list item to null
      target_node_to_remove.nextNode = null;

      return true;
    }

    return false;
  }

  //   remove list item by it's data
  public removeItemByData(target_item_data: number): boolean {
    // stop the function execution if the head is null, if target_item_index is an negative value or target_item_index is greater than list size
    if (this.head === null) return false;

    // we are not moving the actual inked list head for search items
    let tempHead: ListNode | null = this.head;

    // loop until a list item contains the target data
    for (let i = 0; i < this.size; i++) {
      if (tempHead === null) return false;

      if (tempHead.value === target_item_data) {
        // here i is the index of the target list item. so we remove the list item by call the removeItemByIndex method by parsing the target item index
        this.removeItemByIndex(i);
        break;
      }

      tempHead = tempHead.nextNode;
    }

    return false;
  }

  //   print all the elements in the linked list
  public printList(): void {
    let tempHead: ListNode | null = this.head;

    let items: string[] = [];

    while (tempHead !== null) {
      items.push(`[${tempHead.value}]`);
      tempHead = tempHead.nextNode;
    }

    console.log("\n", "List => ", items, "\n");
  }
}

// List item class
class ListNode {
  //   reference to the next list item
  nextNode: ListNode | null;

  //   value of the list item
  value: number;

  constructor(value, nextNode) {
    this.value = value;
    this.nextNode = nextNode;
  }

  getValue(): number {
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
console.log("== Removing item by index : index -> 4 ==");
linkedList.printList();

// removing item by index
linkedList.removeItemByData(10);
console.log("== Removing item by data : data -> 10  ==");
linkedList.printList();
