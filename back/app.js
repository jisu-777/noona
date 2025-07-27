const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const cors = require('cors')
const indexRouter = require('./routes/index');
const app =express()
require('dotenv').config
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD

app.use(bodyParser.json())
app.use(cors())
app.use("/api", indexRouter)
// api로 호출하면 인덱스로 갈거고
// task로 가면 task.api로 가는거
// 슬래시 api는 써도 되고 안써도 되고


const mongoURI  = MONGODB_URI_PROD

mongoose.connect(mongoURI,{useNewUrlParser:true
}).then(()=>{console.log("mongoose connected")
}).catch((err)=>{
  console.log("DB connection fail", err)
})

app.listen (process.env.PORT ||5000, () => {
  console.log("server on 5000");})


  
// 로그인
// 1. 회원가입  
// 유저가 이메일 패스워드 유저이름 입력해서 보냄
// 받은 정보를 저장함(데이터베이스 모델 필요)
// 패스워드를 암호화 시켜서 저장



// 1) 라우터
// 2) 모델
// 3) 데이터를 저장 (이미 가입된 유저 유무, 패스워드 암호화)
// 4) 응답을 보낸다.

// 2. 로그인  

// 이메일, 패스워드를 입력해서 보냄
// 데이터베이스에 해당 이메일과 패스워드를 가진 유저가 있는지 확인
// 없으면 로그인 실패
// 있다면? 유저정보 + 토큰
// 프론트엔드에서는 이 정보를 저장1

// 1. 라우터 설정
// 2. 이메일 패스워드 정보 읽어오기
// 3. 이메일을 가지고 유저정보 가져오기
// 4. 이 유저에 디비에 있는 패스워드와 프론트엔드가 보낸 패스워드가 같은지 비교
// 5. 맞다! 그러면 토큰 발행
// 6. 틀리면 에러메세지 보냄
// 7. 응답으로 유저정보 + 토큰 보냄

// 3. 유저 권한확인 (투두페이지는 로그인한 유저만! 들어갈 수 있다)  
// 4. 내가 이미 로그인한 유저라면 추가 로그인 없이 바로 메인페이지로 돌아오기

})

