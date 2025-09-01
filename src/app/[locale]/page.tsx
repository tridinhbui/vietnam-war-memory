'use client';

import React, { useState, useEffect, useRef } from 'react';

export const dynamic = 'force-dynamic';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  Filter,
  Search,
  Info,
  ChevronDown,
  Flame,
  Shield,
  Heart,
  Star,
  ChevronRight,
  Eye,
  Download,
  Share2,
  Copy,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Plus,
  Minus,
  Users,
  Map,
  BookOpen,
  Flame as Candle,
  Award,
  Truck,
  Factory,
  UserCheck
} from 'lucide-react';

// Simple shadcn/ui components inline
const Button = ({ children, variant = 'default', onClick, className = '', size = 'default', asChild = false, ...props }: {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'gold';
  onClick?: () => void;
  className?: string;
  size?: 'default' | 'sm' | 'lg';
  asChild?: boolean;
  [key: string]: any;
}) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    gold: 'bg-yellow-500 text-black hover:bg-yellow-400'
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8'
  };

  const buttonProps: any = {
    className: `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`,
    onClick,
    ...props
  };

  // Remove asChild from props to avoid DOM warning
  delete buttonProps.asChild;

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, buttonProps);
  }

  return (
    <button {...buttonProps}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '', ...props }: any) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '', ...props }: any) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }: any) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '', ...props }: any) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className = '', ...props }: any) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Dialog = ({ children, open, onOpenChange }: any) => {
  const [isOpen, setIsOpen] = useState(open || false);

  useEffect(() => {
    if (onOpenChange) onOpenChange(isOpen);
  }, [isOpen, onOpenChange]);

  return (
    <>
      {children[0] && React.cloneElement(children[0], { onClick: () => setIsOpen(true) })}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 max-h-[90vh] overflow-y-auto">
            {children[1] && React.cloneElement(children[1], { onClose: () => setIsOpen(false) })}
          </div>
        </div>
      )}
    </>
  );
};

const DialogTrigger = ({ children, ...props }: any) => React.cloneElement(children, props);

const DialogContent = ({ children, className = '', onClose }: any) => (
  <div className={`relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 ${className}`}>
    <button
      onClick={onClose}
      className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
    >
      ✕
    </button>
    {children}
  </div>
);

const DialogHeader = ({ children, className = '', ...props }: any) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const DialogTitle = ({ children, className = '', ...props }: any) => (
  <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h2>
);

