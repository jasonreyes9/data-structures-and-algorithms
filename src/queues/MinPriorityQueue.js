class Node {
  constructor(value, priority) {
    this.value = value
    this.priority = priority
  }
}

export class MinPriorityQueue {
  constructor() {
    this.heap = []
  }

  isEmpty() {
    return this.heap.length === 0
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.heap[0].value
  }

  #swap(index1, index2) {
    let temp = this.heap[index1]
    this.heap[index1] = this.heap[index2]
    this.heap[index2] = temp
  }

  #getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  #bubbleUp(indexOfInsertedNode = this.heap.length - 1) {
    let indexOfParentNode = this.#getParentIndex(indexOfInsertedNode)

    const isNotFirstElement = indexOfInsertedNode > 0
    while (true && isNotFirstElement) {
      const valueOfInsertedNode = this.heap[indexOfInsertedNode]
      const valueOfParentNode = this.heap[indexOfParentNode]

      const areWeAtTheEnd = !valueOfParentNode
      if (areWeAtTheEnd) {
        break
      }

      // Less priority value means higher priority
      // This is how a MinPriorityQueue works
      const hasChildHigherPriority =
        valueOfParentNode.priority > valueOfInsertedNode.priority

      if (hasChildHigherPriority) {
        this.#swap(indexOfInsertedNode, indexOfParentNode)

        let tempIndex = indexOfParentNode
        indexOfInsertedNode = indexOfParentNode
        indexOfParentNode = this.#getParentIndex(tempIndex)

        continue
      }

      break
    }
  }

  enqueue(value, priority) {
    const newNode = new Node(value, priority)

    this.heap.push(newNode)
    this.#bubbleUp()
  }

  #getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1
  }

  #getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2
  }

  #bubbleDown(indexToBubbleDown = 0) {
    while (true) {
      const leftChildIndex = this.#getLeftChildIndex(indexToBubbleDown)
      const rightChildIndex = this.#getRightChildIndex(indexToBubbleDown)

      const currentNodePriority = this.heap[indexToBubbleDown]?.priority
      const leftChildPriority = this.heap[leftChildIndex]?.priority
      const rightChildPriority = this.heap[rightChildIndex]?.priority

      const isCurrentNodeLessPriorityThanBothChildren =
        currentNodePriority &&
        leftChildPriority &&
        rightChildPriority &&
        currentNodePriority > leftChildPriority &&
        currentNodePriority > rightChildPriority

      if (isCurrentNodeLessPriorityThanBothChildren) {
        if (leftChildPriority < rightChildPriority) {
          this.#swap(leftChildIndex, indexToBubbleDown)
          indexToBubbleDown = leftChildIndex
          continue
        }

        if (rightChildPriority < leftChildPriority) {
          this.#swap(rightChildIndex, indexToBubbleDown)
          indexToBubbleDown = rightChildIndex
          continue
        }
      }

      // Here we now both can't be less than the current node
      // aka we know only one of the cases below will be true

      if (leftChildPriority < currentNodePriority) {
        this.#swap(leftChildIndex, indexToBubbleDown)
        indexToBubbleDown = leftChildIndex
        continue
      }

      if (rightChildPriority < currentNodePriority) {
        this.#swap(rightChildIndex, indexToBubbleDown)
        indexToBubbleDown = rightChildIndex
        continue
      }

      break
    }
  }

  size() {
    return this.heap.length
  }

  dequeue() {
    if (this.isEmpty()) {
      return null
    }

    if (this.heap.length === 1) {
      const lastNode = this.heap.pop()
      return lastNode.value
    }

    const lastItem = this.heap.pop()
    const firstItem = this.heap[0]

    this.heap[0] = lastItem
    this.#bubbleDown()

    return firstItem.value
  }

  #getIndexOfLastNonLeafNode() {
    const indexOfLastItem = this.heap.length - 1
    return this.#getParentIndex(indexOfLastItem)
  }

  heapify(array) {
    this.heap = array

    let indexOfLastNonLeafNode = this.#getIndexOfLastNonLeafNode()

    while (indexOfLastNonLeafNode >= 0) {
      this.#bubbleDown(indexOfLastNonLeafNode)
      indexOfLastNonLeafNode--
    }
  }

  updatePriority(value, priority) {
    const nodeIndex = this.heap.findIndex((node) => node.value === value)
    if (nodeIndex === -1) {
      return null
    }

    const hasPriorityIncreased = priority <= this.heap[nodeIndex].priority
    const hasPriorityDecreased = priority >= this.heap[nodeIndex].priority

    if (hasPriorityIncreased) {
      this.heap[nodeIndex].priority = priority
      this.#bubbleUp(nodeIndex)
      return
    }

    if (hasPriorityDecreased) {
      this.heap[nodeIndex].priority = priority
      this.#bubbleDown(nodeIndex)
      return
    }
  }
}
