import axios from "axios"

/**
 * 회원 등록
 * params : 신규 등록 회원 정보 (객체)
 * {
 * userId : '',
   userPw : '',
   userName : '',
   userEmail : '',
   userTel : ''
 * }
 */
   export const joinUserData = (userInfo) => {
      const response = axios.post('/api/users', userInfo)
      return response;
   }

   /**
    * 회원 ID 조회
    */
   export const getUserId = () => {
      const response = axios.get('/api/users')
      return response;
   }

   /**
    * 로그인
    * loginData {userId : 'aa', userPw : '11'}
    */
   export const loginUser = (loginData) => {
      const response = axios.get('/api/users/login',
                                 {params : loginData}
                                 )
      return response;
   }