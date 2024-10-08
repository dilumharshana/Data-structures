class Stack {
  private stack: number[] = [];
  private peek: number = -1;

  public insert(input: number): boolean {
    if (!this.isEmpty) return false;

    this.peek++;
    this.stack.push(input);
    return true;
  }

  public delete(): boolean {
    if (this.isEmpty()) return false;

    this.stack.pop();
    this.peek--;

    return true;
  }

  public getPeek(): number {
    return this.peek;
  }

  public isEmpty(): boolean {
    return this.peek === -1;
  }

  public printStack(): void {
    for (let element of this.stack) {
      console.log(element);
    }
  }
}

const stack: Stack = new Stack();

console.log("============= Inserting elements in to stack ===========");

for (let i = 10; i <= 100; i += 10) {
  stack.insert(i);
}

stack.printStack();

console.log("============= Deleting elements in to stack ===========");

stack.delete();
stack.delete();
stack.delete();
stack.delete();

stack.printStack();

console.log("============= Getting peek of the stack ===========");

console.log("Peek index => ", stack.getPeek());

console.log("============= Checking isEmpty functionality ===========");

for (let i = stack.getPeek(); i > -2; i--) {
  const result = stack.delete();

  if (result == false) {
    console.log("Stack is empty no items to remove !");
  }
}
