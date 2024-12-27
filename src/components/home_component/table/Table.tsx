import { Calendar16Filled } from "@fluentui/react-icons";
import { Avatar, Checkbox, Table } from "@fluentui/react-northstar";
import { DataItem } from "@interface/data";
import { useEffect, useState } from "react";

interface TableComponent {
  currentItems: any;
  data: any;
  UpdateData: any;
  handleSelectionChange: any;
}
const TableComponent: React.FC<TableComponent> = ({
  currentItems,
  data,
  UpdateData,
  handleSelectionChange,
}) => {
  // const resultName = "";
  const avatarClassName = [
    "bg1",
    "bg2",
    "bg3",
    "bg4",
    "bg5",
    "bg6",
    "bg7",
    "bg8",
    "bg9",
    "bg",
  ];

  const setCss = (item: any) => {
    const lastNumber = item % 10;
    return avatarClassName[lastNumber];
  };

  // Xét giá trị độ ưu tiên
  const priorityValue = (item: any) => {
    if (item == 1) return "Thấp";
    if (item == 10) return "Thường";
    if (item == 20) return "Gấp";
    return "Khẩn cấp";
  };

  const priorityClassName = (item: any) => {
    if (item == 1) return "priorityOne";
    if (item == 10) return "priorityTen";
    if (item == 20) return "priorityTwenty";
    return "priorityThirty";
  };

  // Check Box
  const [allChecked, setAllChecked] = useState(false);
  const [checkedRows, setCheckedRows] = useState<{ [key: string]: boolean }>(
    {}
  );

  // removeItem

  useEffect(() => {
    const selectedIds = Object.keys(checkedRows)
      .filter((id) => checkedRows[id])
      .map(Number); // Chuyển key từ string sang number (nếu cần)
    handleSelectionChange(selectedIds);
  }, [checkedRows]); // Đồng bộ mỗi khi checkedRows thay đổi

  const toggleAllCheckboxes = () => {
    const newCheckedState = !allChecked;
    setAllChecked(newCheckedState);

    const newCheckedRows = data.reduce((acc: any, _: any, index: number) => {
      acc[index] = newCheckedState;
      return acc;
    }, {} as { [key: string]: boolean });

    setCheckedRows(newCheckedRows);

    // handleSelectionChange(getCheckedIds);
  };

  const toggleRowCheckbox = (index: any) => {
    setCheckedRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
    // handleSelectionChange(getCheckedIds);
  };

  // FormatTime
  const formatTime = (time: any) => {
    const date = new Date(time);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month} ${hours}:${minutes}`;
  };

  const header = {
    items: [
      {
        content: (
          <div className="columsOne_title">
            <Checkbox checked={allChecked} onChange={toggleAllCheckboxes} />
            <span>Tiêu đề</span>
          </div>
        ),
        styles: { minWidth: "500px", width: "500px" },
        key: "0",
      },
      "Trạng thái",
      "Phòng ban đề xuất",
      "Người tạo",
      "Email",
      "Ngày tạo",
    ],
  };
  const rows = currentItems.map((item: DataItem, index: number) => ({
    key: item.id,
    items: [
      {
        content: (
          <div className="columsOne" id="columsTitle">
            <div className="checkBox_title">
              <Checkbox
                checked={checkedRows[index] || false}
                onChange={() => toggleRowCheckbox(index)}
              />
              <span
                style={{ cursor: "pointer" }}
                title={item.Title}
                onClick={() => {
                  UpdateData(item.id);
                }}
              >
                {item.Title}
              </span>
            </div>

            <div
              className={priorityClassName(item.Priority)}
              style={{ maxWidth: "100px" }}
            >
              {priorityValue(item.Priority)}
            </div>
          </div>
        ),
        key: index,
      },
      {
        content: (
          <div className={item.StatusCode == 100 ? "toDo" : "completed"}>
            {item.StatusCode == 100 ? "Đang thực hiện" : "Hoàn thành"}
          </div>
        ),
        key: "Item.StatusCode",
      },
      {
        content: (
          <div className="columsOne">
            <div className="avatar">
              <Avatar
                className={setCss(item.DepartmentOrganization.LookupId)}
                name={item.DepartmentOrganization.LookupValue}
                square
              />
            </div>
            <span
              className="overFlow"
              title={item.DepartmentOrganization.LookupValue}
            >
              {item.DepartmentOrganization.LookupValue}
            </span>
          </div>
        ),
        key: "item.DepartmentOrganization.LookupValue",
      },

      {
        content: (
          <div className="columsOne">
            <div className="avatar">
              <Avatar
                className={setCss(item.Author.LookupId)}
                name={item.Author.LookupValue}
              />
            </div>

            <span className="overFlow" title={item.Author.LookupValue}>
              {item.Author.LookupValue}
            </span>
          </div>
        ),
        key: "item.Title",
      },

      {
        content: (
          <div className="columsOne">
            <div className="overFlow" title={item.Author.Email}>
              {item.Author.Email}
            </div>
          </div>
        ),
        key: " item.Author.Email",
      },
      {
        content: (
          <div className="columsOne">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: "#585A96",
                marginRight: "8px",
              }}
            >
              <Calendar16Filled />
            </div>
            <span>{formatTime(item.Created)}</span>
          </div>
        ),
      },
    ],
  }));

  return (
    <>
      <div className="table">
        <Table header={header} rows={rows} aria-label="Static table" />
      </div>
    </>
  );
};

export default TableComponent;
