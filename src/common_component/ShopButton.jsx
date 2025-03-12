import React from "react";
import styles from './ShopButton.module.css'

//쇼핑몰 프로젝트에 사용할 버튼 컴포넌트
//...props : 앞에서 직접 선언하지 않는 나머지 데이터를 받음
const ShopButton = ({title = '버튼', size = 'normal', click}) => {
  return (
    <>
      <button type="button" 
              className={[styles.btn, styles[size]].join(' ')}
              onClick={click}
      >{title}
              </button>
    </>
  );
};

export default ShopButton;
