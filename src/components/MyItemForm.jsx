import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCategoryList, insertBook } from "../apies/bookApi";
import ShopInput from "../common_component/ShopInput";
import ShopButton from "../common_component/ShopButton";

//상품 등록 컴포넌트
const ItemForm = () => {
  //입력받은 책 정보를 저장할 state 변수
  const [bookData, setBookData] = useState({
    cateCode : 1,
    bookName : '',
    bookPrice : 0,
    publisher : '',
    bookInfo : ''
  });

  //카테고리 정보를 저장할 state 변수
  const [category, setCategory] = useState([])

  //카테고리 목록 조회
  useEffect(() => {
    getCategoryList()
    .then(res => {
      console.log(res.data)
      setCategory(res.data)
    })
    .catch(error => console.log(error));
  }, []);

  //input으로 입력받은 데이터를 받는 함수
  const changeBookData = (e) => {
    setBookData({
      ...bookData,
      [e.target.name] : e.target.value
    })
  }

  //클릭 시 데이터를 내보내는 기능의 함수
  const insertBookData = () => {
    if(!confirm('등록하시겠습니까')){
      return;
    }
    insertBook(bookData)
        .then(res => {
          console.log(res.data)
          alert('등록되었습니다.')
        })
        .catch(error => console.log(error));
  }


  console.log(bookData)
  //상품 등록 컴포넌트
  //도서명 input
  //가격 input
  //풀판사 input
  //책 소개 textarea
  //카테고리 코드 select
  return (
    <>
      <p>상품등록</p>
      <div>
        <table>
          <tbody>
            <tr>
              <td>분 류</td>
              <td>
                <select name="cateCode" value={bookData.cateCode} onChange={(e) => {changeBookData(e)}}>
                  {
                    category.map((cate, i) => {
                      return(
                        <option key={i} value={cate.cateCode}>{cate.cateName}</option>
                      )
                    })
                  }
                </select>
              </td>
            </tr>
            <tr>
              <td>제 목</td>
              <td>
                <ShopInput name='bookName' value={bookData.bookName} onChange={(e) => {changeBookData(e)}}/>
              </td>
            </tr>
            <tr>
              <td>출판사</td>
              <td>
                <ShopInput name="publisher" value={bookData.publisher}  onChange={(e) => {changeBookData(e)}}/>
              </td>
            </tr>
            <tr>
              <td>가 격</td>
              <td>
                <ShopInput name="bookPrice"  value={bookData.bookPrice} onChange={(e) => {changeBookData(e)}}/>
              </td>
            </tr>
            <tr>
              <td>머릿말</td>
              <td>
                <textarea type="text" name="bookInfo" value={bookData.bookInfo} onChange={(e) => {changeBookData(e)}}/>
              </td>
            </tr>
            <tr>
              <td>도서이미지</td>
              <td>
                <input type='file'/>
              </td>
            </tr>
          </tbody>
        </table>
        <ShopButton title="등록하기" size="normal" click={(e) => {insertBookData()}}/>
      </div>
    </>
  );
};

export default ItemForm;
