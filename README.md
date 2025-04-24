# 💼 Website Hỗ Trợ Tìm Việc Làm CNTT

## 🧩 Mô tả dự án

Hệ thống hỗ trợ kết nối giữa nhà tuyển dụng và người tìm việc trong lĩnh vực công nghệ thông tin. Gồm các phân hệ chính:

- Người dùng (ứng viên)
- Nhà tuyển dụng
- Quản trị viên (Admin)

## 🏗 Công nghệ sử dụng

- **Frontend (ứng viên + admin)**: React + Vite + Material UI
- **Backend**: Node.js + Express.js + MySQL
- **Cơ sở dữ liệu**: MySQL (có sử dụng Stored Procedure, Function)
- **Giao tiếp**: REST API
- **ORM**: Sequelize

---

## 📁 Cấu trúc thư mục

```bash

├── frontend/            # Frontend người dùng
├── admin/               # Giao diện quản trị viên
├── backend/              # Backend - Express API
├── database/            # Các file .sql, .mysql dump
└── README.md
```

⚙️ 1. Cài đặt Cơ Sở Dữ Liệu

✅ Yêu cầu
MySQL Workbench

MySQL Server >= 8.0

📦 File export:

Trong thư mục database/ có chứa:
backup.mysql/ (dạng Dump Project Folder) bao gồm tất cả: bảng, dữ liệu, trigger, view, procedure,...

💡 Cách import dữ liệu:

✔️ Dùng MySQL Workbench

- Vào menu Server > Data Import

- Chọn Import from Dump Project Folder

- Chọn đường dẫn tới thư mục database/backup.mysql

- Chọn schema muốn import hoặc tạo mới

Nhấn Start Import

🖥️ 2. Backend

Node.js >= 16
npm hoặc yarn

```bash
cd backend
npm install
```

Tạo file .env trong thư mục backend/:

```bash
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=database_name
JWT_SECRET=your_jwt_secret
```

chạy server:

```bash
npm start
```

🌐 3. Frontend

```bash
cd frontend
npm install
npx vite
```

🌐 3. Admin

```bash
cd admin
npm install
npx vite
```
