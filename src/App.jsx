import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './components/UserLayout'
import AdminLayout from './components/AdminLayout'
import MyItemForm from './components/MyItemForm'
import CateManage from './components/CateManage'
import UserJoin from './components/UserJoin'
import Login from './components/Login'
import StorageTest from './components/practice/StorageTest'
import { useEffect, useState } from 'react'
import UploadTest from './components/practice/UploadTest'


function App() {
  //로그인 정보를 저장할 state 변수
  const [loginInfo, setLoginInfo] = useState(null);

  /**
   * 로그인하면
   * 1. loginInfo 변수에 로그인 정보 저장
   * 2. sessionStorage에도 로그인 정보를 저장
   * 
   * 새로고침하면
   * 1. loginInfo 변수의 데이터는 초기화
   * 2. sessionStorage에 저장된 데이터는 유지됨
   * 3. App.jsx를 다시 읽고 -> useExffect 실행 -> sessionStorage에 있는 로그인 정보를 가져와서 loginInfo 변수에 다시 넣어줌
   */

  //Login.jsx에서 로그인을 성공하면 setLoginInfo() 함수를 이용해서
  //로그인한 정보를 loginInfo 변수에 저장된다.
  //하지만 이 상태에서 새로고침(f5)하면 loginInfo변수에 저장된 로그인 정보가 사라진다
  //그래서 새로고침 하더라도 sessionStorage에 저장된 데이터로 로그인 정보를 유지시켜 주기위해
  // 아래의 useEffect에서 한 번 더 로그인 정보를 가져온다.
  useEffect(() => {
    //sessionStorage에 있는 loginData 데이터 가져오기
    //loginData 데이터가 없다면 로그인 안 한 것 -> null
    //loginData 데이터가 있다면 로그인 한 것
    //이렇게 가져온 데이터는 json 형태
    const strLoginData = sessionStorage.getItem('loginData')

    //sessionStorage에 로그인 정보가 있으면
    if(strLoginData != null){
      //sessionStorage에서 받은 json 데이터를 객체로 변환한다.
      //변환된 loginInfo 객체에는 로그인한 회원의 아이디, 이름, 권한 정보가 들어있다. 
      setLoginInfo(JSON.parse(strLoginData));
    }
  }, [])

  return (
    
    <div className='container'>
      <UploadTest />
      {/* <StorageTest /> */}

      <Routes>
        {/* 유저가 접속하는 페이지 */}
        <Route path='/' element={ <UserLayout loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>}>

          {/* 상품 목록 페이지 */}
          <Route path='' element={  <div>상품 목록 페이지</div> } />
          {/* 상품 상세 페이지 */}
          <Route path='detail' element={  <div>상품 상세 페이지</div> } />
          {/* 회원 등록 페이지 */}
          <Route path='join' element={ <UserJoin /> }/>
          {/* 로그인 */}
          <Route path='login' element={ <Login setLoginInfo={setLoginInfo}/> }/>

        </Route>
          

        {/* 관리자가 접속하는 페이지 */}
        <Route path='/admin' element={ <AdminLayout loginInfo={loginInfo} setLoginInfo={setLoginInfo}/> }>

          {/* 상품등록 */}
          <Route path='reg-item' element={ <MyItemForm/> } />
          {/* 회원관리 */}
          <Route path='user-manage' element={<div>회원 관리</div>}/>
          {/* 카테고리 관리 */}
          <Route path='cate-manage' element={ <CateManage/> }/>
          
        </Route>
      </Routes>
    </div>
  )
}

export default App
