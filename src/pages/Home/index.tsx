import axios from "axios";
import { useEffect, useState } from "react";
import { IOneContent, Itiptap } from "../../util/interface";
import ContentList from "../../component/ContentList/ContentList";
import More from "../../component/More/More";
import ContentBookmarkList from "../../component/ContentSaveList/ContentBookmarkList";

const Home = () => {
  const [data, setData] = useState<Itiptap>();
  const [bookmarkList, setBookmarkList] = useState<Itiptap>();
  console.log("saveList ===>", bookmarkList);

  const fetchData = async () => {
    const data = await axios.get("http://localhost:3001/tiptap");
    setData(data.data);
  };

  const deleteData = async (id: string) => {
    await axios.delete("http://localhost:3001/tiptap/" + id);
    const res = data?.filter((item) => item.id !== id);
    setData(res);
  };

  useEffect(() => {
    const localBookmarkList = localStorage.getItem("bookmark");

    if (localBookmarkList) {
      setBookmarkList(JSON.parse(localBookmarkList));
    }
    fetchData();
  }, []);

  const addSaveList = (item: IOneContent, checkSave: boolean) => {
    if (checkSave) {
      if (bookmarkList) {
        const res = [...bookmarkList, item];
        setBookmarkList(res);
        localStorage.setItem("bookmark", JSON.stringify(res));
      } else {
        const res = [item];
        setBookmarkList(res);
        localStorage.setItem("bookmark", JSON.stringify(res));
      }
    } else {
      if (bookmarkList) {
        const res = bookmarkList?.filter((el) => el.id !== item.id);
        setBookmarkList(res);
        localStorage.setItem("bookmark", JSON.stringify(res));
      }
    }
  };

  return (
    <div className="max-w-[1338px] mx-auto">
      <div className="grid lg:grid-cols-10 grid-cols-6 grid-flow-col min-h-[calc(100vh_-_54px)] mx-auto min-w-[640px]">
        <div className=" col-span-6  mt-5">
          {data?.map((item: IOneContent) => {
            return (
              <ContentList
                key={item.id}
                id={item.id}
                title={item.title}
                content={item.content}
                date={item.date}
                like={item.like}
                comments={item.comments}
                onDelete={deleteData}
                addSaveList={addSaveList}
              />
            );
          })}
        </div>
        <div className="h-fit hidden lg:grid col-span-4 mt-5 pt-5 px-6">
          <More />
          <div className="mb-4">
            <h1 className="pb-3">Recently saved</h1>
            {bookmarkList?.map((item) => {
              return (
                <ContentBookmarkList
                  key={item.id}
                  title={item.title}
                  id={item.id}
                  content={item.content}
                  date={item.date}
                  like={item.like}
                  comments={item.comments}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
