/* eslint-disable @typescript-eslint/no-explicit-any */
import "@css/website/sidebar/sidebar.css";
import {
  Add16Regular,
  Alert24Filled,
  Alert24Regular,
  ApprovalsApp24Filled,
  ApprovalsApp24Regular,
  DocumentFolder24Filled,
  DocumentFolder24Regular,
  Filter16Regular,
  MoreHorizontal24Filled,
  Poll24Filled,
  Poll24Regular,
  QuestionCircle24Regular,
  Settings24Regular,
} from "@fluentui/react-icons";
import {
  Tree,
  TriangleDownIcon,
  TriangleEndIcon,
} from "@fluentui/react-northstar";
import { useEffect, useState } from "react";
import { sidebarMenuItem } from "@interface/sidebarMenuItem";
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("bgct");

  // Hàm thay đổi className của item khi click vào icon
  const changeCSS = (item: any) => {
    setActiveItem(item);
  };

  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  // const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleMenu = (id: string, url: string) => {
    // console.log(id);
    // setSelectedMenuId((prevId) => (prevId === id ? null : id));
    setSelectedMenuId(id);
    if (url) {
      // console.log(url); // Log ra URL chính xác
      history.push(url); // Điều hướng đến URL được truyền vào
    } else {
      console.log("No URL provided");
    }
  };

  const idMenu1 = [
    "tree-title-customization-item-1",
    "tree-title-customization-item-2",
  ];

  useEffect(() => {
    setSelectedMenuId("tree-title-customization-item-1-1"); // Chọn mục "Tất cả" trong "Chứng từ"
  }, []);
  ///Tree menu
  const items = [
    {
      id: "tree-title-customization-item-1",
      className: "Menu1",
      title: "Chứng từ",
      styles: { color: "red" },
      items: [
        {
          id: "tree-title-customization-item-1-1",
          className: "Menu2",
          title: {
            content: "Tất cả",
            badgeContent: 0,
            url: "/",
          },
        },
        {
          id: "tree-title-customization-item-1-2",
          className: "Menu2",
          title: {
            content: "Chờ bàn giao",
            badgeContent: 2,
            url: "/",
          },
        },
        {
          id: "tree-title-customization-item-1-3",
          className: "Menu2",
          title: {
            content: "Đang bàn giao",
            badgeContent: 0,
            url: "/",
          },
        },
        {
          id: "tree-title-customization-item-1-4",
          className: "Menu2",
          title: {
            content: "Đã bàn giao",
            badgeContent: 0,
            url: "/",
          },
        },
        {
          id: "tree-title-customization-item-1-5",
          className: "Menu2",
          title: {
            content: "Lưu kho",
            badgeContent: 0,
            url: "/",
          },
        },
      ],
    },
    {
      id: "tree-title-customization-item-2",
      className: "Menu1",
      title: "Đề xuất",
      items: [
        {
          id: "tree-title-customization-item-2-1",
          className: "Menu2",
          url: "/",
          title: { content: "Tất cả", badgeContent: 0, url: "/" },
        },
        {
          id: "tree-title-customization-item-2-2",
          className: "Menu2",
          title: { content: "Chờ xử lý", badgeContent: 2, url: "/waiting" },
        },
        {
          id: "tree-title-customization-item-2-3",
          className: "Menu2",
          title: { content: "Đã xử lý", badgeContent: 0, url: "/done" },
        },
      ],
    },
  ];

  const titleRenderer = (
    Component: any,
    { content, expanded, open, hasSubtree, badgeContent, ...restProps }: any
  ) => {
    // console.log({
    //   data: { content, expanded, open, hasSubtree, ...restProps },
    // });

    // console.log(restProps);

    const isSelected = selectedMenuId === restProps.id;
    const url = restProps?.url || "";
    const handleClickUrl = () => {
      if (url) {
        // console.log(url); // Log ra URL chính xác
        history.push(url); // Điều hướng đến URL được truyền vào
      } else {
        console.log("No URL provided");
      }
    };
    return (
      <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
        <div
          className="title"
          {...restProps}
          onClick={
            restProps.level === 2
              ? () => toggleMenu(restProps.id, restProps.url)
              : undefined
          }
          style={{
            background: isSelected ? "#fff" : "transparent",
            fontWeight: isSelected ? "600" : "normal",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {hasSubtree && restProps.level === 1 ? (
            expanded ? (
              <TriangleDownIcon />
            ) : (
              <TriangleEndIcon />
            )
          ) : null}

          <div className="titleContent">{content}</div>

          {restProps.level === 2 && badgeContent !== 0 ? (
            <div className="badge">{badgeContent}</div>
          ) : null}
        </div>
      </Component>
    );
  };

  // Xây dựng lại phần menu
  const sidebarMenuItem: sidebarMenuItem[] = [
    {
      icon: [<Alert24Filled />, <Alert24Regular />],
      title: "Thông báo",
      className: "sidebarMenu_item",
      key: "notification",
    },
    {
      icon: [<Poll24Filled />, <Poll24Regular />],
      title: "Dashboard",
      className: "sidebarMenu_item",
      key: "dashboard",
    },
    {
      icon: [<ApprovalsApp24Filled />, <ApprovalsApp24Regular />],
      title: "Quy trình",
      className: "sidebarMenu_item",
      key: "process",
    },
    {
      icon: [<DocumentFolder24Filled />, <DocumentFolder24Regular />],
      title: "BGCT",
      className: "sidebarMenu_item",
      key: "bgct",
    },
  ];

  // render dữ liệu sidebarMenu

  const sidebarMenu = () => {
    return sidebarMenuItem.map((item) => (
      <div
        className={
          activeItem === item.key ? "sidebarMenu_itemCss" : item.className
        }
        onClick={() => changeCSS(item.key)}
      >
        <div className="sidebarMenu_icon">
          {activeItem === item.key ? item.icon[0] : item.icon[1]}
        </div>
        <p className="sidebarMenu_text">{item.title}</p>
      </div>
    ));
  };

  return (
    <div className="sidebar">
      <div className="sidebarMenu">
        <div className="sidebarMenu_top">
          {sidebarMenu()}
          <div className="sidebarMenu_item">
            <div className="sidebarMenu_icon">
              <MoreHorizontal24Filled />
            </div>
          </div>
        </div>
        <div className="sidebarMenu_btn">
          <div className="sidebarMenu_item">
            <div className="sidebarMenu_icon">
              <QuestionCircle24Regular />
            </div>
          </div>
          <div className="sidebarMenu_item">
            <div className="sidebarMenu_icon">
              <Settings24Regular />
            </div>
          </div>
        </div>
      </div>

      {/* SidebarTreeMune */}
      <div className="sidebarTreeMenu">
        <div className="sidebarTreeMenu_header">
          <h2>BGCT</h2>
          <div className="sidebarTreeMenu_header_btn">
            <button>
              <Filter16Regular />
            </button>
            <button>
              <Add16Regular />
            </button>
          </div>
        </div>
        <div className="sidebarTreeMenu_content">
          {/* div_content */}
          <Tree
            aria-label="Custom title"
            items={items}
            renderItemTitle={titleRenderer}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
