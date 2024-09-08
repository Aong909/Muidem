import { Link } from "react-router-dom";
import { IOneContent } from "../../util/interface";
import CalcDate from "../CalcDate/CalcDate";

const ContentBookmarkList = (data: IOneContent) => {
  const date = CalcDate(data.date);
  return (
    <div className="pb-5">
      <Link to={`/content/${data.id}`}>
        <div className="flex mb-2">
          <div className="bg-black w-[18px] h-[18px] rounded-[4px]"></div>
          <div className="text-[#242424] text-[13px] ml-2">user name</div>
        </div>
        <div className=" text-[16px] font-bold mb-2">{data.title}</div>
        <div className=" text-[13px] text-[#6b6b6b]">{date}</div>
      </Link>
    </div>
  );
};

export default ContentBookmarkList;
