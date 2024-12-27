import { useEffect, useState } from "react";
import "@css/website/addItem/addform.css";
import {
  Form,
  FormButton,
  FormDropdown,
  FormInput,
  RadioGroup,
} from "@fluentui/react-northstar";
import axios from "axios";

const AddForm = ({ formMode, initialData, id }: any) => {
  // Khởi tạo state để lưu giá trị các trường trong form
  console.log(id);

  const [formData, setFormData] = useState({
    Title: "",
    Status: "Đang thực hiện", // Giá trị mặc định
    StatusCode: 100, // Mã trạng thái mặc định là 100,
    Priority: 1, // Mã code độ ưu tiên,
    DepartmentOrganization: {
      // Phòng ban
      LookupId: 256,
      LookupValue: "KA-QTHT",
    },
    Author: {
      // Tác giả
      Email: "",
      LookupId: 301,
      LookupValue: "Nguyễn Văn A",
    },
  });

  // Cập nhật formData khi initialData thay đổi
  useEffect(() => {
    if (initialData) {
      setFormData((prevData) => ({
        ...prevData,
        ...initialData,
      }));
    }
  }, [initialData]);

  //  cập nhật giá trị khi người dùng nhập vào các input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === "Email") {
        // Xử lý riêng cho email trong Author
        return {
          ...prevData,
          Author: {
            ...prevData.Author,
            Email: value,
          },
        };
      }
      // Xử lý cho các trường khác
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Radio Status
  const handleChangeRadioStatus = (event: any, data: any) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      Status: data.name,
      StatusCode: data.value,
    }));
  };

  // Radio Proprity
  const handleChangeRadioProprity = (event: any, data: any) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      Priority: data.value,
    }));
  };

  const handleDropdownChange = (event: React.SyntheticEvent, data: any) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      DepartmentOrganization: {
        LookupId: data.value.key,
        LookupValue: data.value.content,
      },
    }));
  };

  const handleDropdownChangeAuthor = (
    event: React.SyntheticEvent,
    data: any
  ) => {
    // console.log(data);
    setFormData((prevData) => ({
      ...prevData,
      Author: {
        Email: "",
        LookupId: data.value.key,
        LookupValue: data.value.content,
      },
    }));
  };

  //

  const addItem = async (formData: any) => {
    try {
      await axios.post(`http://localhost:3000/data`, formData);
      window.location.reload();
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Error adding item");
    }
  };

  const updateItem = async (formData: any, id: number) => {
    const response = await axios.put(
      `http://localhost:3000/data/${id}`,
      formData
    );
    window.location.reload();
  };
  //  xử lý submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngừng hành động mặc định của form
    const updatedFormData = {
      ...formData,
      Created: new Date().toISOString(),
    };
    console.log("Form data:", updatedFormData); // Log giá trị của form
    if (initialData) {
      updateItem(updatedFormData, id);
      alert("Updated form Data successfully");
    } else {
      addItem(updatedFormData);
      alert("Created form Data successfully");
    }
  };

  // status array
  const statusItem = [
    {
      name: "Đang thực hiện ",
      value: 100,
      label: "Đang thực hiện ",
    },
    {
      name: "Hoàn thành",
      value: 200,
      label: "Hoàn thành ",
    },
  ];

  // Priority array
  const priorityItem = [
    {
      name: "Thấp ",
      value: 1,
      label: "Thấp ",
    },
    {
      name: "Thường ",
      value: 10,
      label: "Thường ",
    },
    {
      name: "Gấp ",
      value: 20,
      label: "Gấp ",
    },
    {
      name: "Khẩn cấp",
      value: 30,
      label: "Khẩn cấp ",
    },
  ];

  // Department array
  const departmentItem = [
    {
      key: 256,
      content: "KA-QTHT",
      label: "KA-QTHT ",
    },
    {
      key: 257,
      content: "BA-QTHT",
      label: "BA-QTHT ",
    },
    {
      key: 258,
      content: "CA-QTHT",
      label: "CA-QTHT ",
    },
    {
      key: 259,
      content: "MA-QTHT",
      label: "MA-QTHT ",
    },
    {
      key: 260,
      content: "QA-QTHT",
      label: "QA-QTHT ",
    },
  ];

  // Department array
  const AuthorItem = [
    {
      key: 301,
      content: "Nguyễn Văn A",
      label: "Nguyễn Văn A",
    },
    {
      key: 302,
      content: "Trần Thị B",
      label: "Trần Thị B",
    },
    {
      key: 303,
      content: "Lê Hồng C",
      label: "Lê Hồng C",
    },
    {
      key: 304,
      content: "Phạm Thị D",
      label: "Phạm Thị D",
    },
    {
      key: 305,
      content: "Nguyễn Thiệu E",
      label: "Nguyễn Thiệu E",
    },
    {
      key: 306,
      content: "Trần Thị F",
      label: "Trần Thị F",
    },
    {
      key: 307,
      content: "Nguyễn Hòa G",
      label: "Nguyễn Hòa G",
    },
    {
      key: 308,
      content: "Phạm Long H",
      label: "Phạm Long H",
    },
    {
      key: 309,
      content: "Trần Tân K",
      label: "Trần Tân K",
    },
    {
      key: 310,
      content: "Nguyễn Minh L",
      label: "Nguyễn Minh L",
    },
  ];

  return (
    <div className="addform_content">
      <h2>{formMode === "create" ? "Tạo mới bản ghi" : "Cập nhật bản ghi"}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Input Tiêu Đề */}
        <FormInput
          label="Tiêu đề"
          id="title"
          required
          showSuccessIndicator={false}
          name="Title" // Đặt name để dùng trong handleChange
          value={formData.Title} // Giá trị của input
          onChange={handleChange}
        />
        {/* Radio status */}
        <label htmlFor="">Trạng thái</label>
        <RadioGroup
          // defaultCheckedValue={formData.StatusCode}
          checkedValue={formData.StatusCode}
          items={statusItem}
          onCheckedValueChange={handleChangeRadioStatus}
          vertical
        />
        {/* Radio Prioryti */}
        <label htmlFor="">Mức độ khẩn cấp</label>
        <RadioGroup
          // defaultCheckedValue={formData.Priority}
          checkedValue={formData.Priority}
          items={priorityItem}
          onCheckedValueChange={handleChangeRadioProprity}
          vertical
        />
        {/* Dropdown Phòng ban đề xuất */}
        <FormDropdown
          className="dropdown"
          items={departmentItem}
          placeholder="Phòng ban đề xuất"
          checkable
          label={{ content: "Phòng ban đề xuất", id: "DepartmentOrganization" }}
          aria-labelledby="DepartmentOrganization"
          name="DepartmentOrganization"
          value={formData.DepartmentOrganization.LookupValue}
          onChange={handleDropdownChange}
        />
        {/* Dropdown Tác giả */}
        <FormDropdown
          className="dropdown"
          items={AuthorItem}
          placeholder="Tác giả"
          checkable
          label={{ content: "Tác giả", id: "Author" }}
          aria-labelledby="Author"
          name="Author"
          value={formData.Author.LookupValue}
          onChange={handleDropdownChangeAuthor}
        />
        {/* Input Email */}
        <FormInput
          type="email"
          label="Email tác giả"
          id="email"
          required
          showSuccessIndicator={false}
          name="Email" // Đặt name để dùng trong handleChange
          value={formData.Author.Email} // Giá trị của input
          onChange={handleChange}
        />
        {/* Nút Tạo Đề Xuất */}
        <FormButton
          content={formMode === "create" ? "Tạo đề xuất" : "Lưu cập nhật"}
        />
      </Form>
    </div>
  );
};

export default AddForm;
