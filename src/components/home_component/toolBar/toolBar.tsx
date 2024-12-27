import { Add16Filled, DocumentFolder20Filled } from "@fluentui/react-icons";
import { Button, Menu } from "@fluentui/react-northstar";
import { useState } from "react";

const ToolBar = ({ setIsBlockFunciton }) => {
  const items = [
    {
      key: "Danh sách",
      content: "Danh sách",
      className: "Menu_list",
    },
    {
      key: "Lịch biểu",
      content: "Lịch biểu",
      className: "Menu_list",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = items.map((item, index) => ({
    ...item,
    className: index === activeIndex ? "menu-item-active" : "menu-item",
    onClick: () => setActiveIndex(index),
  }));
  const MenuExampleUnderlined = () => (
    <Menu defaultActiveIndex={0} items={menuItems} underlined primary />
  );
  return (
    <>
      <div className="toolBar--leftItem">
        <div className="toolBar_left">
          <div className="toolBar_left_icon">
            <DocumentFolder20Filled />
          </div>
          <div className="toolBar_left_Title">Đề xuất</div>
        </div>

        <div className="toolBar_tab">
          <div className="toolBar_left_Text">{MenuExampleUnderlined()}</div>
        </div>
      </div>

      <Button
        icon={<Add16Filled />}
        content="Tạo đề xuất"
        primary
        onClick={() => {
          setIsBlockFunciton();
        }}
      />
    </>
  );
};

export default ToolBar;
