````markdown
# 🌐 Network Checker – Giải pháp giám sát trạng thái mạng từ xa

**Network Checker** là một công cụ đơn giản, linh hoạt giúp **theo dõi tình trạng kết nối mạng của máy tính từ xa** và **hiển thị kết quả trực tiếp trên giao diện web**.  
Phù hợp cho cá nhân, doanh nghiệp hoặc tổ chức muốn giám sát ổn định mạng tại các thiết bị đặt cách xa trung tâm.

---

## ⚙️ Tính năng nổi bật

- ✅ Giám sát **trạng thái kết nối mạng** theo thời gian thực
- ✅ **Giao diện web trực quan**, tự động cập nhật mỗi 10 giây
- ✅ **Triển khai dễ dàng** – hoạt động ngay trên GitHub + Vercel
- ✅ Hỗ trợ đầy đủ cho **Windows (PowerShell)** và **Linux/macOS (Bash)**
- ✅ Có thể mở rộng, tùy chỉnh theo nhu cầu tổ chức

---

## 🧩 Cấu trúc dự án

```plaintext
network-checker/
├── index.html           # Giao diện web chính (hiển thị trạng thái)
└── api/
    ├── ping.js          # API nhận tín hiệu ping từ thiết bị kiểm tra
    └── status.js        # API phản hồi trạng thái hiện tại (Online / Offline)
```
````

---

## 🚀 Hướng dẫn triển khai

### **Bước 1: Tạo repository và triển khai lên Vercel**

1. Tạo repository mới, ví dụ: `network-checker`
2. Thêm các tệp cần thiết:
   - `index.html`
   - `api/ping.js`
   - `api/status.js`
3. Deploy dự án lên [Vercel](https://vercel.com)
4. Sau khi triển khai thành công, bạn sẽ có đường dẫn dạng:
   ```
   https://network-checker.vercel.app
   ```

---

### **Bước 2: Cấu hình và chạy script tại máy cần giám sát**

Máy khách (ví dụ: thiết bị ở phòng khác) sẽ:

- Ping đến Google DNS (8.8.8.8) để kiểm tra kết nối mạng
- Gửi tín hiệu ping lên endpoint của bạn (được host trên Vercel)
- Website hiển thị trạng thái 🟢 hoặc 🔴 tương ứng

#### 🪟 **Windows (PowerShell)**

Tạo file `network-check.ps1` với nội dung sau:

```powershell
$endpoint = "https://network-checker-tawny.vercel.app/api/ping"  # thay bằng link của bạn

while ($true) {
    if (Test-Connection -Count 1 8.8.8.8 -Quiet) {
        try {
            Invoke-WebRequest -Uri $endpoint -UseBasicParsing | Out-Null
            Write-Host "🟢 Mạng hoạt động ổn định - Ping gửi thành công" -ForegroundColor Green
        } catch {
            Write-Host "⚠️ Không thể gửi ping đến server" -ForegroundColor Yellow
        }
    } else {
        Write-Host "🔴 Mất kết nối Internet" -ForegroundColor Red
    }
    Start-Sleep -Seconds 3
}
```

Chạy script:

```powershell
powershell -ExecutionPolicy Bypass -File .\network-check.ps1
```

---

#### 🐧 **Linux / macOS (Bash)**

Tạo file `network-check.sh`:

```bash
#!/bin/bash
ENDPOINT="https://your-vercel-domain.vercel.app/api/ping"  # thay bằng link của bạn

while true; do
  if ping -c 1 8.8.8.8 >/dev/null 2>&1; then
    curl -s $ENDPOINT >/dev/null && echo "🟢 Kết nối mạng ổn định" || echo "⚠️ Ping không gửi được"
  else
    echo "🔴 Mất kết nối Internet"
  fi
  sleep 10
done
```

Chạy script:

```bash
chmod +x network-check.sh
./network-check.sh
```

---

### **Bước 3: Giám sát trạng thái trực tiếp**

Truy cập website Vercel để xem trạng thái:

```
https://network-checker.vercel.app
```

Giao diện hiển thị:

- 🟢 **ONLINE** – Máy được giám sát có kết nối mạng
- 🔴 **OFFLINE** – Mất mạng hoặc ping không phản hồi

---

## 🧠 Nguyên lý hoạt động

1. Script tại thiết bị gửi request định kỳ đến API `/api/ping`
2. Server (Vercel) lưu lại thời gian ping gần nhất
3. Khi người dùng truy cập website:
   - API `/api/status` kiểm tra thời điểm ping gần nhất
   - Kết luận **Online** nếu ping trong vòng 60 giây, ngược lại là **Offline**

---

## 🛠️ Tùy chỉnh mở rộng

- Thay đổi địa chỉ ping (`8.8.8.8`) để kiểm tra một máy trong mạng LAN
- Điều chỉnh chu kỳ kiểm tra (`sleep 10`) tùy nhu cầu cập nhật
- Chỉnh sửa màu sắc, giao diện, thông điệp trong `index.html` theo nhận diện thương hiệu
- Có thể lưu log hoặc gửi cảnh báo qua email / webhook (tuỳ tích hợp thêm)

---

## 👤 Tác giả & Đóng góp

**Tác giả:** _[Tên của bạn hoặc doanh nghiệp của bạn]_  
**Liên hệ:** _[Email / Website / LinkedIn]_

> Được phát triển với mục tiêu mang lại **khả năng giám sát kết nối đơn giản, hiệu quả và chi phí thấp** cho cá nhân và doanh nghiệp.

---

### 💡 Gợi ý triển khai tự động

- Thiết lập script chạy cùng hệ thống (Startup Script) để tự động gửi ping khi máy khởi động.
- Có thể đặt cron job trên Linux / Task Scheduler trên Windows để giám sát định kỳ.

---

> © 2026 Network Checker. All rights reserved.
