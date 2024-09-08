import { Favorite } from "@mui/icons-material";
import { IComment } from "../../util/interface";
import CalcDate from "../CalcDate/CalcDate";
import { useState } from "react";

interface ICommentID extends IComment {
  id: string | undefined;
}

const Comment = (item: ICommentID) => {
  const date = CalcDate(item.date);

  const [like, setLike] = useState(item.like);

  const handleClick = () => {
    setLike((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex items-center pt-4 pb-2 border-t">
        <div className="w-8 h-8 rounded-[100%] bg-black mr-2.5 "></div>
        <div className="text-[14px]">
          <div>{item.user}</div>
          <div className="text-[10px]">{date}</div>
        </div>
      </div>
      <div className="pb-2">{item.comment}</div>
      <div onClick={handleClick} className="text-[12px] text-[#6b6b6b] pb-4">
        {like ? (
          <>
            <Favorite className="mr-1 text-red-300" />
            {like}
          </>
        ) : (
          <>
            <Favorite className="mr-1 text-gray-300" />
            {like}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
