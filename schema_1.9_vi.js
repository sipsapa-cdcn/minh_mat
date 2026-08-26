import { registerMvuSchema as r } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

const e = _,
  t = z,
  a = t.z.coerce.number().transform(r => e.clamp(r, 0, 100)),
  u = t.z.coerce.number().transform(r => Math.max(0, Math.round(r))),
  f = t.z.object({
    'Binh khí chủ chiến': t.z.string().prefault('Chưa ghi'),
    'Binh khí viễn xạ': t.z.string().prefault('Không'),
    'Phòng cụ': t.z.string().prefault('Không'),
    'Hỏa khí': t.z.string().prefault('Không'),
    'Tọa kỵ': t.z.string().prefault('Không'),
    'Tỷ lệ tề bị': a.prefault(40),
    'Tỷ lệ hoàn hảo': a.prefault(70)
  }).prefault({}),
  l = t.z.object({
    'Loại hình': t.z.enum(['Đoản kỳ thao luyện', 'Thường quy chỉnh huấn', 'Trường kỳ chỉnh huấn', 'Hưu chỉnh thương binh', 'Chỉnh doanh hoán trang']),
    'Doanh mục tiêu': t.z.string().prefault(''),
    'Tướng lĩnh chấp hành': t.z.string().prefault(''),
    'Ngày bắt đầu': t.z.string().prefault(''),
    'Số ngày bắt đầu': u.prefault(0),
    'Số ngày cần thiết': u.prefault(1),
    'Số ngày đã tiến hành': u.prefault(0),
    'Ngân sách ngân lượng': t.z.coerce.number().transform(r => Math.max(0, r)).prefault(0),
    'Ngân sách lương thực': t.z.coerce.number().transform(r => Math.max(0, r)).prefault(0),
    'Trạng thái': t.z.enum(['Đang tiến hành', 'Đã hoàn thành', 'Đã đình chỉ']).prefault('Đang tiến hành'),
    'Hiệu quả dự kiến': t.z.string().prefault(''),
    'Kết quả hoàn thành': t.z.string().prefault(''),
    'Hiệu quả': t.z.object({
      'Huấn luyện': t.z.coerce.number().prefault(0),
      'Sĩ khí': t.z.coerce.number().prefault(0),
      'Hậu cần': t.z.coerce.number().prefault(0),
      'Bì lao': t.z.coerce.number().prefault(0),
      'Khôi phục thương binh': u.prefault(0)
    }).prefault({}),
    'Trang bị mục tiêu': t.z.object({
      'Đẳng cấp': t.z.enum(['Tàn phá', 'Giản lậu', 'Phổ thông', 'Tinh lương', 'Tinh nhuệ']).prefault('Phổ thông'),
      'Phương án': t.z.string().prefault('Bộ tốt chế thức')
    }).prefault({}),
    'Ghi chú': t.z.string().prefault(''),
    '_Số ngày thúc đẩy lần cuối': u.prefault(0)
  }).prefault({ 'Loại hình': 'Đoản kỳ thao luyện' }),
  p = t.z.object({
    'Ngày tháng': t.z.string().prefault(''),
    'Loại hình': t.z.string().prefault(''),
    'Doanh mục tiêu': t.z.string().prefault(''),
    'Tướng lĩnh chấp hành': t.z.string().prefault(''),
    'Ngân lượng': t.z.coerce.number().prefault(0),
    'Lương thực': t.z.coerce.number().prefault(0),
    'Kết quả': t.z.string().prefault('')
  }).prefault({}),
  n = t.z.object({
    'Thế giới vận hành': t.z.object({
      '_Định danh khởi đầu': t.z.string().prefault(''),
      'Ngày hiện tại': t.z.string().prefault('Sùng Trinh năm thứ bảy mùng một tháng ba'),
      'Năm Công nguyên': t.z.coerce.number().transform(r => Math.trunc(e.clamp(r, 1600, 1700))).prefault(1634),
      'Mười hai canh giờ': t.z.object({
        'Canh giờ': t.z.enum(['Giờ Tý', 'Giờ Sửu', 'Giờ Dần', 'Giờ Mão', 'Giờ Thìn', 'Giờ Tỵ', 'Giờ Ngọ', 'Giờ Mùi', 'Giờ Thân', 'Giờ Dậu', 'Giờ Tuất', 'Giờ Hợi']).prefault('Giờ Mão'),
        'Khắc': t.z.enum(['Sơ khắc', 'Nhất khắc', 'Nhị khắc', 'Tam khắc', 'Tứ khắc', 'Ngũ khắc', 'Lục khắc', 'Thất khắc']).prefault('Tam khắc')
      }).prefault({}),
      'Hai mươi bốn giờ': t.z.object({
        'Giờ': t.z.coerce.number().transform(r => e.clamp(r, 0, 23)).prefault(5),
        'Phút': t.z.coerce.number().transform(r => e.clamp(r, 0, 59)).prefault(45)
      }).prefault({}),
      'Địa điểm hiện tại': t.z.string().prefault('Nam Trực Lệ An Khánh phủ Đồng Thành huyện nha'),
      'Thời tiết': t.z.string().prefault('Trời quang'),
      'Bối cảnh': t.z.enum(['SFW', 'NSFW', 'WAR']).prefault('SFW'),
      'Số ngày vận hành': t.z.coerce.number().prefault(1)
    }).prefault({}),
    'Nhân vật chính': t.z.object({
      'Chức quan': t.z.string().prefault('Đồng Thành huyện nha tạo lệ'),
      'Danh vọng': t.z.coerce.number().transform(r => e.clamp(r, -1e3, 1e3)).prefault(10),
      'Giai đoạn danh vọng': t.z.enum(['Di xú vạn niên', 'Thanh danh lang tạ', 'Chúng thỉ chi đích', 'Hủy dự tham bán', 'Mặc mặc vô văn', 'Thanh danh thước khởi', 'Uy chấn nhất phương', 'Thiên hạ cảnh ngưỡng', 'Danh thùy thiên cổ']).prefault('Mặc mặc vô văn'),
      'Ngũ duy': t.z.object({
        'Sinh mệnh': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(60),
        'Võ lực': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(15),
        'Thống suất': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(10),
        'Trí mưu': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(55),
        'Chính trị': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(25)
      }).prefault({}),
      'Tư khố': t.z.object({
        'Kim ngân đồng': t.z.object({
          'Hoàng kim': t.z.coerce.number().prefault(0),
          'Bạch ngân': t.z.coerce.number().prefault(3),
          'Tiền đồng': t.z.coerce.number().prefault(200)
        }).prefault({}),
        'Vật phẩm quan trọng': t.z.record(t.z.string(), t.z.object({
          'Giới thiệu': t.z.string().prefault(''),
          'Số lượng': t.z.coerce.number().prefault(1)
        }).prefault({ 'Giới thiệu': '', 'Số lượng': 1 })).prefault({})
      }).prefault({})
    }).prefault({}),
    'Mạng lưới quan hệ': t.z.object({
      'Nhân vật có mặt': t.z.array(t.z.string()).transform(r => [...new Set(r.map(r => r.trim()).filter(Boolean))]).prefault([]),
      'Thượng tư': t.z.record(t.z.string(), t.z.object({
        'Thân phận': t.z.string().prefault(''),
        'Hảo cảm độ': t.z.coerce.number().transform(r => e.clamp(r, -100, 100)).prefault(0)
      }).prefault({ 'Thân phận': '', 'Hảo cảm độ': 0 })).prefault({}),
      'Cố hữu và đồng liêu': t.z.record(t.z.string(), t.z.object({
        'Thân phận': t.z.string().prefault(''),
        'Hảo cảm độ': t.z.coerce.number().transform(r => e.clamp(r, -100, 100)).prefault(0)
      }).prefault({ 'Thân phận': '', 'Hảo cảm độ': 0 })).prefault({}),
      'Hạ thuộc và mạc liêu': t.z.record(t.z.string(), t.z.object({
        'Thân phận': t.z.string().prefault(''),
        'Hảo cảm độ': t.z.coerce.number().transform(r => e.clamp(r, -100, 100)).prefault(0),
        'Trung tâm': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50)
      }).prefault({ 'Thân phận': '', 'Hảo cảm độ': 0, 'Trung tâm': 50 })).prefault({}),
      'Tam giáo cửu lưu': t.z.record(t.z.string(), t.z.object({
        'Thân phận': t.z.string().prefault(''),
        'Hảo cảm độ': t.z.coerce.number().transform(r => e.clamp(r, -100, 100)).prefault(0)
      }).prefault({ 'Thân phận': '', 'Hảo cảm độ': 0 })).prefault({}),
      'Cừu địch': t.z.record(t.z.string(), t.z.object({
        'Thân phận': t.z.string().prefault(''),
        'Cừu hận độ': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(0)
      }).prefault({ 'Thân phận': '', 'Cừu hận độ': 0 })).prefault({}),
      'Thân thuộc': t.z.record(t.z.string(), t.z.object({
        'Thân phận': t.z.string().prefault(''),
        'Hảo cảm độ': t.z.coerce.number().transform(r => e.clamp(r, -100, 100)).prefault(0)
      }).prefault({ 'Thân phận': '', 'Hảo cảm độ': 0 })).prefault({}),
      'Tư duy': t.z.record(t.z.string(), t.z.object({
        'Thân phận': t.z.string().prefault(''),
        'Quan hệ': t.z.enum(['Thê', 'Thiếp', 'Thông phòng', 'Hồng nhan', 'Nữ quyến']).prefault('Hồng nhan'),
        'Hảo cảm độ': t.z.coerce.number().transform(r => e.clamp(r, -100, 100)).prefault(0),
        'Trung tâm': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
        'Sinh dục': t.z.object({
          'Chu kỳ': t.z.coerce.number().transform(r => e.clamp(r, 1, 28)).prefault(1),
          'Thời kỳ': t.z.enum(['Kinh kỳ', 'An toàn kỳ', 'Nguy hiểm kỳ']).prefault('An toàn kỳ'),
          'Trạng thái': t.z.enum(['Chưa mang thai', 'Đã mang thai', 'Chờ sinh', 'Sau sinh']).prefault('Chưa mang thai'),
          'Phải xử nữ không': t.z.boolean().prefault(!0),
          'Số lần đồng phòng': u.prefault(0),
          'Lần đồng phòng cuối': t.z.object({
            'Ngày tháng': t.z.string().prefault(''),
            'Ngày chu kỳ': t.z.coerce.number().prefault(0),
            'Xác suất phán định': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(0)
          }).prefault({}),
          'Dự sinh kỳ': t.z.string().prefault(''),
          '_Số ngày dự sinh': t.z.coerce.number().prefault(0),
          '_Số ngày sau sinh': t.z.coerce.number().prefault(0)
        }).prefault({})
      }).prefault({ 'Thân phận': '', 'Quan hệ': 'Hồng nhan', 'Hảo cảm độ': 0, 'Trung tâm': 50, 'Sinh dục': {} })).prefault({})
    }).prefault({}),
    'Quân sự': t.z.object({
      'Các doanh': t.z.record(t.z.string(), t.z.object({
        'Binh chủng': t.z.string().prefault('Bộ binh'),
        'Nhân số': t.z.coerce.number().prefault(0),
        'Sĩ khí': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
        'Huấn luyện': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(30),
        'Hậu cần': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
        'Trang bị': t.z.enum(['Tàn phá', 'Giản lậu', 'Phổ thông', 'Tinh lương', 'Tinh nhuệ']).prefault('Giản lậu'),
        'Biên chế trang bị': f,
        'Đẳng cấp': t.z.enum(['Ô hợp', 'Tân mộ', 'Khả dụng', 'Lương hảo', 'Tinh nhuệ', 'Danh quân']).prefault('Tân mộ'),
        'Tướng lĩnh': t.z.string().prefault(''),
        'Trú địa': t.z.string().prefault(''),
        'Trạng thái': t.z.enum(['Đợi lệnh', 'Hành quân', 'Tác chiến', 'Huấn luyện', 'Hoán trang', 'Hưu chỉnh', 'Thiếu lương', 'Hoa biến']).prefault('Đợi lệnh'),
        'Bì lao': a.prefault(0),
        'Thương binh': u.prefault(0),
        'Số tháng nợ lương': u.prefault(0),
        'Số ngày thiếu lương': u.prefault(0),
        'Ghi chép quân vụ': t.z.object({
          'Lần khao thưởng trước': t.z.string().prefault(''),
          'Tháng khao thưởng': t.z.string().prefault(''),
          'Số lần khao thưởng tháng này': u.prefault(0)
        }).prefault({})
      }).prefault({
        'Binh chủng': 'Bộ binh',
        'Nhân số': 0,
        'Sĩ khí': 50,
        'Huấn luyện': 30,
        'Hậu cần': 50,
        'Trang bị': 'Giản lậu',
        'Biên chế trang bị': {},
        'Đẳng cấp': 'Tân mộ',
        'Tướng lĩnh': '',
        'Trú địa': '',
        'Trạng thái': 'Đợi lệnh',
        'Bì lao': 0,
        'Thương binh': 0,
        'Số tháng nợ lương': 0,
        'Số ngày thiếu lương': 0,
        'Ghi chép quân vụ': {}
      })).prefault({}),
      'Tướng lĩnh': t.z.record(t.z.string(), t.z.object({
        'Thống suất': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
        'Võ lực': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
        'Trí mưu': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
        'Chính trị': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
        'Uy vọng': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50)
      }).prefault({ 'Thống suất': 50, 'Võ lực': 50, 'Trí mưu': 50, 'Chính trị': 50, 'Uy vọng': 50 })).prefault({}),
      'Ghi chép chiến đấu': t.z.record(t.z.string(), t.z.object({
        'Ngày tháng': t.z.string().prefault(''),
        'Đối thủ': t.z.string().prefault(''),
        'Kết quả': t.z.string().prefault(''),
        'Chiến lợi phẩm': t.z.string().prefault(''),
        'Tóm tắt': t.z.string().prefault('')
      }).prefault({ 'Ngày tháng': '', 'Đối thủ': '', 'Kết quả': '', 'Chiến lợi phẩm': '', 'Tóm tắt': '' })).prefault({}),
      'Quân lệnh': t.z.record(t.z.string(), l).prefault({}),
      'Ghi chép quân lệnh': t.z.array(p).prefault([])
    }).prefault({}),
    'Kinh tế': t.z.object({
      'Tài sản': t.z.record(t.z.string(), t.z.object({
        'Thuyết minh': t.z.string().prefault(''),
        'Nguyệt nhập': t.z.coerce.number().prefault(0)
      }).prefault({ 'Thuyết minh': '', 'Nguyệt nhập': 0 })).prefault({}),
      'Thương trữ': t.z.record(t.z.string(), t.z.object({
        'Số lượng': t.z.coerce.number().prefault(0),
        'Đơn vị': t.z.string().prefault('Thạch')
      }).prefault({ 'Số lượng': 0, 'Đơn vị': 'Thạch' })).prefault({}),
      'Thị trường': t.z.object({
        'Chỉ số giá cả': t.z.object({
          'Lương thực': t.z.coerce.number().transform(r => Math.round(e.clamp(r, 50, 500))).prefault(100),
          'Quân nhu': t.z.coerce.number().transform(r => Math.round(e.clamp(r, 50, 500))).prefault(100),
          'Vật tư thường dùng': t.z.coerce.number().transform(r => Math.round(e.clamp(r, 50, 500))).prefault(100)
        }).prefault({}),
        'Tỷ giá': t.z.object({
          'Một lạng hoàng kim đổi bạch ngân': t.z.coerce.number().transform(r => e.clamp(r, 3, 20)).prefault(6),
          'Một lạng bạch ngân đổi tiền đồng': t.z.coerce.number().transform(r => Math.round(e.clamp(r, 500, 5e3))).prefault(1200)
        }).prefault({}),
        'Tình hình thị trường': t.z.string().prefault('Bình ổn'),
        '_Tồn kho tháng': t.z.string().prefault(''),
        '_Tồn kho còn lại': t.z.record(t.z.string(), t.z.coerce.number().transform(r => Math.max(0, Math.floor(r)))).prefault({})
      }).prefault({}),
      'Lưu thủy': t.z.object({
        'Kết dư tháng này': t.z.coerce.number().prefault(0),
        'Nguyệt nhập': t.z.record(t.z.string(), t.z.object({
          'Ngân lượng': t.z.coerce.number().prefault(0),
          'Thuyết minh': t.z.string().prefault('')
        }).prefault({})).prefault({}),
        'Nguyệt xuất': t.z.record(t.z.string(), t.z.object({
          'Ngân lượng': t.z.coerce.number().prefault(0),
          'Thuyết minh': t.z.string().prefault('')
        }).prefault({})).prefault({})
      }).optional(),
      'Lần kết toán trước': t.z.record(t.z.string(), t.z.union([t.z.string(), t.z.number(), t.z.boolean()])).prefault({}),
      '_Ký hiệu kết toán': t.z.string().prefault('')
    }).prefault({}),
    'Khoa kỹ': t.z.record(t.z.string(), t.z.object({
      'Tiến độ': t.z.enum(['Chưa bắt đầu', 'Đang thử nghiệm', 'Thí điểm quy mô nhỏ', 'Đã phổ biến']).prefault('Chưa bắt đầu'),
      'Hiện trạng': t.z.string().prefault('')
    }).prefault({ 'Tiến độ': 'Chưa bắt đầu', 'Hiện trạng': '' })).prefault({}),
    'Cá nhân sử ký': t.z.object({
      'Đại sự ký': t.z.record(t.z.string(), t.z.object({
        'Ngày tháng': t.z.string().prefault(''),
        'Địa điểm': t.z.string().prefault(''),
        'Loại hình': t.z.enum(['Quân chính', 'Kinh tế', 'Nhân sự', 'Ngoại giao', 'Chiến dịch', 'Kiến thiết', 'Kỹ thuật', 'Gia tộc']),
        'Sự tích': t.z.string().prefault(''),
        'Ảnh hưởng': t.z.string().prefault('')
      })).prefault({})
    }).prefault({}),
    'Thiên hạ bản đồ': t.z.object({
      'Thái thế khu vực': t.z.record(t.z.string(), t.z.object({
        'Danh nghĩa quy thuộc': t.z.string().prefault('Đại Minh'),
        'Thế lực thực khống': t.z.string().prefault('Chưa rõ'),
        'Trận doanh thực khống': t.z.enum(['Phe nhân vật chính', 'Minh Đình', 'Hậu Kim', 'Lưu khấu', 'Địa phương trung lập', 'Chưa rõ']).prefault('Chưa rõ'),
        'Trạng thái tranh đoạt': t.z.enum(['Ổn định', 'Động đãng', 'Đang tranh đoạt', 'Luân hãm', 'Mất kiểm soát']).prefault('Ổn định'),
        'Thế lực chủ yếu': t.z.record(t.z.string(), t.z.object({
          'Lực ảnh hưởng': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(0),
          'Hiện diện quân sự': t.z.string().prefault(''),
          'Miêu tả': t.z.string().prefault('')
        }).prefault({ 'Lực ảnh hưởng': 0, 'Hiện diện quân sự': '', 'Miêu tả': '' })).prefault({}),
        'Thái thế quân sự': t.z.string().prefault(''),
        'Thái thế kinh tế': t.z.string().prefault(''),
        'Đại sự gần đây': t.z.string().prefault('')
      }).prefault({
        'Danh nghĩa quy thuộc': 'Đại Minh',
        'Thế lực thực khống': 'Chưa rõ',
        'Trận doanh thực khống': 'Chưa rõ',
        'Trạng thái tranh đoạt': 'Ổn định',
        'Thế lực chủ yếu': {},
        'Thái thế quân sự': '',
        'Thái thế kinh tế': '',
        'Đại sự gần đây': ''
      })).prefault({}),
      'Thế cục tuyến': t.z.record(t.z.string(), t.z.object({
        'Khu vực': t.z.string().prefault(''),
        'Bên tham gia': t.z.string().prefault(''),
        'Thái thế hiện tại': t.z.string().prefault(''),
        'Động lực thúc đẩy': t.z.string().prefault(''),
        'Biến chuyển gần đây': t.z.string().prefault(''),
        'Độ sôi động': t.z.enum(['Thấp', 'Trung bình', 'Cao']).prefault('Trung bình')
      }).prefault({ 'Khu vực': '', 'Bên tham gia': '', 'Thái thế hiện tại': '', 'Động lực thúc đẩy': '', 'Biến chuyển gần đây': '', 'Độ sôi động': 'Trung bình' })).prefault({})
    }).prefault({}),
    'Thời cục và nhiệm vụ': t.z.object({
      'Quan hệ thế lực': t.z.record(t.z.string(), t.z.object({
        'Hảo cảm độ': t.z.coerce.number().transform(r => e.clamp(r, -100, 100)).prefault(0),
        'Trạng thái': t.z.enum(['Chưa tiếp xúc', 'Quan sát', 'Hữu hảo', 'Kết minh', 'Địch đối', 'Giao chiến', 'Phụ dung', 'Tông chủ', 'Đã đầu hàng', 'Đã diệt vong']).prefault('Chưa tiếp xúc'),
        'Tóm tắt quan hệ': t.z.string().prefault(''),
        'Kinh tế': t.z.object({
          'Tình trạng tài chính': t.z.enum(['Chưa rõ', 'Sụp đổ', 'Túng quẫn', 'Bình ổn', 'Phú túc', 'Hùng hậu']).prefault('Chưa rõ'),
          'Trạng thái lương thảo': t.z.enum(['Chưa rõ', 'Cạn kiệt', 'Thiếu hụt', 'Tạm ổn', 'Sung túc']).prefault('Chưa rõ')
        }).prefault({}),
        'Quân sự': t.z.object({
          'Tổng binh lực': t.z.coerce.number().prefault(0),
          'Binh chủng chủ lực': t.z.string().prefault('Chưa rõ'),
          'Tướng lĩnh hạ thuộc': t.z.record(t.z.string(), t.z.object({
            'Chức vị': t.z.string().prefault(''),
            'Thống suất': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
            'Võ lực': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
            'Trí mưu': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
            'Trung thành': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
            'Binh lực': t.z.coerce.number().prefault(0),
            'Trú địa': t.z.string().prefault(''),
            'Giới thiệu': t.z.string().prefault('')
          }).prefault({ 'Chức vị': '', 'Thống suất': 50, 'Võ lực': 50, 'Trí mưu': 50, 'Trung thành': 50, 'Binh lực': 0, 'Trú địa': '', 'Giới thiệu': '' })).prefault({}),
          'Quân đội': t.z.record(t.z.string(), t.z.object({
            'Binh chủng': t.z.string().prefault(''),
            'Nhân số': t.z.coerce.number().prefault(0),
            'Sĩ khí': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
            'Huấn luyện': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
            'Hậu cần': t.z.coerce.number().transform(r => e.clamp(r, 0, 100)).prefault(50),
            'Trang bị': t.z.enum(['Tàn phá', 'Giản lậu', 'Phổ thông', 'Tinh lương', 'Tinh nhuệ']).prefault('Phổ thông'),
            'Đẳng cấp': t.z.enum(['Ô hợp', 'Tân mộ', 'Khả dụng', 'Lương hảo', 'Tinh nhuệ', 'Danh quân']).prefault('Khả dụng'),
            'Tướng lĩnh': t.z.string().prefault(''),
            'Trú địa': t.z.string().prefault(''),
            'Trạng thái': t.z.string().prefault('')
          }).prefault({ 'Binh chủng': '', 'Nhân số': 0, 'Sĩ khí': 50, 'Huấn luyện': 50, 'Hậu cần': 50, 'Trang bị': 'Phổ thông', 'Đẳng cấp': 'Khả dụng', 'Tướng lĩnh': '', 'Trú địa': '', 'Trạng thái': '' })).prefault({})
        }).prefault({})
      }).prefault({ 'Hảo cảm độ': 0, 'Trạng thái': 'Chưa tiếp xúc', 'Tóm tắt quan hệ': '', 'Kinh tế': {}, 'Quân sự': {} })).prefault({}),
      'Hạng mục chưa quyết': t.z.record(t.z.string(), t.z.object({
        'Trạng thái': t.z.enum(['Chờ xử lý', 'Đang tiến hành', 'Đang chờ', 'Tạm hoãn']).prefault('Chờ xử lý'),
        'Khái yếu': t.z.string().prefault(''),
        'Hiện trạng': t.z.string().prefault(''),
        'Nhắc nhở': t.z.string().prefault('')
      }).prefault({ 'Trạng thái': 'Chờ xử lý', 'Khái yếu': '', 'Hiện trạng': '', 'Nhắc nhở': '' })).prefault({}),
      'Nhiệm vụ hiện tại': t.z.record(t.z.string(), t.z.object({
        'Trạng thái': t.z.string().prefault(''),
        'Khái yếu': t.z.string().prefault(''),
        'Hiện trạng': t.z.string().prefault(''),
        'Nhắc nhở': t.z.string().prefault(''),
        'Loại hình': t.z.string().prefault(''),
        'Mục tiêu': t.z.string().prefault(''),
        'Tiến triển': t.z.string().prefault(''),
        'Thuyết minh': t.z.string().prefault(''),
        'Tiến độ': t.z.string().prefault('')
      }).prefault({})).optional()
    }).transform(r => {
      const e = { ...(r['Hạng mục chưa quyết'] || {}) };
      const tasks = r['Nhiệm vụ hiện tại'] || {};
      for (const [t, a] of Object.entries(tasks)) {
        if (Object.hasOwn(e, t)) continue;
        const currentProgress = a['Hiện trạng'] || a['Tiến triển'] || a['Tiến độ'] || '',
          combinedState = `${a['Trạng thái'] || ''} ${currentProgress}`;
        let f = 'Đang tiến hành';
        if (/Tạm hoãn|Gác lại|Tạm dừng/i.test(combinedState)) {
          f = 'Tạm hoãn';
        } else if (/Đang chờ|Chờ.*(?:hồi âm|đáp phúc|tin tức|thời cơ|kết quả|đến nơi)|Tĩnh hậu/i.test(combinedState)) {
          f = 'Đang chờ';
        } else if (!/Chưa bắt đầu|Chờ xử lý|Chờ làm/i.test(combinedState) && combinedState.trim()) {
          f = 'Đang tiến hành';
        } else {
          f = 'Chờ xử lý';
        }
        e[t] = {
          'Trạng thái': f,
          'Khái yếu': a['Khái yếu'] || a['Mục tiêu'] || a['Thuyết minh'] || '',
          'Hiện trạng': currentProgress,
          'Nhắc nhở': a['Nhắc nhở'] || ''
        };
      }
      return { 'Quan hệ thế lực': r['Quan hệ thế lực'], 'Hạng mục chưa quyết': e };
    }).prefault({}),
    'Phong nguyệt các': t.z.object({
      'Điểm đồng phòng': t.z.coerce.number().prefault(0),
      'Khí vật': t.z.record(t.z.string(), t.z.object({
        'Giới thiệu': t.z.string().prefault(''),
        'Số lượng': t.z.coerce.number().prefault(1)
      }).prefault({ 'Giới thiệu': '', 'Số lượng': 1 })).prefault({})
    }).prefault({})
  }).transform(r => {
    const e = r['Kinh tế']?.['Lưu thủy'];
    if (!e) return r;
    const t = { ...(r['Thời cục và nhiệm vụ']?.['Hạng mục chưa quyết'] || {}) },
      a = r => {
        if (!Object.hasOwn(t, r)) return r;
        if (!Object.hasOwn(t, `${r} (Lưu thủy cũ)`)) return `${r} (Lưu thủy cũ)`;
        let e = 2;
        for (; Object.hasOwn(t, `${r} (Lưu thủy cũ ${e})`);) e++;
        return `${r} (Lưu thủy cũ ${e})`;
      },
      u = (r, e) => {
        for (const [u, f] of Object.entries(r || {})) {
          const keyName = a(`${'income' === e ? 'Chờ thu' : 'Chờ chi'}：${u}`),
            amount = Number(f['Ngân lượng']) || 0,
            desc = String(f['Thuyết minh'] || '').trim();
          t[keyName] = {
            'Trạng thái': 'Đang chờ',
            'Khái yếu': `${u} còn có ${amount} lượng bạch ngân ${'income' === e ? 'phải thu' : 'phải trả'}, chưa thực tế bàn giao.${desc ? ` Sự do: ${desc}` : ''}`,
            'Hiện trạng': 'Chuyển đổi từ lưu thủy bản lưu cũ 1.8, hiện vẫn chờ thanh toán.',
            'Nhắc nhở': 'income' === e ? 'Sau khi thực nhận vào tài khoản cập nhật Tư khố nhân vật chính, và xóa hạng mục này.' : 'Sau khi thực tế chi trả cập nhật Tư khố nhân vật chính, và xóa hạng mục này.'
          };
        }
      };
    u(e['Nguyệt nhập'], 'income');
    u(e['Nguyệt xuất'], 'expense');
    const { 'Lưu thủy': f, ...l } = r['Kinh tế'];
    return {
      ...r,
      'Kinh tế': l,
      'Thời cục và nhiệm vụ': {
        ...r['Thời cục và nhiệm vụ'],
        'Hạng mục chưa quyết': t
      }
    };
  });

$(() => {
  r(n);
});

export { n as Schema };
//# sourceMappingURL=index.js.map