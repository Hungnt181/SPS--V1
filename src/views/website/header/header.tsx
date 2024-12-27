import { Search16Filled } from "@fluentui/react-icons";
import "@css/website/header/header.css";
import { Input } from "@fluentui/react-northstar";
import { useState } from "react";

const HeaderWebsite = () => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <div className="header">
      <div className="headerForm">
        <Input
          icon={<Search16Filled />}
          placeholder="Tìm kiếm"
          iconPosition="start"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          className={
            isFocus ? "header_input IconFocus" : "header_input IconFocus_not"
          }
        />
      </div>
      <div className="headerInfAcc">
        <p className="headerInfAcc_name">Nguyễn Mạnh Cường</p>
        <div className="headerInfAcc_img">
          <img src="/images/Team Avatar.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeaderWebsite;
