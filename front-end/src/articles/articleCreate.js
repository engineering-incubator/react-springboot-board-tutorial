import React from "react";
export default function ArticleCreate() {
  return (
    <form>
      <h1>글 작성하기</h1>
      <div>
        <h5>제목</h5>
        <input type="text" placeholder="제목을 입력해주세요." />
      </div>
      <div>
        <h5>내용</h5>
        <textarea placeholder="글 내용을 입력해주세요." />
      </div>
      <button type="submit">등록하기</button>
    </form>
  );
}
