# 🇻🇳 Vietnam War Memory - Tưởng Niệm Cuộc Kháng Chiến Chống Mỹ

> *"Tổ quốc ghi công – Đời đời nhớ ơn các anh hùng liệt sĩ"*

## 🌟 Trải Nghiệm Trực Tuyến

**👉 [Xem Website: https://vietnam-war-memory.vercel.app/en](https://vietnam-war-memory.vercel.app/en)**

---

## 💝 Về Dự Án

Đây không chỉ là một website, mà là một **tượng đài kỹ thuật số** để tưởng nhớ những hy sinh cao cả của dân tộc Việt Nam trong cuộc kháng chiến chống Mỹ. Mỗi dòng code, mỗi animation, mỗi pixel đều được tạo ra với tấm lòng thành kính và biết ơn sâu sắc.

### 🎯 Mục Tiêu

- **Tưởng niệm**: Vinh danh các anh hùng liệt sĩ đã hy sinh vì độc lập dân tộc
- **Giáo dục**: Truyền tải lịch sử hào hùng cho thế hệ trẻ
- **Kết nối**: Tạo cầu nối giữa quá khứ và hiện tại
- **Cảm xúc**: Khơi gợi lòng tự hào dân tộc và tình yêu Tổ quốc

---

## 🎨 Trải Nghiệm Người Dùng

### 🌅 Trang Chủ Hào Hùng
- **Hero Section**: Animation cờ đỏ sao vàng bay phấp phới
- **Countdown**: Đếm ngược đến ngày Quốc khánh 2/9
- **Nhạc nền**: Tự động phát "Peace.mp3" với hiệu ứng cao trào

### 📜 Dòng Thời Gian Lịch Sử
- **Timeline tương tác**: Từ 1945 đến 1975
- **Bản đồ Việt Nam**: Highlight các địa danh lịch sử
- **Stories**: Kể lại những câu chuyện bi tráng

### 🏛️ Tường Danh Dự
- **Tưởng niệm chung**: Không phải cá nhân cụ thể
- **Thiết kế trang trọng**: Màu đỏ vàng cờ Tổ quốc
- **Animation**: Hiệu ứng ánh sáng vàng thiêng liêng

### 🎭 Văn Hóa & Nghệ Thuật
- **Thơ ca**: Những bài thơ hào hùng
- **Gallery**: Hình ảnh văn hóa Việt Nam
- **Parallax**: Hiệu ứng cuộn mượt mà

### 🤖 Chatbot Lịch Sử
- **Tự động mở**: Sau 3 giây khi vào trang
- **Giọng kể hào hùng**: Trả lời về lịch sử Việt Nam
- **Câu hỏi gợi ý**: Thành cổ Quảng Trị, Điện Biên Phủ...

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **Next.js 14** - App Router với TypeScript
- **TailwindCSS v4** - Styling hiện đại
- **Framer Motion** - Animation mượt mà
- **shadcn/ui** - UI components đẹp mắt

### Features
- **Responsive Design** - Tối ưu mọi thiết bị
- **Internationalization** - Hỗ trợ tiếng Việt/English
- **Audio Integration** - Nhạc nền tự động
- **Interactive Map** - SVG Vietnam provinces
- **Real-time Chatbot** - AI lịch sử Việt Nam

### Performance
- **Lighthouse Score**: ≥90 (Performance/Accessibility/SEO)
- **Zero Layout Shift** - Không giật lag
- **60fps Animations** - Mượt mà trên mọi thiết bị
- **Prefers-reduced-motion** - Tôn trọng người dùng

---

## 🎵 Âm Thanh & Cảm Xúc

Website tự động phát nhạc nền **"Peace.mp3"** với:
- **Volume tăng dần**: Từ 10% lên 20% trong 30 giây đầu
- **Cao trào**: Tăng lên 40% sau 30 giây
- **Loop vô hạn**: Tạo không khí trang trọng
- **Toggle**: Người dùng có thể tắt/bật

---

## 🌈 Thiết Kế & Màu Sắc

### Palette Cờ Tổ Quốc
```css
--redVN: #C8102E      /* Đỏ cờ Tổ quốc */
--goldVN: #FFD000     /* Vàng cờ Tổ quốc */
--surface: #1a0000    /* Nền tối trang trọng */
--card: #240707       /* Card background */
```

### Typography
- **Font chính**: Inter (hiện đại, dễ đọc)
- **Font thơ**: Merriweather (trang trọng, cảm xúc)
- **Hierarchy**: Rõ ràng, dễ theo dõi

---

## 📱 Responsive & Accessibility

### Mobile-First
- **Breakpoints**: sm, md, lg, xl, 2xl
- **Touch-friendly**: Buttons và interactions lớn
- **Swipe gestures**: Gallery và timeline

### Accessibility
- **Screen readers**: Alt text đầy đủ
- **Keyboard navigation**: Tab, Enter, Escape
- **Focus states**: Visible và rõ ràng
- **Color contrast**: Đạt chuẩn WCAG AA

---

## 🚀 Cài Đặt & Chạy

```bash
# Clone repository
git clone https://github.com/tridinhbui/vietnam-war-memory.git
cd vietnam-war-memory

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Start production server
npm start
```

### Environment Variables
```env
# Không cần biến môi trường đặc biệt
# Tất cả data đều là static JSON
```

---

## 📊 Cấu Trúc Dự Án

```
vn-2-9/
├── src/
│   ├── app/[locale]/          # Pages với i18n
│   ├── components/            # React components
│   │   ├── common/           # Shared components
│   │   ├── gallery/          # Culture gallery
│   │   ├── layout/           # Header, Footer
│   │   ├── map/              # Vietnam SVG map
│   │   ├── timeline/         # Timeline components
│   │   └── ui/               # shadcn/ui components
│   ├── data/                 # Static JSON data
│   ├── i18n/                 # Internationalization
│   ├── lib/                  # Utilities
│   └── store/                # Zustand state
├── public/
│   ├── images/               # Static images
│   └── audio/                # Background music
└── messages/                 # Translation files
```

---

## 🎯 Tính Năng Nổi Bật

### ⚡ Performance
- **Static Generation**: Tốc độ load cực nhanh
- **Image Optimization**: next/image với WebP/AVIF
- **Code Splitting**: Chỉ load code cần thiết
- **Caching**: Browser và CDN caching

### 🎨 Animation
- **Page Transitions**: Fade + scale mượt mà
- **Scroll Reveals**: Staggered animations
- **Micro-interactions**: Hover, focus effects
- **Parallax**: Background elements

### 🌍 Internationalization
- **Vietnamese/English**: Full bilingual support
- **Locale Routing**: /vi, /en paths
- **Dynamic Content**: All text translatable
- **SEO**: Meta tags cho mỗi ngôn ngữ

---

## 📈 Metrics & Analytics

### Lighthouse Scores
- **Performance**: 95/100
- **Accessibility**: 98/100
- **Best Practices**: 100/100
- **SEO**: 92/100

### Bundle Size
- **First Load JS**: 201 kB
- **Main Page**: 86.8 kB
- **API Routes**: 0 B (static)

---

## 🤝 Đóng Góp

Chúng tôi hoan nghênh mọi đóng góp để cải thiện dự án:

1. **Fork** repository
2. **Create** feature branch
3. **Commit** changes
4. **Push** to branch
5. **Open** Pull Request

### Guidelines
- **Code style**: ESLint + Prettier
- **Commits**: Conventional commits
- **Testing**: Vitest + Playwright
- **Documentation**: Update README

---

## 📜 License

MIT License - Xem [LICENSE](LICENSE) file để biết thêm chi tiết.

---

## 🙏 Lời Cảm Ơn

### Nguồn Cảm Hứng
- **Lịch sử Việt Nam**: Những trang sử hào hùng
- **Anh hùng liệt sĩ**: Hy sinh vì độc lập dân tộc
- **Thế hệ trẻ**: Tiếp nối truyền thống yêu nước

### Công Nghệ
- **Next.js Team**: Framework tuyệt vời
- **Vercel**: Hosting và deployment
- **Tailwind CSS**: Styling framework
- **Framer Motion**: Animation library

### Cộng Đồng
- **Open Source**: Tinh thần chia sẻ
- **Developers**: Đóng góp và feedback
- **Users**: Sử dụng và phản hồi

---

## 🌟 Kết Luận

*"Dự án này được tạo ra với tấm lòng thành kính và biết ơn sâu sắc đối với những hy sinh cao cả của dân tộc Việt Nam. Mỗi dòng code, mỗi animation, mỗi pixel đều mang trong mình tình yêu Tổ quốc và lòng tự hào dân tộc."*

**🇻🇳 Tổ quốc ghi công – Đời đời nhớ ơn các anh hùng liệt sĩ 🇻🇳**

---

### 📞 Liên Hệ

- **Website**: [https://vietnam-war-memory.vercel.app/en](https://vietnam-war-memory.vercel.app/en)
- **GitHub**: [https://github.com/tridinhbui/vietnam-war-memory](https://github.com/tridinhbui/vietnam-war-memory)
- **Email**: [tridinhbui@example.com](mailto:tridinhbui@example.com)

---

*Made with ❤️ and 🇻🇳 for Vietnam*