// /** kst Date객체를 반환 */
// export const getKstDate = () => {
//   const kstDate = useMemo(() => {
//     const date = new Date(); // 현재 날짜(로컬 기준) 가져오기
//     const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000; // utc 표준시 도출
//     const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
//     return new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
//   }, []);

//   return { kstDate };
// };

interface YearAndMonthType {
  year: number;
  month: number;
}

export const beforeOneMonth = ({ year, month }: YearAndMonthType): string => {
  if (year <= 1900) throw Error('under 1900 year');
  return `${month <= 1 ? year - 1 : year}-${month <= 1 ? 12 : month - 1}`;
};

export const nextOneMonth = ({ year, month }: YearAndMonthType): string => {
  return `${month >= 12 ? year + 1 : year}-${month >= 12 ? 1 : month + 1}`;
};

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
export const pascalMonth = (value: number): string => {
  return value < 10 ? '0' + value : value.toString();
};
