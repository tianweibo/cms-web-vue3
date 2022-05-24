export default function exchangeDetail(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) { // 相邻元素两两对比，元素交换，大的元素交换到后面
      if (arr[j].ruleOrder > arr[j + 1].ruleOrder) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
