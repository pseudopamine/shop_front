
//외부 파일에서 선언한 변수 및 함수를 사용하기 위해서는
//export(내보내기)와 import(가져오기)를 적절히 사용해야함.

import axios from "axios"

//첫번째 방식(export default)
//export default는 파일당 하나만 사용 가능
//export default로 내보낸 데이터는 사용할 때 이름을 변경해서 받을 수 있다.

//두번째 방식
//변수나 함수 앞에 export 키워드만 붙여서 내보내는 것이 가능
//장점 : export default와 달리 필요한 만큼 사용 가능
//export로 내보내진 데이터는 사용시 반드시 동일한 이름으로만 사용 가능
//export로 내보내진 데이터는 import시 중괄호 안에 데이터 이름을 가져감


//해당 파일에 도서 카테고리와 도서 관련 axios 기능을 모아놓음

/**
 * 카테고리 목록 조회
 */
export const getCategoryList = () => {
  const response = axios.get('/api/categories')
  return response;
}


/**
 * 카테고리 등록
 * params : 신규 등록되는 카테고리명(문자열)
 */
export const insertCategory = (newCatename) => {
  const response = axios.post('/api/categories', {cateName : newCatename})
  return response;
}

/**
 * 도서 등록
 * param : 등록할 도서 데이터(객체)
 *{
    cateCode : 1,
    bookName : '',
    bookPrice : 0,
    publisher : '',
    bookInfo : ''
  }
 * 
 */

//자바로 데이터를 전달할 때 문자뿐만 아니라 파일 데이터도 가져간다는 것을 설정
const fileConfig = {
  header : {'Content-Type' : 'multipart/form-data'}
};

export const insertBook = (bookData) => {
  const response = axios.post('/api/books', bookData, fileConfig)
  return response;
}

