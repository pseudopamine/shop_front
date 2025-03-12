import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './CateManage.module.css'
import * as bookApi from '../apies/bookApi';

const CateManage = () => {
  //카테고리 정보를 저장할 state 변수
  const [cateInfo, setCateInfo] = useState([]);

  //input으로 받은 카테고리명을 저장하는 state 변수
  const [newCateName, setNewCateName] = useState('');

  //카테고리 목록 재조회 실행을 위한 변수
  const [categoryTrigger, setCategoryTrigger] = useState({});

  //오류 메세지를 저장할 변수
  const [errorMsg, setErrorMsg] = useState('');

  //모든 카테고리 정보를 받아온다
  useEffect(() => {
    bookApi.getCategoryList()
    .then(res => {
      console.log(res.data)
      setCateInfo(res.data)
    })
    .catch(error => console.log(error));
  }, [categoryTrigger]);

  //클릭 시 카테고리 정보를 내보낼 함수
  const postCateData = () => {
    //카테고리명 입력 안 했으면 중지
    if(newCateName === ''){
      setErrorMsg('카테고리명은 최소 한 글자 이상입니다.')
      return;
    }
    bookApi.insertCategory(newCateName)
        .then(res => {
          //등록 여부에 따라 다른 코드 진행
          if(res.data === 1){
            alert('등록 성공')
            //카테고리 목록을 다시 조회
            setCategoryTrigger({})
            //input태그에 작성한 값을 초기화
            setNewCateName('')
            setErrorMsg('')
          }
          else{
            setErrorMsg('이미 등록된 카테고리명입니다. ')
          }
        })
        .catch(error => console.log(error));
  }

  return (
    <>
      <div>카테고리 등록</div>
      <div>
        <input type="text" value={newCateName} onChange={(e) => {
          setNewCateName(e.target.value)
        }
          } onKeyDown={(e) => {
            if(e.key === 'Enter'){
              postCateData()}
            }}/>
        <button type="button" onClick={() => {postCateData()}}>카테고리 등록</button>
        {
          errorMsg && 
          <p className={styles.error_p}>{errorMsg}</p>
        }
      </div>
      <div>
        <h4>카테고리 목록</h4>
        <table border={1}>
          <thead>
            <tr>
              <td>No</td>
              <td>카테고리 코드</td>
              <td>카테고리명</td>
              <td>수정</td>
              <td>삭제</td>
            </tr>
          </thead>
          <tbody>
            {
              cateInfo.map((cate, i) => {
                return(
                  <tr key={i}>
                    <td>{cateInfo.length - i}</td>
                    <td>{cate.cateCode}</td>
                    <td>
                      <input type="text" value={cate.cateName}/>
                    </td>
                    <td>
                      <button type="button">수정</button>
                    </td>
                    <td>
                      <button type="button">삭제</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CateManage;
