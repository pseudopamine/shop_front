import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './components/UserLayout'
import AdminLayout from './components/AdminLayout'
import MyItemForm from './components/MyItemForm'
import CateManage from './components/CateManage'
import UserJoin from './components/UserJoin'
import Login from './components/Login'
import StorageTest from './components/practice/StorageTest'


function App() {

  return (
    <div className='container'>
      {/* <StorageTest /> */}

      <Routes>
        {/* 유저가 접속하는 페이지 */}
        <Route path='/' element={ <UserLayout />}>

          {/* 상품 목록 페이지 */}
          <Route path='' element={  <div>상품 목록 페이지</div> } />
          {/* 상품 상세 페이지 */}
          <Route path='detail' element={  <div>상품 상세 페이지</div> } />
          {/* 회원 등록 페이지 */}
          <Route path='join' element={ <UserJoin /> }/>
          {/* 로그인 */}
          <Route path='login' element={ <Login /> }/>

        </Route>
          

        {/* 관리자가 접속하는 페이지 */}
        <Route path='/admin' element={ <AdminLayout /> }>

          {/* 상품등록 */}
          <Route path='reg-item' element={ <MyItemForm/> }/>
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
