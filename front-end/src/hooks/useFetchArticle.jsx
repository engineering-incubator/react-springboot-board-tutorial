export function useFetchArticle() {
  const params = useParams();
  const [article, setArticle] = useState({});
  useEffect(function fetchArticle() {
    (async function getItem() {
      const item = await getArticle(params.article_id);
      setArticle(item);
    })();
  }, []);

  return article;
}

export function useFetchArticleList() {
  const [articleList, setArticleList] = useState([]);
  useEffect(() => {
    async function getList() {
      const data = await getArticleList();
      setArticleList(data.items);
    }
    console.log(articleList);
    getList();
  }, []);
}
