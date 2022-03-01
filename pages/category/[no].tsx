import { useRouter } from "next/router";
import Loader from "../../src/components/common/Loader";

const Category = () => {
  const router = useRouter();
  const categoryNo = router.query.no;

  return (
    <div>
      <h2>Category Name {categoryNo}</h2>
      <hr />
      게시글 리스트
      <Loader isLoading={true}>
        <ul>
          <li></li>
        </ul>
      </Loader>
    </div>
  );
};

export default Category;