const DialogDescription = ({ children, className = '', ...props }: any) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const Switch = ({ checked, onCheckedChange, className = '', ...props }: any) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${checked ? 'bg-yellow-500' : 'bg-gray-200'} ${className}`}
    onClick={() => onCheckedChange && onCheckedChange(!checked)}
    {...props}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
    />
  </button>
);

const TooltipProvider = ({ children }: any) => <div>{children}</div>;
const Tooltip = ({ children }: any) => <>{children}</>;
const TooltipTrigger = ({ children }: any) => <>{children}</>;
const TooltipContent = ({ children }: any) => (
  <div className="absolute bottom-full mb-2 px-2 py-1 bg-black text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
    {children}
  </div>
);

// ===== DỮ LIỆU =====

const ESSAY_PARAGRAPHS = [
  "Cuộc kháng chiến chống Mỹ cứu nước là một chương sử đặc biệt trong lịch sử dân tộc Việt Nam – một chương vừa hào hùng, vừa bi thương. Hơn hai mươi năm trường kỳ kháng chiến (1954–1975), đất nước nhỏ bé này đã trở thành bãi thử của bom đạn, nơi ý chí con người bị thử thách đến tận cùng.",
  "Mỗi tấc đất, mỗi ngọn cỏ, mỗi dòng sông đều hằn vết thương chiến tranh. Và giữa những dấu mốc lịch sử ấy, Thành Cổ Quảng Trị mùa hè 1972 trở thành biểu tượng đau thương tột cùng.",
  "Thành Cổ Quảng Trị, với diện tích chỉ khoảng 0,36 km², đã phải hứng chịu một cơn mưa bom đạn khủng khiếp chưa từng có trong lịch sử.",
  "Chỉ trong 81 ngày đêm (28/6 – 16/9/1972), nơi đây đã hứng chịu 328.000 tấn bom đạn – tương đương sức công phá của 7 quả bom nguyên tử Mỹ từng ném xuống Hiroshima (Nhật Bản).",
  "Trung bình, mỗi ngày đêm có 5.000 – 7.000 quả đạn pháo trút xuống, nghĩa là cứ mỗi mét vuông đất trong Thành Cổ phải gánh hơn 300 quả đạn.",
  "Hơn 10.000 chiến sĩ đã ngã xuống chỉ để giữ cho lá cờ đỏ sao vàng tung bay trên đỉnh Thành. Nhiều người còn rất trẻ, tuổi mười tám đôi mươi, để lại sau lưng tuổi xuân và những ước mơ chưa kịp thành hình.",
  "Mảnh đất nhỏ bé ấy trở thành nấm mồ chung khổng lồ, nơi xương thịt chiến sĩ hòa tan vào đất đá. Đến nay, nhiều liệt sĩ vẫn chưa có tên, chưa có mộ phần, chỉ được gọi là \"những người con vô danh\".",
  "Điều kỳ diệu là trong đau thương tột cùng, ý chí quật cường của dân tộc không bao giờ bị khuất phục. Mỗi chiến sĩ ngã xuống, lại có thêm một người đứng lên.",
  "Đỉnh cao của sự bất khuất ấy là ngày 30/4/1975, khi đất nước thống nhất, non sông liền một dải. Chiến thắng ấy phải đổi bằng máu của hàng triệu con người, bằng những nỗi đau không thể nào kể xiết.",
  "Khi nhìn về quá khứ, ta càng thấm thía rằng hòa bình hôm nay là cái giá của máu và nước mắt. Những con số khô khan về bom đạn, thương vong, phá hủy không chỉ là dữ liệu, mà là hàng triệu số phận, hàng triệu giấc mơ bị chôn vùi.",
  "Thành Cổ Quảng Trị, cùng những chiến trường khốc liệt khác, sẽ mãi mãi là chứng nhân của sự hy sinh. Đó là nỗi đau xót của dân tộc, nhưng cũng là niềm tự hào bất diệt về tinh thần bất khuất, ý chí độc lập, và khát vọng tự do."
];

const TIMELINE_EVENTS = [
  {
    id: "1954-07",
    date: "07/1954",
    title: "Hiệp định Genève",
    descShort: "Chấm dứt chiến tranh Đông Dương, tạm chia Việt Nam.",
    descLong: "Hiệp định Genève 1954 chấm dứt chiến tranh Đông Dương, tạm thời chia Việt Nam thành hai miền dọc vĩ tuyến 17. Đây là thắng lợi ngoại giao quan trọng của Việt Nam Dân chủ Cộng hòa.",
    tags: ["Ngoại giao"],
    image: "/images/timeline/geneva-1954.jpg",
    alt: "Hội nghị Genève 1954 - Chấm dứt chiến tranh Đông Dương"
  },
  {
    id: "1960-09",
    date: "09/1960",
    title: "Đại hội Đảng lần thứ III",
    descShort: "Xác định đường lối chống Mỹ cứu nước.",
    descLong: "Đại hội lần thứ III của Đảng Lao động Việt Nam thông qua đường lối chống Mỹ cứu nước, thống nhất đất nước bằng con đường cách mạng.",
    tags: ["Chính trị"],
    image: "/images/timeline/dai-hoi-iii.jpg",
    alt: "Đại hội Đảng lần thứ III - Xác định đường lối chống Mỹ cứu nước"
  },
  {
    id: "1968-01",
    date: "01/1968",
    title: "Tổng tiến công Tết Mậu Thân",
    descShort: "Cuộc tổng tấn công đồng loạt vào các đô thị miền Nam.",
    descLong: "Tổng tiến công và nổi dậy Tết Mậu Thân là cuộc tấn công chiến lược lớn nhất của Việt Nam Dân chủ Cộng hòa trong cuộc chiến tranh chống Mỹ.",
    tags: ["Chiến sự"],
    image: "/images/timeline/tet-offensive.jpg",
    alt: "Tổng tiến công Tết Mậu Thân 1968"
  },
  {
    id: "1972-06",
    date: "06-09/1972",
    title: "Thành Cổ Quảng Trị",
    descShort: "81 ngày đêm giữ vững Thành Cổ.",
    descLong: "Thành Cổ Quảng Trị chứng kiến trận đánh khốc liệt nhất trong lịch sử chiến tranh Việt Nam với hơn 10.000 chiến sĩ hy sinh để giữ vững lá cờ đỏ sao vàng.",
    tags: ["Chiến sự", "Anh hùng"],
    image: "/images/timeline/quang-tri-citadel.jpg",
    alt: "Thành Cổ Quảng Trị - 81 ngày đêm khốc liệt"
  },
  {
    id: "1973-01",
    date: "01/1973",
    title: "Hiệp định Paris",
    descShort: "Ký kết hiệp định hòa bình.",
    descLong: "Hiệp định Paris về chấm dứt chiến tranh và lập lại hòa bình ở Việt Nam, mở đường cho việc thống nhất đất nước.",
    tags: ["Ngoại giao"],
    image: "/images/timeline/paris-agreement.jpg",
    alt: "Hiệp định Paris 1973 - Ký kết hòa bình"
  },
  {
    id: "1975-04",
    date: "04/1975",
    title: "Thống nhất đất nước",
    descShort: "Giải phóng miền Nam hoàn toàn.",
    descLong: "Ngày 30/4/1975, lực lượng vũ trang Việt Nam giải phóng hoàn toàn miền Nam, thống nhất đất nước, kết thúc 21 năm chiến tranh.",
    tags: ["Chiến sự", "Chiến thắng"],
    image: "/images/timeline/liberation-1975.jpg",
    alt: "Giải phóng miền Nam 30/4/1975 - Thống nhất đất nước"
  }
];

// Gallery images data
const GALLERY_IMAGES = [
  {
    id: "medevac",
    src: "/images/gallery/medevac-rescue.jpg",
    alt: "Cuộc sơ tán y tế quân sự (MEDEVAC) trong rừng núi",
    caption: "Cuộc sơ tán y tế quân sự - Sự hy sinh và lòng dũng cảm",
    category: "Chiến sự"
  },
  {
    id: "soldiers-smile",
    src: "/images/gallery/soldiers-smile.jpg",
    alt: "Nhóm chiến sĩ mỉm cười giữa đống đổ nát",
    caption: "Tinh thần lạc quan giữa khó khăn",
    category: "Tinh thần"
  },
  {
    id: "khe-sanh",
    src: "/images/gallery/khe-sanh-battle.jpg",
    alt: "Trận chiến Khe Sanh - Cối xay thịt",
    caption: "Khe Sanh - Cơn ác mộng của Mỹ",
    category: "Chiến sự"
  },
  {
    id: "flag-raising",
    src: "/images/gallery/flag-raising.jpg",
    alt: "Kéo cờ đỏ sao vàng trên đỉnh tháp",
    caption: "Lá cờ đỏ sao vàng tung bay",
    category: "Chiến thắng"
  },
  {
    id: "vietnamese-people",
    src: "/images/gallery/vietnamese-people.jpg",
    alt: "Nhân dân Việt Nam trong cuộc kháng chiến",
    caption: "Sức mạnh của nhân dân",
    category: "Nhân dân"
  },
  {
    id: "peace-moment",
    src: "/images/gallery/peace-moment.jpg",
    alt: "Khoảnh khắc hòa bình sau chiến tranh",
    caption: "Hòa bình - Ước mơ của cả dân tộc",
    category: "Hòa bình"
  }
];

const QUANG_TRI_STATS = [
  { label: "Thời gian chiến đấu", value: "81 ngày đêm (28/6–16/9/1972)" },
  { label: "Lượng bom đạn", value: "≈ 328.000 tấn" },
  { label: "Đạn pháo mỗi ngày", value: "5.000–7.000 quả/ngày" },
  { label: "Hy sinh", value: "> 10.000 chiến sĩ" },
  { label: "Diện tích", value: "≈ 0,36 km²" },
  { label: "Mật độ hủy diệt", value: "≈ >300 quả đạn/m²" },
];

// ===== DỮ LIỆU MỚI =====

const WALL_OF_HONOR = [
  { id: 1, name: "V - Tưởng nhớ các anh hùng liệt sĩ", unit: "Kháng chiến chống Pháp", years: "1945-1954", bio: "Những người con ưu tú đã hy sinh vì độc lập dân tộc trong cuộc kháng chiến chống thực dân Pháp...", image: "/images/milestones/geneva-1954.jpg" },
  { id: 2, name: "I - Tưởng nhớ các anh hùng liệt sĩ", unit: "Kháng chiến chống Mỹ", years: "1954-1975", bio: "Hàng triệu người con Việt Nam đã ngã xuống trong cuộc kháng chiến trường kỳ chống đế quốc Mỹ...", image: "/images/milestones/liberation-1975.jpg" },
  { id: 3, name: "E - Tưởng nhớ các anh hùng liệt sĩ", unit: "Thành Cổ Quảng Trị", years: "1972", bio: "81 ngày đêm máu lửa, hàng nghìn chiến sĩ đã hy sinh anh dũng để giữ vững lá cờ đỏ sao vàng...", image: "/images/milestones/quang-tri-citadel.jpg" },
  { id: 4, name: "T - Tưởng nhớ các anh hùng liệt sĩ", unit: "Điện Biên Phủ", years: "1954", bio: "Chiến thắng lịch sử Điện Biên Phủ với sự hy sinh của hàng nghìn chiến sĩ dũng cảm...", image: "/images/milestones/geneva-1954.jpg" },
  { id: 5, name: "N - Tưởng nhớ các anh hùng liệt sĩ", unit: "Tết Mậu Thân", years: "1968", bio: "Cuộc tổng tiến công và nổi dậy Tết Mậu Thân với sự hy sinh của nhiều chiến sĩ...", image: "/images/milestones/tet-offensive.jpg" },
  { id: 6, name: "A - Tưởng nhớ các anh hùng liệt sĩ", unit: "Hiệp định Paris", years: "1973", bio: "Những người đã hy sinh để đạt được hiệp định hòa bình Paris...", image: "/images/milestones/paris-agreement.jpg" },
  { id: 7, name: "M - Tưởng nhớ các anh hùng liệt sĩ", unit: "Giải phóng miền Nam", years: "1975", bio: "Chiến dịch Hồ Chí Minh lịch sử với sự hy sinh của nhiều chiến sĩ...", image: "/images/milestones/liberation-1975.jpg" },
  { id: 8, name: "T - Tưởng nhớ các anh hùng liệt sĩ", unit: "Thanh niên xung phong", years: "1965-1975", bio: "Những thanh niên trẻ tuổi đã hy sinh trên đường Trường Sơn...", image: "/images/milestones/dai-hoi-iii.jpg" },
  { id: 9, name: "U - Tưởng nhớ các anh hùng liệt sĩ", unit: "Dân công hỏa tuyến", years: "1965-1975", bio: "Những người dân công đã hy sinh để vận chuyển lương thực, vũ khí...", image: "/images/milestones/kills-1.jpg" },
  { id: 10, name: "D - Tưởng nhớ các anh hùng liệt sĩ", unit: "Y tá quân y", years: "1965-1975", bio: "Những y tá, bác sĩ đã hy sinh để cứu chữa thương binh...", image: "/images/milestones/liberation-1975.jpg" },
  { id: 11, name: "O - Tưởng nhớ các anh hùng liệt sĩ", unit: "Pháo binh", years: "1965-1975", bio: "Những chiến sĩ pháo binh đã hy sinh trong các trận đánh...", image: "/images/milestones/quang-tri-citadel.jpg" },
  { id: 12, name: "V - Tưởng nhớ các anh hùng liệt sĩ", unit: "Trinh sát", years: "1965-1975", bio: "Những chiến sĩ trinh sát đã hy sinh để thu thập thông tin...", image: "/images/milestones/tet-offensive.jpg" }
];

const QUOTES = [
  { id: 1, text: "Không gì quý hơn độc lập, tự do", author: "Hồ Chí Minh", source: "Tuyên ngôn độc lập" },
  { id: 2, text: "Dân tộc Việt Nam là một, sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi", author: "Hồ Chí Minh", source: "Di chúc" },
  { id: 3, text: "Tổ quốc trên hết, dân tộc trên hết", author: "Võ Nguyên Giáp", source: "Hồi ký" },
  { id: 4, text: "Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ", author: "Hồ Chí Minh", source: "Lời kêu gọi toàn quốc kháng chiến" },
  { id: 5, text: "Độc lập, tự do là quyền thiêng liêng bất khả xâm phạm của mọi dân tộc", author: "Hồ Chí Minh", source: "Tuyên ngôn độc lập" }
];

const POEMS = [
  { 
    id: 1, 
    title: "Việt Nam Bất Khuất", 
    lines: [
      "Đất nước tôi, dải đất hình chữ S",
      "Máu đỏ sao vàng, biểu tượng thiêng liêng",
      "Bao thế hệ đã ngã xuống",
      "Để giữ vững nền độc lập tự do",
      "Việt Nam bất khuất, kiên cường",
      "Trước mọi thử thách của thời gian"
    ]
  },
  { 
    id: 2, 
    title: "Lời Thề Độc Lập", 
    lines: [
      "Tôi thề trên lá cờ đỏ sao vàng",
      "Sẽ bảo vệ Tổ quốc đến cùng",
      "Dù phải hy sinh cả tính mạng",
      "Không bao giờ khuất phục kẻ thù",
      "Độc lập, tự do là mục tiêu",
      "Của toàn dân tộc Việt Nam"
    ]
  }
];

const MAP_POINTS = [
  { id: 1, name: "Thành Cổ Quảng Trị", coords: { x: 45, y: 35 }, summary: "81 ngày đêm khốc liệt", image: "/images/map/quang-tri.jpg" },
  { id: 2, name: "Đường Trường Sơn", coords: { x: 30, y: 60 }, summary: "Con đường huyền thoại", image: "/images/map/truong-son.jpg" },
  { id: 3, name: "Điện Biên Phủ", coords: { x: 25, y: 20 }, summary: "Chiến thắng lịch sử", image: "/images/map/dien-bien.jpg" },
  { id: 4, name: "Sài Gòn 30/4", coords: { x: 70, y: 80 }, summary: "Ngày thống nhất", image: "/images/map/sai-gon.jpg" },
  { id: 5, name: "Hiệp định Paris", coords: { x: 15, y: 15 }, summary: "Hòa bình được ký kết", image: "/images/map/paris.jpg" },
  { id: 6, name: "Khe Sanh", coords: { x: 40, y: 30 }, summary: "Cối xay thịt", image: "/images/map/khe-sanh.jpg" },
  { id: 7, name: "Huế", coords: { x: 50, y: 40 }, summary: "Thành phố di sản", image: "/images/map/hue.jpg" }
];

const HOMEFRONT_ITEMS = [
  { id: 1, title: "Thanh niên xung phong", statLabel: "Số lượng", statValue: "1.2 triệu", desc: "Lực lượng thanh niên tình nguyện tham gia kháng chiến", image: "/images/homefront/tnxp.jpg" },
  { id: 2, title: "Dân công hỏa tuyến", statLabel: "Tổng số", statValue: "2.8 triệu", desc: "Nhân dân tham gia vận chuyển, tiếp tế cho tiền tuyến", image: "/images/homefront/dan-cong.jpg" },
  { id: 3, title: "Hậu phương sản xuất", statLabel: "Sản lượng", statValue: "85%", desc: "Tỷ lệ hoàn thành kế hoạch sản xuất trong chiến tranh", image: "/images/homefront/san-xuat.jpg" },
  { id: 4, title: "Mẹ Việt Nam Anh hùng", statLabel: "Được phong tặng", statValue: "127.000", desc: "Số bà mẹ được phong tặng danh hiệu Anh hùng", image: "/images/homefront/me-viet-nam.jpg" }
];

const PRIDE_METRICS = [
  { id: 1, label: "Tỷ lệ hoàn thành vận tải Trường Sơn", value: 98, suffix: "%" },
  { id: 2, label: "Số cầu đường tái thiết", value: 15, suffix: "km" },
  { id: 3, label: "Tỷ lệ dân công tham gia", value: 95, suffix: "%" },
  { id: 4, label: "Số hộ gia đình ủng hộ", value: 4.2, suffix: "triệu" },
  { id: 5, label: "Tỷ lệ hoàn thành kế hoạch", value: 102, suffix: "%" },
  { id: 6, label: "Số tấn lương thực vận chuyển", value: 1.8, suffix: "triệu tấn" }
];

// ===== COMPONENTS =====

function Particles() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
  }>>([]);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: any) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    if (isReducedMotion) return;

    const createParticle = () => ({
      id: Math.random(),
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: (typeof window !== 'undefined' ? window.innerHeight : 1080) + 50,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.1
    });

    const initialParticles = Array.from({ length: 15 }, createParticle);
    setParticles(initialParticles);

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        opacity: particle.opacity - 0.001
      })).filter(p => p.opacity > 0));
    }, 100);

    return () => {
      clearInterval(interval);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isReducedMotion]);

  if (isReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-orange-400 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity
          }}
          animate={{
            y: [0, -100, -200],
            x: [0, Math.random() * 20 - 10, Math.random() * 40 - 20]
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

function ParallaxLayer({ children, speed = 0.5 }: any) {
  const { scrollY } = useScroll();
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: any) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const y = useTransform(scrollY, [0, 1000], [0, isReducedMotion ? 0 : -speed * 100]);

  return (
    <motion.div style={{ y }} className="absolute inset-0">
      {children}
    </motion.div>
  );
}

function VietnamFlag({ className = '', animated = false }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: any) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={animated && !isReducedMotion ? {
        rotate: [0, 2, -2, 0],
        scale: [1, 1.02, 1]
      } : {}}
      transition={animated && !isReducedMotion ? {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      } : {}}
    >
      <div className="relative w-full h-full bg-gradient-to-br from-red-600 to-red-700 rounded-sm shadow-lg overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={!isReducedMotion ? {
            x: ['-100%', '100%']
          } : {}}
          transition={!isReducedMotion ? {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          } : {}}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={animated && !isReducedMotion ? {
              rotate: [0, 360]
            } : {}}
            transition={animated && !isReducedMotion ? {
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            } : {}}
          >
            <svg
              viewBox="0 0 100 100"
              className="w-3/5 h-3/5 text-yellow-400 drop-shadow-lg"
              fill="currentColor"
              aria-label="Ngôi sao vàng trên cờ đỏ"
            >
              <path d="M50 5 L61 35 L95 35 L68 57 L79 87 L50 65 L21 87 L32 57 L5 35 L39 35 Z" />
            </svg>
            
            <motion.div
              className="absolute inset-0 bg-yellow-400 rounded-full blur-sm opacity-30"
              animate={animated && !isReducedMotion ? {
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              } : {}}
              transition={animated && !isReducedMotion ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
            />
          </motion.div>
        </div>
        
        <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-sm" />
      </div>
    </motion.div>
  );
}

function OathBanner() {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const fullText = "Không gì quý hơn độc lập, tự do – Việt Nam bất khuất";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullText);
  };

  return (
    <section className="relative py-16 px-4 bg-gradient-to-r from-red-900 via-red-800 to-red-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-red-600/30 via-transparent to-red-800/30" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`
             }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-yellow-300 font-serif mb-6 leading-tight"
            animate={{
              textShadow: [
                "0 0 20px rgba(255, 208, 0, 0.3)",
                "0 0 30px rgba(255, 208, 0, 0.6)",
                "0 0 20px rgba(255, 208, 0, 0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {displayText}
            {isTyping && <span className="animate-pulse">|</span>}
          </motion.h2>

          <motion.div
            className="flex justify-center items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
            >
              <Copy className="w-4 h-4 mr-2" />
              Sao chép lời thề
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function WallOfHonor() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [displayedItems, setDisplayedItems] = useState(12);
  const [selectedHero, setSelectedHero] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);

  const units = [...new Set(WALL_OF_HONOR.map(hero => hero.unit))];

  const filteredHeroes = WALL_OF_HONOR.filter(hero => {
    const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hero.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = !selectedUnit || hero.unit === selectedUnit;
    return matchesSearch && matchesUnit;
  });

  const displayedHeroes = filteredHeroes.slice(0, displayedItems);

  const loadMore = () => {
    setDisplayedItems(prev => Math.min(prev + 8, filteredHeroes.length));
  };

  const openDetailDialog = (hero: any) => {
    setSelectedHero(hero);
    setShowDetailDialog(true);
  };

  return (
    <section id="wall-of-honor" className="py-20 px-4 bg-gradient-to-b from-red-900 via-red-800 to-red-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/milestones/kills-1.jpg"
          alt="Chiến tranh"
          fill
          className="object-cover opacity-15"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 font-serif">
            Tường Danh Dự
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tưởng nhớ những anh hùng liệt sĩ đã hy sinh vì độc lập, tự do của Tổ quốc
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc đơn vị..."
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>
          
          <select
            value={selectedUnit}
            onChange={(e: any) => setSelectedUnit(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          >
            <option value="">Tất cả đơn vị</option>
            {units.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </motion.div>

        {/* Heroes Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        >
          {displayedHeroes.map((hero, index) => (
            <motion.div
              key={hero.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 208, 0, 0.3)"
              }}
              className="group cursor-pointer"
              onClick={() => openDetailDialog(hero)}
            >
              <Card className="bg-red-900/30 border-red-700 hover:border-goldVN transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-goldVN to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-black">
                      {hero.name.split(' ').pop()?.charAt(0) || '?'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {hero.name}
                  </h3>
                  
                  <p className="text-sm text-gray-400 mb-2">{hero.unit}</p>
                  <p className="text-sm text-yellow-400 font-medium">{hero.years}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-500">Tổ quốc ghi công</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {displayedItems < filteredHeroes.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              onClick={loadMore}
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              Xem thêm ({filteredHeroes.length - displayedItems} anh hùng)
            </Button>
          </motion.div>
        )}

        {/* Detail Dialog */}
        <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
          <DialogContent className="max-w-2xl bg-gray-800 border-gray-700">
            {selectedHero && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-black">
                      {selectedHero.name.split(' ').pop().charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">{selectedHero.name}</h3>
                  <p className="text-gray-300">{selectedHero.unit}</p>
                  <p className="text-yellow-400 font-medium">{selectedHero.years}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Tiểu sử</h4>
                    <p className="text-gray-300">{selectedHero.bio}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Trích thư nhà</h4>
                    <p className="text-gray-300 italic">
                      "Con xin hứa với mẹ sẽ chiến đấu đến cùng vì độc lập của Tổ quốc. 
                      Dù có hy sinh, con cũng tự hào vì đã góp phần vào sự nghiệp giải phóng dân tộc."
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-gray-700">
                  <p className="text-yellow-400 font-medium">Tổ quốc ghi công! Đời đời nhớ ơn</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

function QuotesPoems() {
  const [activeTab, setActiveTab] = useState('quotes');
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === 'quotes') {
        setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      } else {
        setCurrentPoemIndex((prev) => (prev + 1) % POEMS.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const nextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const prevQuote = () => {
    setCurrentQuoteIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  const nextPoem = () => {
    setCurrentPoemIndex((prev) => (prev + 1) % POEMS.length);
  };

  const prevPoem = () => {
    setCurrentPoemIndex((prev) => (prev - 1 + POEMS.length) % POEMS.length);
  };

  return (
    <section id="quotes-poems" className="py-20 px-4 bg-gradient-to-b from-red-900 via-red-800 to-red-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/milestones/liberation-1975.jpg"
          alt="Giải phóng miền Nam"
          fill
          className="object-cover opacity-20"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-yellow-600/20 via-transparent to-red-600/20" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 font-serif">
            Khúc Tráng Ca
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Những lời vàng ngọc và vần thơ bất hủ của dân tộc
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-red-800 p-1 rounded-lg border border-red-700">
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                activeTab === 'quotes'
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-red-200 hover:text-yellow-400'
              }`}
            >
              Trích dẫn
            </button>
            <button
              onClick={() => setActiveTab('poems')}
              className={`px-6 py-3 rounded-md transition-all duration-300 ${
                activeTab === 'poems'
                  ? 'bg-yellow-400 text-black font-semibold'
                  : 'text-red-200 hover:text-yellow-400'
              }`}
            >
              Thơ - Nhạc
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {activeTab === 'quotes' ? (
            <div className="relative">
              <Card className="bg-red-800/50 border-red-700 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12 text-center">
                  <motion.div
                    key={currentQuoteIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <blockquote className="text-2xl md:text-3xl font-serif text-white mb-6 leading-relaxed">
                      "{QUOTES[currentQuoteIndex].text}"
                    </blockquote>
                    
                    <div className="space-y-2">
                      <p className="text-lg text-yellow-400 font-semibold">
                        — {QUOTES[currentQuoteIndex].author}
                      </p>
                      <p className="text-sm text-gray-400">
                        {QUOTES[currentQuoteIndex].source}
                      </p>
                    </div>
                  </motion.div>

                  {/* Navigation */}
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                      onClick={prevQuote}
                      variant="outline"
                      size="sm"
                      className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex gap-2">
                      {QUOTES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentQuoteIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentQuoteIndex ? 'bg-yellow-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={nextQuote}
                      variant="outline"
                      size="sm"
                      className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="relative">
              <Card className="bg-red-800/50 border-red-700 backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <motion.div
                    key={currentPoemIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-8 font-serif">
                      {POEMS[currentPoemIndex].title}
                    </h3>
                    
                    <div className="space-y-4">
                      {POEMS[currentPoemIndex].lines.map((line, index) => (
                        <motion.p
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="text-lg md:text-xl text-white font-serif leading-relaxed"
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>

                  {/* Navigation */}
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                      onClick={prevPoem}
                      variant="outline"
                      size="sm"
                      className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex gap-2">
                      {POEMS.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPoemIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentPoemIndex ? 'bg-yellow-400' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={nextPoem}
                      variant="outline"
                      size="sm"
                      className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                    >
                      <ChevronRightIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function InteractiveMap() {
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [showPath, setShowPath] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const openPointDialog = (point: any) => {
    setSelectedPoint(point);
  };

  const togglePath = () => {
    setShowPath(!showPath);
  };

  return (
    <section id="interactive-map" className="py-20 px-4 bg-gradient-to-b from-red-900 via-red-800 to-red-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/milestones/truong-son.jpg"
          alt="Trường Sơn"
          fill
          className="object-cover opacity-15"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 font-serif">
            Bản Đồ Kháng Chiến
          </h2>
          <p className="text-xl text-red-200 max-w-3xl mx-auto">
            Những địa danh lịch sử trong cuộc kháng chiến chống Mỹ cứu nước
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="bg-gray-800 border-gray-700 p-6">
              <div className="relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden">
                {/* Simplified Vietnam Map SVG */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)' }}
                >
                  {/* Vietnam Outline (simplified) */}
                  <path
                    d="M20 20 L30 15 L40 20 L50 18 L60 25 L70 30 L75 40 L70 50 L65 60 L60 70 L50 75 L40 80 L30 75 L25 65 L20 55 L15 45 L18 35 Z"
                    fill="none"
                    stroke="#4b5563"
                    strokeWidth="0.5"
                    className="opacity-50"
                  />
                  
                  {/* Path Animation */}
                  {showPath && (
                    <motion.path
                      d="M25 20 L30 60 L45 35 L70 80"
                      fill="none"
                      stroke="#FFD000"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  )}

                  {/* Map Points */}
                  {MAP_POINTS.map((point) => (
                    <motion.g
                      key={point.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: point.id * 0.1 }}
                    >
                      <circle
                        cx={point.coords.x}
                        cy={point.coords.y}
                        r="3"
                        fill={hoveredPoint === point.id ? "#FFD000" : "#dc2626"}
                        stroke="#FFD000"
                        strokeWidth={hoveredPoint === point.id ? "2" : "1"}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => openPointDialog(point)}
                        onMouseEnter={() => setHoveredPoint(point.id)}
                        onMouseLeave={() => setHoveredPoint(null)}
                        style={{
                          filter: hoveredPoint === point.id 
                            ? "drop-shadow(0 0 10px rgba(255, 208, 0, 0.8))" 
                            : "drop-shadow(0 0 5px rgba(220, 38, 38, 0.6))"
                        }}
                      />
                      
                      {/* Pulse Animation */}
                      <motion.circle
                        cx={point.coords.x}
                        cy={point.coords.y}
                        r="6"
                        fill="none"
                        stroke="#FFD000"
                        strokeWidth="1"
                        opacity="0.6"
                        animate={{
                          r: [6, 12, 6],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.g>
                  ))}
                </svg>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>Địa điểm lịch sử</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span>Đang chọn</span>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 mt-6">
                <Button
                  onClick={togglePath}
                  variant={showPath ? "default" : "outline"}
                  className={showPath 
                    ? "bg-yellow-400 text-black hover:bg-yellow-500" 
                    : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  }
                >
                  <Map className="w-4 h-4 mr-2" />
                  {showPath ? "Ẩn hành trình" : "Hành trình bất khuất"}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Points List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-yellow-400 mb-6">Các địa danh lịch sử</h3>
            
            {MAP_POINTS.map((point, index) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => openPointDialog(point)}
              >
                <Card className="bg-red-900/30 border-red-700 hover:border-goldVN transition-all duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-redVN to-red-800 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">
                          {point.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {point.summary}
                        </p>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Point Detail Dialog */}
        <Dialog open={!!selectedPoint} onOpenChange={() => setSelectedPoint(null)}>
          <DialogContent className="max-w-2xl bg-gray-800 border-gray-700">
            {selectedPoint && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">{selectedPoint.name}</h3>
                  <p className="text-gray-300">{selectedPoint.summary}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Lịch sử</h4>
                    <p className="text-gray-300">
                      Đây là một trong những địa danh quan trọng trong cuộc kháng chiến chống Mỹ cứu nước. 
                      Nơi đây đã chứng kiến những trận đánh ác liệt và sự hy sinh anh dũng của quân và dân ta.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Ý nghĩa lịch sử</h4>
                    <p className="text-gray-300">
                      Địa danh này đã trở thành biểu tượng của tinh thần bất khuất, ý chí độc lập và khát vọng tự do 
                      của dân tộc Việt Nam trong cuộc đấu tranh giải phóng dân tộc.
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4 border-t border-gray-700">
                  <p className="text-yellow-400 font-medium">Nơi ghi dấu lịch sử hào hùng</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

function HomefrontAccordion() {
  const [openItems, setOpenItems] = useState([0]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const getIcon = (title: string) => {
    if (title.includes('Thanh niên')) return <Users className="w-6 h-6" />;
    if (title.includes('Dân công')) return <Truck className="w-6 h-6" />;
    if (title.includes('Hậu phương')) return <Factory className="w-6 h-6" />;
    if (title.includes('Mẹ Việt Nam')) return <UserCheck className="w-6 h-6" />;
    return <Award className="w-6 h-6" />;
  };

  return (
    <section id="homefront" className="py-20 px-4 bg-gradient-to-b from-red-800 via-red-900 to-red-800 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/milestones/hau-phuong.jpg"
          alt="Hậu phương"
          fill
          className="object-cover opacity-15"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 font-serif">
            Sức Mạnh Hậu Phương
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Bất khuất không gươm súng - Những đóng góp thầm lặng của hậu phương
          </p>
        </motion.div>

        <div className="space-y-4">
          {HOMEFRONT_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-red-900/40 border-red-700 hover:border-goldVN overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left hover:bg-red-800/30 transition-colors duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-goldVN to-yellow-600 rounded-full flex items-center justify-center text-black">
                        {getIcon(item.title)}
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-400">{item.statLabel}:</span>
                          <span className="text-lg font-bold text-yellow-400">{item.statValue}</span>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openItems.includes(index) ? "auto" : 0,
                    opacity: openItems.includes(index) ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-700 pt-6">
                      <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3">Mô tả</h4>
                          <p className="text-gray-300 leading-relaxed">
                            {item.desc}
                          </p>
                          
                          <div className="mt-4">
                            <h5 className="text-md font-semibold text-yellow-400 mb-2">Đóng góp</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-400">Tỷ lệ tham gia</span>
                                <span className="text-sm font-semibold text-white">95%</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "95%" }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center border border-gray-600">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-yellow-400 mb-1">
                                {item.statValue}
                              </div>
                              <div className="text-sm text-gray-400">
                                {item.statLabel}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-red-900/50 to-red-800/50 border-red-700/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Tinh thần đoàn kết toàn dân
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                Hậu phương là sức mạnh vô tận của tiền tuyến. Những đóng góp thầm lặng của nhân dân 
                đã tạo nên sức mạnh tổng hợp, góp phần quyết định vào thắng lợi cuối cùng của cuộc kháng chiến.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function PrideMetrics() {
  const [isInView, setIsInView] = useState(false);

  return (
    <section id="pride-metrics" className="py-20 px-4 bg-gradient-to-b from-red-900 via-red-800 to-red-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/milestones/kieu-hanh.jpg"
          alt="Kiêu hãnh"
          fill
          className="object-cover opacity-15"
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-4 font-serif">
            Kiêu Hãnh
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Những con số thể hiện sức mạnh và ý chí bất khuất của dân tộc
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRIDE_METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 208, 0, 0.2)"
              }}
            >
              <Card className="bg-red-900/30 border-red-700 hover:border-goldVN transition-all duration-300 h-full">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-goldVN to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-black">
                      {metric.id}
                    </span>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    className="mb-4"
                  >
                    <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                      <AnimatedCounter 
                        value={metric.value} 
                        suffix={metric.suffix}
                        duration={2}
                        delay={index * 0.2}
                      />
                    </div>
                  </motion.div>
                  
                  <h3 className="text-lg font-semibold text-white leading-relaxed">
                    {metric.label}
                  </h3>
                  
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(metric.value, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: index * 0.2 + 0.5 }}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-red-900/30 to-yellow-900/30 border-yellow-400/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                Tự hào dân tộc Việt Nam
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                Những con số này không chỉ là thống kê, mà là minh chứng cho sức mạnh tinh thần, 
                ý chí kiên cường và tinh thần đoàn kết của toàn dân tộc trong cuộc kháng chiến vĩ đại.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = "", duration = 2, delay = 0 }: {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const increment = value / (duration * 60); // 60fps
      let current = 0;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(current);
        }
      }, 1000 / 60);

      return () => clearInterval(counter);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, duration, delay]);

  return (
    <motion.span
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
    >
      {count.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
    </motion.span>
  );
}



function Hero({ onScrollToEssay, onScrollToTimeline, onScrollToGallery, audioEnabled, setAudioEnabled }: {
  onScrollToEssay: () => void;
  onScrollToTimeline: () => void;
  onScrollToGallery: () => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
}) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <ParallaxLayer speed={0.1}>
        <div className="absolute inset-0">
        <Image
            src="/images/hero/khe-sanh-battle.jpg"
            alt="Trận chiến Khe Sanh - Cối xay thịt"
            fill
            className="object-cover"
          priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/70 to-black/90" />
        </div>
      </ParallaxLayer>

      {/* Overlay layers */}
      <ParallaxLayer speed={0.2}>
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-transparent" />
      </ParallaxLayer>

      <ParallaxLayer speed={0.4}>
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-red-600/20 via-transparent to-red-800/20" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dc2626' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
               }} />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.1}>
        <div className="absolute top-10 right-10 w-32 h-20 opacity-20">
          <VietnamFlag animated={true} />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.3}>
        <div className="absolute top-1/4 left-10 w-24 h-16 opacity-15">
          <VietnamFlag animated={true} />
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={0.2}>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-12 opacity-10">
          <VietnamFlag animated={true} />
        </div>
      </ParallaxLayer>

      <Particles />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-yellow-300 mb-6 font-serif leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Nỗi đau xót trong cuộc kháng chiến chống Mỹ
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-yellow-200/80 mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            Tổ quốc ghi công! Đời đời nhớ ơn các anh hùng liệt sĩ
          </motion.p>

          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="w-24 h-16">
              <VietnamFlag animated={true} />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              onClick={onScrollToEssay}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/25"
            >
              Đọc bài văn
            </Button>

            <Button
              onClick={onScrollToTimeline}
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              Xem Timeline
            </Button>

            <Button
              onClick={onScrollToGallery}
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
            >
              <Eye className="w-4 h-4 mr-2" />
              Xem Gallery
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white px-6 py-3 text-lg transition-all duration-300 hover:scale-105"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Số liệu Thành Cổ Quảng Trị
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-gradient-to-br from-red-900 to-black border-red-600">
                <DialogHeader>
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-10">
                      <VietnamFlag animated={false} />
                    </div>
                  </div>
                  <DialogTitle className="text-2xl text-yellow-300 font-serif text-center">
                    Số liệu Thành Cổ Quảng Trị
                  </DialogTitle>
                  <DialogDescription className="text-red-200 text-center">
                    Biểu tượng của sự hy sinh và kiên cường
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  {QUANG_TRI_STATS.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-red-800/30 p-4 rounded-lg border border-red-600/30 hover:border-red-400/50 transition-colors"
                    >
                      <div className="text-2xl font-bold text-yellow-300 mb-1">{stat.value}</div>
                      <div className="text-sm text-red-200">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center text-red-100 italic">
                  "Không gì quý hơn độc lập, tự do. Hàng triệu con người đã ngã xuống để đổi lấy hòa bình hôm nay."
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 text-yellow-200/70">
                    {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    <Switch
                      checked={audioEnabled}
                      onCheckedChange={setAudioEnabled}
                      className="data-[state=checked]:bg-yellow-500"
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Âm thanh nền (mặc định tắt)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-yellow-400" />
      </motion.div>
    </section>
  );
}

function EssaySection() {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 bg-gradient-to-b from-black via-red-900/20 to-black overflow-hidden">
      {/* Background Image - Vietnam Flag */}
      <div className="absolute inset-0 opacity-25">
            <Image
          src="/images/culture/vietnam-flag.jpg"
          alt="Lá cờ Việt Nam"
          fill
          className="object-cover"
          priority={false}
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-red-900/20 to-black/40" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-10 mb-4">
            <VietnamFlag animated={false} />
        </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-300 font-serif">
            Bài Văn Tưởng Niệm
          </h2>
        </motion.div>

        <div className="space-y-12">
          {ESSAY_PARAGRAPHS.map((paragraph, index) => (
            <motion.div
              key={index}
              className="space-y-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              {/* Đoạn văn */}
              <div className="bg-red-900/20 backdrop-blur-sm p-6 rounded-lg border border-red-600/20 hover:border-yellow-400/30 transition-colors">
                <p className="text-lg leading-relaxed text-gray-200 font-serif">
                  {paragraph}
                </p>
              </div>

              {/* Ảnh sau đoạn văn đầu tiên */}
              {index === 0 && (
                <motion.div
                  className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
        >
          <Image
                    src="/images/gallery/medevac-rescue.jpg"
                    alt="Cuộc sơ tán y tế quân sự - Sự hy sinh và lòng dũng cảm"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-sm md:text-base italic font-serif leading-relaxed">
                      "Mỗi tấc đất, mỗi ngọn cỏ, mỗi dòng sông đều hằn vết thương chiến tranh"
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Ảnh sau đoạn văn thứ 3 */}
              {index === 2 && (
                <motion.div
                  className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
        >
          <Image
                    src="/images/gallery/khe-sanh-battle.jpg"
                    alt="Thành Cổ Quảng Trị - 81 ngày đêm khốc liệt"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-sm md:text-base italic font-serif leading-relaxed">
                      "Thành Cổ Quảng Trị với diện tích chỉ khoảng 0,36 km² đã phải hứng chịu một cơn mưa bom đạn khủng khiếp"
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Ảnh sau đoạn văn thứ 5 */}
              {index === 4 && (
                <motion.div
                  className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
        >
          <Image
                    src="/images/gallery/soldiers-smile.jpg"
                    alt="Tinh thần lạc quan giữa khó khăn"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-sm md:text-base italic font-serif leading-relaxed">
                      "Hơn 10.000 chiến sĩ đã ngã xuống chỉ để giữ cho lá cờ đỏ sao vàng tung bay"
                    </p>
    </div>
                </motion.div>
              )}

              {/* Ảnh sau đoạn văn thứ 7 */}
              {index === 6 && (
                <motion.div
                  className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/images/gallery/flag-raising.jpg"
                    alt="Lá cờ đỏ sao vàng tung bay"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-sm md:text-base italic font-serif leading-relaxed">
                      "Đỉnh cao của sự bất khuất ấy là ngày 30/4/1975, khi đất nước thống nhất"
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Ảnh sau đoạn văn cuối */}
              {index === ESSAY_PARAGRAPHS.length - 1 && (
                <motion.div
                  className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src="/images/gallery/peace-moment.jpg"
                    alt="Hòa bình - Ước mơ của cả dân tộc"
                    fill
                    className="object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-sm md:text-base italic font-serif leading-relaxed">
                      "Hòa bình hôm nay là cái giá của máu và nước mắt"
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const allTags = [...new Set(TIMELINE_EVENTS.flatMap(event => event.tags))];

  const filteredEvents = TIMELINE_EVENTS.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.descShort.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilters.length === 0 || activeFilters.some(tag => event.tags.includes(tag));
    return matchesSearch && matchesFilter;
  });

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <section ref={timelineRef} className="relative py-20 px-4 bg-gradient-to-b from-black to-red-900/30 overflow-hidden">
      {/* Background Image - Kills-1 */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/milestones/kills-1.jpg"
          alt="Chiến trường khốc liệt"
          fill
          className="object-cover"
          priority={false}
          quality={60}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-red-900/30 to-black/50" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-10 mb-4">
            <VietnamFlag animated={false} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-300 font-serif">
            Dòng Thời Gian Kháng Chiến (1954-1975)
          </h2>
        </motion.div>

        <motion.div
          className="mb-12 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện..."
              value={searchTerm}
              onChange={(e: any) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-red-900/30 border border-red-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={activeFilters.includes(tag) ? "default" : "outline"}
                onClick={() => toggleFilter(tag)}
                className={`px-4 py-2 text-sm transition-all duration-300 ${
                  activeFilters.includes(tag)
                    ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                    : 'border-red-600/30 text-red-300 hover:border-yellow-400 hover:text-yellow-400'
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-yellow-400 to-red-600 rounded-full"
            style={{ height: '100%', originY: 0 }}
            initial={{ scaleY: 0 }}
          >
            <motion.div
              className="w-full bg-yellow-300 rounded-full"
              style={{ scaleY: scrollYProgress }}
            />
          </motion.div>

          <div className="space-y-12">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-red-900 z-10"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />

                <motion.div
                  className={`w-full max-w-lg ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-red-900/80 to-red-800/80 border border-red-600/30 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">{event.date}</span>
                      </div>
                      <CardTitle className="text-xl text-white font-serif">{event.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {event.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full border border-yellow-400/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 mb-4">
                        {event.descShort}
                      </CardDescription>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-yellow-400/30 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                            onClick={() => setSelectedEvent(event)}
                          >
                            Chi tiết
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-gradient-to-br from-red-900 to-black border-red-600">
                          <DialogHeader>
                            <DialogTitle className="text-2xl text-yellow-300 font-serif">
                              {event.title}
                            </DialogTitle>
                            <DialogDescription className="text-red-200">
                              {event.date}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="relative aspect-video overflow-hidden rounded-lg">
                              <Image
                                src={event.image}
                                alt={event.alt}
                                fill
                                className="object-cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            </div>
                            <p className="text-gray-200 leading-relaxed">{event.descLong}</p>
                            <div className="flex flex-wrap gap-2">
                              {event.tags.map(tag => (
                                <span
                                  key={tag}
                                  className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-400/30"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [filter, setFilter] = useState('Tất cả');

  const categories = ['Tất cả', ...new Set(GALLERY_IMAGES.map(img => img.category))];
  const filteredImages = filter === 'Tất cả' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-red-900/30 to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-16 h-10 mb-4">
            <VietnamFlag animated={false} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-300 font-serif mb-4">
            Khoảnh Khắc Lịch Sử
          </h2>
          <p className="text-red-200 text-center max-w-2xl">
            Những hình ảnh ghi lại những khoảnh khắc đau thương nhưng cũng đầy kiêu hãnh của dân tộc
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 transition-all duration-300 ${
                filter === category
                  ? 'bg-yellow-500 text-black hover:bg-yellow-400'
                  : 'border-red-600/30 text-red-300 hover:border-yellow-400 hover:text-yellow-400'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Masonry Gallery */}
        <motion.div
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="break-inside-avoid mb-6 group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-lg bg-red-900/20 backdrop-blur-sm border border-red-600/30 hover:border-yellow-400/50 transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold mb-2">{image.caption}</h3>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-yellow-400" />
                      <span className="text-yellow-300 text-sm">Xem chi tiết</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-400 text-sm font-medium">{image.category}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-yellow-400 p-1"
                        onClick={() => {
                          // Share functionality
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              className="relative max-w-4xl max-h-[90vh] bg-red-900/95 backdrop-blur-sm rounded-lg overflow-hidden border border-red-600/30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e: any) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-yellow-300 mb-2">{selectedImage.caption}</h3>
                <p className="text-red-200 mb-4">{selectedImage.alt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-400 font-medium">{selectedImage.category}</span>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedImage(null)}
                    className="border-red-600/30 text-red-300 hover:border-yellow-400 hover:text-yellow-400"
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 bg-gradient-to-t from-red-900 to-red-800 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="w-20 h-12">
              <VietnamFlag animated={true} />
            </div>
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-6 h-6 text-yellow-400" />
              <span className="text-xl text-yellow-300 font-serif">
                Không gì quý hơn độc lập, tự do
              </span>
              <Heart className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <p className="text-red-200 text-sm">
            Dự án nhỏ tưởng niệm những người đã hy sinh vì độc lập dân tộc của Bùi Đình Trí
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

export default function HomePage() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotMessage, setChatbotMessage] = useState('');
  const essayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const wallOfHonorRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const homefrontRef = useRef<HTMLDivElement>(null);
  const prideRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioEnabled) {
      console.log('Audio enabled (placeholder)');
    }
  }, [audioEnabled]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold z-50 transition-all duration-200"
        >
          Bỏ qua đến nội dung chính
        </a>
        
        <Hero
          onScrollToEssay={() => scrollToSection(essayRef)}
          onScrollToTimeline={() => scrollToSection(timelineRef)}
          onScrollToGallery={() => scrollToSection(galleryRef)}
          audioEnabled={audioEnabled}
          setAudioEnabled={setAudioEnabled}
        />

        <main id="main-content">
          {/* Lời Thề Bất Khuất */}
          <OathBanner />

          {/* Bài Văn Tưởng Niệm */}
          <div ref={essayRef}>
            <EssaySection />
          </div>

          {/* Tường Danh Dự */}
          <div ref={wallOfHonorRef}>
            <WallOfHonor />
          </div>

          {/* Khúc Tráng Ca */}
          <div ref={quotesRef}>
            <QuotesPoems />
          </div>

          {/* Dòng Thời Gian Kháng Chiến */}
          <div ref={timelineRef}>
            <Timeline />
          </div>

          {/* Bản Đồ Kháng Chiến Tương Tác */}
          <div ref={mapRef}>
            <InteractiveMap />
          </div>

          {/* Sức Mạnh Hậu Phương */}
          <div ref={homefrontRef}>
            <HomefrontAccordion />
          </div>

          {/* Chỉ Số Kiêu Hãnh */}
          <div ref={prideRef}>
            <PrideMetrics />
          </div>

          {/* Gallery */}
          <div ref={galleryRef}>
            <Gallery />
          </div>


        </main>

        {/* Chatbot */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <Button
              onClick={() => setShowChatbot(!showChatbot)}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="text-2xl">🇻🇳</span>
            </Button>
            
            {showChatbot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute bottom-16 right-0 w-80 h-96 bg-red-900/95 backdrop-blur-sm rounded-lg border border-red-700 shadow-xl"
              >
                <div className="p-4 border-b border-red-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-yellow-400">
                      Lịch sử Việt Nam
                    </h3>
                    <Button
                      onClick={() => setShowChatbot(false)}
                      variant="ghost"
                      size="sm"
                      className="text-red-200 hover:text-white"
                    >
                      ✕
                    </Button>
                  </div>
                  <p className="text-xs text-red-200 mt-1">
                    Giọng kể giàu cảm xúc, chính xác, hào hùng
                  </p>
                </div>
                
                <div className="p-4 h-64 overflow-y-auto">
                  <div className="space-y-3">
                    <div className="bg-red-800/50 rounded-lg p-3">
                      <p className="text-white text-sm">
                        Xin chào! Hỏi gì cũng được về lịch sử Việt Nam. Tôi có thể kể theo mạch hào hùng và vẫn đảm bảo chính xác.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-yellow-400 text-sm font-medium">Câu hỏi gợi ý:</p>
                      {[
                        "Vì sao Thành cổ Quảng Trị gắn với hy sinh bi tráng?",
                        "Ý nghĩa toàn cầu của chiến thắng Điện Biên Phủ 1954?",
                        "Trần Hưng Đạo và chiến lược chống Nguyên Mông?",
                        "Vì sao Bạch Đằng 938 là mốc son chói lọi?"
                      ].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setChatbotMessage(question)}
                          className="block w-full text-left text-xs text-red-200 hover:text-yellow-400 p-2 rounded bg-red-800/30 hover:bg-red-700/50 transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-red-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatbotMessage}
                      onChange={(e: any) => setChatbotMessage(e.target.value)}
                      placeholder="Hỏi về lịch sử Việt Nam..."
                      className="flex-1 px-3 py-2 bg-red-800/50 border border-red-600 rounded-lg text-white placeholder-red-300 text-sm focus:outline-none focus:border-yellow-400"
                      onKeyPress={(e: any) => {
                        if (e.key === 'Enter') {
                          // Handle send message
                          setChatbotMessage('');
                        }
                      }}
                    />
                    <Button
                      onClick={() => setChatbotMessage('')}
                      size="sm"
                      className="bg-yellow-400 text-black hover:bg-yellow-500"
                    >
                      Gửi
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </TooltipProvider>
  );
}