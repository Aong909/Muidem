import { Link } from "react-router-dom";
import {
  SearchOutlined,
  DriveFileRenameOutlineOutlined,
  NotificationsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { Itiptap } from "../../util/interface";
import APIService from "../../service/APIs";

const Navbar = () => {
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<Itiptap>();
  const [filterData, setFilterData] = useState<Itiptap>();
  const [openSearchRes, setOpenSearchRes] = useState(false);

  const fetchData = async () => {
    const data = await APIService.getAllData();
    setData(data.data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
    filter(event.target.value);
  };

  const handleFocus = () => {
    fetchData();
    setFilterData([]);
    setOpenSearchRes(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setKeyword("");
      setOpenSearchRes(false);
    }, 100);
  };

  const handleClickLink = () => {
    setOpenSearchRes(false);
  };

  const filter = (key: string) => {
    let res;
    if (key) {
      res = data?.filter((item) => {
        if (item.title?.toLocaleLowerCase().includes(key.toLocaleLowerCase())) {
          return item;
        }
      });
    } else {
      res = [];
    }

    setFilterData(res);
  };

  return (
    <div className="min-w-[640px]">
      <div className="flex flex-row items-center px-6 border-b-2 ">
        <Link to={`/`}>
          <div className="text-[36px] font-bold mr-4">Muidem</div>
        </Link>
        <div className="flex grow relative">
          <SearchOutlined className="absolute top-[3px] left-[10px]" />
          <input
            type="text"
            className="bg-[#fafafa] rounded-[30px] h-[30px] ps-10 p-2.5 "
            value={keyword}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        <div className="mr-5">
          <Link to={"/write"}>
            <DriveFileRenameOutlineOutlined />
            <span>Write</span>
          </Link>
        </div>
        <div className="mr-5">
          <NotificationsOutlined />
        </div>
        <div>
          <AccountCircleOutlined />
        </div>
      </div>
      {openSearchRes && filterData?.length !== 0 && (
        <div className="bg-white absolute left-[170px] w-[280px] pt-2.5 px-2.5 rounded-sm shadow-md">
          <div className=" border-b-2 border-[#6b6b6b] mb-2 text-[20px] text-[#6b6b6b]">
            title
          </div>

          {filterData?.map((item) => {
            return (
              <div
                key={item.id}
                className="mb-2 text-[18px] max-h-[56px] shadow-md overflow-hidden"
                onClick={handleClickLink}
              >
                <Link to={`/content/${item.id}`}>
                  <div>{item.title}</div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Navbar;
