import { useState } from "react";

const More = () => {
  const recommendTopic = [
    "react",
    "immigration",
    "Design",
    "testing",
    "markets",
    "chatGPT",
    "psychology",
  ];

  const [follow1, setFollow1] = useState(false);
  const [follow2, setFollow2] = useState(false);
  const [follow3, setFollow3] = useState(false);
  return (
    <div>
      <div className="mb-4">
        <h1 className="pb-3">Recommended topics</h1>
        <div className="flex flex-wrap">
          {recommendTopic.map((item, index: number) => {
            return (
              <div
                key={index}
                className="bg-[#f2f2f2] text-[14px] px-4 py-2 mr-2 mb-2 rounded-[20px] hover:cursor-pointer capitalize"
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-4 ">
        <h1 className="pb-3">Who to follow</h1>
        <div className="flex h-16">
          <div className="flex">
            <div>
              <div className="bg-black w-8 h-8 rounded-full"></div>
            </div>
            <div className="ml-4 mr-2">
              <div className="text-[16px]">User Name</div>
              <span className="text-[13px] line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur quaerat ad reprehenderit, quam assumenda ab nam ut
                id veritatis earum rerum voluptates mollitia quis quasi aperiam!
                Distinctio officiis labore reprehenderit.
              </span>
            </div>
          </div>
          <div onClick={() => setFollow1((prev) => !prev)}>
            {follow1 ? (
              <div className="px-3 py-1.5 rounded-[20px] border border-black text-white bg-black">
                following
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-[20px] border border-black">
                follow
              </div>
            )}
          </div>
        </div>
        <div className="flex h-16">
          <div className="flex">
            <div>
              <div className="bg-black w-8 h-8 rounded-full"></div>
            </div>
            <div className="ml-4 mr-2">
              <div className="text-[16px]">User Name</div>
              <span className="text-[13px] line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur quaerat ad reprehenderit, quam assumenda ab nam ut
                id veritatis earum rerum voluptates mollitia quis quasi aperiam!
                Distinctio officiis labore reprehenderit.
              </span>
            </div>
          </div>
          <div onClick={() => setFollow2((prev) => !prev)}>
            {follow2 ? (
              <div className="px-3 py-1.5 rounded-[20px] border border-black text-white bg-black">
                following
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-[20px] border border-black">
                follow
              </div>
            )}
          </div>
        </div>
        <div className="flex h-16">
          <div className="flex">
            <div>
              <div className="bg-black w-8 h-8 rounded-full"></div>
            </div>
            <div className="ml-4 mr-2">
              <div className="text-[16px]">User Name</div>
              <span className="text-[13px] line-clamp-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur quaerat ad reprehenderit, quam assumenda ab nam ut
                id veritatis earum rerum voluptates mollitia quis quasi aperiam!
                Distinctio officiis labore reprehenderit.
              </span>
            </div>
          </div>
          <div onClick={() => setFollow3((prev) => !prev)}>
            {follow3 ? (
              <div className="px-3 py-1.5 rounded-[20px] border border-black text-white bg-black">
                following
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-[20px] border border-black">
                follow
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;
