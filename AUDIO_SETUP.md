# 🎵 Hướng dẫn thêm nhạc nền

## Đã cài đặt sẵn:
- ✅ Thư mục `public/audio/` đã được tạo
- ✅ File placeholder `peace.mp3` đã được tạo
- ✅ Code phát nhạc đã được tích hợp
- ✅ UI audio toggle đã được cập nhật

## Cách thêm file nhạc thực:

### Bước 1: Thay thế file nhạc
1. Tìm file nhạc `peace.mp3` của bạn
2. Copy file đó vào thư mục: `public/audio/peace.mp3`
3. Đảm bảo file có tên chính xác là `peace.mp3`

### Bước 2: Kiểm tra file
```bash
# Kiểm tra file có tồn tại không
ls -la public/audio/

# Kết quả mong đợi:
# -rw-r--r-- 1 user user [size] peace.mp3
```

### Bước 3: Chạy website
```bash
npm run dev
```

### Bước 4: Test nhạc
1. Mở website: http://localhost:3000
2. Tìm audio toggle ở góc trên bên phải (icon loa 🔊)
3. Click để bật/tắt nhạc
4. Nhạc sẽ phát file `peace.mp3`

## Tính năng đã tích hợp:

### 🎵 Audio Controls:
- **Bật/Tắt**: Click vào audio toggle
- **Loop**: Nhạc sẽ lặp lại tự động
- **Volume**: Âm lượng 30% (không quá to)
- **Auto-play**: Tự động phát khi bật (nếu trình duyệt cho phép)

### 🎨 UI Features:
- **Visual feedback**: Icon loa thay đổi khi bật/tắt
- **Text indicator**: Hiển thị "Nhạc nền" / "Tắt nhạc"
- **Tooltip**: Hover để xem hướng dẫn
- **Color coding**: Vàng khi bật, xám khi tắt

### 🔧 Technical Details:
- **File path**: `/audio/peace.mp3`
- **Format**: MP3 (khuyến nghị)
- **Size limit**: < 10MB (khuyến nghị < 5MB)
- **Browser support**: Chrome, Firefox, Safari, Edge

## Lưu ý quan trọng:

### 🚫 Browser Autoplay Policy:
- Trình duyệt hiện đại không cho phép autoplay
- User phải click vào trang trước khi phát nhạc
- Nếu không phát được, sẽ hiện thông báo hướng dẫn

### 📱 Mobile Support:
- iOS Safari: Cần user interaction
- Android Chrome: Cần user interaction
- Responsive design: Audio toggle hoạt động trên mobile

### 🎯 Best Practices:
- Sử dụng file MP3 chất lượng thấp để tải nhanh
- Độ dài nhạc: 2-5 phút (sẽ loop)
- Âm lượng: 30% (không làm phiền user)
- Nội dung: Nhạc nhẹ nhàng, phù hợp với chủ đề

## Troubleshooting:

### ❌ Nhạc không phát:
1. Kiểm tra file có tồn tại: `ls public/audio/`
2. Kiểm tra tên file: phải là `peace.mp3`
3. Kiểm tra console: F12 → Console
4. Thử click vào trang trước khi bật nhạc

### ❌ File quá lớn:
1. Nén file MP3 (giảm bitrate)
2. Cắt ngắn nhạc (2-3 phút)
3. Sử dụng tool online để nén

### ❌ Không tương thích:
1. Chuyển đổi sang MP3
2. Kiểm tra codec: AAC hoặc MP3
3. Thử file khác

## 🎉 Hoàn thành!
Sau khi thêm file nhạc, website sẽ có nhạc nền đẹp mắt và phù hợp với chủ đề tưởng niệm!
