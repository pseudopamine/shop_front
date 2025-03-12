import React, { useEffect, useState } from "react";
import ShopInput from "../common_component/ShopInput";
import ShopButton from "../common_component/ShopButton";
import axios from "axios";
import { getUserId, joinUserData } from "../apies/userApi";
import ShopSelect from "../common_component/ShopSelect";


const UserJoin = () => {
  //id 입력이 잘못되었을 때 나타나는 에러 메세지
  const [errorMsg, setErrorMsg] = useState({
    userId : '',
    userPw : ''
  });

  //회원 ID 정보를 저장할 state 변수
  const [userIdList, setUserIdList] = useState({});

  //회원 ID 정보를 재조회할 state 변수
  const [userIdTrigger, setUserIdTrigger] = useState({});

  //회원 가입 정보를 받아서 저장할 state 변수
  const [userInfo, setUserInfo] = useState({
    userId : '',
    userPw : '',
    userName : '',
    userEmail : '', //완성된 이메일
    email1 : '',
    email2 : '@gmail.com',
    userTel : '', //완성된 연락처 010-0000-0000
    tel1 : '',
    tel2 : '',
    tel3 : ''
  });

  //email1, email2 값이 변경될 때만 실행되는 함수
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      'userEmail' : userInfo.email1 + userInfo.email2
    })
  }, [userInfo.email1, userInfo.email2]);

  //tel1, tel2, tel3 값이 변경될 때만 실행되는 함수
  useEffect(() => {
    setUserInfo({
      ...userInfo,
      'userTel' : [userInfo.tel1, userInfo.tel2, userInfo.tel3].join('-')
    })
  }, [userInfo.tel1, userInfo.tel2, userInfo.tel3]);

  //input으로 받은 정보를 받을 함수
  const userAllData = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name] : e.target.value
    })
  }

  // //회원가입 전 회원 ID 중복 검사를 위한 회원ID 목록 조회
  // useEffect(() => {
  //   getUserId()
  //   .then(res => {
  //     console.log(res.data)
  //     setUserIdList(res.data)
  //   })
  //   .catch(error => console.log(error))
  // }, []);


  //회원가입 전 유효성 검사
  const joinValidate = () => {
    let result = 0;

    setErrorMsg(state => {
      return {
        userId : '',
        userPw : '',
        userTel : ''
      }
    })

    //4~16글자의 영문자로만 이루어진 정규식
    const regex_id = /^[a-zA-Z]{4,16}$/;
    if(!regex_id.test(userInfo.userId)){
      result = 1;
      setErrorMsg((state) => {
        return {
          ...state,
          userId : '잘못된 ID입니다.'
        }
      });
    }

    //비밀번호 정규식
    //영어는 소문자나 대문자+숫자는 포함
    const regex_pw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
    if(!regex_pw.test(userInfo.userPw)){
      result = 1;
      setErrorMsg(state => {
        return {
          ...state,
          userPw : '잘못된 비밀번호 형식입니다.'
        }
      });
    }

    //연락처 정규식
    const regex_tel = /^(01[0-9]-\d{3,4}-\d{4}|0\d{1,2}-\d{3,4}-\d{4})$/;
    if(!regex_tel.test(userInfo.userTel)){
      result = 1;
      setErrorMsg(state => {
        return {
          ...state,
          userTel : '옳지 않은 연락처입니다.'
        }
      });
    }

    return result;
  }


  //클릭 시 회원 등록 데이터를 내보낼 함수
  const insertUserData = () => {
    //유효성 검사
    const result = joinValidate();

    if(result === 1){
      joinUserData(userInfo)
      .then(res => {
        if(res.data){
          alert('등록되었습니다.')
          //회원ID목록 재조회
          // setUserIdTrigger({})
          // setErrorMsg('')
        }
        else{
          setErrorMsg({
            ...errorMsg,
            userId : '이미 등록된 ID입니다.'
          })
        }
        
      })
      .catch(error => console.log(error));
    }
  }


  return (
    <>
      <div>회원가입</div>
      <table>
        <tbody>
          <tr>
            <td>I D</td>
            <td>
              <ShopInput size='wide' name='userId' value={userInfo.userId} onChange={e => userAllData(e)}/>
              {errorMsg.userId && <p className="error-msg">{errorMsg.userId}</p>}
            </td>
          </tr>
          <tr>
            <td>패스워드</td>
            <td>
              <ShopInput type="password" size='wide' name='userPw' value={userInfo.userPw} onChange={e => userAllData(e)}/>
              {errorMsg.userPw && <p className="error-msg">{errorMsg.userPw}</p>}
            </td>

          </tr>
          {/* <tr>
            <td>패스워드확인</td>
            <td><ShopInput type="password" size='wide' name='userPw' value={userInfo.userPw} onChange={e => userAllData(e)}/></td>
          </tr> */}
          <tr>
            <td>이름</td>
            <td><ShopInput size='wide' name='userName' value={userInfo.userName} onChange={e => userAllData(e)}/></td>
          </tr>
          <tr>
            <td>이메일</td>
            <td><ShopInput name='email1' value={userInfo.email1} onChange={e => userAllData(e)}/>
            <ShopSelect name='email2' value={userInfo.email2} onChange={e => userAllData(e)}>
              <option value="@gmail.com">@gmail.com</option>
              <option value="@naver.com">@naver.com</option>
            </ShopSelect>
            </td>
          </tr>
          <tr>
            <td>전화번호</td>
            <td>
              <ShopInput name='tel1' value={userInfo.tel1} onChange={e => userAllData(e)}/>
              <ShopInput name='tel2' value={userInfo.tel2} onChange={e => userAllData(e)}/>
              <ShopInput name='tel3' value={userInfo.tel3} onChange={e => userAllData(e)}/>
              {errorMsg.userTel && <p className="error-msg">{errorMsg.userTel}</p>}
            </td>
          </tr>
        </tbody>
      </table>
      <ShopButton title="회원가입" click={() => {insertUserData()}}/>
    </>
  );
};

export default UserJoin;
