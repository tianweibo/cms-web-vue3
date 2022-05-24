interface DisabledList {
  remainHours: number[];
  remainMinutes: number[];
  remainSeconds: number[];
}
function useDisabledTime(): DisabledList{

  const miniutes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
  const currentHours: number = new Date().getHours();
  const currentMinutes: number = new Date().getMinutes();
  const currentSeconds: number = new Date().getSeconds();
  console.log(currentMinutes, currentSeconds)
  const remainHours: number[] = miniutes.filter((item) => item < currentHours);
  const remainMinutes: number[] = miniutes.filter((item) => item < currentMinutes);
  const remainSeconds: number[] = miniutes.filter((item) => item < currentSeconds);


  return {
    remainHours,
    remainMinutes,
    remainSeconds
  };
}

export default useDisabledTime;