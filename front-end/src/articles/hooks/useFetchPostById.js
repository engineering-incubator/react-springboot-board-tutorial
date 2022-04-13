import axios from "axios";
import { useEffect, useState } from "react";
import { isSuccess } from "../../utilites/validates/httpValidation";

export function useFetchPostById(id) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        const res = await axios.get(`/api/v1/articles/${id}`);
        if (!isSuccess(res)) {
          return alert(res.data.message);
        }
        setPost(res.data.content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return [post, setPost];
}
