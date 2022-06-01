# react-springboot-board-tutorial
---
### 순서  
- 📃 [API 인터페이스 확인하는 법](https://github.com/engineering-incubator/react-springboot-board-tutorial/tree/ynw#api%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4-%ED%99%95%EC%9D%B8%ED%95%98%EB%8A%94-%EB%B2%95)  
- 📌 [Features](https://github.com/engineering-incubator/react-springboot-board-tutorial/tree/ynw#features)  
- 🪄 [결과물](https://github.com/engineering-incubator/react-springboot-board-tutorial/tree/ynw#%EA%B2%B0%EA%B3%BC%EB%AC%BC)  
- 🔗 [배움 기록](https://github.com/ynawhocodes/engineering-incubator-note)  
---
### API 인터페이스 확인하는 법

1. Tomcat 서버를 실행시킨다. (intelliJ로 실행을 시키거나 ./gradlew bootRun 명령어를 통해 실행시킨다.)
2. 실행되면 [API 인터페이스](http://localhost:11001/api/swagger-ui/index.html) 를 통해 확인한다

### Features

- [ ] 회원가입
  - [ ] 권한은 ADMIN/MANAGER/USER 세가지 중 하나로만 가입할 수 있다.
    ```json
    {
      "username": "example-id",
      "password": "example-password",
      "permission": "ADMIN | MANAGER | USER",
      "email": "example@example.com",
      "phoneNumber": "010-xxxx-xxxx"
    }
    ```
  - [ ] 계정 아이디, 비밀번호, 이메일, 전화번호, 권한 등을 통해 가입할 수 있다.
    - 모든 필드는 필수 정보이다.
    - 클라이언트와 API 둘다 벨리데이션이 추가되어야 한다. 단, 정책이 달라도 무관하나, API 에서 Exception 발생 시, 클라이언트는 메세지를 노출 시켜 줘야 한다.
- [ ] 로그인
  - [ ] 계정 아이디, 비밀번호를 이용하여 로그인할 수 있어야 한다.
    ```json
    {
      "username": "example-id",
      "password": "example-password"
    }
    ```
    - JWT ? Session
  - [ ] 벨리데이션을 추가하되, API 에서 Exception 발생 시, 클라이언트는 메세지를 노출 시켜 줘야 한다.
- [ ] 게시글 생성 하기(CREATE)
  - [ ] 관리자만 생성할 수 있다.
  - [ ] 제목, 설명을 입력할 수 있다.
    ```json
    {
      "title": "example-title",
      "content": "example-content"
    }
    ```
- [ ] 게시글 리스트 읽기(READ)
  - [ ] 모든 회원(익명 사용자 포함. 로그인하지 않은)은 리스트를 볼 수 있어야 한다.
  - [ ] 게시글 번호, 제목, 날짜, 작성자, 조회수 등이 노출되어야 한다.
- [ ] 게시글 상세보기(READ)
  - [ ] 로그인한 회원은 상세 글을 볼 수 있어야 한다.
  - [ ] 게시글 번호, 제목, 설명, 날짜, 작성자, 조회수 등이 노출되어야 한다.
- [ ] 게시글 삭제(DELETE)
  - [ ] 본인 혹은 ADMIN 권한을 가진 사람은 글을 삭제할 수 있어야 한다.
    ```json
    {
      "article_id": 123
    }
    ```
- [ ] 게시글 수정(UPDATE)
  - [ ] 본인 혹은 ADMIN 권한을 가진 사람은 글을 수정할 수 있어야 한다.
    ```json
    {
      "article_id": 123,
      "title": "example-title",
      "content": "example-content"
    }
    ```

### 결과물

