export const removeDuplicate = (arr: string[]): string[] => {
	  return arr.filter((item, index) => arr.indexOf(item) === index);
}
