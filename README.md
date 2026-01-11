Tuyệt vời 💪
Dưới đây là file **`README.md`** hoàn chỉnh (chuẩn Markdown, đẹp, dễ đọc trên GitHub) cho dự án kiểm tra trạng thái mạng của bạn.
Bạn chỉ cần copy nội dung này vào file `README.md` trong repo.

---

```markdown
# 🌐 Network Checker – Kiểm tra trạng thái mạng từ xa

Dự án này giúp bạn **giám sát trạng thái mạng của một máy tính không ổn định** (ví dụ ở phòng trên tầng), và **xem kết quả trực tiếp qua web** trên điện thoại hoặc thiết bị khác.

---

## ⚙️ Tính năng chính

✅ Theo dõi **mạng có hoạt động hay không** theo thời gian thực  
✅ Giao diện web đơn giản, đẹp, tự động cập nhật trạng thái mỗi 10 giây  
✅ Không cần cài đặt phức tạp — chỉ cần GitHub + Vercel  
✅ Hỗ trợ **Windows (PowerShell)** và **Linux/macOS (bash script)**

---

## 🧩 Cấu trúc dự án
```

network-checker/
├── index.html # Giao diện web chính (HTML thuần)
└── api/
├── ping.js # API nhận tín hiệu ping từ máy ở phòng
└── status.js # API trả về trạng thái hiện tại (Online / Offline)

```

---

## 🚀 Cách triển khai

### 1️⃣ Tạo repo GitHub & deploy Vercel
1. Tạo repo mới, ví dụ: `network-checker`
2. Thêm các file:
   - `index.html`
   - `api/ping.js`
   - `api/status.js`
3. Deploy repo lên [**Vercel**](https://vercel.com)
4. Sau khi deploy xong, bạn sẽ có link như:
```

[https://network-checker.vercel.app](https://network-checker.vercel.app)

````

---

### 2️⃣ Chạy script kiểm tra mạng tại máy ở phòng

Máy này sẽ tự động:
- Ping Google DNS (8.8.8.8) để kiểm tra kết nối Internet
- Nếu có mạng, gửi tín hiệu lên server (Vercel)
- Web sẽ hiển thị trạng thái 🟢 hoặc 🔴 tương ứng

#### 🪟 **Windows (PowerShell)**

Tạo file `network-check.ps1`:

```powershell
$endpoint = "https://network-checker-tawny.vercel.app/api/ping"  # đổi link của bạn

while ($true) {
    if (Test-Connection -Count 1 8.8.8.8 -Quiet) {
        try {
            Invoke-WebRequest -Uri $endpoint -UseBasicParsing | Out-Null
            Write-Host "🟢 Mạng OK - Ping đã gửi thành công" -ForegroundColor Green
        } catch {
            Write-Host "⚠️ Không gửi được ping đến server" -ForegroundColor Yellow
        }
    } else {
        Write-Host "🔴 Mạng đang mất hoặc không truy cập Internet" -ForegroundColor Red
    }
    Start-Sleep -Seconds 5  # Thay đổi từ 30 sang 5 giây
}
````

Chạy bằng:

```powershell
powershell -ExecutionPolicy Bypass -File .\network-check.ps1
```

---

#### 🐧 **Linux / macOS (bash script)**

Tạo file `network-check.sh`:

```bash
#!/bin/bash

ENDPOINT="https://tenmiencuaban.vercel.app/api/ping"  # đổi link của bạn

while true; do
  if ping -c 1 8.8.8.8 >/dev/null 2>&1; then
    curl -s $ENDPOINT >/dev/null && echo "🟢 Mạng OK - Ping đã gửi thành công" || echo "⚠️ Không gửi được ping đến server"
  else
    echo "🔴 Mạng đang mất hoặc không truy cập Internet"
  fi
  sleep 30
done
```

Chạy bằng:

```bash
chmod +x network-check.sh
./network-check.sh
```

---

### 3️⃣ Xem kết quả

Mở trình duyệt và truy cập link Vercel (ví dụ):

```
https://network-checker.vercel.app
```

Trang web sẽ hiển thị:

- 🟢 **ONLINE** – Máy ở phòng có mạng và đã ping thành công
- 🔴 **OFFLINE** – Mất mạng hoặc không gửi được tín hiệu

---

## 🧠 Cách hoạt động

1. Khi script ở máy trong phòng có Internet, nó **gửi request `/api/ping`**
2. Server (Vercel) ghi lại thời gian ping gần nhất
3. Khi bạn mở web, **`/api/status`** kiểm tra lần ping cuối có trong vòng 60 giây không:

   - Nếu **có** → hiển thị 🟢 Online
   - Nếu **không** → hiển thị 🔴 Offline

---

## 🛠️ Tùy chỉnh

- Thay `8.8.8.8` bằng IP khác nếu bạn muốn ping một máy cụ thể trong mạng LAN
- Thay `sleep 30` thành `sleep 10` nếu muốn cập nhật nhanh hơn
- Thay đổi màu hoặc giao diện trong `index.html` nếu muốn cá nhân hóa

---

## 🧑‍💻 Tác giả

**Người phát triển:** _Bạn_ (hoặc thêm tên nhóm của bạn)
Ý tưởng và hướng dẫn triển khai: hỗ trợ bởi **ChatGPT (GPT-5)**

---

> 💡 _Gợi ý:_ Bạn có thể bật script ở máy trên phòng khi khởi động (Startup) để hệ thống tự gửi ping khi mở máy.

```

---

👉 Bạn có muốn mình giúp **tạo sẵn file ZIP dự án đầy đủ + README này** để bạn chỉ việc push lên GitHub không?
Mình có thể gói lại toàn bộ cấu trúc đúng chuẩn để bạn upload một phát là chạy ngay.
```
