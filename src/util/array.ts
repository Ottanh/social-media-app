
export const arrRemove = <T>(element: T, array: [T]) => {
  const copyArr = [...array];
  const index = copyArr.indexOf(element);
  copyArr.splice(index, 1);
  return copyArr;
};