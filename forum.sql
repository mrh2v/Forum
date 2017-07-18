-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th7 18, 2017 lúc 05:48 PM
-- Phiên bản máy phục vụ: 10.1.24-MariaDB
-- Phiên bản PHP: 7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `forum`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `binh_luan`
--

CREATE TABLE `binh_luan` (
  `ID` int(11) NOT NULL,
  `ID_CHU_DE` int(11) NOT NULL,
  `NOI_DUNG` longtext NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `THOI_GIAN` datetime NOT NULL,
  `CAM_ON` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `binh_luan`
--

INSERT INTO `binh_luan` (`ID`, `ID_CHU_DE`, `NOI_DUNG`, `ID_USER`, `THOI_GIAN`, `CAM_ON`) VALUES
(1, 3, '<p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Chà chà, nhà mình vẫn chưa dính thằng virus này. Nghe thấy thiên hạ nói về nó nhiều mà muốn dính thử cho biế</span><br/></p>', 2, '2017-07-18 15:28:45', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chu_de`
--

CREATE TABLE `chu_de` (
  `ID` int(11) NOT NULL,
  `ID_DANH_MUC` int(11) NOT NULL,
  `TEN_CHU_DE` varchar(255) NOT NULL,
  `NOI_DUNG` longtext NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `DS_THICH` mediumtext,
  `SL_XEM` int(11) DEFAULT NULL,
  `SL_THICH` int(11) DEFAULT NULL,
  `THOI_GIAN` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `chu_de`
--

INSERT INTO `chu_de` (`ID`, `ID_DANH_MUC`, `TEN_CHU_DE`, `NOI_DUNG`, `ID_USER`, `DS_THICH`, `SL_XEM`, `SL_THICH`, `THOI_GIAN`) VALUES
(1, 6, 'TEST', 'ABCD', 2, NULL, 0, 0, '2017-07-14 14:50:00'),
(2, 6, 'Cuộc thi \"Chụp ảnh liền tay, đi du lịch ngay\"', '<h2 class=\"posttitle icon\" style=\"font-size: 14px;text-align: left;\"><b>Cuộc thi &#34;Chụp ảnh liền tay, đi du lịch ngay&#34;</b><div class=\"fb-share-button\"></div></h2><div class=\"content\" style=\"font-size: 17px;text-align: left;\"><div id=\"post_message_437306\"><article><blockquote class=\"postcontent restore\" style=\"font-size: 11pt;color: black;\">Việt Nam Tái Chế hôm nay chính thức khởi động cuộc thi “Chụp ảnh liền tay, đi du lịch ngay” trên toàn quốc tại thành phố Hồ Chí Minh và Hà Nội với phần thưởng mỗi tháng là một chuyến du lịch Côn Đảo ngắm san hô miễn phí trị giá 10 triệu đồng. Kéo dài trong hai tháng, cuộc thi tìm kiếm những bức ảnh sáng tạo nhưng vẫn gắn kết với thông điệp xanh mà Việt Nam Tái Chế muốn truyền tải. </blockquote></article></div></div><!--EndFragment--><div style=\"text-align: center;\"><img src=\"/2/1500386347249/OggYt1.jpg\"/></div><p><br/><!--StartFragment--><span style=\"font-size: 14.6667px;text-align: left;float: none;\">“Chụp ảnh liền tay, đi du lịch ngay” là cuộc thi ảnh đầu tiên mà Việt Nam Tái Chế tổ chức tại Việt Nam”, bà Miriam Lassernig, phát ngôn viên của tổ chức Việt Nam Tái Chế, chia sẻ. “Sau hai năm, thông qua nhiều hoạt động tuyên truyền như thu gom rác thải điện tử tận nhà, tham gia Ngày hội Tái chế thường niên, Việt Nam Tái Chế đã thu được hơn 7 tấn rác thải điện tử. Đây vẫn là con số khiêm tốn so với số liệu 100 nghìn tấn rác thải điện tử do người Việt Nam thải ra hằng năm (theo Bộ Khoa học và Công nghệ năm 2015). Chúng tôi hy vọng cuộc thi này sẽ giúp thúc đẩy từ nhận thức thành hành động, khuyến khích thải bỏ rác điện tử đúng cách”. </span><br style=\"font-size: 14.6667px;text-align: left;\"/><br style=\"font-size: 14.6667px;text-align: left;\"/><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Diễn ra từ ngày 1/7 đến 31/8/2017, cuộc thi “Chụp ảnh liền tay, đi du lịch ngay” được thực hiện trên mạng xã hội Facebook với cách thức chơi đơn giản. </span></p><p><!--EndFragment--><font color=\"#000000\"></font></p><p><font color=\"#000000\"><img src=\"/2/1500386425141/EMWdON.jpg\"/><br/></font></p><p><br/></p><!--StartFragment--><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Người tham dự chỉ cần chụp lại khoảnh khắc đem rác thải điện tử đến giao cho một trong mười điểm thu gom của Việt Nam Tái Chế, đăng lên trang cá nhân Facebook ở chế độ công khai, tag @Việt Nam Tái Chế và 5 bạn khác, sử dụng hashtag: #Chupanhlientaydidulichngay và #VietNamTaiChe. </span></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Việt Nam Tái Chế xác định người thắng cuộc dựa vào số lượng like cao nhất, được tổng hợp trên trang cá nhân và fanpage chương trình. </span></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Kết quả cuộc thi sẽ được công bố trên fanpage vào ngày 7 của tháng 8 và tháng 9 và ban tổ chức sẽ gửi tin nhắn thông báo facebook trực tiếp cho người chiến thắng. Theo đó, người thắng cuộc sẽ đến Côn Đảo vào tháng 9, tham quan Hòn Bảy Cạnh, lặn ngắm san hô hiếm nằm trong Sách Đỏ của Việt Nam, thăm rùa đẻ trứng… </span></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Thông tin chi tiết về cuộc thi được đăng tải tại: </span></p><p><a href=\"https://www.facebook.com/Vietnamtaiche/\" target=\"_blank\" rel=\"nofollow\" style=\"font-size: 14.6667px;text-align: left;\">https://www.facebook.com/Vietnamtaiche/</a></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">. </span></p><!--EndFragment--><p><br/></p><p><br/></p><p><img src=\"/2/1500386450245/xdyN8L.jpg\"/></p><p><br/></p><p><br/><!--StartFragment--><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Từ khi hoạt động tại Việt Nam, Việt Nam Tái Chế đã thực hiện nhiều dự án cộng đồng khác nhau nhằm nâng cao ý thức người dân về tái chế rác thải điện tử như thu gom rác thải điện tử tận nhà tại Hà Nội và Thành phố Hồ Chí Minh, chạy xe diễu hành trên các trục giao thông chính trong địa bàn các phường, phát tờ rơi, tuyên truyền, thăm dò ý kiến và tặng quà cho các hộ gia đình. Đồng thời, Việt Nam Tái Chế cũng liên tiếp tham gia Ngày hội Tái chế được tổ chức bởi Sở Tài nguyên &amp; Môi trường thành phố Hồ Chí Minh năm 2016 và 2017. </span><br style=\"font-size: 14.6667px;text-align: left;\"/><br style=\"font-size: 14.6667px;text-align: left;\"/><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Ngoài ra, tại fanpage của Việt Nam Tái Chế, thông qua những chia sẻ bổ ích mỗi ngày, gần 8000 người theo dõi thường xuyên được cập nhật và học hỏi các kiến thức, thông tin hữu ích liên quan đến bảo vệ môi trường nói chung và tái chế rác thải điện tử tại Việt Nam nói riêng.</span><br style=\"font-size: 14.6667px;text-align: left;\"/><br style=\"font-size: 14.6667px;text-align: left;\"/><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Là chương trình thu hồi và tái chế rác thải điện tử chuyên nghiệp, Việt Nam Tái Chế được vận hành bởi các nhà sản xuất thiết bị điện tử hàng đầu. Tính đến tháng 6 năm 2017, đã có hơn bảy tấn rác thải điện tử được thu gom và xử lý chuyên nghiệp bởi Việt Nam Tái Chế</span><!--EndFragment--><br/><br/></p>', 2, NULL, 0, 0, '2017-07-18 14:01:36'),
(3, 6, 'Chụp ảnh nào bạn ơi !!!!!!!!!!!!!!', '<h2 class=\"posttitle icon\" style=\"font-size: 14px;text-align: left;\"><b>Cuộc thi &#34;Chụp ảnh liền tay, đi du lịch ngay&#34;</b><div class=\"fb-share-button\"></div></h2><div class=\"content\" style=\"font-size: 17px;text-align: left;\"><div id=\"post_message_437306\"><article><blockquote class=\"postcontent restore\" style=\"font-size: 11pt;color: black;\">Việt Nam Tái Chế hôm nay chính thức khởi động cuộc thi “Chụp ảnh liền tay, đi du lịch ngay” trên toàn quốc tại thành phố Hồ Chí Minh và Hà Nội với phần thưởng mỗi tháng là một chuyến du lịch Côn Đảo ngắm san hô miễn phí trị giá 10 triệu đồng. Kéo dài trong hai tháng, cuộc thi tìm kiếm những bức ảnh sáng tạo nhưng vẫn gắn kết với thông điệp xanh mà Việt Nam Tái Chế muốn truyền tải. </blockquote></article></div></div><div style=\"font-size: 14px;text-align: center;\"><img src=\"http://localhost:4000/2/1500386347249/OggYt1.jpg\" style=\"vertical-align: middle;\"/></div><p style=\"font-size: 14px;\"><br/><span style=\"font-size: 14.6667px;text-align: left;float: none;\">“Chụp ảnh liền tay, đi du lịch ngay” là cuộc thi ảnh đầu tiên mà Việt Nam Tái Chế tổ chức tại Việt Nam”, bà Miriam Lassernig, phát ngôn viên của tổ chức Việt Nam Tái Chế, chia sẻ. “Sau hai năm, thông qua nhiều hoạt động tuyên truyền như thu gom rác thải điện tử tận nhà, tham gia Ngày hội Tái chế thường niên, Việt Nam Tái Chế đã thu được hơn 7 tấn rác thải điện tử. Đây vẫn là con số khiêm tốn so với số liệu 100 nghìn tấn rác thải điện tử do người Việt Nam thải ra hằng năm (theo Bộ Khoa học và Công nghệ năm 2015). Chúng tôi hy vọng cuộc thi này sẽ giúp thúc đẩy từ nhận thức thành hành động, khuyến khích thải bỏ rác điện tử đúng cách”. </span><br style=\"font-size: 14.6667px;text-align: left;\"/><br style=\"font-size: 14.6667px;text-align: left;\"/><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Diễn ra từ ngày 1/7 đến 31/8/2017, cuộc thi “Chụp ảnh liền tay, đi du lịch ngay” được thực hiện trên mạng xã hội Facebook với cách thức chơi đơn giản. </span></p><p style=\"font-size: 14px;\"><font color=\"#000000\"></font></p><p style=\"font-size: 14px;\"><font color=\"#000000\"><img src=\"http://localhost:4000/2/1500386425141/EMWdON.jpg\" style=\"vertical-align: middle;\"/><br/></font></p><p><br style=\"font-size: 14px;\"/></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Người tham dự chỉ cần chụp lại khoảnh khắc đem rác thải điện tử đến giao cho một trong mười điểm thu gom của Việt Nam Tái Chế, đăng lên trang cá nhân Facebook ở chế độ công khai, tag @Việt Nam Tái Chế và 5 bạn khác, sử dụng hashtag: #Chupanhlientaydidulichngay và #VietNamTaiChe. </span></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Việt Nam Tái Chế xác định người thắng cuộc dựa vào số lượng like cao nhất, được tổng hợp trên trang cá nhân và fanpage chương trình. </span></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Kết quả cuộc thi sẽ được công bố trên fanpage vào ngày 7 của tháng 8 và tháng 9 và ban tổ chức sẽ gửi tin nhắn thông báo facebook trực tiếp cho người chiến thắng. Theo đó, người thắng cuộc sẽ đến Côn Đảo vào tháng 9, tham quan Hòn Bảy Cạnh, lặn ngắm san hô hiếm nằm trong Sách Đỏ của Việt Nam, thăm rùa đẻ trứng… </span></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><br style=\"font-size: 14.6667px;text-align: left;\"/></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Thông tin chi tiết về cuộc thi được đăng tải tại: </span></p><p><a href=\"https://www.facebook.com/Vietnamtaiche/\" target=\"_blank\" rel=\"nofollow\" style=\"font-size: 14.6667px;text-align: left;\">https://www.facebook.com/Vietnamtaiche/</a></p><p><span style=\"font-size: 14.6667px;text-align: left;float: none;\">. </span></p><p><br style=\"font-size: 14px;\"/></p><p><br style=\"font-size: 14px;\"/></p><p><img src=\"http://localhost:4000/2/1500386450245/xdyN8L.jpg\" style=\"vertical-align: middle;font-size: 14px;\"/></p><p><br style=\"font-size: 14px;\"/></p><p style=\"font-size: 14px;\"><br/><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Từ khi hoạt động tại Việt Nam, Việt Nam Tái Chế đã thực hiện nhiều dự án cộng đồng khác nhau nhằm nâng cao ý thức người dân về tái chế rác thải điện tử như thu gom rác thải điện tử tận nhà tại Hà Nội và Thành phố Hồ Chí Minh, chạy xe diễu hành trên các trục giao thông chính trong địa bàn các phường, phát tờ rơi, tuyên truyền, thăm dò ý kiến và tặng quà cho các hộ gia đình. Đồng thời, Việt Nam Tái Chế cũng liên tiếp tham gia Ngày hội Tái chế được tổ chức bởi Sở Tài nguyên &amp; Môi trường thành phố Hồ Chí Minh năm 2016 và 2017. </span><br style=\"font-size: 14.6667px;text-align: left;\"/><br style=\"font-size: 14.6667px;text-align: left;\"/><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Ngoài ra, tại fanpage của Việt Nam Tái Chế, thông qua những chia sẻ bổ ích mỗi ngày, gần 8000 người theo dõi thường xuyên được cập nhật và học hỏi các kiến thức, thông tin hữu ích liên quan đến bảo vệ môi trường nói chung và tái chế rác thải điện tử tại Việt Nam nói riêng.</span><br style=\"font-size: 14.6667px;text-align: left;\"/><br style=\"font-size: 14.6667px;text-align: left;\"/><span style=\"font-size: 14.6667px;text-align: left;float: none;\">Là chương trình thu hồi và tái chế rác thải điện tử chuyên nghiệp, Việt Nam Tái Chế được vận hành bởi các nhà sản xuất thiết bị điện tử hàng đầu. Tính đến tháng 6 năm 2017, đã có hơn bảy tấn rác thải điện tử được thu gom và xử lý chuyên nghiệp bởi Việt Nam Tái Chế</span></p><!--EndFragment--><p><br/></p><p><br/></p>', 2, NULL, 0, 0, '2017-07-18 14:04:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `danh_muc`
--

CREATE TABLE `danh_muc` (
  `ID` int(11) NOT NULL,
  `TEN_DANH_MUC` varchar(50) NOT NULL,
  `ID_DM_CHA` int(11) DEFAULT NULL,
  `HE_SO` int(11) DEFAULT NULL,
  `ID_USER` int(11) NOT NULL,
  `THU_TU` int(11) DEFAULT NULL,
  `HIEN_THI` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `danh_muc`
--

INSERT INTO `danh_muc` (`ID`, `TEN_DANH_MUC`, `ID_DM_CHA`, `HE_SO`, `ID_USER`, `THU_TU`, `HIEN_THI`) VALUES
(1, 'MÁY TÍNH', NULL, 0, 2, 0, 1),
(2, 'ĐIỆN THOẠI', NULL, 0, 2, 1, 1),
(3, 'CÔNG NGHỆ', NULL, 0, 2, 2, 1),
(4, 'HỎI ĐÁP', NULL, 0, 2, 5, 1),
(5, 'LẬP TRÌNH', NULL, 0, 2, 4, 0),
(6, 'Tin tức công nghệ', 3, 1, 2, 0, 1),
(7, 'Ô tô - Xe máy', 3, 1, 2, 1, 1),
(8, 'Máy ảnh - Camera', 3, 1, 2, 2, 1),
(9, 'Thiết bị công nghệ', 3, 1, 2, 3, 1),
(10, 'Tin tức Máy tính, Laptop', 1, 1, 2, 1, 1),
(11, 'Phần cứng - Tư vấn mua Máy tính, Laptop', 1, 1, 2, 2, 1),
(12, 'Hỏi đáp tin học', 1, 1, 2, 3, 1),
(13, 'Kiến thức tin học', 1, 1, 2, 3, 1),
(14, 'Tin tức điện thoại', 2, 1, 2, 1, 1),
(15, 'Hỏi đáp - Tư vấn điện thoại', 2, 1, 2, 2, 1),
(16, 'Android', 2, 1, 2, 3, 1),
(17, 'IOS (iPhone - iPad - iPod)', 2, 1, 2, 4, 1),
(18, 'Windows Phone', 2, 1, 2, 5, 1),
(19, 'BlackBerry', 2, 1, 2, 6, 1),
(20, 'Lập trình', 5, 1, 2, 1, 1),
(21, 'Đồ họa', 5, 1, 2, 2, 1),
(22, 'Webmaster', 5, 1, 2, 3, 1),
(23, 'SEO', 5, 1, 2, 4, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tt_bao_mat`
--

CREATE TABLE `tt_bao_mat` (
  `ID` int(11) NOT NULL,
  `CAU_HOI` varchar(255) NOT NULL,
  `TRA_LOI` varchar(255) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `MAT_KHAU_2` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tt_bao_mat`
--

INSERT INTO `tt_bao_mat` (`ID`, `CAU_HOI`, `TRA_LOI`, `ID_USER`, `MAT_KHAU_2`) VALUES
(5, 'Tênhồinhỏcủabạnlàgì?', 'admin2', 8, 'admin2admin2'),
(6, 'Tênhồinhỏcủabạnlàgì?', 'admin3', 9, 'admin3admin3'),
(7, 'Convậtbạnyêuthíchnhấtlàgì?', 'meocon', 2, 'hoangvanhung');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tt_ca_nhan`
--

CREATE TABLE `tt_ca_nhan` (
  `ID` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `HO_TEN` varchar(50) DEFAULT NULL,
  `NGAY_SINH` datetime DEFAULT NULL,
  `QUE_QUAN` varchar(255) DEFAULT NULL,
  `SO_CMND` varchar(50) DEFAULT NULL,
  `SO_DT` varchar(50) DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `tt_ca_nhan`
--

INSERT INTO `tt_ca_nhan` (`ID`, `ID_USER`, `HO_TEN`, `NGAY_SINH`, `QUE_QUAN`, `SO_CMND`, `SO_DT`, `EMAIL`) VALUES
(3, 8, 'Hoàng Văn Hùng', '1993-01-06 00:00:00', 'Hà Nội', '012935358', '01658208920', 'hoanghungit93@gmail.com'),
(4, 9, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 2, 'Hoàng Văn Hùng', '1993-01-06 00:00:00', 'Hà Nội', '012935358', '0966426193', 'hoanghungit93@gmail.com');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `TEN_DANG_NHAP` varchar(50) NOT NULL,
  `MAT_KHAU` varchar(50) NOT NULL,
  `THOI_GIAN_TAO` date NOT NULL,
  `QUYEN` int(11) DEFAULT NULL,
  `TEN_HIEN_THI` varchar(50) DEFAULT NULL,
  `AVATAR` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`ID`, `TEN_DANG_NHAP`, `MAT_KHAU`, `THOI_GIAN_TAO`, `QUYEN`, `TEN_HIEN_THI`, `AVATAR`) VALUES
(2, 'admin', 'ADMIN1', '2017-07-12', 9999, 'MrH2V', 'data:image/jpeg;base64,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'),
(8, 'admin2', 'admin2', '2017-07-13', 1, NULL, NULL),
(9, 'admin3', 'admin3', '2017-07-13', 1, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `chu_de`
--
ALTER TABLE `chu_de`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `tt_bao_mat`
--
ALTER TABLE `tt_bao_mat`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `tt_ca_nhan`
--
ALTER TABLE `tt_ca_nhan`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `binh_luan`
--
ALTER TABLE `binh_luan`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT cho bảng `chu_de`
--
ALTER TABLE `chu_de`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT cho bảng `danh_muc`
--
ALTER TABLE `danh_muc`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT cho bảng `tt_bao_mat`
--
ALTER TABLE `tt_bao_mat`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT cho bảng `tt_ca_nhan`
--
ALTER TABLE `tt_ca_nhan`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
