import "@css/website/filter/filter.css";
import {
  ArrowRightIcon,
  Button,
  Datepicker,
  Dropdown,
  FormButton,
  FormDropdown,
} from "@fluentui/react-northstar";
import { useEffect, useState } from "react";
import { Form } from "react-hook-form";
const Filter = ({ data, onFilterChange }: any) => {
  // status array
  // console.log(data);
  const Status = ["Đang thực hiện", "Hoàn thành"];

  // Priority array
  const Priority = ["Thấp", "Thường", "Gấp", "Khẩn cấp"];
  const priorityMapping: Record<string, number> = {
    Thấp: 1,
    Thường: 10,
    Gấp: 20,
    "Khẩn cấp": 30,
  };

  // Department array
  const Department = ["KA-QTHT", "BA-QTHT", "CA-QTHT", "MA-QTHT", "QA-QTHT"];

  // Department array
  const Author = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Hồng C",
    "Phạm Thị D",
    "Nguyễn Thiệu E",
    "Trần Thị F",
    "Nguyễn Hòa G",
    "Phạm Long H",
    "Trần Tân K",
    "Nguyễn Minh L",
  ];

  const items = {
    Status,
    Priority,
    Department,
    Author,
  };

  const itemsLabels: (keyof typeof items)[] = [
    "Status",
    "Priority",
    "Department",
    "Author",
  ];

  const [filterCriteria, setFilterCriteria] = useState({
    Status: [] as string[],
    Priority: [] as number[],
    Department: [] as string[],
    Author: [] as string[],
    Time: [] as Date[],
  });

  const handleFilterChange = (key: string, value: any) => {
    // Cập nhật tiêu chí lọc
    setFilterCriteria((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    // Áp dụng logic lọc
    let newFilteredData = data;

    // Lọc theo Status
    if (filterCriteria.Status.length > 0) {
      newFilteredData = newFilteredData.filter((item: any) =>
        filterCriteria.Status.includes(item.Status)
      );
    }

    // Lọc theo Priority
    if (filterCriteria.Priority.length > 0) {
      const priorityValues = filterCriteria.Priority.map(
        (priority) => priorityMapping[priority]
      );
      newFilteredData = newFilteredData.filter((item: any) =>
        priorityValues.includes(item.Priority)
      );
    }

    // Lọc theo Department
    if (filterCriteria.Department.length > 0) {
      newFilteredData = newFilteredData.filter((item: any) =>
        filterCriteria.Department.includes(
          item.DepartmentOrganization.LookupValue
        )
      );
    }

    // Lọc theo Author
    if (filterCriteria.Author.length > 0) {
      newFilteredData = newFilteredData.filter((item: any) =>
        filterCriteria.Author.includes(item.Author.LookupValue)
      );
    }

    // Lọc theo Time
    if (filterCriteria.Time.length === 2) {
      const [startDate, endDate] = filterCriteria.Time;
      if (startDate && endDate) {
        newFilteredData = newFilteredData.filter((item: any) => {
          const itemDate = new Date(item.Created); // Thay 'Time' bằng key chứa ngày trong dữ liệu
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
    }

    // Cập nhật danh sách dữ liệu đã lọc
    onFilterChange(newFilteredData);
  }, [filterCriteria, data]);

  // Reset Filter
  const resetFilter = () => {
    const initialFilterCriteria = {
      Status: [],
      Priority: [],
      Department: [],
      Author: [],
      Time: [],
    };

    setFilterCriteria(initialFilterCriteria);
    onFilterChange(data); // Đặt lại dữ liệu về trạng thái ban đầu
  };

  const getA11ySelectionMessage = {
    onAdd: (item: any) =>
      `${item} selected. Press left or right arrow keys to navigate selected items.`,
    onRemove: (item: any) => `${item} has been removed.`,
  };

  // Date
  const handleDateChange = (key: string, date: any) => {
    if (date && date.value) {
      const selectedDate = new Date(date.value);
      setFilterCriteria((prev) => {
        const updatedTime = [...prev.Time];
        if (key === "start") updatedTime[0] = selectedDate;
        if (key === "end") updatedTime[1] = selectedDate;
        return { ...prev, Time: updatedTime };
      });
    }
  };

  return (
    <>
      <div className="filter">
        <div className="filter--header">
          <h2>Bộ lọc</h2>
          <Button
            content="Làm mới"
            loader="Override bandwidth"
            size="small"
            text
            onClick={resetFilter}
          />
        </div>
        {itemsLabels.map((item: any) => (
          <div key={item}>
            <h5>{item}</h5> {/* Thêm tiêu đề tương ứng với mỗi item */}
            <Dropdown
              multiple
              items={items[item]} // Sử dụng cú pháp [] để truy cập thuộc tính động
              placeholder={`Select ${item}`} // Đặt placeholder phù hợp
              getA11ySelectionMessage={getA11ySelectionMessage}
              value={filterCriteria[item]}
              noResultsMessage="We couldn't find any matches."
              a11ySelectedItemsMessage="Press Delete or Backspace to remove"
              onChange={(_, { value }: any) => handleFilterChange(item, value)} // Sử dụng `item` làm key cho handleFilterChange
            />
          </div>
        ))}

        <div className="filter--Time">
          <h5>Ngày tạo</h5>
          <div className="filter--Date">
            <Datepicker
              allowManualInput={false}
              today={new Date()}
              inputOnly={true}
              onDateChange={(_, { value }: any) =>
                handleDateChange("start", { value })
              }
            />

            <ArrowRightIcon />

            <Datepicker
              allowManualInput={false}
              today={new Date()}
              inputOnly={true}
              onDateChange={(_, { value }: any) =>
                handleDateChange("end", { value })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
