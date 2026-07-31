const e = YAML,
  t = _,
  r = z,
  a = r.z.object({
    "Thế giới vận hành": r.z
      .object({
        "_Định danh khởi đầu": r.z.string().prefault(""),
        "Ngày hiện tại": r.z.string().prefault("Sùng Trinh năm thứ bảy mùng một tháng ba"),
        "Mười hai canh giờ": r.z
          .object({
            "Canh giờ": r.z
              .enum([
                "Giờ tý",
                "Giờ sửu",
                "Giờ dần",
                "Giờ mão",
                "Giờ thìn",
                "Giờ tỵ",
                "Giờ ngọ",
                "Giờ mùi",
                "Giờ thân",
                "Giờ dậu",
                "Giờ tuất",
                "Giờ hợi",
              ])
              .prefault("Giờ mão"),
            "Khắc": r.z
              .enum([
                "Sơ khắc",
                "Nhất khắc",
                "Nhị khắc",
                "Tam khắc",
                "Tứ khắc",
                "Ngũ khắc",
                "Lục khắc",
                "Thất khắc",
              ])
              .prefault("Tam khắc"),
          })
          .prefault({}),
        "Hai mươi bốn giờ": r.z
          .object({
            "Giờ": r.z.coerce
              .number()
              .transform((e) => t.clamp(e, 0, 23))
              .prefault(5),
            "Phút": r.z.coerce
              .number()
              .transform((e) => t.clamp(e, 0, 59))
              .prefault(45),
          })
          .prefault({}),
        "Địa điểm hiện tại": r.z.string().prefault("Đồng Thành huyện nha, An Khánh phủ, Nam Trực Lệ"),
        "Thời tiết": r.z.string().prefault("Quang đãng"),
        "Bối cảnh": r.z.enum(["SFW", "NSFW", "WAR"]).prefault("SFW"),
        "Số ngày vận hành": r.z.coerce.number().prefault(1),
      })
      .prefault({}),
    "Nhân vật chính": r.z
      .object({
        "Chức quan": r.z.string().prefault("Đồng Thành tạo lệ"),
        "Danh vọng": r.z.coerce
          .number()
          .transform((e) => t.clamp(e, -1e3, 1e3))
          .prefault(10),
        "Giai đoạn danh vọng": r.z
          .enum([
            "Di xú vạn niên",
            "Thanh danh lang tạ",
            "Chúng thỉ chi đích",
            "Hủy dự tham bán",
            "Mặc mặc vô văn",
            "Thanh danh thước khởi",
            "Uy chấn nhất phương",
            "Thiên hạ cảnh ngưỡng",
            "Danh thùy thiên cổ",
          ])
          .prefault("Mặc mặc vô văn"),
        "Ngũ duy": r.z
          .object({
            "Sinh mệnh": r.z.coerce
              .number()
              .transform((e) => t.clamp(e, 0, 100))
              .prefault(60),
            "Võ lực": r.z.coerce
              .number()
              .transform((e) => t.clamp(e, 0, 100))
              .prefault(15),
            "Thống suất": r.z.coerce
              .number()
              .transform((e) => t.clamp(e, 0, 100))
              .prefault(10),
            "Trí mưu": r.z.coerce
              .number()
              .transform((e) => t.clamp(e, 0, 100))
              .prefault(55),
            "Chính trị": r.z.coerce
              .number()
              .transform((e) => t.clamp(e, 0, 100))
              .prefault(25),
          })
          .prefault({}),
        "Tư khố": r.z
          .object({
            "Kim ngân đồng": r.z
              .object({
                "Hoàng kim": r.z.coerce.number().prefault(0),
                "Bạch ngân": r.z.coerce.number().prefault(3),
                "Tiền đồng": r.z.coerce.number().prefault(200),
              })
              .prefault({}),
            "Vật phẩm quan trọng": r.z
              .record(
                r.z.string(),
                r.z
                  .object({
                    "Giới thiệu": r.z.string().prefault(""),
                    "Số lượng": r.z.coerce.number().prefault(1),
                  })
                  .prefault({ "Giới thiệu": "", "Số lượng": 1 }),
              )
              .prefault({}),
          })
          .prefault({}),
      })
      .prefault({}),
    "Mạng lưới quan hệ": r.z
      .object({
        "Thượng tư": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thân phận": r.z.string().prefault(""),
                "Hảo cảm độ": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, -100, 100))
                  .prefault(0),
                "Tiếng lòng nhân vật": r.z.string().prefault(""),
                "Có mặt hay không": r.z.boolean().prefault(!0),
              })
              .prefault({ "Thân phận": "", "Hảo cảm độ": 0, "Tiếng lòng nhân vật": "", "Có mặt hay không": !0 }),
          )
          .prefault({}),
        "Cố hữu và đồng liêu": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thân phận": r.z.string().prefault(""),
                "Hảo cảm độ": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, -100, 100))
                  .prefault(0),
                "Tiếng lòng nhân vật": r.z.string().prefault(""),
                "Có mặt hay không": r.z.boolean().prefault(!0),
              })
              .prefault({ "Thân phận": "", "Hảo cảm độ": 0, "Tiếng lòng nhân vật": "", "Có mặt hay không": !0 }),
          )
          .prefault({}),
        "Hạ thuộc và mạc liêu": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thân phận": r.z.string().prefault(""),
                "Hảo cảm độ": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, -100, 100))
                  .prefault(0),
                "Trung tâm": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
                "Tiếng lòng nhân vật": r.z.string().prefault(""),
                "Có mặt hay không": r.z.boolean().prefault(!0),
              })
              .prefault({
                "Thân phận": "",
                "Hảo cảm độ": 0,
                "Trung tâm": 50,
                "Tiếng lòng nhân vật": "",
                "Có mặt hay không": !0,
              }),
          )
          .prefault({}),
        "Tam giáo cửu lưu": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thân phận": r.z.string().prefault(""),
                "Hảo cảm độ": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, -100, 100))
                  .prefault(0),
                "Tiếng lòng nhân vật": r.z.string().prefault(""),
                "Có mặt hay không": r.z.boolean().prefault(!0),
              })
              .prefault({ "Thân phận": "", "Hảo cảm độ": 0, "Tiếng lòng nhân vật": "", "Có mặt hay không": !0 }),
          )
          .prefault({}),
        "Cừu địch": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thân phận": r.z.string().prefault(""),
                "Cừu hận độ": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(0),
                "Tiếng lòng nhân vật": r.z.string().prefault(""),
                "Có mặt hay không": r.z.boolean().prefault(!0),
              })
              .prefault({ "Thân phận": "", "Cừu hận độ": 0, "Tiếng lòng nhân vật": "", "Có mặt hay không": !0 }),
          )
          .prefault({}),
        "Thân thuộc": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thân phận": r.z.string().prefault(""),
                "Hảo cảm độ": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, -100, 100))
                  .prefault(0),
                "Tiếng lòng nhân vật": r.z.string().prefault(""),
                "Có mặt hay không": r.z.boolean().prefault(!0),
              })
              .prefault({ "Thân phận": "", "Hảo cảm độ": 0, "Tiếng lòng nhân vật": "", "Có mặt hay không": !0 }),
          )
          .prefault({}),
        "Tư duy": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thân phận": r.z.string().prefault(""),
                "Quan hệ": r.z
                  .enum(["Thê", "Thiếp", "Thông phòng", "Hồng nhan", "Nữ quyến"])
                  .prefault("Hồng nhan"),
                "Hảo cảm độ": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, -100, 100))
                  .prefault(0),
                "Trung tâm": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
                "Tiếng lòng nhân vật": r.z.string().prefault(""),
                "Có mặt hay không": r.z.boolean().prefault(!0),
                "Sinh dục": r.z
                  .object({
                    "Có phải xử nữ không": r.z.boolean().prefault(!0),
                    "Số lần đồng phòng": r.z.coerce
                      .number()
                      .transform((e) => Math.max(0, Math.trunc(e)))
                      .prefault(0),
                    "Chu kỳ": r.z.coerce
                      .number()
                      .transform((e) => t.clamp(e, 1, 28))
                      .prefault(1),
                    "Thời kỳ": r.z
                      .enum(["Kinh kỳ", "An toàn kỳ", "Nguy hiểm kỳ"])
                      .prefault("An toàn kỳ"),
                    "Trạng thái": r.z
                      .enum(["Chưa mang thai", "Đã mang thai", "Chờ sinh", "Sau sinh"])
                      .prefault("Chưa mang thai"),
                    "Lần đồng phòng cuối": r.z
                      .object({
                        "Ngày tháng": r.z.string().prefault(""),
                        "Ngày chu kỳ": r.z.coerce.number().prefault(0),
                        "Xác suất phán định": r.z.coerce
                          .number()
                          .transform((e) => t.clamp(e, 0, 100))
                          .prefault(0),
                      })
                      .prefault({}),
                    "Dự sinh kỳ": r.z.string().prefault(""),
                    "_Số ngày dự sinh": r.z.coerce.number().prefault(0),
                    "_Số ngày sau sinh": r.z.coerce.number().prefault(0),
                  })
                  .prefault({}),
              })
              .prefault({
                "Thân phận": "",
                "Quan hệ": "Hồng nhan",
                "Hảo cảm độ": 0,
                "Trung tâm": 50,
                "Tiếng lòng nhân vật": "",
                "Có mặt hay không": !0,
                "Sinh dục": {},
              }),
          )
          .prefault({}),
      })
      .prefault({}),
    "Quân sự": r.z
      .object({
        "Các doanh": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Binh chủng": r.z.string().prefault("Bộ binh"),
                "Nhân số": r.z.coerce.number().prefault(0),
                "Sĩ khí": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
                "Huấn luyện": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(30),
                "Hậu cần": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
                "Trang bị": r.z
                  .enum(["Tàn phá", "Giản lậu", "Phổ thông", "Tinh lương", "Tinh nhuệ"])
                  .prefault("Giản lậu"),
                "Đẳng cấp": r.z
                  .enum(["Ô hợp", "Tân mộ", "Khả dụng", "Lương hảo", "Tinh nhuệ", "Danh quân"])
                  .prefault("Tân mộ"),
                "Tướng lĩnh": r.z.string().prefault(""),
                "Trú địa": r.z.string().prefault(""),
              })
              .prefault({
                "Binh chủng": "Bộ binh",
                "Nhân số": 0,
                "Sĩ khí": 50,
                "Huấn luyện": 30,
                "Hậu cần": 50,
                "Trang bị": "Giản lậu",
                "Đẳng cấp": "Tân mộ",
                "Tướng lĩnh": "",
                "Trú địa": "",
              }),
          )
          .prefault({}),
        "Tướng lĩnh": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thống suất": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
                "Võ lực": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
                "Trí mưu": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
                "Chính trị": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
                "Uy vọng": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 0, 100))
                  .prefault(50),
              })
              .prefault({ "Thống suất": 50, "Võ lực": 50, "Trí mưu": 50, "Chính trị": 50, "Uy vọng": 50 }),
          )
          .prefault({}),
        "Ghi chép chiến đấu": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Ngày tháng": r.z.string().prefault(""),
                "Đối thủ": r.z.string().prefault(""),
                "Kết quả": r.z.string().prefault(""),
                "Chiến lợi phẩm": r.z.string().prefault(""),
                "Tóm tắt": r.z.string().prefault(""),
              })
              .prefault({ "Ngày tháng": "", "Đối thủ": "", "Kết quả": "", "Chiến lợi phẩm": "", "Tóm tắt": "" }),
          )
          .prefault({}),
      })
      .prefault({}),
    "Kinh tế": r.z
      .object({
        "Tài sản": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Thuyết minh": r.z.string().prefault(""),
                "Nguyệt nhập": r.z.coerce.number().prefault(0),
              })
              .prefault({ "Thuyết minh": "", "Nguyệt nhập": 0 }),
          )
          .prefault({}),
        "Lưu thủy": r.z
          .object({
            "Kết dư tháng này": r.z.coerce.number().prefault(0),
            "Nguyệt nhập": r.z
              .record(
                r.z.string(),
                r.z
                  .object({
                    "Ngân lượng": r.z.coerce.number().prefault(0),
                    "Thuyết minh": r.z.string().prefault(""),
                  })
                  .prefault({ "Ngân lượng": 0, "Thuyết minh": "" }),
              )
              .prefault({}),
            "Nguyệt xuất": r.z
              .record(
                r.z.string(),
                r.z
                  .object({
                    "Ngân lượng": r.z.coerce.number().prefault(0),
                    "Thuyết minh": r.z.string().prefault(""),
                  })
                  .prefault({ "Ngân lượng": 0, "Thuyết minh": "" }),
              )
              .prefault({}),
          })
          .prefault({}),
        "Thương trữ": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Số lượng": r.z.coerce.number().prefault(0),
                "Đơn vị": r.z.string().prefault("Thạch"),
              })
              .prefault({ "Số lượng": 0, "Đơn vị": "Thạch" }),
          )
          .prefault({}),
        "Thị trường": r.z
          .object({
            "Chỉ số giá cả": r.z
              .object({
                "Lương thực": r.z.coerce
                  .number()
                  .transform((e) => Math.round(t.clamp(e, 50, 500)))
                  .prefault(100),
                "Quân nhu": r.z.coerce
                  .number()
                  .transform((e) => Math.round(t.clamp(e, 50, 500)))
                  .prefault(100),
                "Vật tư thường dùng": r.z.coerce
                  .number()
                  .transform((e) => Math.round(t.clamp(e, 50, 500)))
                  .prefault(100),
              })
              .prefault({}),
            "Tỷ giá": r.z
              .object({
                "Một lạng hoàng kim đổi bạch ngân": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, 3, 20))
                  .prefault(6),
                "Một lạng bạch ngân đổi tiền đồng": r.z.coerce
                  .number()
                  .transform((e) => Math.round(t.clamp(e, 500, 5e3)))
                  .prefault(1200),
              })
              .prefault({}),
            "Tình hình thị trường": r.z.string().prefault("Bình ổn"),
            "_Tồn kho tháng": r.z.string().prefault(""),
            "_Tồn kho còn lại": r.z
              .record(
                r.z.string(),
                r.z.coerce
                  .number()
                  .transform((e) => Math.max(0, Math.floor(e))),
              )
              .prefault({}),
          })
          .prefault({}),
      })
      .prefault({}),
    "Khoa kỹ": r.z
      .record(
        r.z.string(),
        r.z
          .object({
            "Tiến độ": r.z
              .enum(["Chưa bắt đầu", "Đang thử nghiệm", "Thí điểm quy mô nhỏ", "Đã phổ biến"])
              .prefault("Chưa bắt đầu"),
            "Hiệu quả": r.z.string().prefault(""),
            "Miêu tả": r.z.string().prefault(""),
          })
          .prefault({ "Tiến độ": "Chưa bắt đầu", "Hiệu quả": "", "Miêu tả": "" }),
      )
      .prefault({}),
    "Cá nhân sử ký": r.z
      .object({
        "Đại sự ký": r.z
          .record(
            r.z.string(),
            r.z.object({
              "Ngày tháng": r.z.string().prefault(""),
              "Địa điểm": r.z.string().prefault(""),
              "Loại hình": r.z.enum([
                "Quân chính",
                "Kinh tế",
                "Nhân sự",
                "Ngoại giao",
                "Chiến dịch",
                "Kiến thiết",
                "Kỹ thuật",
                "Gia tộc",
              ]),
              "Sự tích": r.z.string().prefault(""),
              "Ảnh hưởng": r.z.string().prefault(""),
            }),
          )
          .prefault({}),
      })
      .prefault({}),
    "Thiên hạ bản đồ": r.z
      .object({
        "Thái thế khu vực": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Danh nghĩa quy thuộc": r.z.string().prefault("Đại Minh"),
                "Thế lực thực khống": r.z.string().prefault("Chưa rõ"),
                "Trận doanh thực khống": r.z
                  .enum(["Phe nhân vật chính", "Minh Đình", "Hậu Kim", "Lưu khấu", "Địa phương trung lập", "Chưa rõ"])
                  .prefault("Chưa rõ"),
                "Trạng thái tranh đoạt": r.z
                  .enum(["Ổn định", "Động đãng", "Đang tranh đoạt", "Luân hãm", "Mất kiểm soát"])
                  .prefault("Ổn định"),
                "Thế lực chủ yếu": r.z
                  .record(
                    r.z.string(),
                    r.z
                      .object({
                        "Lực ảnh hưởng": r.z.coerce
                          .number()
                          .transform((e) => t.clamp(e, 0, 100))
                          .prefault(0),
                        "Hiện diện quân sự": r.z.string().prefault(""),
                        "Miêu tả": r.z.string().prefault(""),
                      })
                      .prefault({ "Lực ảnh hưởng": 0, "Hiện diện quân sự": "", "Miêu tả": "" }),
                  )
                  .prefault({}),
                "Thái thế quân sự": r.z.string().prefault(""),
                "Thái thế kinh tế": r.z.string().prefault(""),
                "Đại sự gần đây": r.z.string().prefault(""),
              })
              .prefault({
                "Danh nghĩa quy thuộc": "Đại Minh",
                "Thế lực thực khống": "Chưa rõ",
                "Trận doanh thực khống": "Chưa rõ",
                "Trạng thái tranh đoạt": "Ổn định",
                "Thế lực chủ yếu": {},
                "Thái thế quân sự": "",
                "Thái thế kinh tế": "",
                "Đại sự gần đây": "",
              }),
          )
          .prefault({}),
      })
      .prefault({}),
    "Thời cục và nhiệm vụ": r.z
      .object({
        "Quan hệ thế lực": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Hảo cảm độ": r.z.coerce
                  .number()
                  .transform((e) => t.clamp(e, -100, 100))
                  .prefault(0),
                "Trạng thái": r.z.string().prefault("Chưa tiếp xúc"),
                "Miêu tả": r.z.string().prefault(""),
                "Kinh tế": r.z
                  .object({
                    "Tình trạng tài chính": r.z
                      .enum(["Chưa rõ", "Sụp đổ", "Túng quẫn", "Bình ổn", "Phú túc", "Hùng hậu"])
                      .prefault("Chưa rõ"),
                    "Thu nhập chủ yếu": r.z.string().prefault(""),
                    "Chi tiêu chủ yếu": r.z.string().prefault(""),
                    "Lương thảo": r.z
                      .object({
                        "Số lượng": r.z.coerce.number().prefault(0),
                        "Đơn vị": r.z.string().prefault("Thạch"),
                        "Trạng thái": r.z
                          .enum(["Chưa rõ", "Cạn kiệt", "Khan hiếm", "Tạm ổn", "Sung túc"])
                          .prefault("Chưa rõ"),
                      })
                      .prefault({}),
                    "Miêu tả": r.z.string().prefault(""),
                  })
                  .prefault({}),
                "Quân sự": r.z
                  .object({
                    "Tổng binh lực": r.z.coerce.number().prefault(0),
                    "Binh chủng chủ lực": r.z.string().prefault("Chưa rõ"),
                    "Miêu tả": r.z.string().prefault(""),
                    "Tướng lĩnh hạ thuộc": r.z
                      .record(
                        r.z.string(),
                        r.z
                          .object({
                            "Chức vị": r.z.string().prefault(""),
                            "Thống suất": r.z.coerce
                              .number()
                              .transform((e) => t.clamp(e, 0, 100))
                              .prefault(50),
                            "Võ lực": r.z.coerce
                              .number()
                              .transform((e) => t.clamp(e, 0, 100))
                              .prefault(50),
                            "Trí mưu": r.z.coerce
                              .number()
                              .transform((e) => t.clamp(e, 0, 100))
                              .prefault(50),
                            "Trung thành": r.z.coerce
                              .number()
                              .transform((e) => t.clamp(e, 0, 100))
                              .prefault(50),
                            "Binh lực": r.z.coerce.number().prefault(0),
                            "Trú địa": r.z.string().prefault(""),
                            "Giới thiệu": r.z.string().prefault(""),
                          })
                          .prefault({
                            "Chức vị": "",
                            "Thống suất": 50,
                            "Võ lực": 50,
                            "Trí mưu": 50,
                            "Trung thành": 50,
                            "Binh lực": 0,
                            "Trú địa": "",
                            "Giới thiệu": "",
                          }),
                      )
                      .prefault({}),
                    "Quân đội": r.z
                      .record(
                        r.z.string(),
                        r.z
                          .object({
                            "Binh chủng": r.z.string().prefault(""),
                            "Nhân số": r.z.coerce.number().prefault(0),
                            "Sĩ khí": r.z.coerce
                              .number()
                              .transform((e) => t.clamp(e, 0, 100))
                              .prefault(50),
                            "Huấn luyện": r.z.coerce
                              .number()
                              .transform((e) => t.clamp(e, 0, 100))
                              .prefault(50),
                            "Hậu cần": r.z.coerce
                              .number()
                              .transform((e) => t.clamp(e, 0, 100))
                              .prefault(50),
                            "Trang bị": r.z
                              .enum(["Tàn phá", "Giản lậu", "Phổ thông", "Tinh lương", "Tinh nhuệ"])
                              .prefault("Phổ thông"),
                            "Đẳng cấp": r.z
                              .enum([
                                "Ô hợp",
                                "Tân mộ",
                                "Khả dụng",
                                "Lương hảo",
                                "Tinh nhuệ",
                                "Danh quân",
                              ])
                              .prefault("Khả dụng"),
                            "Tướng lĩnh": r.z.string().prefault(""),
                            "Trú địa": r.z.string().prefault(""),
                            "Trạng thái": r.z.string().prefault(""),
                          })
                          .prefault({
                            "Binh chủng": "",
                            "Nhân số": 0,
                            "Sĩ khí": 50,
                            "Huấn luyện": 50,
                            "Hậu cần": 50,
                            "Trang bị": "Phổ thông",
                            "Đẳng cấp": "Khả dụng",
                            "Tướng lĩnh": "",
                            "Trú địa": "",
                            "Trạng thái": "",
                          }),
                      )
                      .prefault({}),
                  })
                  .prefault({}),
              })
              .prefault({
                "Hảo cảm độ": 0,
                "Trạng thái": "Chưa tiếp xúc",
                "Miêu tả": "",
                "Kinh tế": {},
                "Quân sự": {},
              }),
          )
          .prefault({}),
        "Nhiệm vụ hiện tại": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Loại hình": r.z.string().prefault(""),
                "Thuyết minh": r.z.string().prefault(""),
                "Tiến độ": r.z.string().prefault("Chưa bắt đầu"),
              })
              .prefault({ "Loại hình": "", "Thuyết minh": "", "Tiến độ": "Chưa bắt đầu" }),
          )
          .prefault({}),
      })
      .prefault({}),
    "Phong nguyệt các": r.z
      .object({
        "Điểm đồng phòng": r.z.coerce.number().prefault(0),
        "Khí vật": r.z
          .record(
            r.z.string(),
            r.z
              .object({
                "Giới thiệu": r.z.string().prefault(""),
                "Số lượng": r.z.coerce.number().prefault(1),
              })
              .prefault({ "Giới thiệu": "", "Số lượng": 1 }),
          )
          .prefault({}),
        "Lời chưởng quỹ": r.z.string().prefault(""),
      })
      .prefault({}),
  });
function n(e) {
  const t = String(e?.apiurl || "").trim();
  if (!t) return !1;
  try {
    return "api.deepseek.com" === new URL(t).hostname.toLowerCase();
  } catch {
    return /^https?:\/\/api\.deepseek\.com(?:[/:?#]|$)/i.test(t);
  }
}
function i(e) {
  return [
    ...new Set(
      [
        e?.message,
        e?.statusText,
        e?.response?.statusText,
        e?.response?.data?.error?.message,
        e?.response?.data?.message,
        e?.data?.error?.message,
        e?.data?.message,
        e?.cause?.message,
        "string" == typeof e ? e : "",
      ]
        .map((e) => String(e || "").trim())
        .filter(Boolean),
    ),
  ].join(" · ");
}
function o(e, t) {
  const r = [
    e?.status,
    e?.statusCode,
    e?.response?.status,
    e?.response?.statusCode,
    e?.cause?.status,
  ]
    .map(Number)
    .find((e) => Number.isInteger(e) && e >= 400 && e <= 599);
  if (r) return r;
  const a = t.match(/(?:^|\D)(4\d\d|5\d\d)(?:\D|$)/)?.[1];
  return a
    ? Number(a)
    : /\bpayment required\b|insufficient (?:balance|credit|quota)/i.test(t)
      ? 402
      : /\bunauthorized\b|invalid api key|authentication failed/i.test(t)
        ? 401
        : /\bforbidden\b|permission denied/i.test(t)
          ? 403
          : /\btoo many requests\b|rate.?limit/i.test(t)
            ? 429
            : /\bbad request\b/i.test(t)
              ? 400
              : 0;
}
function s(e, t = {}) {
  const r = String(t.provider || "Giao diện AI").trim(),
    a = i(e),
    n = o(e, a),
    s = (function (e) {
      return !e ||
        /^(?:bad request|payment required|unauthorized|forbidden|too many requests)$/i.test(
          e,
        )
        ? ""
        : ` Lỗi gốc: ${e.slice(0, 240)}`;
    })(a);
  return 401 === n
    ? new Error(
        `${r} Xác thực thất bại (HTTP 401): API Key không hợp lệ, đã bị thu hồi hoặc điền sai.${s}`,
      )
    : 402 === n
      ? new Error(
          `${r} Số dư không đủ hoặc chưa mở thanh toán (HTTP 402): Vui lòng nạp tiền, bật thanh toán hoặc đổi API Key còn hạn mức.${s}`,
        )
      : 403 === n
        ? new Error(
            `${r} Từ chối truy cập (HTTP 403): API Key hiện tại không có quyền truy cập mô hình hoặc giao diện này.${s}`,
          )
        : 404 === n
          ? new Error(
              `${r} Giao diện hoặc mô hình không tồn tại (HTTP 404): Vui lòng kiểm tra địa chỉ API và tên mô hình.${s}`,
            )
          : 408 === n
            ? new Error(
                `${r} Yêu cầu quá hạn (HTTP 408): Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.${s}`,
              )
            : 413 === n
              ? new Error(
                  `${r} Từ chối yêu cầu quá lớn (HTTP 413): Vui lòng giảm bớt Thế Giới Thư tham khảo, prompt hoặc nội dung tạo ra.${s}`,
                )
              : 429 === n
                ? new Error(
                    `${r} Yêu cầu quá thường xuyên hoặc chạm đỉnh hạn mức (HTTP 429): Vui lòng đợi khôi phục giới hạn luồng hoặc kiểm tra hạn ngạch tài khoản.${s}`,
                  )
                : [500, 502, 503, 504].includes(n)
                  ? new Error(
                      `${r} Dịch vụ tạm thời không khả dụng (HTTP ${n}): Đây là sự cố dịch vụ thượng nguồn, vui lòng thử lại sau.${s}`,
                    )
                  : /model[\s\S]{0,80}(?:not found|does not exist|invalid|unavailable)|unknown model/i.test(
                        a,
                      )
                    ? new Error(
                        `${r} Không chấp nhận tên mô hình hiện tại: Vui lòng lấy lại danh sách mô hình và chọn mô hình khả dụng.${s}`,
                      )
                    : /context length|maximum context|too many tokens|token limit|prompt is too long/i.test(
                          a,
                        )
                      ? new Error(
                          `${r} Vượt quá giới hạn ngữ cảnh: Vui lòng giảm bớt Thế Giới Thư tham khảo hoặc độ dài prompt.${s}`,
                        )
                      : /response[_ -]?format|json[_ -]?schema|structured output/i.test(
                            a,
                          )
                        ? new Error(
                            `${r} Không hỗ trợ định dạng xuất có cấu trúc hiện tại: Vui lòng đổi mô hình tương thích hoặc giao thức giao diện.${s}`,
                          )
                        : 400 === n
                          ? new Error(
                              `${r} Từ chối yêu cầu (HTTP 400): Vui lòng kiểm tra tên mô hình, giao thức giao diện, phạm vi tham số và độ dài prompt.${s}`,
                            )
                          : /failed to fetch|network error|networkerror|econnreset|econnrefused|socket hang up/i.test(
                                a,
                              )
                            ? new Error(
                                `${r} Kết nối mạng thất bại: Vui lòng kiểm tra địa chỉ API, proxy và kết nối mạng.${s}`,
                              )
                            : !a || /^(?:error:\s*)?<none>$/i.test(a)
                              ? new Error(
                                  `${r} Yêu cầu thất bại, nhưng TavernHelper không trả về thông tin lỗi cụ thể; vui lòng kiểm tra bảng điều khiển hoặc nhật ký máy chủ của SillyTavern.`,
                                )
                              : e instanceof Error
                                ? e
                                : new Error(a);
}
function c(e) {
  const t = i(e),
    r = o(e, t);
  return (
    !(r >= 400 && r < 500) &&
    !/model[\s\S]{0,80}(?:not found|does not exist|invalid|unavailable)|unknown model/i.test(
      t,
    ) &&
    !/context length|maximum context|too many tokens|token limit|prompt is too long/i.test(
      t,
    ) &&
    !/response[_ -]?format|json[_ -]?schema|structured output/i.test(t)
  );
}
const l = (e) => [
  ...new Set(
    (Array.isArray(e) ? e : [])
      .map((e) => String(e || "").trim())
      .filter(Boolean),
  ),
];
function p(e) {
  const t = String(e?.content || ""),
    r = [];
  for (const e of t.matchAll(/<Thiết lập nhân vật:([^>\r\n]+?)_SFW>/gi))
    r.push(e[1].trim());
  const a = String(e?.name || "")
    .trim()
    .match(/^(.+?)_SFW(?:（Đạo nhập(?:\d+)?）)?$/i);
  return (a && r.push(a[1].trim()), l(r));
}
function d({
  officialCharacters: e = [],
  profiles: t = [],
  worldbookEntries: r = [],
  projectCharacters: a = {},
} = {}) {
  const n = [],
    i = new Map(),
    o = (e, t, r) => {
      const a = String(e?.name || "").trim();
      if (!a) return null;
      const o = String(e?.summary || e?.title || r || "").trim(),
        s = l(e?.worldbookEntries || e?.personaEntries),
        c = l(e?.aliases),
        p = i.get(a);
      if (p)
        return (
          (p.worldbookEntries = l([...p.worldbookEntries, ...s])),
          (p.aliases = l([...p.aliases, ...c])),
          !p.summary && o && (p.summary = o),
          p
        );
      const d = {
        name: a,
        summary: o || "Nhân vật mở rộng trong thẻ nhân vật hiện tại",
        lock: e?.lock || ("official" === t ? "free" : "custom"),
        source: e?.source || t,
        aliases: c,
        worldbookEntries: s,
      };
      return (n.push(d), i.set(a, d), d);
    };
  for (const t of e) o(t, "official", "");
  for (const e of Array.isArray(t) ? t : [])
    o(e, "profile", "Nhân vật mở rộng trong trình quản lý nhân vật và ảnh đứng");
  for (const e of Array.isArray(r) ? r : [])
    for (const t of p(e)) {
      const r = o(
        { name: t, worldbookEntries: [e.name] },
        "worldbook",
        "Thiết lập nhân vật hoàn chỉnh trong Thế Giới Thư của thẻ nhân vật hiện tại",
      );
      r &&
        (r.worldbookEntries = l([
          ...r.worldbookEntries,
          String(e.name || "").trim(),
        ]));
    }
  for (const [e, t] of Object.entries(a && "object" == typeof a ? a : {}))
    o(
      {
        name: e,
        summary: t?.identity || t?.summary,
        personaEntries: t?.personaEntries,
      },
      "project",
      "Nhân vật mở rộng được lưu trong dự án",
    );
  return n;
}
(() => {
  const t = "CanmingScenarioGenerator",
    r = "canming-scenario-generator-root",
    i = "canming-scenario-generator-style",
    o = "canming-dlc:scenario-generator:project:v1",
    l = "canming-gen-api-cfg",
    p = "[scenario_generator] Mẫu Sùng Trinh năm thứ bảy tháng bảy",
    g = "cmyj.era.chongzhen-7-07",
    u = "[scenario] Thân phận <user>",
    m = 12e4,
    f =
      /<!-- CANMING_CHARACTER_ADAPTATION_START -->[\s\S]*?<!-- CANMING_CHARACTER_ADAPTATION_END -->/g,
    b = {
      apiType: "openai",
      apiUrl: "",
      apiKey: "",
      model: "",
      temperature: 0.8,
      maxTokens: 12e3,
      topP: 0.9,
      frequencyPenalty: 0,
      presencePenalty: 0,
    },
    h = [
      ["Anna", "Con gái thương nhân Hà Lan am hiểu sổ sách Hán văn"],
      ["Bạch Dao", "Giáo thủ Bạch Liên lấy loạn thế làm bàn cờ"],
      ["Thúy Nhi", "Nha hoàn nhà nghèo lắm mồm nhưng nhiệt tình"],
      ["Hồng Thiên Muội", "Thiếu nữ kỳ lạ chia nhỏ thần dụ thành thực vụ"],
      ["Lâm Tri Hạ", "Con gái độc nhất hoạt bát hiền lành của thương hộ"],
      ["Liễu Thị", "Khuê tú gia đình cũ bị cuộc sống phố thị che lấp"],
      ["Lục Vãn Tinh", "Nữ võ sư phương Bắc xách kiếm độc hành"],
      ["Tê Nguyệt", "Muội muội dùng hành động tinh tế thể hiện tâm ý"],
      ["Tê Vân", "Tỷ tỷ tự biến mình thành tấm bình phong trong nhà"],
      ["Thẩm Thanh Yến", "Tài nữ phố thị mắt cao miệng lưỡi sắc bén"],
      ["Tô Vãn Đường", "Phụ nhân nhát gan trong quyết định nhưng không bao giờ buông tay"],
      ["Tô Vãn Nguyệt", "Quả phụ vùng biên ải miệng độc tay vững"],
      ["Ôn Tố Huyền", "Nữ đầu mục vươn lên từ trong doanh trại lưu khấu"],
      ["Chu Thị", "Nữ chưởng quỹ lấy sự đời làm bùa hộ mệnh"],
      ["Thường Bưu", "Bộ dịch cơ sở lỗ mãng thẳng thắn trượng nghĩa"],
      ["Cố Minh Viễn", "Tú tài sa sút miệng độc tâm tế"],
      ["Thẩm Đại Trụ", "Đồ tể phố thị chất phác cần cù"],
      ["Triệu Nghiễn", "Con nuôi lanh lợi trầm mặc lại trọng tình"],
      ["Phương Tử Khâm", "Thiếu nữ Phương gia đắm chìm trong toán lý cách trí", "family"],
      ["Dương Nhĩ Minh", "Đồng Thành tri huyện thời Sùng Trinh", "history"],
      ["Phương Khổng Chiếu", "Đồng Thành Phương thị sĩ hoạn", "history"],
      ["Phương Dĩ Trí", "Phục xã danh sĩ và học giả cách trí", "history"],
      ["Liễu Như Thị", "Tần Hoài tài nữ", "history"],
      ["Trần Viên Viên", "Tô Châu lê viên nữ nhạc", "history"],
      ["Chu Hoàng Hậu", "Sùng Trinh Hoàng Hậu", "history"],
      ["Chu Huy Đề", "Con gái Minh Quang Tông", "history"],
      ["Trương Yên", "Di sương Minh Hy Tông", "history"],
    ].map(([e, t, r = "free"]) => ({ name: e, summary: t, lock: r }));
  let y = d({ officialCharacters: h });
  const x = [
      ["Tê Vân", "Tê Nguyệt", "Song bào thai tỷ muội"],
      ["Tô Vãn Đường", "Tê Vân", "Dưỡng mẫu nữ"],
      ["Tô Vãn Đường", "Tê Nguyệt", "Dưỡng mẫu nữ"],
      ["Tô Vãn Đường", "Triệu Nghiễn", "Dưỡng mẫu tử"],
      ["Tô Vãn Đường", "Tô Vãn Nguyệt", "Tỷ muội"],
      ["Chu Thị", "Lâm Tri Hạ", "Mẫu nữ"],
      ["Thẩm Đại Trụ", "Liễu Thị", "Phu thê"],
      ["Thẩm Đại Trụ", "Thẩm Thanh Yến", "Phụ nữ"],
      ["Liễu Thị", "Thẩm Thanh Yến", "Mẫu nữ"],
      ["Phương Khổng Chiếu", "Phương Tử Khâm", "Phụ nữ"],
      ["Phương Dĩ Trí", "Phương Tử Khâm", "Huynh muội"],
    ],
    v = [
      "Thượng tư",
      "Cố hữu và đồng liêu",
      "Hạ thuộc và mạc liêu",
      "Tam giáo cửu lưu",
      "Cừu địch",
      "Thân thuộc",
      "Tư duy",
    ],
    w = ["Thê", "Thiếp", "Thông phòng", "Hồng nhan", "Nữ quyến"],
    k = (e) => JSON.parse(JSON.stringify(e)),
    S = (e) => globalThis[e] ?? window.parent?.[e],
    j = (e) =>
      String(e ?? "").replace(
        /[&<>"']/g,
        (e) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[e],
      ),
    E = (e) =>
      String(e || "my-origin")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 56) || "my-origin",
    A = (e) => {
      const t = "\0CMYJ_USER_TOKEN\0";
      return String(e ?? "")
        .replace(/<\s*user\s*>/gi, t)
        .replace(/\{\{\s*user\s*\}\}/gi, t)
        .replace(/\buser\b/gi, t)
        .replaceAll(t, "<user>");
    },
    C = (e) =>
      "string" == typeof e
        ? A(e)
        : Array.isArray(e)
          ? e.map(C)
          : e && "object" == typeof e
            ? Object.fromEntries(Object.entries(e).map(([e, t]) => [e, C(t)]))
            : e;
  function N(e) {
    return {
      included: !1,
      known: !1,
      scene: !1,
      relation: (e.lock, "Chưa từng quen biết"),
      category: "Cố hữu và đồng liêu",
      privateRelation: "Hồng nhan",
      affection: 0,
      loyalty: 50,
      adaptationBrief: "",
      identity: "history" === e.lock ? e.summary : "",
      activityArea: "",
      faction: "",
      relationshipOrigin: "",
      relationshipPattern: "",
      characterToUser: "",
      userToCharacter: "",
      longTermSituation: "",
      adaptationPrinciples: [],
      personaEntries: [...(e.worldbookEntries || [])],
    };
  }
  function T() {
    return {
      format: "canming-scenario-project",
      version: 2,
      eraId: g,
      step: 1,
      title: "Tàn Minh khai cục của tôi",
      id: `cmyj.custom.${Date.now().toString(36)}`,
      packageVersion: "0.1.0",
      summary: "",
      tags: ["Tàn Minh Dư Tẫn", "Thân phận DLC"],
      protagonist: {
        description: "",
        origin: "Nhân vật gốc",
        identity: "",
        occupation: "",
        location: "",
        faction: "",
        socialStanding: "",
        familyBackground: "",
        pastExperience: "",
        strengths: "",
        resources: "",
        longTermPursuit: "",
        identityBoundaries: "",
        predicament: "",
        goal: "",
        tone: "Loạn thế tả thực, kiềm chế có dư âm",
      },
      date: {
        day: "Mùng năm",
        hour: 9,
        minute: 0,
        shichen: "Giờ tỵ",
        ke: "Sơ khắc",
        weather: "Quang đãng",
      },
      stats: {
        life: 60,
        martial: 15,
        command: 10,
        wisdom: 55,
        politics: 25,
        reputation: 0,
        gold: 0,
        silver: 3,
        copper: 200,
      },
      opening: {
        id: "origin-opening",
        name: "Màn 1",
        hook: "",
        body: "",
        targetWords: 1200,
        referenceEntries: [],
      },
      initialization: { patch: {}, summary: "", stale: !0, generatedAt: "" },
      characters: Object.fromEntries(y.map((e) => [e.name, N(e)])),
    };
  }
  let q = document,
    P = {},
    O = null,
    I = T(),
    L = null,
    M = "",
    B = !1,
    W = "",
    R = "info",
    J = "",
    D = "all";
  const H = new Set();
  let U = [];
  const K = {};
  let F = "",
    V = "",
    Y = [],
    G = "";
  function X() {
    return q.defaultView?.localStorage ?? localStorage;
  }
  function Q() {
    try {
      X().setItem(o, JSON.stringify(I));
    } catch {}
  }
  function Z(e) {
    y = d({ officialCharacters: y, projectCharacters: e?.characters });
    const t = T(),
      r = {
        ...t,
        ...(e || {}),
        version: 2,
        protagonist: { ...t.protagonist, ...(e?.protagonist || {}) },
        date: { ...t.date, ...(e?.date || {}) },
        stats: { ...t.stats, ...(e?.stats || {}) },
        opening: { ...t.opening, ...(e?.opening || {}) },
        initialization: { ...t.initialization, ...(e?.initialization || {}) },
      };
    return (
      (r.characters = Object.fromEntries(
        y.map((t) => {
          const r = e?.characters?.[t.name] || {},
            a = { ...N(t), ...r };
          ((a.adaptationBrief = String(r.adaptationBrief || "")),
            (a.activityArea = String(
              r.activityArea || r.location || a.activityArea || "",
            )),
            (a.adaptationPrinciples = Array.isArray(r.adaptationPrinciples)
              ? r.adaptationPrinciples.filter(Boolean).map(String)
              : []),
            (a.personaEntries = [
              ...new Set(
                [
                  ...(Array.isArray(r.personaEntries) ? r.personaEntries : []),
                  ...(t.worldbookEntries || []),
                ]
                  .map(String)
                  .filter(Boolean),
              ),
            ]));
          for (const e of [
            "location",
            "openingExperience",
            "goals",
            "knownInformation",
            "appearanceConditions",
            "interactionRules",
          ])
            delete a[e];
          return [t.name, a];
        }),
      )),
      (r.step = Math.min(4, Math.max(1, Number(r.step) || 1))),
      /^[a-z0-9][a-z0-9._-]{1,63}$/i.test(String(r.id || "")) || (r.id = t.id),
      /^[a-z0-9][a-z0-9._-]{1,63}$/i.test(String(r.opening.id || "")) ||
        (r.opening.id = t.opening.id),
      (r.opening.targetWords = Math.min(
        5e3,
        Math.max(300, Number(r.opening.targetWords) || 1200),
      )),
      (r.opening.referenceEntries = Array.isArray(r.opening.referenceEntries)
        ? r.opening.referenceEntries
            .filter((e) => e?.worldbook && e?.name)
            .map((e) => ({
              worldbook: String(e.worldbook),
              name: String(e.name),
            }))
        : []),
      (r.initialization.patch =
        r.initialization.patch && "object" == typeof r.initialization.patch
          ? r.initialization.patch
          : {}),
      e?.initialization &&
        !Object.hasOwn(e.initialization, "stale") &&
        Object.keys(r.initialization.patch).length &&
        (r.initialization.stale = !1),
      r
    );
  }
  function ee() {
    try {
      const e = JSON.parse(
        X().getItem("canming-afterglow-statusbar:character_profiles_v1") ||
          "null",
      );
      return 1 === e?.version && Array.isArray(e.profiles) ? e.profiles : [];
    } catch {
      return [];
    }
  }
  function te(e, t = "info") {
    ((W = e), (R = t));
    const r = O?.querySelector(".sg-status");
    (r &&
      ((r.textContent = W), (r.title = W), (r.className = `sg-status ${R}`)),
      "error" === t && console.error("[Tàn Minh Dư Tẫn khai cục sinh thành khí]", W));
  }
  function re() {
    (I.initialization ||
      (I.initialization = {
        patch: {},
        summary: "",
        stale: !0,
        generatedAt: "",
      }),
      (I.initialization.stale = !0));
  }
  async function ae(e) {
    if (!e || K[e]) return;
    const t = S("getWorldbook");
    if ("function" != typeof t)
      throw new Error("Tavern hiện tại không cung cấp giao diện đọc Thế Giới Thư.");
    K[e] = (await t(e)) || [];
  }
  function ne(e) {
    return String(e || "")
      .replace(f, "")
      .trim();
  }
  async function ie(e) {
    if (!e.length) return "";
    Y.length ||
      (await (async function () {
        const e = S("getCharWorldbookNames");
        if ("function" != typeof e)
          throw new Error("Tavern hiện tại không cung cấp giao diện đọc Thế Giới Thư của nhân vật.");
        const t = await e("current");
        if (
          ((Y = [
            ...new Set([t?.primary, ...(t?.additional || [])].filter(Boolean)),
          ]),
          !Y.length)
        )
          throw new Error("Nhân vật hiện tại không liên kết với Thế Giới Thư.");
        for (const e of Y) await ae(e);
        return Y;
      })());
    const t = [],
      r = [];
    for (const a of e) {
      const e = I.characters[a.name],
        n = [
          ...new Set([
            ...(a.worldbookEntries || []),
            ...(e?.personaEntries || []),
            `${a.name}_SFW`,
            a.name,
          ]),
        ],
        i = [];
      for (const e of Y)
        for (const t of K[e] || [])
          n.includes(t?.name) &&
            t?.content &&
            i.push({ source: e, name: t.name, content: t.content });
      if (i.length)
        for (const e of i)
          t.push(`[${e.source} / ${e.name}]\n${ne(e.content)}`);
      else r.push(a.name);
    }
    if (r.length)
      throw new Error(
        `Những nhân vật này không có liên kết với thiết lập hoàn chỉnh có thể đọc: ${r.join("、")}. Vui lòng liên kết mục Thế Giới Thư cho nhân vật trong "Trình quản lý nhân vật và ảnh đứng" trước.`,
      );
    const a = t.join("\n\n");
    if (a.length > m)
      throw new Error(
        `Thiết lập nhân vật tại hiện trường tổng cộng ${a.length} ký tự, vượt quá giới hạn 120000 ký tự. Vui lòng giảm bớt nhân vật tại hiện trường lúc mở màn.`,
      );
    return a;
  }
  function oe(e, t) {
    const r = {
      "Thân phận": t.identity || `Nhân vật ở ${I.protagonist.location}`,
      "Tiếng lòng nhân vật": "",
      "Có mặt hay không": Boolean(t.scene),
    };
    return "Cừu địch" === t.category
      ? { ...r, "Cừu hận độ": _e(-t.affection, 0, 100) }
      : "Hạ thuộc và mạc liêu" === t.category
        ? {
            ...r,
            "Hảo cảm độ": _e(t.affection, -100, 100),
            "Trung tâm": _e(t.loyalty, 0, 100),
          }
        : "Tư duy" === t.category
          ? {
              ...r,
              "Quan hệ": w.includes(t.privateRelation) ? t.privateRelation : "Hồng nhan",
              "Hảo cảm độ": _e(t.affection, -100, 100),
              "Trung tâm": _e(t.loyalty, 0, 100),
              "Sinh dục": {
                "Có phải xử nữ không": !0,
                "Số lần đồng phòng": 0,
                "Chu kỳ": 1,
                "Thời kỳ": "An toàn kỳ",
                "Trạng thái": "Chưa mang thai",
                "Lần đồng phòng cuối": { "Ngày tháng": "", "Ngày chu kỳ": 0, "Xác suất phán định": 0 },
                "Dự sinh kỳ": "",
                "_Số ngày dự sinh": 0,
                "_Số ngày sau sinh": 0,
              },
            }
          : { ...r, "Hảo cảm độ": _e(t.affection, -100, 100) };
  }
  function se(e, t) {
    if (!t || "object" != typeof t || Array.isArray(t)) return e;
    for (const [r, a] of Object.entries(t))
      if (a && "object" == typeof a && !Array.isArray(a)) {
        const t =
          e[r] && "object" == typeof e[r] && !Array.isArray(e[r]) ? e[r] : {};
        e[r] = se(t, a);
      } else e[r] = a;
    return e;
  }
  function ce() {
    if (!L) throw new Error("Chưa tải khuôn mẫu thời đại Sùng Trinh năm thứ bảy tháng bảy.");
    const e = Object.fromEntries(v.map((e) => [e, {}]));
    for (const [t, r] of Object.entries(I.characters))
      r.included && (r.known || r.scene) && (e[r.category][t] = oe(0, r));
    const t = I.protagonist,
      r = I.opening.name || "Màn 1";
    var n;
    const i = se(
      {
        "Thế giới vận hành": {
          "_Định danh khởi đầu": I.opening.id,
          "Ngày hiện tại": `Sùng Trinh năm thứ bảy tháng bảy ${I.date.day}`,
          "Mười hai canh giờ": {
            "Canh giờ":
              ((n = I.date.hour),
              [
                "Giờ tý",
                "Giờ sửu",
                "Giờ dần",
                "Giờ mão",
                "Giờ thìn",
                "Giờ tỵ",
                "Giờ ngọ",
                "Giờ mùi",
                "Giờ thân",
                "Giờ dậu",
                "Giờ tuất",
                "Giờ hợi",
              ][Math.floor(((Number(n) + 1) % 24) / 2)]),
            "Khắc": I.date.ke,
          },
          "Hai mươi bốn giờ": { "Giờ": Number(I.date.hour), "Phút": Number(I.date.minute) },
          "Địa điểm hiện tại": t.location,
          "Thời tiết": I.date.weather,
          "Bối cảnh": "SFW",
          "Số ngày vận hành": 1,
        },
        "Nhân vật chính": {
          "Chức quan": t.occupation || t.identity,
          "Danh vọng": Number(I.stats.reputation),
          "Giai đoạn danh vọng": "Mặc mặc vô văn",
          "Ngũ duy": {
            "Sinh mệnh": Number(I.stats.life),
            "Võ lực": Number(I.stats.martial),
            "Thống suất": Number(I.stats.command),
            "Trí mưu": Number(I.stats.wisdom),
            "Chính trị": Number(I.stats.politics),
          },
          "Tư khố": {
            "Kim ngân đồng": {
              "Hoàng kim": Number(I.stats.gold),
              "Bạch ngân": Number(I.stats.silver),
              "Tiền đồng": Number(I.stats.copper),
            },
            "Vật phẩm quan trọng": {},
          },
        },
        "Mạng lưới quan hệ": e,
        "Quân sự": { "Các doanh": {}, "Tướng lĩnh": {}, "Ghi chép chiến đấu": {} },
        "Kinh tế": {
          "Tài sản": {},
          "Lưu thủy": { "Kết dư tháng này": 0, "Nguyệt nhập": {}, "Nguyệt xuất": {} },
          "Thương trữ": {},
          "Thị trường": {
            "Chỉ số giá cả": { "Lương thực": 100, "Quân nhu": 100, "Vật tư thường dùng": 100 },
            "Tỷ giá": { "Một lạng hoàng kim đổi bạch ngân": 6, "Một lạng bạch ngân đổi tiền đồng": 1200 },
            "Tình hình thị trường": "Bình ổn",
            "_Tồn kho tháng": "",
            "_Tồn kho còn lại": {},
          },
        },
        "Khoa kỹ": {},
        "Cá nhân sử ký": {
          "Đại sự ký": {
            [r]: {
              "Ngày tháng": `Sùng Trinh năm thứ bảy tháng bảy ${I.date.day}`,
              "Địa điểm": t.location,
              "Loại hình": "Nhân sự",
              "Sự tích":
                t.predicament ||
                I.opening.hook ||
                `Câu chuyện của ${t.identity} bắt đầu từ đây`,
              "Ảnh hưởng": t.goal || "Tiền lộ thượng vị khả tri",
            },
          },
        },
        "Thiên hạ bản đồ": k(L["Biến lượng"]["Thiên hạ bản đồ"]),
        "Thời cục và nhiệm vụ": { "Quan hệ thế lực": {}, "Nhiệm vụ hiện tại": {} },
        "Phong nguyệt các": { "Điểm đồng phòng": 0, "Khí vật": {}, "Lời chưởng quỹ": "" },
      },
      (function (e) {
        const t = e && "object" == typeof e ? k(e) : {},
          r = new Set([
            "Nhân vật chính",
            "Mạng lưới quan hệ",
            "Quân sự",
            "Kinh tế",
            "Khoa kỹ",
            "Cá nhân sử ký",
            "Thời cục và nhiệm vụ",
          ]);
        for (const e of Object.keys(t)) r.has(e) || delete t[e];
        return (
          t["Nhân vật chính"] &&
            (t["Nhân vật chính"] = { "Tư khố": { "Vật phẩm quan trọng": t["Nhân vật chính"]?.["Tư khố"]?.["Vật phẩm quan trọng"] || {} } }),
          t
        );
      })(I.initialization?.patch),
    );
    ((i["Thiên hạ bản đồ"] = k(L["Biến lượng"]["Thiên hạ bản đồ"])),
      (i["Thế giới vận hành"]["_Định danh khởi đầu"] = I.opening.id),
      (i["Thế giới vận hành"]["Ngày hiện tại"] = `Sùng Trinh năm thứ bảy tháng bảy ${I.date.day}`),
      (i["Thế giới vận hành"]["Địa điểm hiện tại"] = t.location),
      (i["Thế giới vận hành"]["Thời tiết"] = I.date.weather));
    const o = a.parse(i);
    if (JSON.stringify(o["Thiên hạ bản đồ"]) !== JSON.stringify(L["Biến lượng"]["Thiên hạ bản đồ"]))
      throw new Error("Xác minh biến khởi tạo thất bại: Thiên hạ bản đồ bị sửa đổi ngoài ý muốn.");
    return o;
  }
  function le(e, t, r = 100, a = "before_character_definition") {
    return {
      name: e,
      enabled: !0,
      content: String(t).trim(),
      strategy: {
        type: "constant",
        keys: [],
        keys_secondary: { logic: "and_any", keys: [] },
      },
      position: { type: a, role: "system", depth: 0, order: r },
      recursion: {
        prevent_incoming: !0,
        prevent_outgoing: !0,
        delay_until: null,
      },
      probability: 100,
      effect: { sticky: null, cooldown: null, delay: null },
    };
  }
  function pe() {
    return y.filter((e) => I.characters[e.name]?.included);
  }
  function de() {
    return pe()
      .filter((e) => "history" !== e.lock)
      .map((e) => {
        const t = I.characters[e.name];
        return {
          character: e.name,
          overviewSummary: e.summary,
          identity: A(t.identity || e.summary),
          activityArea: A(
            t.activityArea || "Di chuyển hợp lý theo gia đình, chức vụ hoặc sinh kế trong cốt truyện",
          ),
          faction: A(t.faction || ""),
          userRelation: A(t.relation || (t.known ? "Người quen biết" : "Chưa từng quen biết")),
          relationshipOrigin: A(
            t.relationshipOrigin ||
              (t.known
                ? "Hai bên quen biết nhau qua những trải nghiệm cụ thể, chi tiết nên thống nhất với chính văn."
                : "Hai bên ban đầu không có giao tình nhất định, mối quan hệ phải được thiết lập qua các sự kiện cụ thể."),
          ),
          relationshipPattern: A(
            t.relationshipPattern ||
              "Mối quan hệ phát triển tự nhiên theo sự tương tác lâu dài, không đột biến vì hào quang của nhân vật chính.",
          ),
          characterToUser: A(
            t.characterToUser || "Xưng hô tự nhiên dựa trên thân phận, lễ pháp và giai đoạn quan hệ của hai bên",
          ),
          userToCharacter: A(
            t.userToCharacter || `Xưng hô dựa theo thân phận hoặc họ tên của ${e.name}`,
          ),
          longTermSituation: A(
            t.longTermSituation ||
              "Tiếp tục tính cách, giới hạn năng lực và các mối quan hệ nhân vật của nhân vật gốc trong thân phận và môi trường mới.",
          ),
          adaptationPrinciples: (t.adaptationPrinciples?.length
            ? t.adaptationPrinciples
            : ["Sự thay đổi về thân phận và khu vực không được che lấp tính cách cốt lõi, giới hạn năng lực và mối quan hệ nhân vật của thiết lập ban đầu."]
          ).map(A),
          personaEntries: [
            ...new Set(
              [...(t.personaEntries || []), ...(e.worldbookEntries || [])]
                .map(String)
                .filter(Boolean),
            ),
          ],
          nonFixedRelationships: [],
        };
      });
  }
  function ge() {
    return A(
      `<Bối cảnh thân phận người chơi>\nThời điểm bắt đầu: Sùng Trinh năm thứ bảy tháng bảy\nLai lịch: ${I.protagonist.origin || "Chưa thiết lập chi tiết"}\nThân phận công khai: ${I.protagonist.identity}\nNghề nghiệp hoặc chức quan: ${I.protagonist.occupation || "Không có nghề nghiệp cố định"}\nKhu vực trực thuộc lúc khai cục: ${I.protagonist.location}\nThế lực trực thuộc dài hạn: ${I.protagonist.faction || "Không có thế lực cố định"}\nThân phận và địa vị xã hội: ${I.protagonist.socialStanding || "Chưa thiết lập chi tiết"}\nXuất thân và bối cảnh gia đình: ${I.protagonist.familyBackground || "Chưa thiết lập chi tiết"}\nKinh nghiệm then chốt trước khi hình thành thân phận: ${I.protagonist.pastExperience || "Chưa thiết lập chi tiết"}\nNăng lực và kiến thức ổn định: ${I.protagonist.strengths || "Chưa thiết lập chi tiết"}\nTài nguyên có thể chi phối hoặc điều động dài hạn: ${I.protagonist.resources || "Chưa thiết lập chi tiết"}\nMong muốn dài hạn: ${I.protagonist.longTermPursuit || "Chưa thiết lập chi tiết"}\nRanh giới và giới hạn thân phận: ${I.protagonist.identityBoundaries || "Tuân thủ điều kiện thân phận, thời đại và thực tế, không vì hào quang nhân vật chính mà nhận được quyền lực hay kiến thức bổ sung"}\nKhí chất câu chuyện: ${I.protagonist.tone || "Loạn thế tả thực, kiềm chế có dư âm"}\nThuyết minh: Nội dung ghi chép ở trên là bối cảnh thân phận và điểm xuất phát câu chuyện ổn định của <user>, không đại diện cho địa điểm, chức vụ, thế lực, tài nguyên hay mục tiêu hiện tại sau khi cốt truyện tiến triển; trạng thái tiếp theo sẽ lấy biến lượng và chính văn làm chuẩn.\n</Bối cảnh thân phận người chơi>`,
    );
  }
  function ue() {
    const e = [];
    (I.title.trim() || e.push("Vui lòng điền Danh xưng DLC"),
      I.protagonist.identity.trim() || e.push("Vui lòng điền thân phận nhân vật chính"),
      I.protagonist.location.trim() || e.push("Vui lòng điền địa điểm mở màn"),
      I.opening.body.trim() || e.push("Vui lòng tạo hoặc điền chính văn mở màn"),
      I.initialization?.stale &&
        e.push("Mở màn hoặc cấu hình đã thay đổi, vui lòng bổ sung lại biến khởi tạo ở bước thứ ba"),
      /^[a-z0-9][a-z0-9._-]{1,63}$/i.test(I.opening.id) ||
        e.push("Định danh mở màn chỉ có thể sử dụng 2~64 chữ cái, số, dấu chấm, dấu gạch ngang hoặc dấu gạch dưới"),
      L || e.push(M || "Chưa tải khuôn mẫu thời đại"));
    for (const t of pe()) {
      const r = I.characters[t.name];
      (r.scene &&
        !r.included &&
        e.push(`${t.name} chưa được đưa vào DLC, không thể đặt làm nhân vật tại hiện trường lúc mở màn`),
        r.known &&
          !v.includes(r.category) &&
          e.push(`Phân loại nhân tế của ${t.name} không hợp lệ`));
    }
    return e;
  }
  function me(e) {
    return String(e || "")
      .replace(/<initvar(?:\s[^>]*)?>[\s\S]*?<\/initvar\s*>/gi, "\n")
      .replace(
        /<(?:initial[_\s-]*variables?|initialization|Khởi tạo biến|变量初始化|初始化变量)(?:\s[^>]*)?>[\s\S]*?<\/(?:initial[_\s-]*variables?|initialization|Khởi tạo biến|变量初始化|初始化变量)\s*>/gi,
        "\n",
      )
      .replace(/```(?:initvar|initial[_-]*variables?)\s*[\s\S]*?```/gi, "\n")
      .replace(
        /<\/?(?:initvar|initial[_\s-]*variables?|initialization|Khởi tạo biến|变量初始化|初始化变量)(?:\s[^>]*)?>/gi,
        "",
      )
      .trim();
  }
  function fe() {
    const t = ue();
    if (t.length) throw new Error(t.join("；"));
    const r = C(ce()),
      n = e.stringify(r, { lineWidth: 0, indent: 2 }).trimEnd();
    a.parse(e.parse(n));
    const i = (function (e, t) {
        const r = `${A(me(e))}\n\n<initvar>\n${t}\n</initvar>`;
        if (
          1 !== (r.match(/<initvar>/g) || []).length ||
          1 !== (r.match(/<\/initvar>/g) || []).length
        )
          throw new Error(
            "Tạo thẻ biến khởi tạo thất bại: Nội dung cuối cùng phải và chỉ có thể chứa một nhóm <initvar>.",
          );
        if (
          /<\/?(?:initial[_\s-]*variables?|initialization|Khởi tạo biến|变量初始化|初始化变量)(?:\s[^>]*)?>/i.test(
            r,
          )
        )
          throw new Error("Tạo thẻ biến khởi tạo thất bại: Phát hiện thẻ khởi tạo không tiêu chuẩn.");
        return r;
      })(I.opening.body, n),
      o = pe().map((e) => ({
        name: e.name,
        summary: A(
          I.characters[e.name].identity
            ? `${I.characters[e.name].identity}；${e.summary}`
            : e.summary,
        ),
      })),
      s = I.id.trim() || `cmyj.custom.${E(I.title)}`,
      c = ge(),
      l = [
        le(u, c, 1),
        le(
          "Nhân vật khái lãm",
          ((p = o),
          `@@preprocessing\n<%_\nvar characterOverviews = ${JSON.stringify({ [I.opening.id]: p }, null, 2)};\nvar openingId = getvar('stat_data.Thế giới vận hành._Định danh khởi đầu', { defaults: '' });\nvar people = characterOverviews[openingId] || [];\nif (people.length > 0) {\n_%>\n<Nhân vật khái lãm>\n<%_ for (var i = 0; i < people.length; i++) { _%>\n- <%- people[i].name %>: <%- people[i].summary %>\n<%_ } _%>\n</Nhân vật khái lãm>\n<%_ } _%>`),
          0,
          "after_character_definition",
        ),
      ];
    var p;
    const d = de(),
      g = pe()
        .filter((e) => I.characters[e.name].known)
        .map((e) => ({
          character: e.name,
          relation: A(I.characters[e.name].relation),
        })),
      m = new Set(pe().map((e) => e.name)),
      f = [
        ...g.map((e) => ({
          source: "Nhân vật chính",
          target: e.character,
          label: e.relation || "Quen biết",
        })),
        ...x
          .filter(([e, t]) => m.has(e) && m.has(t))
          .map(([e, t, r]) => ({ source: e, target: t, label: r })),
      ],
      b = {
        id: s,
        kind: "scenario",
        name: I.title,
        scenario: {
          id: s,
          version: I.packageVersion || "0.1.0",
          baseCard: "cmyj.base",
          minBaseVersion: "1.7.0",
          exclusiveGroup: "player-origin",
          allowMidChatSwitch: !1,
          newChatRequired: !0,
        },
        openings: [
          {
            id: I.opening.id,
            name: I.opening.name,
            subtitle: A(
              `Sùng Trinh năm thứ bảy tháng bảy ${I.date.day} · ${I.protagonist.identity}`,
            ),
            content: i,
          },
        ],
        worldbookEntries: l,
        initialRelationships: g,
        portraitProfiles: [],
        characterOverviewVersion: o.length ? 1 : 0,
        characterOverviews: o.length ? { [I.opening.id]: o } : {},
        characterAdaptationVersion: 3,
        characterAdaptations: d,
        ui: {
          relationshipGraph: {
            categories: [
              { name: "Quan hệ nhân vật", color: "#9f302d", symbol: "roundRect" },
            ],
            nodes: [
              {
                id: "Nhân vật chính",
                name: "Nhân vật chính",
                category: 0,
                symbolSize: 64,
                symbol: "circle",
                desc: A(I.protagonist.identity),
              },
              ...pe().map((e) => ({
                id: e.name,
                name: e.name,
                category: 0,
                symbolSize: 42,
                desc: A(I.characters[e.name].relation || e.summary),
              })),
            ],
            links: f,
          },
        },
      },
      h = {
        format: "canming-workshop-package",
        version: 2,
        kind: "scenario",
        createdAt: new Date().toISOString(),
        metadata: {
          title: I.title,
          summary: A(
            I.summary ||
              `Mở đầu ${I.protagonist.identity} ở ${I.protagonist.location}.`,
          ),
          tags: I.tags,
          categories: ["Mở rộng cốt truyện"],
          coverUrl: "",
        },
        resources: [b],
      },
      y = new TextEncoder().encode(JSON.stringify(h)).length;
    if (y > 14e5)
      throw new Error(
        `Kích thước gói DLC ${(y / 1024).toFixed(1)} KB, vượt quá giới hạn 1.4 MB.`,
      );
    return h;
  }
  function be() {
    try {
      return { ...b, ...JSON.parse(X().getItem(l) || "{}") };
    } catch {
      return { ...b };
    }
  }
  function he() {
    const e = be();
    return e.model || (e.apiUrl || e.apiKey ? "API tùy chỉnh" : "API hiện tại của Tavern");
  }
  function ye(e) {
    if (e && "object" == typeof e) return e;
    const t = String(e || "").trim();
    if (!t) throw new Error("AI không trả về nội dung.");
    const r = (t.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1] || t).trim();
    try {
      return JSON.parse(r);
    } catch {
      const e = r.indexOf("{"),
        t = r.lastIndexOf("}");
      if (e >= 0 && t > e) return JSON.parse(r.slice(e, t + 1));
      throw new Error("Nội dung AI trả về không phải là JSON hợp lệ.");
    }
  }
  function xe() {
    const e = be();
    return e.apiUrl || e.apiKey
      ? {
          apiurl: e.apiUrl || "",
          key: e.apiKey || "",
          model: e.model || "",
          source: e.apiType || "openai",
          temperature: Number(e.temperature ?? 0.8),
          max_tokens: Number(e.maxTokens ?? 12e3),
          top_p: Number(e.topP ?? 0.9),
          frequency_penalty: Number(e.frequencyPenalty ?? 0),
          presence_penalty: Number(e.presencePenalty ?? 0),
        }
      : null;
  }
  async function $e(e, t, r) {
    const a = S("generateRaw"),
      i = S("generate");
    if ("function" != typeof a && "function" != typeof i)
      throw new Error("Không tìm thấy giao diện tạo AI của Tavern.");
    const o = xe(),
      l = n(o),
      p = l
        ? (function (e) {
            const t = e?.value ?? e?.schema ?? e;
            return t && "object" == typeof t
              ? [
                  "",
                  "",
                  "【Chế độ tương thích DeepSeek JSON】",
                  "Vui lòng chỉ xuất ra một đối tượng JSON hợp lệ, không xuất Markdown, khối mã, giải thích hoặc văn bản ngoài đối tượng.",
                  "Đầu ra phải đáp ứng JSON Schema sau; tất cả các trường required đều phải tồn tại:",
                  JSON.stringify(t, null, 2),
                ].join("\n")
              : "";
          })(r)
        : "",
      d = {
        should_silence: !0,
        ordered_prompts: [
          { role: "system", content: e },
          { role: "user", content: `${t}${p}` },
        ],
        ...(l ? {} : { json_schema: r }),
        ...(o ? { custom_api: o } : {}),
      };
    let g;
    for (let n = 0; n < 2; n++)
      try {
        const s = n
          ? "\n\nĐầu ra lần trước không thể phân tích cú pháp. Vui lòng chỉ xuất ra đối tượng JSON phù hợp với JSON Schema, tất cả ngắt dòng và ngoặc kép phải được thoát (escape) chính xác."
          : "";
        d.ordered_prompts = [
          { role: "system", content: e },
          { role: "user", content: `${t}${p}${s}` },
        ];
        const c =
          "function" == typeof a
            ? await a(d)
            : await i({
                should_silence: !0,
                user_input: `${e}\n\n${t}${p}${s}`,
                ...(l ? {} : { json_schema: r }),
                ...(o ? { custom_api: o } : {}),
              });
        return C(ye(c));
      } catch (e) {
        if (((g = s(e, { provider: l ? "DeepSeek" : "Giao diện AI" })), !c(e)))
          break;
      }
    throw g || new Error("Tạo AI thất bại.");
  }
  function ve(e) {
    if (e && "object" == typeof e) {
      const t = e.opening_body ?? e.content ?? e.text;
      if ("string" == typeof t) return t.trim();
      throw new Error("AI trả về lệnh gọi công cụ hoặc đối tượng không xác định.");
    }
    let t = String(e || "").trim();
    if (!t) throw new Error("AI không trả về chính văn.");
    const r = t.match(/^```(?:text|markdown|md)?\s*([\s\S]*?)```$/i)?.[1];
    if ((r && (t = r.trim()), t.startsWith("{") && t.endsWith("}")))
      try {
        const e = JSON.parse(t);
        t = String(e.opening_body ?? e.content ?? e.text ?? "").trim() || t;
      } catch {}
    return t
      .replace(/^(?:Chính văn mở màn|Chính văn|opening_body)\s*[：:]\s*/i, "")
      .trim();
  }
  function we(e) {
    const t = new Set(e.map((e) => e.name));
    return (
      x
        .filter(([e, r]) => t.has(e) || t.has(r))
        .map(([e, t, r]) => `${e}—${t}：${r}`)
        .join("；") || "Không có quan hệ cố định bổ sung"
    );
  }
  async function ze(e) {
    const t = e.filter((e) => "history" !== e.lock);
    if (!t.length) throw new Error("Các nhân vật đã chọn đều là nhân vật lịch sử, thân phận không cần thích ứng.");
    const r = [];
    for (const e of t) {
      const t = await ie([e]),
        a = I.characters[e.name],
        n = {
          adaptation_brief: a.adaptationBrief,
          identity: a.identity,
          activity_area: a.activityArea,
          faction: a.faction,
          relationship_origin: a.relationshipOrigin,
          relationship_pattern: a.relationshipPattern,
          character_to_user: a.characterToUser,
          user_to_character: a.userToCharacter,
          long_term_situation: a.longTermSituation,
          adaptation_principles: a.adaptationPrinciples,
        },
        i = `Bạn phụ trách tạo định vị nhân vật dài hạn cho nhân vật nguyên tác '${e.name}' của 《Tàn Minh Dư Tẫn》. Phải giữ lại cốt lõi tính cách, giới hạn năng lực và các mối quan hệ nhân vật của thiết lập ban đầu. "Ý tưởng thích ứng một câu" mà người dùng cung cấp là hướng sáng tác, cần kết hợp với thân phận <user> và thiết lập ban đầu để phát triển thành thân phận, trải nghiệm và cách chung sống lâu dài và hiệu quả. Không được xuất ra mục tiêu hiện tại, thông tin hiện tại, địa điểm mở màn, thái độ tức thời, có mặt hay không hoặc các trạng thái khác chỉ tồn tại trong một thời điểm cụ thể. Chỉ xử lý một nhân vật này, không xuất ra tên nhân vật, cũng không sử dụng mảng characters hoặc lớp ngoài character. Khi liên quan đến người chơi, tất cả đều viết là <user>, không được viết user hoặc {{user}}. Mọi chuỗi (string) đều phải có nội dung cụ thể; nếu thực sự không có thế lực cố định thì viết "Không có thế lực cố định", không được dùng chuỗi rỗng để thay thế. adaptation_principles đưa ra ít nhất hai nguyên tắc có thể thực thi. Xuất ra một đối tượng JSON duy nhất tuân thủ Schema.`,
        o = `Nhân vật mục tiêu: ${e.name}\nHồ sơ thân phận dài hạn của <user>:\n${ge()}\nCác mối quan hệ nhân vật không thể viết lại: ${we([e])}\nadaptation_brief là ý tưởng một câu của người dùng, chỉ dùng để hướng dẫn việc bổ sung, không cần lặp lại nguyên văn. Các trường không trống khác là ràng buộc cứng, không được viết lại; vui lòng điền vào tất cả các trường trống những nội dung cụ thể và có hiệu lực lâu dài:\n${JSON.stringify(n, null, 2)}\n\n<Thiết lập nhân vật ban đầu của ${e.name}>\n${t}\n</Thiết lập nhân vật ban đầu của ${e.name}>`,
        s = {
          name: "canming_single_character_adaptation_v3",
          value: {
            type: "object",
            additionalProperties: !1,
            required: [
              "identity",
              "activity_area",
              "faction",
              "relationship_origin",
              "relationship_pattern",
              "character_to_user",
              "user_to_character",
              "long_term_situation",
              "adaptation_principles",
            ],
            properties: {
              identity: { type: "string", minLength: 1 },
              activity_area: { type: "string", minLength: 1 },
              faction: { type: "string", minLength: 1 },
              relationship_origin: { type: "string", minLength: 1 },
              relationship_pattern: { type: "string", minLength: 1 },
              character_to_user: { type: "string", minLength: 1 },
              user_to_character: { type: "string", minLength: 1 },
              long_term_situation: { type: "string", minLength: 1 },
              adaptation_principles: {
                type: "array",
                minItems: 2,
                items: { type: "string", minLength: 1 },
              },
            },
          },
        },
        c = [
          ["identity", "identity", "Định vị thân phận dài hạn"],
          ["activityArea", "activity_area", "Khu vực hoạt động thường xuyên"],
          ["faction", "faction", "Thế lực trực thuộc dài hạn"],
          ["relationshipOrigin", "relationship_origin", "Nguồn gốc mối quan hệ với nhân vật chính"],
          ["relationshipPattern", "relationship_pattern", "Mô hình chung sống dài hạn"],
          ["characterToUser", "character_to_user", "Nhân vật xưng hô <user>"],
          ["userToCharacter", "user_to_character", "<user> xưng hô nhân vật"],
          ["longTermSituation", "long_term_situation", "Hoàn cảnh sống dài hạn"],
        ],
        l = (e) =>
          e?.character && "object" == typeof e.character
            ? e.character
            : Array.isArray(e?.characters) && e.characters[0]
              ? e.characters[0]
              : e || {},
        p = (e) => {
          const t = c
            .filter(
              ([t, r]) =>
                !String(a[t] || "").trim() && !String(e?.[r] || "").trim(),
            )
            .map(([, , e]) => e);
          return (
            !a.adaptationPrinciples.length &&
              (e?.adaptation_principles || []).filter((e) => String(e).trim())
                .length < 2 &&
              t.push("Nguyên tắc thích ứng thiết lập nhân vật"),
            t
          );
        };
      let d,
        g = [];
      for (let e = 0; e < 2; e++) {
        const t = e
          ? `\n\nLần xuất trước vẫn thiếu: ${g.join("、")}. Vui lòng trả về lại một đối tượng JSON hoàn chỉnh không có tên, không có bọc bên ngoài.`
          : "";
        if (((d = l(await $e(i, `${o}${t}`, s))), (g = p(d)), !g.length)) break;
      }
      if (g.length) throw new Error(`${e.name} vẫn chưa hoàn chỉnh: ${g.join("、")}`);
      const u = (e, t) => {
        String(a[e] || "").trim() || (a[e] = String(t || "").trim());
      };
      for (const [e, t] of c) u(e, d[t]);
      (a.adaptationPrinciples.length ||
        (a.adaptationPrinciples = (d.adaptation_principles || [])
          .map((e) => String(e).trim())
          .filter(Boolean)),
        r.push(e.name),
        re(),
        Q());
    }
    return r;
  }
  async function ke() {
    I.opening.targetWords = Math.min(
      5e3,
      Math.max(300, Number(I.opening.targetWords) || 1200),
    );
    const e = pe(),
      t = e.filter((e) => I.characters[e.name].scene),
      r = e.filter((e) => I.characters[e.name].known),
      a = await ie(t);
    if (a.length > 42e3)
      throw new Error(
        `Thiết lập hoàn chỉnh của nhân vật tại hiện trường tổng cộng ${a.length} ký tự, đã vượt quá ngân sách tạo ổn định. Vui lòng giảm nhân vật tại hiện trường lúc mở màn; các nhân vật không có mặt vẫn sẽ được giữ lại trong nhân vật khái lãm.`,
      );
    const i = Math.max(0, 42e3 - a.length),
      o = await (async function (e = 24e3) {
        if (e <= 0) return "";
        const t = (I.opening.referenceEntries || []).reduce(
            (e, t) => ((e[t.worldbook] ||= []).push(t), e),
            {},
          ),
          r = [];
        for (const [e, a] of Object.entries(t)) {
          await ae(e);
          const t = new Set(a.map((e) => e.name));
          for (const a of K[e] || [])
            t.has(a.name) &&
              a.content &&
              r.push(`[${e} / ${a.name}]\n${a.content}`);
        }
        const a = r.join("\n\n"),
          n = Math.min(24e3, e);
        return a.length > n
          ? `${a.slice(0, n)}\n\n[Nội dung tham khảo đã bị cắt bớt theo ngân sách ngữ cảnh lần này là ${n} ký tự]`
          : a;
      })(i),
      l = de().filter((e) => t.some((t) => t.name === e.character)),
      p = `DLC：${I.title}\nTên mở màn：${I.opening.name}\nHồ sơ thân phận dài hạn của <user>：\n${ge()}\nÝ tưởng mở màn một câu：${I.opening.hook || "Vui lòng thiết kế một phần giới thiệu cụ thể và cấp bách dựa trên thân phận"}\nMục tiêu số từ của chính văn mở màn：Khoảng ${I.opening.targetWords} từ, cho phép dao động lên xuống 15%\nCác nhân vật được đưa vào DLC：${e.map((e) => e.name).join("、") || "Không"}\nĐã quen biết trước khi mở màn：${r.map((e) => `${e.name}（${I.characters[e.name].relation || "Quen biết"}）`).join("、") || "Không"}\nCho phép xuất hiện tại hiện trường lúc mở màn：${t.map((e) => e.name).join("、") || "Không có nhân vật hiện tại, mở màn chỉ viết <user> và người qua đường dùng một lần cần thiết"}\nCác mối quan hệ nhân vật không thể viết lại：${we(e)}\nĐịnh vị dài hạn của nhân vật tại hiện trường：${JSON.stringify(l, null, 2)}${a ? `\n\n<Thiết lập nhân vật ban đầu tại hiện trường>\n${a}\n</Thiết lập nhân vật ban đầu tại hiện trường>` : ""}${o ? `\n\n<Thế Giới Thư tham khảo>\n${o}\n</Thế Giới Thư tham khảo>` : ""}\n\nBây giờ trực tiếp viết chính văn mở màn.`;
    ((I.opening.body = await (async function (e, t, r) {
      const a = S("generateRaw"),
        i = S("generate");
      if ("function" != typeof a && "function" != typeof i)
        throw new Error("Không tìm thấy giao diện tạo AI của Tavern.");
      const o = Math.min(
          14e3,
          Math.max(2048, Math.ceil(1.8 * Number(r) + 800)),
        ),
        l = xe();
      let p;
      l && (l.max_tokens = Math.max(Number(l.max_tokens) || 0, o));
      for (let d = 0; d < 3; d++)
        try {
          const n = `${t}${d ? `\n\nĐây là lần thử thứ ${d + 1}. Lần trước chưa nhận được chính văn hoàn chỉnh; vui lòng bắt đầu trực tiếp từ đoạn tự sự đầu tiên, chỉ xuất ra chính văn, không giải thích, tiêu đề, JSON hay khối mã.` : ""}`,
            s = ve(
              "function" == typeof a
                ? await a({
                    should_silence: !0,
                    max_tokens: o,
                    ordered_prompts: [
                      { role: "system", content: e },
                      { role: "user", content: n },
                    ],
                    ...(l ? { custom_api: l } : {}),
                  })
                : await i({
                    should_silence: !0,
                    user_input: `${e}\n\n${n}`,
                    ...(l ? { custom_api: l } : {}),
                  }),
            ),
            c = Math.min(300, Math.max(80, Math.round(0.18 * Number(r))));
          if (s.length < c)
            throw new Error(`AI chỉ trả về ${s.length} ký tự, chưa hình thành màn mở đầu hoàn chỉnh.`);
          return A(s);
        } catch (e) {
          if (((p = s(e, { provider: n(l) ? "DeepSeek" : "Giao diện AI" })), !c(e)))
            break;
        }
      throw p || new Error("AI không tạo ra chính văn mở màn.");
    })(
      "Bạn là trợ lý sáng tác phần mở đầu của 《Tàn Minh Dư Tẫn》. Thời đại được cố định nghiêm ngặt vào Sùng Trinh năm thứ bảy tháng bảy. Thiết lập nhân vật ban đầu của các nhân vật tại hiện trường là ràng buộc cứng, định vị nhân vật dài hạn chỉ có thể thay đổi thân phận và bối cảnh mối quan hệ của họ, không thể thay đổi cốt lõi nhân cách. Chỉ những 'nhân vật tại hiện trường lúc mở màn' mới có thể thực sự xuất hiện; không được nhồi nhét các nhân vật khác vào Màn 1 chỉ để hiển thị danh sách. Mở màn chỉ là phần giới thiệu câu chuyện, không cần để tất cả nhân vật tại hiện trường lần lượt lên tiếng. Khi liên quan đến người chơi, tất cả đều viết là <user>, không được viết user hoặc {{user}}. Trực tiếp xuất ra chính văn tiếng Việt để Tavern sử dụng, không xuất ra tiêu đề, giải thích, JSON, khối mã Markdown, <initvar> hoặc bất kỳ thẻ khởi tạo nào khác.",
      p,
      I.opening.targetWords,
    )),
      (I.summary = String(
        I.opening.hook ||
          I.summary ||
          I.opening.body.replace(/\s+/g, " ").slice(0, 120),
      ).trim()),
      re(),
      Q());
  }
  function Se(e, t = Object.keys(e)) {
    return {
      type: "object",
      additionalProperties: !1,
      required: t,
      properties: e,
    };
  }
  function _e(e, t, r) {
    return Math.min(r, Math.max(t, Number(e) || 0));
  }
  async function je() {
    if (!I.opening.body.trim()) throw new Error("Vui lòng tạo hoặc điền chính văn mở màn trước.");
    const e = pe().map((e) => ({
        name: e.name,
        known_before_opening: I.characters[e.name].known,
        present_in_opening: I.characters[e.name].scene,
        category: I.characters[e.name].category,
        identity: I.characters[e.name].identity || e.summary,
        relation: I.characters[e.name].relation,
        initial_favor: Number(I.characters[e.name].affection) || 0,
        initial_loyalty: Number(I.characters[e.name].loyalty) || 50,
      })),
      t = `<user>: ${I.protagonist.identity}; Nghề nghiệp: ${I.protagonist.occupation || "Chưa xác định"}; Thế lực: ${I.protagonist.faction || "Không"}\nĐịa điểm mở màn: ${I.protagonist.location}\nẢnh chụp nhanh nhân vật: ${JSON.stringify(e, null, 2)}\n\n<Chính văn mở màn cuối cùng>\n${A(me(I.opening.body))}\n</Chính văn mở màn cuối cùng>\n\nMảng rỗng cho biết sự thật của loại này không tồn tại. Các nhân vật tại hiện trường thực sự gặp gỡ trong lúc mở màn nên được viết vào relationships; các nhân vật không xuất hiện và không quen biết trước khi mở màn không được viết vào. Độ hảo cảm ban đầu và sự trung thành trong ảnh chụp nhanh nhân vật là ràng buộc cứng, không được viết lại.`,
      r = await $e(
        "Bạn phụ trách trích xuất sự kiện khởi tạo từ phần mở màn cuối cùng của 《Tàn Minh Dư Tẫn》. Chỉ có thể trích xuất các sự kiện được chính văn và cấu hình người chơi hỗ trợ rõ ràng, không được bịa đặt quân đội, tài sản, khoa kỹ, thế lực hoặc vật phẩm để lấp đầy các biến. Không được xuất ra Thiên hạ bản đồ, ngày tháng, địa điểm, ngũ duy của nhân vật chính hoặc kim ngân đồng; những thứ này do khuôn mẫu cố định tạo ra. Khi liên quan đến người chơi, tất cả đều viết là <user>. Chỉ xuất ra JSON hợp lệ, không được xuất ra <initvar>, các thẻ khởi tạo khác, Markdown hoặc giải thích. Thẻ <initvar> cuối cùng sẽ do chương trình thống nhất tạo ra.",
        t,
        (function () {
          const e = { type: "string" },
            t = { type: "number" },
            r = (e) => ({ type: "array", items: e });
          return {
            name: "canming_initial_facts_v1",
            value: {
              type: "object",
              additionalProperties: !1,
              required: [
                "important_items",
                "forces",
                "commanders",
                "assets",
                "storage",
                "technologies",
                "relationships",
                "factions",
                "tasks",
                "events",
              ],
              properties: {
                important_items: r(
                  Se({ name: e, description: e, quantity: t }),
                ),
                forces: r(
                  Se({
                    name: e,
                    troop_type: e,
                    people: t,
                    morale: t,
                    training: t,
                    logistics: t,
                    equipment: {
                      type: "string",
                      enum: ["Tàn phá", "Giản lậu", "Phổ thông", "Tinh lương", "Tinh nhuệ"],
                    },
                    level: {
                      type: "string",
                      enum: ["Ô hợp", "Tân mộ", "Khả dụng", "Lương hảo", "Tinh nhuệ", "Danh quân"],
                    },
                    commander: e,
                    station: e,
                  }),
                ),
                commanders: r(
                  Se({
                    name: e,
                    command: t,
                    martial: t,
                    wisdom: t,
                    politics: t,
                    prestige: t,
                  }),
                ),
                assets: r(Se({ name: e, description: e, monthly_income: t })),
                storage: r(Se({ name: e, quantity: t, unit: e })),
                technologies: r(
                  Se({
                    name: e,
                    progress: {
                      type: "string",
                      enum: ["Chưa bắt đầu", "Đang thử nghiệm", "Thí điểm quy mô nhỏ", "Đã phổ biến"],
                    },
                    effect: e,
                    description: e,
                  }),
                ),
                relationships: r(
                  Se({
                    name: e,
                    category: { type: "string", enum: v },
                    identity: e,
                    favor: t,
                    loyalty: t,
                    hatred: t,
                    inner_voice: e,
                    present: { type: "boolean" },
                    private_relation: { type: "string", enum: w },
                  }),
                ),
                factions: r(
                  Se({
                    name: e,
                    favor: t,
                    status: e,
                    description: e,
                    financial_state: {
                      type: "string",
                      enum: ["Chưa rõ", "Sụp đổ", "Túng quẫn", "Bình ổn", "Phú túc", "Hùng hậu"],
                    },
                    main_income: e,
                    main_expense: e,
                    grain_quantity: t,
                    grain_unit: e,
                    grain_state: {
                      type: "string",
                      enum: ["Chưa rõ", "Cạn kiệt", "Khan hiếm", "Tạm ổn", "Sung túc"],
                    },
                    total_troops: t,
                    main_troop_type: e,
                    military_description: e,
                  }),
                ),
                tasks: r(Se({ name: e, type: e, description: e, progress: e })),
                events: r(
                  Se({
                    name: e,
                    date: e,
                    location: e,
                    type: {
                      type: "string",
                      enum: [
                        "Quân chính",
                        "Kinh tế",
                        "Nhân sự",
                        "Ngoại giao",
                        "Chiến dịch",
                        "Kiến thiết",
                        "Kỹ thuật",
                        "Gia tộc",
                      ],
                    },
                    event: e,
                    impact: e,
                  }),
                ),
              },
            },
          };
        })(),
      );
    ((I.initialization.patch = (function (e) {
      const t = {
          "Nhân vật chính": { "Tư khố": { "Vật phẩm quan trọng": {} } },
          "Mạng lưới quan hệ": {},
          "Quân sự": { "Các doanh": {}, "Tướng lĩnh": {} },
          "Kinh tế": { "Tài sản": {}, "Thương trữ": {} },
          "Khoa kỹ": {},
          "Cá nhân sử ký": { "Đại sự ký": {} },
          "Thời cục và nhiệm vụ": { "Quan hệ thế lực": {}, "Nhiệm vụ hiện tại": {} },
        },
        r = (e, t) => {
          const r = new Set();
          for (const a of e || []) {
            if (
              ((a.name = String(a.name || "").trim()), !a.name || r.has(a.name))
            )
              throw new Error(`${t} tồn tại tên trống hoặc tên trùng lặp.`);
            r.add(a.name);
          }
          return e || [];
        };
      for (const a of r(e.important_items, "Vật phẩm quan trọng"))
        t["Nhân vật chính"]["Tư khố"]["Vật phẩm quan trọng"][a.name] = {
          "Giới thiệu": a.description,
          "Số lượng": Math.max(1, Math.round(a.quantity)),
        };
      for (const a of r(e.forces, "Quân đội"))
        t["Quân sự"]["Các doanh"][a.name] = {
          "Binh chủng": a.troop_type,
          "Nhân số": Math.max(0, Math.round(a.people)),
          "Sĩ khí": _e(a.morale, 0, 100),
          "Huấn luyện": _e(a.training, 0, 100),
          "Hậu cần": _e(a.logistics, 0, 100),
          "Trang bị": a.equipment,
          "Đẳng cấp": a.level,
          "Tướng lĩnh": a.commander,
          "Trú địa": a.station,
        };
      for (const a of r(e.commanders, "Tướng lĩnh"))
        t["Quân sự"]["Tướng lĩnh"][a.name] = {
          "Thống suất": _e(a.command, 0, 100),
          "Võ lực": _e(a.martial, 0, 100),
          "Trí mưu": _e(a.wisdom, 0, 100),
          "Chính trị": _e(a.politics, 0, 100),
          "Uy vọng": _e(a.prestige, 0, 100),
        };
      for (const a of r(e.assets, "Tài sản"))
        t["Kinh tế"]["Tài sản"][a.name] = {
          "Thuyết minh": a.description,
          "Nguyệt nhập": Number(a.monthly_income) || 0,
        };
      for (const a of r(e.storage, "Thương trữ"))
        t["Kinh tế"]["Thương trữ"][a.name] = { "Số lượng": Number(a.quantity) || 0, "Đơn vị": a.unit };
      for (const a of r(e.technologies, "Khoa kỹ"))
        t["Khoa kỹ"][a.name] = {
          "Tiến độ": a.progress,
          "Hiệu quả": a.effect,
          "Miêu tả": a.description,
        };
      for (const a of r(e.relationships, "Quan hệ nhân vật")) {
        const e = I.characters[a.name];
        e?.included && (a.category = e.category);
        const r = e?.included ? Number(e.affection) || 0 : a.favor,
          n = e?.included ? Number(e.loyalty) || 50 : a.loyalty,
          i = {
            "Thân phận": A(a.identity),
            "Tiếng lòng nhân vật": A(a.inner_voice),
            "Có mặt hay không": e?.included ? Boolean(e.scene) : Boolean(a.present),
          };
        ((t["Mạng lưới quan hệ"][a.category] ||= {}),
          "Cừu địch" === a.category
            ? (t["Mạng lưới quan hệ"][a.category][a.name] = {
                ...i,
                "Cừu hận độ": _e(e?.included ? -e.affection : a.hatred, 0, 100),
              })
            : "Hạ thuộc và mạc liêu" === a.category
              ? (t["Mạng lưới quan hệ"][a.category][a.name] = {
                  ...i,
                  "Hảo cảm độ": _e(r, -100, 100),
                  "Trung tâm": _e(n, 0, 100),
                })
              : "Tư duy" === a.category
                ? (t["Mạng lưới quan hệ"][a.category][a.name] = {
                    ...i,
                    "Quan hệ": e?.included ? e.privateRelation : a.private_relation,
                    "Hảo cảm độ": _e(r, -100, 100),
                    "Trung tâm": _e(n, 0, 100),
                    "Sinh dục": {},
                  })
                : (t["Mạng lưới quan hệ"][a.category][a.name] = {
                    ...i,
                    "Hảo cảm độ": _e(r, -100, 100),
                  }));
      }
      for (const a of r(e.factions, "Thế lực"))
        t["Thời cục và nhiệm vụ"]["Quan hệ thế lực"][a.name] = {
          "Hảo cảm độ": _e(a.favor, -100, 100),
          "Trạng thái": a.status,
          "Miêu tả": a.description,
          "Kinh tế": {
            "Tình trạng tài chính": a.financial_state,
            "Thu nhập chủ yếu": a.main_income,
            "Chi tiêu chủ yếu": a.main_expense,
            "Lương thảo": {
              "Số lượng": Number(a.grain_quantity) || 0,
              "Đơn vị": a.grain_unit,
              "Trạng thái": a.grain_state,
            },
            "Miêu tả": a.description,
          },
          "Quân sự": {
            "Tổng binh lực": Math.max(0, Math.round(a.total_troops)),
            "Binh chủng chủ lực": a.main_troop_type,
            "Miêu tả": a.military_description,
            "Tướng lĩnh hạ thuộc": {},
            "Quân đội": {},
          },
        };
      for (const a of r(e.tasks, "Nhiệm vụ"))
        t["Thời cục và nhiệm vụ"]["Nhiệm vụ hiện tại"][a.name] = {
          "Loại hình": a.type,
          "Thuyết minh": a.description,
          "Tiến độ": a.progress,
        };
      for (const a of r(e.events, "Đại sự ký"))
        t["Cá nhân sử ký"]["Đại sự ký"][a.name] = {
          "Ngày tháng": a.date,
          "Địa điểm": a.location,
          "Loại hình": a.type,
          "Sự tích": a.event,
          "Ảnh hưởng": a.impact,
        };
      return t;
    })(r)),
      (I.initialization.summary = `Nhân vật ${(r.relationships || []).length} · Vật phẩm ${(r.important_items || []).length} · Quân đội ${(r.forces || []).length} · Tài sản ${(r.assets || []).length} · Nhiệm vụ ${(r.tasks || []).length}`),
      (I.initialization.stale = !1),
      (I.initialization.generatedAt = new Date().toISOString()),
      ce(),
      Q());
  }
  function Ee(e, t, r = "application/json") {
    const a = new Blob([e], { type: r }),
      n = URL.createObjectURL(a),
      i = q.createElement("a");
    ((i.href = n),
      (i.download = t),
      q.body.appendChild(i),
      i.click(),
      i.remove(),
      setTimeout(() => URL.revokeObjectURL(n), 1e3));
  }
  function Ae(e, t, r, a = "", n = "text") {
    return `<label class="sg-field"><span>${j(e)}</span><input type="${n}" data-bind="${j(t)}" value="${j(r)}" placeholder="${j(a)}"></label>`;
  }
  function Ce(e, t, r, a = "") {
    return `<label class="sg-field full"><span>${j(e)}</span><textarea data-bind="${j(t)}" placeholder="${j(a)}">${j(r)}</textarea></label>`;
  }
  function Ne(e, t, r, a = "") {
    return `<label class="sg-field"><span>${j(e)}</span><textarea data-bind="${j(t)}" placeholder="${j(a)}">${j(r)}</textarea></label>`;
  }
  function Te(e, t, r = "Chưa điền") {
    return `<div><dt>${j(e)}</dt><dd data-identity-preview="${j(t)}">${j(I.protagonist[t] || r)}</dd></div>`;
  }
  function qe() {
    const e = I.protagonist;
    return `<section class="sg-page"><p class="sg-kicker">STEP ONE · YOUR PLACE IN HISTORY</p><h1>Trả lời trước: Bạn là ai?</h1><p class="sg-lead">Ở đây chỉ xác định thân phận dài hạn và điểm xuất phát. Xung đột cụ thể, mục tiêu và lời dẫn truyện được đặt chung ở bước thứ 3, tránh điền lặp lại.</p><div class="sg-era ${M ? "bad" : ""}"><b>Điểm neo thời đại: Sùng Trinh năm thứ bảy tháng bảy</b><br><span>${M ? j(M) : `Đã tải ảnh chụp Thiên hạ bản đồ chính thức · ${Object.keys(L?.["Biến lượng"]?.["Thiên hạ bản đồ"]?.["Thái thế khu vực"] || {}).length} khu vực`}</span></div><section class="sg-identity-ai"><div class="sg-identity-ai-head"><span><b>Dùng một đoạn văn mô tả thân phận muốn chơi</b><small>Không cần hiểu rõ quan chế nhà Minh, chỉ cần viết rõ thân phận, khu vực và hướng trải nghiệm mong muốn là được.</small></span></div><textarea data-bind="protagonist.description" placeholder="Ví dụ: Tôi muốn vào vai một tiểu quân quan xuất thân từ lính thất trận Liêu Đông, hiểu biết về hỏa khí và đắp thành, ở biên bảo Đại Đồng có mấy chục cựu bộ hạ nguyện ý đi theo, nhưng không có chỗ dựa chính thức.">${j(e.description)}</textarea><div class="sg-identity-ai-actions"><small>AI chỉ điền các mục trống; nội dung đã điền tay sẽ được giữ làm ràng buộc cứng, tiêu đề mặc định và "Nhân vật gốc" có thể điều chỉnh theo mô tả.</small><button type="button" class="sg-btn primary" data-action="ai-protagonist" ${B ? "disabled" : ""}>${B && "protagonist" === G ? "Đang thiết lập thân phận…" : "AI điền bảng với 1 nút"}</button></div></section><div class="sg-grid">${Ae("Tên DLC", "title", I.title, "Ví dụ: Đại Đồng cô bảo")}${Ae("Lai lịch", "protagonist.origin", e.origin, "Nhân vật gốc / Người xuyên không")}${Ae("Thân phận công khai", "protagonist.identity", e.identity, "Ví dụ: Đại Đồng trấn quân hộ")}${Ae("Nghề nghiệp hoặc chức quan", "protagonist.occupation", e.occupation, "Ví dụ: Biên bảo tiểu kỳ")}${Ae("Địa điểm khai cục", "protagonist.location", e.location, "Ví dụ: Một biên bảo ở Sơn Tây Đại Đồng phủ")}${Ae("Thế lực trực thuộc dài hạn", "protagonist.faction", e.faction, "Không có thế lực cố định có thể để trống")}${Ae("Khí chất câu chuyện", "protagonist.tone", e.tone)}</div><details class="sg-detail sg-profile-detail" open><summary>Hồ sơ thân phận dài hạn</summary><div class="sg-grid">${Ne("Thân phận và địa vị xã hội", "protagonist.socialStanding", e.socialStanding, "Thân phận có ý nghĩa gì trong quan phủ, quân đội, tông tộc hoặc xã hội địa phương.")}${Ne("Xuất thân và bối cảnh gia đình", "protagonist.familyBackground", e.familyBackground, "Nguồn gốc gia đình, tình hình tông tộc và bối cảnh thân tộc ổn định.")}${Ne("Trải nghiệm then chốt trước khi hình thành thân phận", "protagonist.pastExperience", e.pastExperience, "Chỉ viết kinh nghiệm quá khứ định hình thân phận, không viết hiện trường khai cục.")}${Ne("Năng lực và kiến thức ổn định", "protagonist.strengths", e.strengths, "Kỹ năng, học thức sẵn có dài hạn và khuyết điểm rõ ràng.")}${Ne("Tài nguyên có thể chi phối hoặc điều động dài hạn", "protagonist.resources", e.resources, "Nhân thủ, sản nghiệp, bằng chứng hoặc vật tư có thể dựa vào lâu dài, không viết chiến lợi phẩm tạm thời.")}${Ne("Mong muốn dài hạn", "protagonist.longTermPursuit", e.longTermPursuit, "Hướng đi vẫn thành lập xuyên suốt nhiều đoạn cốt truyện, không phải nhiệm vụ mở đầu.")}${Ne("Ranh giới và giới hạn thân phận", "protagonist.identityBoundaries", e.identityBoundaries, "Ranh giới thực tế rõ ràng về quyền lực, kiến thức, tài phú và nhân mạch.")}</div></details><section class="sg-identity-record" aria-label="Xem trước mục Thế Giới Thư thân phận người chơi"><div class="sg-identity-record-head"><span><b>&lt;user&gt; Mục thân phận</b><small>Sau khi cài đặt DLC sẽ được viết dưới dạng mục Thế Giới Thư thường trú, cung cấp cho AI nhận dạng dài hạn điểm xuất phát thân phận người chơi.</small></span><code class="sg-entry-name">${j(u)}</code></div><dl>${Te("Lai lịch", "origin")}${Te("Thân phận công khai", "identity")}${Te("Nghề nghiệp hoặc chức quan", "occupation", "Không có nghề nghiệp cố định")}${Te("Địa điểm khai cục", "location")}${Te("Thế lực trực thuộc", "faction", "Không có thế lực cố định")}${Te("Thân phận và địa vị", "socialStanding")}${Te("Xuất thân gia đình", "familyBackground")}${Te("Kinh nghiệm quá khứ", "pastExperience")}${Te("Năng lực kiến thức", "strengths")}${Te("Tài nguyên dài hạn", "resources")}${Te("Mong muốn dài hạn", "longTermPursuit")}${Te("Ranh giới thân phận", "identityBoundaries")}</dl><p class="sg-identity-note">Ở đây chỉ bảo tồn bối cảnh thân phận ổn định; địa điểm, chức vụ, tài nguyên, mục tiêu và hoàn cảnh hiện tại sau khi khai cục lấy văn bản và biến làm chuẩn.</p></section><details class="sg-detail"><summary>Ngày tháng và chỉ số cơ bản (Tùy chọn)</summary><div class="sg-grid" style="margin-top:12px">${Ae("Ngày tháng bảy", "date.day", I.date.day, "Mùng năm")}${Ae("Thời tiết", "date.weather", I.date.weather)}${Ae("Giờ", "date.hour", I.date.hour, "", "number")}${Ae("Phút", "date.minute", I.date.minute, "", "number")}${Ae("Sinh mệnh", "stats.life", I.stats.life, "", "number")}${Ae("Võ lực", "stats.martial", I.stats.martial, "", "number")}${Ae("Thống suất", "stats.command", I.stats.command, "", "number")}${Ae("Trí mưu", "stats.wisdom", I.stats.wisdom, "", "number")}${Ae("Chính trị", "stats.politics", I.stats.politics, "", "number")}${Ae("Bạc khởi đầu", "stats.silver", I.stats.silver, "", "number")}</div></details></section>`;
  }
  function Pe() {
    const e = {
      origin: "Chưa điền",
      identity: "Chưa điền",
      occupation: "Không có nghề nghiệp cố định",
      location: "Chưa điền",
      faction: "Không có thế lực cố định",
      socialStanding: "Chưa điền",
      familyBackground: "Chưa điền",
      pastExperience: "Chưa điền",
      strengths: "Chưa điền",
      resources: "Chưa điền",
      longTermPursuit: "Chưa điền",
      identityBoundaries: "Chưa điền",
    };
    for (const [t, r] of Object.entries(e)) {
      const e = O?.querySelector(`[data-identity-preview="${t}"]`);
      e && (e.textContent = I.protagonist[t] || r);
    }
  }
  function Oe(e) {
    return "history" === e.lock
      ? "Lịch sử"
      : "family" === e.lock
        ? "Gia tộc"
        : "official" === e.source
          ? "Nguyên tác"
          : "Mở rộng";
  }
  function Ie(e) {
    const t = I.characters[e.name];
    return `<button type="button" class="sg-catalog-row ${t.included ? "on" : ""}" data-action="toggle-character" data-character-catalog data-character-name="${j(e.name)}" data-character-kind="${(function (
      e,
    ) {
      return "history" === e.lock
        ? "history"
        : "family" === e.lock
          ? "family"
          : "free";
    })(
      e,
    )}" data-character-search="${j(`${e.name} ${e.summary}`.toLowerCase())}" aria-pressed="${t.included}"><span class="sg-pick-box">✓</span><span class="sg-catalog-copy"><b>${j(e.name)}</b><small>${j(e.summary)}</small></span><span class="sg-kind">${Oe(e)}</span></button>`;
  }
  function Le(e) {
    return `<button type="button" class="sg-selected-chip" data-action="jump-character" data-character-name="${j(e.name)}">${j(e.name)}</button>`;
  }
  function Me(e) {
    const t = I.characters[e.name],
      r = "history" === e.lock,
      a = H.has(e.name),
      n = t.identity || e.summary,
      i = r
        ? "Lịch sử thân phận và quỹ đạo hoạt động đã khóa"
        : t.activityArea || I.protagonist.location || "Chưa thiết lập phạm vi hoạt động",
      o = `<div class="sg-grid">${Ae("Quan hệ với <user>", `characters.${e.name}.relation`, t.relation, "Ví dụ: cố hữu / Thượng tư / Chưa từng quen biết")}<label class="sg-field"><span>Phân loại nhân tế (chỉ sử dụng khi đã quen biết)</span><select data-bind="characters.${j(e.name)}.category">${v.map((e) => `<option ${e === t.category ? "selected" : ""}>${e}</option>`).join("")}</select></label><label class="sg-field"><span>Quan hệ tư duy (chỉ sử dụng khi được phân loại là tư duy)</span><select data-bind="characters.${j(e.name)}.privateRelation">${w.map((e) => `<option ${e === t.privateRelation ? "selected" : ""}>${e}</option>`).join("")}</select></label></div>`,
      s = r
        ? '<div class="sg-era"><b>Khóa thân phận nhân vật lịch sử</b><br>Có thể điều chỉnh quan hệ với &lt;user&gt;, nhưng sẽ không viết lại thân phận lịch sử, quỹ đạo hoạt động hay thiết lập nhân vật ban đầu.</div>'
        : `<div class="sg-long-term"><div class="sg-long-term-head"><span><b>Định vị nhân vật dài hạn</b><small>Có hiệu lực liên tục suốt toàn bộ cốt truyện, không điền mục tiêu hiện tại, thái độ tức thời hoặc vị trí mở đầu.</small></span></div><div class="sg-adaptation-seed">${Ae("Thiết tưởng nhân vật bằng một câu (giao cho AI triển khai)", `characters.${e.name}.adaptationBrief`, t.adaptationBrief, "Ví dụ: Để cô ấy trở thành cố tri cùng <user> qua lại biên trấn, phụ trách kinh doanh thương lộ")}</div><div class="sg-grid">${Ae("Thân phận", `characters.${e.name}.identity`, t.identity, e.summary)}${Ae("Khu vực hoạt động thông thường", `characters.${e.name}.activityArea`, t.activityArea, "Ví dụ: Qua lại thành Nam Kinh và thương lộ Trường Giang")}${Ae("Thế lực trực thuộc", `characters.${e.name}.faction`, t.faction, "Ví dụ: Gia đình Tô Vãn Đường; nếu không có do AI điền \"Không có thế lực cố định\"")}${Ae("Nhân vật xưng hô <user>", `characters.${e.name}.characterToUser`, t.characterToUser, "Xưng hô theo thân phận và giai đoạn quan hệ")}${Ae("<user> Xưng hô nhân vật", `characters.${e.name}.userToCharacter`, t.userToCharacter, e.name)}${Ce("Quá khứ với <user>", `characters.${e.name}.relationshipOrigin`, t.relationshipOrigin, "Hai bên vì sao quen biết hoặc vì sao chưa quen biết")}${Ce("Phương thức chung đụng", `characters.${e.name}.relationshipPattern`, t.relationshipPattern, "Quan hệ tín nhiệm, phòng bị và lợi ích phát triển dài hạn ra sao")}${Ce("Hoàn cảnh sinh hoạt dài hạn", `characters.${e.name}.longTermSituation`, t.longTermSituation, "Mô tả bối cảnh sinh hoạt dài hạn, không viết đang làm gì ở một thời khắc nào đó")}${(function (
            e,
            t,
            r,
            a = "",
          ) {
            return `<label class="sg-field full"><span>${j(e)}</span><textarea data-list-bind="${j(t)}" placeholder="${j(a)}">${j((r || []).join("\n"))}</textarea></label>`;
          })(
            "Yếu điểm diễn dịch (mỗi dòng một mục)",
            `characters.${e.name}.adaptationPrinciples`,
            t.adaptationPrinciples,
            "Bảo lưu trải nghiệm, hành vi và quan hệ không thể đánh mất trong thiết lập nhân vật gốc",
          )}</div></div>`;
    return `<article class="sg-config-card ${a ? "expanded" : ""}" data-character-config="${j(e.name)}"><div class="sg-config-head"><button type="button" class="sg-config-main" data-action="toggle-character-editor" data-character-name="${j(e.name)}" aria-expanded="${a}"><span class="sg-config-chevron">›</span><span><span class="sg-config-name"><b>${j(e.name)}</b><span class="sg-kind">${Oe(e)}</span></span><span class="sg-config-summary">${j(n)} · ${j(i)} · ${j(t.relation || "Chưa từng quen biết")}</span></span></button><div class="sg-config-actions">${r ? "" : `<button type="button" class="sg-mini-btn accent" data-action="ai-character" data-character-name="${j(e.name)}">AI bổ sung</button>`}<button type="button" class="sg-mini-btn" data-action="remove-character" data-character-name="${j(e.name)}">Xóa bỏ</button></div></div><div class="sg-quick-area"><div class="sg-quick-label"><b>Ảnh chụp nhanh khai cục</b><span>Chỉ ghi vào biến khởi tạo, sẽ không cố định vào thiết lập nhân vật dài hạn</span></div><div class="sg-quick-switches"><label class="sg-choice"><input type="checkbox" data-character-toggle="known" data-character-name="${j(e.name)}" ${t.known ? "checked" : ""}><i class="sg-choice-box">✓</i><span class="sg-choice-copy"><b>Trước khi mở đầu đã quen biết</b><small>Ghi vào quan hệ nhân tế khởi tạo</small></span></label><label class="sg-choice"><input type="checkbox" data-character-toggle="scene" data-character-name="${j(e.name)}" ${t.scene ? "checked" : ""}><i class="sg-choice-box">✓</i><span class="sg-choice-copy"><b>Xuất hiện trong màn đầu tiên</b><small>Tự động đọc thiết lập nhân vật hoàn chỉnh tham gia mở đầu</small></span></label><label class="sg-affection-quick"><span>Hảo cảm độ khởi đầu</span><input type="number" min="-100" max="100" step="1" data-bind="characters.${j(e.name)}.affection" value="${j(t.affection)}"><small>-100 ～ 100</small></label></div></div><div class="sg-config-body" ${a ? "" : "hidden"}>${o}${s}<p class="sg-config-note">Đưa vào DLC chỉ biểu thị AI biết người này tồn tại; chỉ có nhân vật "Xuất hiện trong màn đầu tiên" mới được tự động đọc thiết lập hoàn chỉnh và cho phép thực tế lên sân khấu.</p></div></article>`;
  }
  function Be() {
    const e = pe().length,
      t = O?.querySelector("[data-selected-count]");
    t && (t.textContent = `Nhân vật đã chọn · ${e} người`);
  }
  function We(e) {
    const t = y.find((t) => t.name === e),
      r = O?.querySelector(`[data-character-config="${CSS.escape(e)}"]`);
    t && r && (r.outerHTML = Me(t));
  }
  function Re(e, t) {
    const r = y.find((t) => t.name === e),
      a = I.characters[e];
    r &&
      a &&
      a.included !== t &&
      ((a.included = t),
      t
        ? (H.add(e),
          (function (e) {
            const t = O?.querySelector("[data-selected-chips]");
            t &&
              (t.querySelector(".sg-selected-empty")?.remove(),
              t.insertAdjacentHTML("beforeend", Le(e)));
            const r = O?.querySelector("[data-config-container]");
            if (!r) return;
            r.querySelector(".sg-config-empty")?.remove();
            let a = r.querySelector(".sg-config-list");
            (a ||
              ((r.innerHTML = '<div class="sg-config-list"></div>'),
              (a = r.querySelector(".sg-config-list"))),
              a.insertAdjacentHTML("beforeend", Me(e)),
              Be());
          })(r))
        : ((a.known = !1),
          (a.scene = !1),
          H.delete(e),
          (function (e) {
            O?.querySelector(
              `[data-character-config="${CSS.escape(e)}"]`,
            )?.remove();
            const t = [
              ...(O?.querySelectorAll(
                "[data-selected-chips] [data-character-name]",
              ) || []),
            ].find((t) => t.dataset.characterName === e);
            t?.remove();
            const r = pe(),
              a = O?.querySelector("[data-selected-chips]"),
              n = O?.querySelector("[data-config-container]");
            (r.length ||
              (a &&
                (a.innerHTML =
                  '<span class="sg-selected-empty">Vẫn chưa chọn nhân vật; khai cục cũng có thể chỉ bao gồm &lt;user&gt;.</span>'),
              n &&
                (n.innerHTML =
                  '<div class="sg-config-empty"><b>Chưa đưa vào nhân vật</b><br>Sau khi chọn từ danh sách bên trái, cấu hình sẽ xuất hiện ở đây.</div>')),
              Be());
          })(e)),
      (function (e, t) {
        const r = [
          ...(O?.querySelectorAll("[data-character-catalog]") || []),
        ].find((t) => t.dataset.characterName === e);
        (r?.classList.toggle("on", t),
          r?.setAttribute("aria-pressed", String(t)));
      })(e, t),
      re(),
      Q());
  }
  function Je() {
    if (!O || 2 !== I.step) return;
    let e = 0;
    for (const t of O.querySelectorAll("[data-character-catalog]")) {
      const r = "all" === D || t.dataset.characterKind === D,
        a = !J || t.dataset.characterSearch.includes(J);
      ((t.hidden = !(r && a)), t.hidden || (e += 1));
    }
    const t = O.querySelector("[data-catalog-empty]");
    t && (t.hidden = e > 0);
    for (const e of O.querySelectorAll("[data-roster-filter]"))
      e.classList.toggle("on", e.dataset.rosterFilter === D);
  }
  function De() {
    const e = pe();
    return `<section class="sg-page sg-page-wide"><p class="sg-kicker">STEP TWO · WHO EXISTS AROUND YOU</p><h1>Sắp xếp nhân vật cho tuyến thế giới này</h1><p class="sg-lead">Danh sách sẽ đồng bộ "Trình quản lý nhân vật & hình ảnh" cùng với thiết lập nhân vật hoàn chỉnh trong Thế Giới Thư của thẻ nhân vật hiện tại. Sau khi chọn nhân vật, chỉ cần quyết định trước khi mở đầu có quen biết hay không, có xuất hiện ở màn đầu tiên hay không.</p><div class="sg-selected-bar"><div class="sg-selected-head"><b data-selected-count>Nhân vật đã chọn · ${e.length} người</b><span>Nhấn vào họ tên có thể trực tiếp định vị cấu hình</span></div><div class="sg-selected-chips" data-selected-chips>${e.length ? e.map(Le).join("") : '<span class="sg-selected-empty">Vẫn chưa chọn nhân vật; khai cục cũng có thể chỉ bao gồm &lt;user&gt;.</span>'}</div></div><div class="sg-roster-workspace"><aside class="sg-roster-panel"><div class="sg-panel-head"><div class="sg-panel-title"><h2>Danh sách nhân vật</h2><span>${y.length} người</span></div><label class="sg-search"><input type="search" data-roster-search value="${j(J)}" placeholder="Tìm kiếm họ tên hoặc giới thiệu"></label><div class="sg-filter-row">${[
      ["all", "Toàn bộ"],
      ["free", "Nguyên tác"],
      ["family", "Gia tộc"],
      ["history", "Lịch sử"],
    ]
      .map(
        ([e, t]) =>
          `<button type="button" class="sg-filter ${D === e ? "on" : ""}" data-action="roster-filter" data-roster-filter="${e}">${t}</button>`,
      )
      .join(
        "",
      )}</div></div><div class="sg-catalog">${y.map(Ie).join("")}<div class="sg-catalog-empty" data-catalog-empty hidden>Không có nhân vật phù hợp điều kiện</div></div></aside><section class="sg-config-panel"><div class="sg-config-toolbar"><p>"Ảnh chụp nhanh khai cục" và "Định vị dài hạn" đã được tách ra, cốt truyện sẽ không bị vĩnh viễn khóa ở mở đầu.</p><div class="sg-toolbar-actions"><button type="button" class="sg-mini-btn accent" data-action="ai-characters">AI bổ sung nhân vật đã chọn</button><details class="sg-bulk"><summary>Cài đặt hàng loạt</summary><div class="sg-bulk-menu"><button type="button" data-action="bulk-location">Khu vực hoạt động tham khảo địa điểm nhân vật chính</button><button type="button" data-action="bulk-known">Toàn bộ thiết lập là đã quen biết</button><button type="button" data-action="bulk-clear-scene">Dọn trống hiện trường mở đầu</button></div></details></div></div><div data-config-container>${e.length ? `<div class="sg-config-list">${e.map(Me).join("")}</div>` : '<div class="sg-config-empty"><b>Chưa đưa vào nhân vật</b><br>Sau khi chọn từ danh sách bên trái, cấu hình sẽ xuất hiện ở đây.</div>'}</div></section></div><div class="sg-era sg-fixed-relations"><b>Quan hệ thân thuộc đã có giữa các nhân vật</b><br>${x.map(([e, t, r]) => `${e}—${t}（${r}）`).join(" · ")}</div></section>`;
  }
  function He(e, t) {
    return (I.opening.referenceEntries || []).some(
      (r) => r.worldbook === e && r.name === t,
    );
  }
  function Ue() {
    const e = I.opening.referenceEntries || [];
    return e.length
      ? e
          .map(
            (e) =>
              `<span class="sg-reference-chip"><span title="${j(e.worldbook)}">${j(e.name)}</span><button type="button" data-action="remove-reference-entry" data-reference-worldbook="${j(e.worldbook)}" data-reference-name="${j(e.name)}" aria-label="Xóa bỏ ${j(e.name)}">×</button></span>`,
          )
          .join("")
      : '<span class="sg-reference-empty">Chưa chọn; AI sẽ chỉ dựa vào cấu hình khai cục hiện tại để tạo.</span>';
  }
  function Ke() {
    const e = O?.querySelector("[data-reference-overlay-body]");
    e &&
      (e.innerHTML = (function () {
        if (V) return `<div class="sg-errors">${j(V)}</div>`;
        if (!U.length)
          return '<div class="sg-config-empty">Không có Thế Giới Thư có thể đọc.</div>';
        const e = [...(K[F] || [])]
          .filter((e) => e?.name)
          .sort(
            (e, t) => (e.position?.order || 100) - (t.position?.order || 100),
          );
        return `<div class="sg-reference-toolbar"><label class="sg-field"><span>Thế Giới Thư</span><select data-reference-worldbook-select>${U.map((e) => `<option value="${j(e)}" ${e === F ? "selected" : ""}>${j(e)}</option>`).join("")}</select></label><label class="sg-field"><span>Tìm kiếm mục</span><input type="search" data-reference-search placeholder="Nhập tên mục"></label></div><div class="sg-reference-list">${
          e.length
            ? e
                .map(
                  (e) =>
                    `<label class="sg-reference-entry" data-reference-entry-row data-reference-search-text="${j(e.name.toLowerCase())}"><input type="checkbox" data-reference-entry data-reference-worldbook="${j(F)}" data-reference-name="${j(e.name)}" ${He(F, e.name) ? "checked" : ""}><span><b>${j(e.name)}</b><small>${j(
                      String(e.content || "")
                        .replace(/\s+/g, " ")
                        .slice(0, 100) || "Mục trống",
                    )}</small></span></label>`,
                )
                .join("")
            : '<div class="sg-config-empty">Thế Giới Thư này không có mục nào.</div>'
        }<div class="sg-config-empty" data-reference-search-empty hidden>Không có mục phù hợp.</div></div><div class="sg-reference-footer"><span>Chỉ giao mục được đánh dấu cho AI tham khảo, sẽ không sao chép vào DLC.</span><span data-reference-modal-count>Đã chọn ${(I.opening.referenceEntries || []).length} mục</span></div>`;
      })());
  }
  async function Fe() {
    (O?.querySelector("[data-reference-overlay]")?.remove(),
      O?.insertAdjacentHTML(
        "beforeend",
        '<div class="sg-reference-overlay" data-reference-overlay><section class="sg-reference-modal" role="dialog" aria-modal="true" aria-label="Chọn Thế Giới Thư tham khảo"><header class="sg-reference-head"><div><p class="sg-kicker">REFERENCE MATERIAL</p><h2>Chọn Thế Giới Thư tham khảo</h2></div><button type="button" class="sg-close" data-action="close-reference-selector" aria-label="Đóng">×</button></header><div class="sg-reference-body" data-reference-overlay-body><div class="sg-config-empty">Đang đọc Thế Giới Thư……</div></div></section></div>',
      ),
      U.length ||
        (await (async function () {
          V = "";
          try {
            const e = S("getWorldbookNames"),
              t = S("getCharWorldbookNames"),
              r = ("function" == typeof e && (await e())) || [],
              a = "function" == typeof t ? await t("current") : null,
              n = [a?.primary, ...(a?.additional || [])].filter(Boolean);
            ((U = [...new Set([...n, ...r])]),
              (F && U.includes(F)) || (F = n[0] || U[0] || ""),
              F && (await ae(F)));
          } catch (e) {
            V = e?.message || "Không thể đọc danh sách Thế Giới Thư.";
          }
        })()),
      Ke());
  }
  function Ve(e, t, r) {
    const a = (I.opening.referenceEntries ||= []),
      n = He(e, t);
    (r && !n && a.push({ worldbook: e, name: t }),
      !r &&
        n &&
        (I.opening.referenceEntries = a.filter(
          (r) => r.worldbook !== e || r.name !== t,
        )),
      Q(),
      (function () {
        const e = O?.querySelector("[data-reference-summary]");
        e && (e.innerHTML = Ue());
        const t = O?.querySelector("[data-reference-count]");
        t &&
          (t.textContent = `Đã chọn ${(I.opening.referenceEntries || []).length} mục`);
      })());
    const i = O?.querySelector("[data-reference-modal-count]");
    i && (i.textContent = `Đã chọn ${I.opening.referenceEntries.length} mục`);
  }
  function Ye() {
    const e = (e) => O?.querySelector(`[data-api-setting="${e}"]`)?.value ?? "";
    return {
      apiType: e("apiType") || "openai",
      apiUrl: e("apiUrl").trim(),
      apiKey: e("apiKey").trim(),
      model: e("model").trim(),
      temperature: Number(e("temperature") || 0.8),
      maxTokens: Math.max(1, Number(e("maxTokens") || 12e3)),
      topP: Number(e("topP") || 0.9),
      frequencyPenalty: Number(e("frequencyPenalty") || 0),
      presencePenalty: Number(e("presencePenalty") || 0),
    };
  }
  function Ge() {
    const e = pe(),
      t = e.filter((e) => I.characters[e.name].scene),
      r = I.initialization?.stale
        ? "Chưa bổ sung dựa theo mở đầu hiện tại"
        : I.initialization?.summary || "Đã thông qua kiểm tra Schema cố định";
    return `<section class="sg-page"><p class="sg-kicker">STEP THREE · THE FIRST SPARK</p><h1>Câu chuyện bắt đầu từ đâu?</h1><p class="sg-lead">Màn đầu tiên chỉ là lời dẫn, không phụ trách để mọi nhân vật luân phiên lên sân khấu. Bên dưới chỉ có nhân vật màu đỏ mới có thể xuất hiện tại hiện trường mở đầu.</p><div class="sg-scene">${e.length ? e.map((e) => `<button type="button" class="${I.characters[e.name].scene ? "on" : ""}" data-scene-character="${j(e.name)}" aria-pressed="${I.characters[e.name].scene}">${j(e.name)}</button>`).join("") : '<span class="sg-lead">Chưa đưa vào nhân vật; cũng có thể chỉ viết mở đầu của &lt;user&gt; và người qua đường dùng 1 lần.</span>'}</div><div class="sg-persona-strip"><span><b>Tự động tham khảo thiết lập nhân vật</b><br><small data-persona-summary>${t.length ? `${t.map((e) => e.name).join("、")} · Sẽ đọc mục SFW/nhân vật tương ứng` : "Không có nhân vật hiện trường; sẽ không đọc thêm thiết lập nhân vật"}</small></span><span class="sg-kind">Ràng buộc cứng</span></div><div class="sg-opening-tools"><section class="sg-opening-tool"><div class="sg-tool-head"><span><b>Số chữ mở đầu</b><small>AI sẽ lấy số chữ mục tiêu làm trung tâm, dao động trên dưới khoảng 10%</small></span></div><div class="sg-length-row"><input type="number" min="300" max="5000" step="100" data-bind="opening.targetWords" value="${j(I.opening.targetWords)}"><div class="sg-length-presets">${[600, 1e3, 1500, 2e3].map((e) => `<button type="button" class="sg-length-preset ${Number(I.opening.targetWords) === e ? "on" : ""}" data-action="opening-length" data-opening-length="${e}">${e} chữ</button>`).join("")}</div></div></section><section class="sg-opening-tool"><div class="sg-tool-head"><span><b>Thế Giới Thư tham khảo thêm</b><small>Dùng cho sự thật địa phương, bối cảnh lịch sử, bầu không khí hoặc văn phong; thiết lập nhân vật không cần chọn thủ công</small></span><button type="button" class="sg-btn" data-action="open-reference-selector">Chọn mục</button></div><div class="sg-reference-summary" data-reference-summary>${Ue()}</div><div style="margin-top:8px;color:var(--muted);font-size:10px" data-reference-count>Đã chọn ${(I.opening.referenceEntries || []).length} mục</div></section></div><div class="sg-grid">${Ae("Tên mở đầu", "opening.name", I.opening.name, "Màn thứ nhất")}${Ce("Thiết tưởng khai cục bằng một câu", "opening.hook", I.opening.hook, "Ví dụ: Quân sĩ bị nợ lương đang làm phản ngoài cổng bảo, nhân vật chính bắt buộc phải gom được một đợt lương thực trước khi trời tối.")}${Ce("Chính văn mở đầu", "opening.body", I.opening.body, "Có thể viết tay, cũng có thể nhấn nút bên dưới để AI tạo ra.")}</div><div class="sg-generation-flow"><div class="sg-flow-card"><b>1. Tạo màn thứ nhất</b><small>Đọc thiết lập nhân vật hoàn chỉnh và định vị dài hạn của nhân vật hiện trường</small></div><span class="sg-flow-arrow">→</span><div class="sg-flow-card"><b>2. Bổ sung biến khởi tạo</b><small>Trích xuất sự thật từ chính văn cuối cùng, chỉ viết vào các trường Schema cố định</small></div></div><div class="sg-actions" style="margin-top:16px"><button class="sg-btn primary" data-action="generate" ${B ? "disabled" : ""}>${B && "opening" === G ? "Đang tạo mở đầu…" : B && "initialization" === G ? "Đang kiểm tra biến khởi tạo…" : "AI tạo mở đầu và bổ sung biến"}</button><button class="sg-btn" data-action="generate-initvar" ${B || !I.opening.body.trim() ? "disabled" : ""}>Chỉ bổ sung lại biến khởi tạo</button></div><div class="sg-era"><b>Nhân vật hiện trường:</b><span data-scene-summary>${t.map((e) => e.name).join("、") || "Không có nhân vật hiện tại"}</span><br><span>Các nhân vật đã chọn khác vẫn sẽ vào nhân vật khái lãm, nhưng sẽ không tự động xuất hiện trong màn đầu tiên.</span></div><div class="sg-era sg-initvar-note"><b>Biến khởi tạo:</b><span data-initvar-status>${j(r)}</span><br><small>Thiên hạ bản đồ chính thức, ngày tháng địa điểm, thuộc tính nhân vật chính và cấu trúc trường được khóa bởi mã; AI chỉ có thể bổ sung nhân vật, vật phẩm, quân đội, tài sản, khoa kỹ, thế lực, nhiệm vụ và đại sự ký được chính văn hỗ trợ rõ ràng.</small></div></section>`;
  }
  function Xe() {
    const e = ue(),
      t = pe(),
      r = t.filter((e) => I.characters[e.name].known),
      a = t.filter((e) => I.characters[e.name].scene);
    let n = 0;
    try {
      n = new TextEncoder().encode(JSON.stringify(fe())).length;
    } catch {}
    return `<section class="sg-page"><p class="sg-kicker">STEP FOUR · SEAL THE DOCUMENT</p><h1>Đối chiếu điệp văn thân phận</h1><p class="sg-lead">Ở đây hiển thị nội dung cuối cùng sẽ được ghi vào thẻ nhân vật. Sau khi cài đặt chỉ có thể tạo cuộc trò chuyện mới để sử dụng, không hỗ trợ chuyển đổi giữa chừng.</p>${e.length ? `<div class="sg-errors"><b>Vẫn chưa thể tạo:</b><br>${e.map((e) => `• ${j(e)}`).join("<br>")}</div>` : ""}<div class="sg-preview"><article class="sg-card"><h3>${j(I.title)}</h3><p>Sùng Trinh năm thứ bảy tháng bảy · ${j(I.protagonist.location)} · ${j(I.protagonist.identity)}</p></article><article class="sg-card"><h3>Ghi vào Thế Giới Thư</h3><p><code>${j(u)}</code> · <code>Nhân vật khái lãm</code>; ngoài ra sẽ viết lại thông tin thích ứng của ${t.filter((e) => "history" !== e.lock).length} nhân vật nguyên tác vào mục thiết lập nhân vật tương ứng.</p></article><article class="sg-card"><h3>Phân bổ nhân vật</h3><p>Nhân vật khái lãm ${t.length} người · Đã quen biết ${r.length} người · Hiện trường mở đầu ${a.length} người</p></article><article class="sg-card"><h3>Màn thứ nhất</h3><p>${j(I.opening.name)} · ${j(I.opening.body.slice(0, 180) || "Chưa điền chính văn")}${I.opening.body.length > 180 ? "……" : ""}</p></article><article class="sg-card"><h3>Biến khởi tạo</h3><p>${I.initialization?.stale ? "Cần quay lại bước thứ 3 để bổ sung lại" : `Kiểm tra Schema cố định thông qua · ${j(I.initialization?.summary || "Không có sự thật bổ sung")}`}</p></article><article class="sg-card"><h3>Thời đại và kích thước gói</h3><p>Bản đồ tháng 7 chính thức ${Object.keys(L?.["Biến lượng"]?.["Thiên hạ bản đồ"]?.["Thái thế khu vực"] || {}).length} khu vực · Dự kiến ${(n / 1024).toFixed(1)} KB / 1367 KB</p></article></div><input type="file" hidden accept="application/json,.json" data-project-file><div class="sg-actions" style="margin-top:18px"><button class="sg-btn" data-action="import-project">Tải công trình</button><button class="sg-btn" data-action="download-project">Lưu công trình</button><button class="sg-btn" data-action="download-package" ${e.length ? "disabled" : ""}>Tải DLC</button><button class="sg-btn primary" data-action="install" ${e.length ? "disabled" : ""}>Cài đặt trực tiếp để chơi thử</button><button class="sg-btn primary" data-action="publish" ${e.length ? "disabled" : ""}>Mang đến xưởng sáng tạo</button></div></section>`;
  }
  function Qe({ preserveScroll: e = !1 } = {}) {
    if (!O) return;
    const t = (e && O.querySelector(".sg-content")?.scrollTop) || 0,
      r = (e && O.querySelector(".sg-catalog")?.scrollTop) || 0,
      a = [qe, De, Ge, Xe];
    if (
      ((O.innerHTML = `<div class="sg-shell"><header class="sg-head"><div class="sg-brand"><span class="sg-seal">Khởi</span><span><b>Khai cục sinh thành khí</b><small>Sùng Trinh năm thứ bảy tháng bảy · Thân phận DLC</small></span></div><div class="sg-head-actions"><button type="button" class="sg-api-trigger" data-action="open-api-settings" title="Dùng chung cấu hình API với Vạn tượng sinh thành khí"><span>⚙ API</span><small>${j(he())}</small></button><button class="sg-close" data-action="close" aria-label="Đóng">×</button></div></header><main class="sg-main"><nav class="sg-steps">${["Tôi là ai", "Tôi quen ai", "Dẫn truyện", "Tạo DLC"].map((e, t) => `<button class="sg-step ${I.step === t + 1 ? "on" : ""}" data-step="${t + 1}"><i>${t + 1}</i><span>${e}</span></button>`).join("")}</nav><div class="sg-content">${a[I.step - 1]()}</div></main><footer class="sg-footer"><div class="sg-status ${R}">${j(W || M || "Bản nháp tự động lưu ở cục bộ.")}</div><div class="sg-actions"><button class="sg-btn" data-action="reset">Tạo mới</button>${I.step > 1 ? '<button class="sg-btn" data-action="previous">Bước trước</button>' : ""}${I.step < 4 ? '<button class="sg-btn primary" data-action="next">Bước tiếp</button>' : ""}</div></footer></div>`),
      Je(),
      e)
    ) {
      O.querySelector(".sg-content").scrollTop = t;
      const e = O.querySelector(".sg-catalog");
      e && (e.scrollTop = r);
    }
  }
  async function Ze(e) {
    const t = e.target.closest?.("[data-step]");
    if (t) return ((I.step = Number(t.dataset.step)), Q(), void Qe());
    if (e.target.matches?.("[data-reference-overlay]"))
      return void e.target.remove();
    if (e.target.matches?.("[data-api-overlay]")) return void e.target.remove();
    const r = e.target.closest?.("[data-scene-character]");
    if (r) {
      const e = I.characters[r.dataset.sceneCharacter];
      ((e.scene = !e.scene),
        Q(),
        re(),
        Q(),
        r.classList.toggle("on", e.scene),
        r.setAttribute("aria-pressed", String(e.scene)));
      const t = pe().filter((e) => I.characters[e.name].scene),
        a = O.querySelector("[data-scene-summary]");
      a && (a.textContent = t.map((e) => e.name).join("、") || "Không có nhân vật hiện tại");
      const n = O.querySelector("[data-persona-summary]");
      n &&
        (n.textContent = t.length
          ? `${t.map((e) => e.name).join("、")} · Sẽ đọc SFW/điều mục nhân vật tương ứng`
          : "Không có nhân vật hiện trường; sẽ không đọc thêm thiết lập nhân vật");
      const i = O.querySelector("[data-initvar-status]");
      return void (i && (i.textContent = "Cấu hình đã thay đổi, cần bổ sung lại"));
    }
    const a = e.target.closest?.("[data-action]"),
      n = a?.dataset.action;
    if (!n) return;
    if ("close" === n) return tt();
    if ("open-api-settings" === n)
      return void (function () {
        O?.querySelector("[data-api-overlay]")?.remove();
        const e = be();
        O?.insertAdjacentHTML(
          "beforeend",
          `<div class="sg-reference-overlay" data-api-overlay><section class="sg-reference-modal sg-api-modal" role="dialog" aria-modal="true" aria-label="Cấu hình API"><header class="sg-reference-head"><div><p class="sg-kicker">SHARED MODEL API</p><h2>Cấu hình API tạo</h2><small>Dùng chung một cấu hình với Vạn tượng sinh thành khí, lưu ở bất kỳ đâu cũng sẽ đồng bộ hiệu lực.</small></div><button type="button" class="sg-close" data-action="close-api-settings" aria-label="Đóng">×</button></header><div class="sg-reference-body"><div class="sg-api-grid"><label class="sg-field"><span>Giao thức kết nối</span><select data-api-setting="apiType"><option value="openai" ${"openai" === e.apiType ? "selected" : ""}>Giao thức tương thích OpenAI</option><option value="claude" ${"claude" === e.apiType ? "selected" : ""}>Giao thức Claude</option></select></label><label class="sg-field"><span>Tên mô hình</span><div class="sg-api-model-row"><input data-api-setting="model" value="${j(e.model)}" placeholder="Ví dụ: gemini-2.5-flash"><button type="button" class="sg-btn" data-action="fetch-api-models">Lấy</button></div><select data-api-models hidden aria-label="Mô hình khả dụng"></select></label><label class="sg-field full"><span>Địa chỉ API</span><input data-api-setting="apiUrl" value="${j(e.apiUrl)}" placeholder="https://example.com/v1/chat/completions"></label><label class="sg-field full"><span>API Key</span><input type="password" data-api-setting="apiKey" value="${j(e.apiKey)}" placeholder="sk-..."></label><label class="sg-field"><span>Nhiệt độ (Temperature)</span><input type="number" min="0" max="2" step="0.1" data-api-setting="temperature" value="${j(e.temperature)}"></label><label class="sg-field"><span>Max Token</span><input type="number" min="1" max="200000" data-api-setting="maxTokens" value="${j(e.maxTokens)}"></label><label class="sg-field"><span>Top P</span><input type="number" min="0" max="1" step="0.05" data-api-setting="topP" value="${j(e.topP)}"></label><label class="sg-field"><span>Hình phạt tần suất (Frequency Penalty)</span><input type="number" min="-2" max="2" step="0.1" data-api-setting="frequencyPenalty" value="${j(e.frequencyPenalty)}"></label><label class="sg-field"><span>Hình phạt tồn tại (Presence Penalty)</span><input type="number" min="-2" max="2" step="0.1" data-api-setting="presencePenalty" value="${j(e.presencePenalty)}"></label></div><div class="sg-api-note" data-api-settings-status>Khóa (Key) chỉ được lưu trong bộ nhớ cục bộ của trang Tửu Quán hiện tại.</div><div class="sg-actions sg-api-actions"><button type="button" class="sg-btn" data-action="close-api-settings">Hủy</button><button type="button" class="sg-btn primary" data-action="save-api-settings">Lưu và đồng bộ</button></div></div></section></div>`,
        );
      })();
    if ("close-api-settings" === n)
      return void O.querySelector("[data-api-overlay]")?.remove();
    if ("fetch-api-models" === n)
      return void (await (async function (e) {
        const t = Ye(),
          r = O?.querySelector("[data-api-settings-status]"),
          a = e.textContent;
        ((e.disabled = !0), (e.textContent = "Đang lấy…"));
        try {
          if (!t.apiUrl) throw new Error("Vui lòng điền địa chỉ API trước.");
          const e = S("getModelList");
          let a;
          if ("function" == typeof e)
            a = await e({ apiurl: t.apiUrl, key: t.apiKey });
          else {
            const e = t.apiUrl
                .replace(/\/chat\/completions\/?$/i, "")
                .replace(/\/v1\/?$/i, "")
                .replace(/\/+$/, ""),
              r = await fetch(`${e}/v1/models`, {
                headers: t.apiKey
                  ? { authorization: `Bearer ${t.apiKey}` }
                  : {},
              });
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            a = ((await r.json()).data || [])
              .map((e) => e.id || e.name)
              .filter(Boolean);
          }
          if (
            ((a = [...new Set((a || []).map(String).filter(Boolean))].sort()),
            !a.length)
          )
            throw new Error("Giao diện không trả về mô hình khả dụng.");
          const n = O?.querySelector("[data-api-models]");
          ((n.innerHTML = a
            .map((e) => `<option value="${j(e)}">${j(e)}</option>`)
            .join("")),
            (n.hidden = !1));
          const i = O?.querySelector('[data-api-setting="model"]');
          (i.value && a.includes(i.value)
            ? (n.value = i.value)
            : ((n.value = a[0]), (i.value = a[0])),
            r &&
              (r.textContent = `Đã lấy ${a.length} mô hình; sau khi chọn nhớ lưu lại.`));
        } catch (e) {
          r && (r.textContent = `Lấy danh sách mô hình thất bại: ${e?.message || e}`);
        } finally {
          ((e.disabled = !1), (e.textContent = a));
        }
      })(a));
    if ("save-api-settings" === n) {
      ((i = Ye()),
        X().setItem(l, JSON.stringify({ ...b, ...i })),
        O.querySelector("[data-api-overlay]")?.remove());
      const e = O.querySelector(".sg-api-trigger small");
      return (
        e && (e.textContent = he()),
        void te("Cấu hình API đã được lưu và đồng bộ với Vạn tượng sinh thành khí.", "success")
      );
    }
    var i;
    if ("ai-protagonist" === n) {
      ((G = "protagonist"), (B = !0), (a.disabled = !0));
      const e = a.textContent;
      a.textContent = "AI đang sắp xếp thân phận…";
      try {
        (await (async function () {
          const e = I.protagonist;
          if (!String(e.description || "").trim())
            throw new Error("Vui lòng dùng một đoạn văn mô tả thân phận <user> muốn trải nghiệm trước.");
          const t = {
              title: ["Tên DLC", I.title],
              origin: ["Lai lịch", e.origin],
              identity: ["Thân phận công khai", e.identity],
              occupation: ["Nghề nghiệp hoặc chức quan", e.occupation],
              location: ["Địa điểm khai cục", e.location],
              faction: ["Thế lực trực thuộc dài hạn", e.faction],
              social_standing: ["Thân phận và địa vị xã hội", e.socialStanding],
              family_background: ["Xuất thân và bối cảnh gia đình", e.familyBackground],
              past_experience: ["Kinh nghiệm then chốt trước khi hình thành thân phận", e.pastExperience],
              strengths: ["Năng lực và kiến thức ổn định", e.strengths],
              resources: ["Tài nguyên có thể chi phối hoặc sử dụng dài hạn", e.resources],
              long_term_pursuit: ["Mưu cầu dài hạn", e.longTermPursuit],
              identity_boundaries: ["Ranh giới và giới hạn thân phận", e.identityBoundaries],
              tone: ["Khí chất câu chuyện", e.tone],
            },
            r = `Mô tả của người chơi:\n${e.description.trim().slice(0, 4e3)}\n\nThời đại cố định: Sùng Trinh năm thứ bảy tháng bảy.\nBảng hiện tại như sau. Nội dung không trống phải giữ nguyên ý gốc; "Tàn Minh khai cục của tôi" và "Nhân vật gốc" mặc định có thể được điều chỉnh theo mô tả:\n${JSON.stringify(Object.fromEntries(Object.entries(t).map(([e, [, t]]) => [e, t])), null, 2)}`,
            a = { type: "string", minLength: 1, maxLength: 600 },
            n = {
              name: "canming_protagonist_identity_v1",
              value: {
                type: "object",
                additionalProperties: !1,
                required: Object.keys(t),
                properties: Object.fromEntries(
                  Object.keys(t).map((e) => [e, a]),
                ),
              },
            },
            i = await $e(
              "Bạn chịu trách nhiệm sắp xếp đoạn thiết tưởng thân phận của người chơi thành hồ sơ thân phận dài hạn của \"Tàn Minh Dư Tẫn\" Sùng Trinh năm thứ bảy tháng bảy. Tất cả nội dung phải phù hợp với xã hội, địa lý, quan chế và sức sản xuất cuối thời Minh; khi liên quan đến người chơi nhất luật viết là <user>. Chỉ viết thông tin ổn định dài hạn, không viết mục tiêu tức thời, hoàn cảnh tạm thời, tình báo hiện tại, có mặt hay không hoặc cốt truyện chưa xảy ra lúc khai cục. Ranh giới thân phận phải làm rõ giới hạn thực tế của quyền lực, kiến thức, của cải hoặc mạng lưới quan hệ, tránh hào quang nhân vật chính. Các trường không trống hiện có là ràng buộc cứng, không được viết lại; chỉ có tiêu đề mặc định \"Tàn Minh khai cục của tôi\" và lai lịch mặc định \"Nhân vật gốc\" có thể được điều chỉnh theo mô tả. Vui lòng bổ sung các trường còn lại, chỉ xuất đối tượng JSON tuân thủ Schema.",
              r,
              n,
            ),
            o =
              i?.protagonist && "object" == typeof i.protagonist
                ? i.protagonist
                : i,
            s = Object.entries(t)
              .filter(([e]) => !String(o?.[e] || "").trim())
              .map(([, [e]]) => e);
          if (s.length) throw new Error(`AI trả về vẫn thiếu: ${s.join("、")}`);
          const c = (e, t, r = []) => {
              const a = String(e.value || "").trim();
              (a && !r.includes(a)) || (e.value = String(o[t]).trim());
            },
            l = { value: I.title };
          (c(l, "title", ["Tàn Minh khai cục của tôi"]), (I.title = l.value));
          for (const [t, r, a] of [
            ["origin", "origin", ["Nhân vật gốc"]],
            ["identity", "identity"],
            ["occupation", "occupation"],
            ["location", "location"],
            ["faction", "faction"],
            ["socialStanding", "social_standing"],
            ["familyBackground", "family_background"],
            ["pastExperience", "past_experience"],
            ["strengths", "strengths"],
            ["resources", "resources"],
            ["longTermPursuit", "long_term_pursuit"],
            ["identityBoundaries", "identity_boundaries"],
            ["tone", "tone"],
          ]) {
            const n = { value: e[t] };
            (c(n, r, a || []), (e[t] = n.value));
          }
          ((I.summary = I.summary || e.description.trim().slice(0, 120)),
            re(),
            Q());
        })(),
          (function () {
            const e = {
              title: I.title,
              ...Object.fromEntries(
                Object.entries(I.protagonist).map(([e, t]) => [
                  `protagonist.${e}`,
                  t,
                ]),
              ),
            };
            for (const [t, r] of Object.entries(e)) {
              const e = O?.querySelector(`[data-bind="${t}"]`);
              e && (e.value = r ?? "");
            }
            Pe();
          })(),
          te("Đã bổ sung hồ sơ thân phận dài hạn của <user> dựa trên mô tả.", "success"));
      } catch (e) {
        te(`Bổ sung thân phận thất bại: ${e?.message || e}`, "error");
      } finally {
        ((G = ""),
          (B = !1),
          a.isConnected && ((a.disabled = !1), (a.textContent = e)));
      }
      return;
    }
    if ("close-reference-selector" === n)
      return void O.querySelector("[data-reference-overlay]")?.remove();
    if ("open-reference-selector" === n) return void (await Fe());
    if ("opening-length" === n) {
      ((I.opening.targetWords = Number(a.dataset.openingLength)), Q());
      const e = O.querySelector('[data-bind="opening.targetWords"]');
      e && (e.value = I.opening.targetWords);
      for (const e of O.querySelectorAll("[data-opening-length]"))
        e.classList.toggle(
          "on",
          Number(e.dataset.openingLength) === I.opening.targetWords,
        );
      return;
    }
    if ("remove-reference-entry" === n) {
      Ve(a.dataset.referenceWorldbook, a.dataset.referenceName, !1);
      const e = [...(O.querySelectorAll("[data-reference-entry]") || [])].find(
        (e) =>
          e.dataset.referenceWorldbook === a.dataset.referenceWorldbook &&
          e.dataset.referenceName === a.dataset.referenceName,
      );
      return void (e && (e.checked = !1));
    }
    if ("previous" === n)
      return ((I.step = Math.max(1, I.step - 1)), Q(), Qe());
    if ("next" === n) return ((I.step = Math.min(4, I.step + 1)), Q(), Qe());
    if ("reset" === n) {
      if (
        !(q.defaultView || window).confirm(
          "Tạo dự án mới sẽ xóa bản nháp cục bộ hiện tại, bạn có chắc chắn muốn tiếp tục không?",
        )
      )
        return;
      return ((I = T()), Q(), (W = ""), Qe());
    }
    if ("roster-filter" === n) return ((D = a.dataset.rosterFilter), void Je());
    if ("toggle-character" === n) {
      const e = a.dataset.characterName;
      return void Re(e, !I.characters[e].included);
    }
    if ("toggle-character-editor" === n) {
      const e = a.dataset.characterName,
        t = a.closest("[data-character-config]"),
        r = t?.querySelector(".sg-config-body"),
        n = !H.has(e);
      return (
        n ? H.add(e) : H.delete(e),
        t?.classList.toggle("expanded", n),
        a.setAttribute("aria-expanded", String(n)),
        void (r && (r.hidden = !n))
      );
    }
    if ("jump-character" === n) {
      const e = a.dataset.characterName,
        t = O.querySelector(".sg-content"),
        r = O.querySelector(`[data-character-config="${CSS.escape(e)}"]`);
      return (
        r &&
          !r.classList.contains("expanded") &&
          r.querySelector('[data-action="toggle-character-editor"]')?.click(),
        void (
          t &&
          r &&
          t.scrollTo({
            top:
              t.scrollTop +
              r.getBoundingClientRect().top -
              t.getBoundingClientRect().top -
              18,
            behavior: "smooth",
          })
        )
      );
    }
    if ("remove-character" === n) return void Re(a.dataset.characterName, !1);
    if ("ai-character" === n || "ai-characters" === n) {
      const e = (
        "ai-character" === n
          ? y.filter((e) => e.name === a.dataset.characterName)
          : pe()
      ).filter((e) => "history" !== e.lock);
      ((G = "adaptation"), (B = !0), (a.disabled = !0));
      const t = a.textContent;
      a.textContent = "AI đang đọc thiết lập nhân vật…";
      try {
        if (!e.length)
          throw new Error("Trong các nhân vật đã chọn không có vai diễn gốc nào cần thích ứng dài hạn.");
        const t = [];
        for (let r = 0; r < e.length; r++) {
          a.textContent =
            e.length > 1
              ? `AI đang bổ sung ${r + 1}/${e.length} · ${e[r].name}…`
              : "AI đang đọc thiết lập nhân vật…";
          const n = await ze([e[r]]);
          t.push(...n);
          for (const e of n) We(e);
        }
        te(`Đã bổ sung định vị dài hạn của ${t.join("、")} dựa trên thiết lập nhân vật gốc.`, "success");
      } catch (e) {
        te(`Thích ứng nhân vật thất bại: ${e?.message || e}`, "error");
      } finally {
        ((G = ""),
          (B = !1),
          a.isConnected && ((a.disabled = !1), (a.textContent = t)));
      }
      return;
    }
    if ("bulk-location" === n) {
      for (const e of pe())
        if ("history" !== e.lock) {
          const t = I.characters[e.name];
          t.activityArea = `Thường hoạt động ở ${I.protagonist.location || "Khu vực nhân vật chính ở"} và vùng lân cận, có thể di chuyển hợp lý theo chức vụ dài hạn, gia đình hoặc sinh kế`;
          const r = O.querySelector(
            `[data-bind="characters.${CSS.escape(e.name)}.activityArea"]`,
          );
          r && (r.value = t.activityArea);
        }
      return (
        re(),
        Q(),
        void te("Đã để khu vực hoạt động của nhân vật gốc tham khảo địa điểm của nhân vật chính.", "success")
      );
    }
    if ("bulk-known" === n) {
      for (const e of pe()) {
        I.characters[e.name].known = !0;
        const t = O.querySelector(
          `[data-character-toggle="known"][data-character-name="${CSS.escape(e.name)}"]`,
        );
        t && (t.checked = !0);
      }
      return (
        re(),
        Q(),
        void te("Đã thiết lập nhân vật được chọn thành quen biết với <user> trước khi mở màn.", "success")
      );
    }
    if ("bulk-clear-scene" === n) {
      for (const e of pe()) {
        I.characters[e.name].scene = !1;
        const t = O.querySelector(
          `[data-character-toggle="scene"][data-character-name="${CSS.escape(e.name)}"]`,
        );
        t && (t.checked = !1);
      }
      return (re(), Q(), void te("Đã xóa trống nhân vật hiện trường mở màn.", "success"));
    }
    if ("generate" === n) {
      ((B = !0),
        (G = "opening"),
        (a.disabled = !0),
        (a.textContent = "Đang tạo mở màn…"));
      try {
        await ke();
        const e = O.querySelector('[data-bind="opening.name"]'),
          t = O.querySelector('[data-bind="opening.body"]');
        (e && (e.value = I.opening.name),
          t && (t.value = I.opening.body),
          (W = "Mở màn đã được tạo và lưu, đang bổ sung biến khởi tạo……"),
          (R = "success"));
        const r = O.querySelector(".sg-status");
        r &&
          ((r.textContent = W),
          (r.title = W),
          (r.className = `sg-status ${R}`));
        try {
          ((G = "initialization"),
            (a.textContent = "Mở màn đã lưu, đang bổ sung biến…"),
            await je());
          const e = O.querySelector("[data-initvar-status]");
          (e && (e.textContent = I.initialization.summary),
            (W = "Mở màn đã được tạo theo thiết lập nhân vật, biến khởi tạo cũng đã vượt qua kiểm tra Schema cố định."),
            (R = "success"));
        } catch (e) {
          const t = O.querySelector("[data-initvar-status]");
          (t && (t.textContent = "Mở màn đã lưu; biến khởi tạo cần thử lại riêng"),
            (W = `Mở màn đã tạo và lưu; chỉ bổ sung biến khởi tạo thất bại: ${e?.message || e}`),
            (R = "warning"));
        }
      } catch (e) {
        ((W = `Tạo mở màn thất bại: ${e?.message || e}`), (R = "error"));
      } finally {
        ((B = !1),
          (G = ""),
          (a.disabled = !1),
          (a.textContent = "AI tạo mở màn và bổ sung biến"));
      }
      const e = O.querySelector(".sg-status");
      e &&
        ((e.textContent = W),
        (e.title = W),
        (e.className = `sg-status ${R}`));
      return;
    }
    if ("generate-initvar" === n) {
      ((B = !0), (G = "initialization"), (a.disabled = !0));
      const e = a.textContent;
      a.textContent = "Đang bổ sung và kiểm tra…";
      try {
        await je();
        const e = O.querySelector("[data-initvar-status]");
        (e && (e.textContent = I.initialization.summary),
          te("Biến khởi tạo đã được bổ sung lại dựa trên mở màn hiện tại và vượt qua kiểm tra Schema.", "success"));
      } catch (e) {
        te(`Tạo biến khởi tạo thất bại: ${e?.message || e}`, "error");
      } finally {
        ((B = !1), (G = ""), (a.disabled = !1), (a.textContent = e));
      }
      return;
    }
    if ("download-project" === n)
      return (
        Ee(
          JSON.stringify(I, null, 2),
          `${E(I.title)}.cmyj-scenario-project.json`,
        ),
        te("Dự án khai cục đã được lưu.", "success")
      );
    if ("import-project" === n)
      return void O.querySelector("[data-project-file]")?.click();
    let o;
    try {
      o = fe();
    } catch (e) {
      return te(e.message, "error");
    }
    if ("download-package" === n)
      return (
        Ee(JSON.stringify(o, null, 2), `${E(I.title)}.workshop.json`),
        te("Thân phận DLC đã được xuất.", "success")
      );
    if ("install" !== n)
      return "publish" === n
        ? "function" != typeof P.openWorkshop
          ? te("Môi trường hiện tại không kết nối với Xưởng sáng tạo.", "error")
          : (tt(),
            P.openWorkshop({
              initialView: "publish",
              initialType: "scenario",
              initialBundle: o,
            }))
        : void 0;
    if ("function" != typeof P.installScenarioPackage)
      return te("Môi trường hiện tại không kết nối với trình cài đặt DLC.", "error");
    try {
      (await P.installScenarioPackage(o),
        te("Thân phận DLC đã được cài đặt, vui lòng tạo cuộc trò chuyện mới và chọn mở màn.", "success"));
    } catch (e) {
      "SCENARIO_REPLACE_CANCELLED" === e?.code
        ? te("Đã giữ lại Thân phận DLC hiện tại.", "info")
        : te(`Cài đặt thất bại: ${e?.message || e}`, "error");
    }
  }
  function et(e) {
    const t = e.target;
    if (t.matches?.("[data-api-models]")) {
      const e = O?.querySelector('[data-api-setting="model"]');
      return void (e && (e.value = t.value));
    }
    if (t.matches?.("[data-reference-worldbook-select]"))
      "change" === e.type &&
        (async function (e) {
          F = e;
          const t = O?.querySelector("[data-reference-overlay-body]");
          t &&
            (t.innerHTML = '<div class="sg-config-empty">Đang đọc điều mục……</div>');
          try {
            (await ae(e), (V = ""));
          } catch (e) {
            V = e?.message || "Đọc Thế Giới Thư thất bại.";
          }
          Ke();
        })(t.value);
    else if (t.matches?.("[data-reference-entry]"))
      "change" === e.type &&
        Ve(t.dataset.referenceWorldbook, t.dataset.referenceName, t.checked);
    else if (t.matches?.("[data-reference-search]"))
      !(function (e) {
        let t = 0;
        for (const r of O?.querySelectorAll("[data-reference-entry-row]") || [])
          ((r.hidden = !r.dataset.referenceSearchText.includes(
            e.trim().toLowerCase(),
          )),
            r.hidden || (t += 1));
        const r = O?.querySelector("[data-reference-search-empty]");
        r && (r.hidden = t > 0);
      })(t.value);
    else if (t.matches?.("[data-bind]")) {
      if (
        ((function (e, t) {
          const r = e.split(".");
          let a = I;
          for (let e = 0; e < r.length - 1; e++) a = a[r[e]];
          const n = r.at(-1);
          ((a[n] = [
            "hour",
            "minute",
            "life",
            "martial",
            "command",
            "wisdom",
            "politics",
            "reputation",
            "gold",
            "silver",
            "copper",
            "affection",
            "loyalty",
            "targetWords",
          ].includes(n)
            ? Number(t)
            : t),
            Q());
        })(t.dataset.bind, t.value),
        t.dataset.bind.startsWith("protagonist.") && Pe(),
        "protagonist.description" !== t.dataset.bind &&
          /^(protagonist|date|stats|characters|opening\.(hook|body|id|name))/.test(
            t.dataset.bind,
          ))
      ) {
        (re(), Q());
        const e = O?.querySelector("[data-initvar-status]");
        e && (e.textContent = "Nội dung đã sửa đổi, cần bổ sung lại");
      }
      if ("opening.targetWords" === t.dataset.bind)
        for (const e of O.querySelectorAll("[data-opening-length]"))
          e.classList.toggle(
            "on",
            Number(e.dataset.openingLength) === Number(t.value),
          );
    } else {
      if (t.matches?.("[data-list-bind]")) {
        const e = t.dataset.listBind.split(".");
        let r = I;
        for (let t = 0; t < e.length - 1; t++) r = r[e[t]];
        return (
          (r[e.at(-1)] = t.value
            .split(/\r?\n/)
            .map((e) => e.trim())
            .filter(Boolean)),
          re(),
          void Q()
        );
      }
      if (t.matches?.("[data-roster-search]"))
        return ((J = t.value.trim().toLowerCase()), void Je());
      if (t.matches?.("[data-character-toggle]")) {
        if ("change" !== e.type) return;
        ((I.characters[t.dataset.characterName][t.dataset.characterToggle] =
          t.checked),
          re(),
          Q());
      }
      t.matches?.("[data-project-file]") &&
        t.files?.[0] &&
        t.files[0]
          .text()
          .then((e) => {
            const t = JSON.parse(e);
            if (
              "canming-scenario-project" !== t?.format ||
              ![1, 2].includes(t?.version)
            )
              throw new Error("Không phải tệp dự án khai cục hợp lệ.");
            ((I = Z(t)), Q(), te("Dự án khai cục đã được nạp.", "success"));
          })
          .catch((e) => te(`Nạp thất bại: ${e?.message || e}`, "error"));
    }
  }
  function tt() {
    (q.getElementById(r)?.remove(), (O = null));
  }
  const rt = {
    apiVersion: 1,
    open: async function (t = {}) {
      ((P = t),
        (q = P.mountDocument || document),
        tt(),
        (function () {
          if (q.getElementById(i)) return;
          const e = q.createElement("style");
          ((e.id = i),
            (e.textContent = `#${r}{--paper:#eee5d2;--paper2:#dfd1b7;--card:#f8f0df;--ink:#29231c;--muted:#756958;--line:#b9a98d;--red:#8e2926;position:absolute;inset:0;z-index:68;color:var(--ink);font:14px/1.65 "Noto Serif SC","Songti SC",serif;background:radial-gradient(circle at 82% 9%,rgba(142,41,38,.13),transparent 31%),linear-gradient(145deg,var(--paper),var(--paper2));overflow:hidden}#${r}.theme-night,#${r}.theme-star{--paper:#171b20;--paper2:#20262c;--card:#252b31;--ink:#eee4d1;--muted:#b7aa95;--line:#4b4a45;--red:#bd5950}#${r}*{box-sizing:border-box}#${r} button,#${r} input,#${r} textarea,#${r} select{font:inherit}#${r} .sg-shell{height:100%;display:grid;grid-template-rows:72px 1fr 68px}#${r} .sg-head{display:flex;align-items:center;justify-content:space-between;padding:0 24px;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--paper) 86%,transparent);backdrop-filter:blur(16px)}#${r} .sg-brand{display:flex;align-items:center;gap:12px}#${r} .sg-seal{display:grid;width:40px;height:40px;place-items:center;border:2px solid var(--red);color:var(--red);font-size:20px;font-weight:900;transform:rotate(-5deg)}#${r} .sg-brand b{font-size:18px;letter-spacing:.1em}#${r} .sg-brand small{display:block;color:var(--muted);font-size:10px;letter-spacing:.14em}#${r} .sg-close,#${r} .sg-btn{border:1px solid var(--line);border-radius:10px;color:inherit;background:var(--card);cursor:pointer;transition:.18s}#${r} .sg-close{width:36px;height:36px;font-size:22px}#${r} .sg-btn{padding:9px 14px}#${r} .sg-btn:hover{transform:translateY(-1px);border-color:var(--red)}#${r} .sg-btn.primary{color:#fff;background:var(--red);border-color:var(--red)}#${r} .sg-main{display:grid;grid-template-columns:210px minmax(0,1fr);min-height:0}#${r} .sg-steps{padding:26px 16px;border-right:1px solid var(--line)}#${r} .sg-step{display:grid;grid-template-columns:32px 1fr;gap:10px;align-items:center;width:100%;padding:11px;border:0;border-radius:12px;color:var(--muted);text-align:left;background:transparent;cursor:pointer}#${r} .sg-step i{display:grid;width:28px;height:28px;place-items:center;border:1px solid var(--line);border-radius:50%;font-style:normal}#${r} .sg-step.on{color:var(--ink);background:color-mix(in srgb,var(--red) 10%,var(--card))}#${r} .sg-step.on i{color:#fff;background:var(--red);border-color:var(--red)}#${r} .sg-content{overflow:auto;padding:30px clamp(18px,4vw,52px)}#${r} .sg-page{width:min(960px,100%);margin:auto}#${r} .sg-kicker{margin:0;color:var(--red);font-size:10px;letter-spacing:.28em}#${r} h1{margin:5px 0 8px;font-size:clamp(28px,4vw,44px);line-height:1.2}#${r} .sg-lead{max-width:720px;margin:0 0 24px;color:var(--muted)}#${r} .sg-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}#${r} .sg-field{display:grid;gap:6px}#${r} .sg-field.full{grid-column:1/-1}#${r} label>span{color:var(--muted);font-size:11px}#${r} input,#${r} textarea,#${r} select{width:100%;border:1px solid var(--line);border-radius:10px;padding:10px 12px;color:var(--ink);background:var(--card);outline:none}#${r} textarea{min-height:102px;resize:vertical}#${r} input:focus,#${r} textarea:focus,#${r} select:focus{border-color:var(--red);box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 12%,transparent)}#${r} .sg-era{margin:18px 0;padding:13px 15px;border-left:4px solid var(--red);border-radius:8px;background:color-mix(in srgb,var(--red) 8%,var(--card))}#${r} .sg-era.bad{border-color:#c46a45}#${r} .sg-roster{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}#${r} .sg-char{position:relative;padding:13px;border:1px solid var(--line);border-radius:14px;background:var(--card);cursor:pointer}#${r} .sg-char.on{border-color:var(--red);box-shadow:inset 0 0 0 1px var(--red)}#${r} .sg-char b{display:block}#${r} .sg-char small{display:block;margin-top:3px;color:var(--muted)}#${r} .sg-char em{position:absolute;right:9px;top:8px;color:var(--red);font-size:9px;font-style:normal}#${r} .sg-char-flags{display:flex;gap:5px;margin-top:9px}#${r} .sg-flag{padding:2px 6px;border-radius:999px;background:var(--paper2);color:var(--muted);font-size:9px}#${r} .sg-flag.on{color:#fff;background:var(--red)}#${r} .sg-detail{margin:16px 0;padding:18px;border:1px solid var(--line);border-radius:16px;background:color-mix(in srgb,var(--card) 88%,transparent)}#${r} .sg-detail h3{margin:0 0 12px}#${r} .sg-checks{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px}#${r} .sg-check{display:flex;align-items:center;gap:7px;padding:7px 10px;border:1px solid var(--line);border-radius:999px;background:var(--paper2);cursor:pointer}#${r} .sg-check input{width:auto}#${r} .sg-scene{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 22px}#${r} .sg-scene button{padding:8px 11px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:var(--card);cursor:pointer}#${r} .sg-scene button.on{color:#fff;background:var(--red);border-color:var(--red)}#${r} .sg-preview{display:grid;gap:12px}#${r} .sg-card{padding:17px;border:1px solid var(--line);border-radius:15px;background:var(--card)}#${r} .sg-card h3{margin:0 0 7px}#${r} .sg-card p{margin:0;color:var(--muted)}#${r} .sg-errors{padding:12px 14px;border:1px solid #b95d4b;border-radius:10px;background:color-mix(in srgb,#b95d4b 10%,var(--card));color:#b95d4b}#${r} .sg-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 22px;border-top:1px solid var(--line);background:color-mix(in srgb,var(--paper) 90%,transparent)}#${r} .sg-status{overflow:hidden;color:var(--muted);text-overflow:ellipsis;white-space:nowrap}#${r} .sg-status.error{color:#c05b49}#${r} .sg-status.warning{color:#c48a3f}#${r} .sg-status.success{color:#568e63}#${r} .sg-actions{display:flex;gap:8px}@media(max-width:800px){#${r} .sg-main{grid-template-columns:1fr}#${r} .sg-steps{display:flex;overflow:auto;padding:8px;border-right:0;border-bottom:1px solid var(--line)}#${r} .sg-step{min-width:116px;padding:7px}#${r} .sg-content{padding:22px 14px}#${r} .sg-roster{grid-template-columns:repeat(2,minmax(0,1fr))}#${r} .sg-grid{grid-template-columns:1fr}#${r} .sg-field.full{grid-column:auto}#${r} .sg-status{display:none}#${r} .sg-footer{justify-content:flex-end;padding:8px 12px}#${r} .sg-actions{flex-wrap:wrap;justify-content:flex-end}}`),
            (e.textContent += `#${r}{--paper:#f4e7c7;--paper2:#ead6a6;--ink:#2c2118;--muted:#75624d;--line:rgba(96,65,36,.28);--accent:#a43d2d;--accent2:#6f8a67;--shadow:rgba(55,31,12,.35);--card:rgba(255,248,226,.72);--glow:rgba(188,83,42,.32);--red:var(--accent);--radius-shell:20px;--radius-card:14px;--radius-control:10px;background:radial-gradient(circle at 82% 9%,var(--glow),transparent 31%),linear-gradient(145deg,var(--paper),var(--paper2));border-radius:var(--radius-shell)}#${r}.theme-night{--paper:#211913;--paper2:#352619;--ink:#f2dfba;--muted:#b99f76;--line:rgba(237,196,128,.24);--accent:#d0784b;--accent2:#89a074;--shadow:rgba(0,0,0,.65);--card:rgba(65,44,30,.82);--glow:rgba(220,94,48,.28)}#${r}.theme-star{--paper:#0d1820;--paper2:#111d28;--ink:#e6dcc8;--muted:#7d8fa0;--line:rgba(180,155,110,.22);--accent:#d4a040;--accent2:#5d8d9a;--shadow:rgba(0,0,0,.7);--card:rgba(18,28,38,.8);--glow:rgba(210,160,60,.2)}#${r}.theme-ink{--paper:#eee9dc;--paper2:#d8d0bf;--ink:#171a17;--muted:#5f6158;--line:rgba(20,25,22,.24);--accent:#a12f25;--accent2:#2f6965;--shadow:rgba(25,30,24,.30);--card:rgba(248,245,235,.62);--glow:rgba(40,70,64,.18);background:radial-gradient(ellipse at 70% 12%,rgba(23,26,23,.18),transparent 28%),radial-gradient(ellipse at 18% 74%,rgba(47,105,101,.16),transparent 38%),linear-gradient(135deg,var(--paper),var(--paper2))}#${r} .sg-shell{position:relative;border-radius:var(--radius-shell);overflow:hidden}#${r} .sg-shell:before{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(80,45,20,.025),rgba(80,45,20,.025) 1px,transparent 1px,transparent 9px);opacity:.55}#${r} .sg-head,#${r} .sg-main,#${r} .sg-footer{position:relative;z-index:1}#${r} .sg-head{background:color-mix(in srgb,var(--paper) 76%,transparent);box-shadow:0 1px 0 rgba(255,255,255,.08) inset}#${r} .sg-steps{background:color-mix(in srgb,var(--card) 36%,transparent)}#${r} .sg-step,#${r} .sg-btn,#${r} .sg-close,#${r} input,#${r} textarea,#${r} select{border-radius:var(--radius-control)}#${r} .sg-char,#${r} .sg-detail,#${r} .sg-card{border-radius:var(--radius-card);box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 10px 26px color-mix(in srgb,var(--shadow) 28%,transparent);backdrop-filter:blur(3px)}#${r}.theme-ink .sg-char,#${r}.theme-ink .sg-detail,#${r}.theme-ink .sg-card{border-radius:var(--radius-card);background:rgba(250,247,235,.58)}#${r} .sg-content{scrollbar-color:var(--line) transparent}#${r} .sg-kicker{color:var(--accent)}#${r} .sg-seal{border-color:var(--accent);border-radius:6px;color:var(--accent)}#${r} .sg-step.on{background:color-mix(in srgb,var(--accent) 11%,var(--card))}#${r} .sg-step.on i,#${r} .sg-btn.primary,#${r} .sg-flag.on,#${r} .sg-scene button.on{background:var(--accent);border-color:var(--accent)}#${r} .sg-char.on{border-color:var(--accent);box-shadow:inset 3px 0 0 var(--accent),0 10px 26px color-mix(in srgb,var(--shadow) 28%,transparent)}#${r} .sg-btn:hover{border-color:var(--accent)}#${r} .sg-field input:focus,#${r} .sg-field textarea:focus,#${r} .sg-field select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 2px var(--glow)}#${r} .sg-page{animation:sg-page-in .22s ease-out}@keyframes sg-page-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}`),
            (e.textContent += `#${r} .sg-page-wide{width:min(1180px,100%)}#${r} .sg-selected-bar{position:sticky;top:-30px;z-index:5;margin:0 0 16px;padding:12px 14px;border:1px solid var(--line);border-radius:var(--radius-card);background:color-mix(in srgb,var(--paper) 86%,transparent);box-shadow:0 9px 28px color-mix(in srgb,var(--shadow) 22%,transparent);backdrop-filter:blur(16px)}#${r} .sg-selected-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:9px}#${r} .sg-selected-head b{font-size:13px}#${r} .sg-selected-head span{color:var(--muted);font-size:11px}#${r} .sg-selected-chips{display:flex;gap:7px;overflow:auto;padding:1px 0 3px;scrollbar-width:thin}#${r} .sg-selected-chip{flex:0 0 auto;padding:5px 9px;border:1px solid var(--line);border-radius:999px;color:var(--ink);background:var(--card);cursor:pointer}#${r} .sg-selected-chip:hover{border-color:var(--accent);color:var(--accent)}#${r} .sg-selected-empty{color:var(--muted);font-size:12px}#${r} .sg-roster-workspace{display:grid;grid-template-columns:minmax(250px,310px) minmax(0,1fr);gap:16px;align-items:start}#${r} .sg-roster-panel,#${r} .sg-config-panel{border:1px solid var(--line);border-radius:var(--radius-card);background:color-mix(in srgb,var(--card) 88%,transparent);box-shadow:0 10px 30px color-mix(in srgb,var(--shadow) 22%,transparent);overflow:hidden}#${r} .sg-panel-head{padding:15px;border-bottom:1px solid var(--line)}#${r} .sg-panel-title{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:10px}#${r} .sg-panel-title h2{margin:0;font-size:17px}#${r} .sg-panel-title span{color:var(--muted);font-size:11px}#${r} .sg-search{position:relative}#${r} .sg-search input{padding-left:34px;background:color-mix(in srgb,var(--paper) 56%,var(--card))}#${r} .sg-search:before{content:'⌕';position:absolute;left:12px;top:6px;z-index:1;color:var(--muted);font-size:20px}#${r} .sg-filter-row{display:flex;gap:6px;margin-top:9px;overflow:auto}#${r} .sg-filter{flex:0 0 auto;padding:5px 9px;border:1px solid transparent;border-radius:999px;color:var(--muted);background:transparent;cursor:pointer}#${r} .sg-filter.on{border-color:var(--line);color:var(--ink);background:var(--paper2)}#${r} .sg-catalog{max-height:480px;overflow:auto;padding:7px;scrollbar-width:thin}#${r} .sg-catalog-row{display:grid;grid-template-columns:24px minmax(0,1fr) auto;gap:9px;align-items:center;width:100%;padding:9px;border:0;border-radius:11px;color:var(--ink);text-align:left;background:transparent;cursor:pointer}#${r} .sg-catalog-row:hover{background:color-mix(in srgb,var(--accent) 7%,transparent)}#${r} .sg-catalog-row.on{background:color-mix(in srgb,var(--accent) 10%,var(--card))}#${r} .sg-pick-box{display:grid;width:20px;height:20px;place-items:center;border:1px solid var(--line);border-radius:6px;color:transparent;background:var(--card);font:700 12px/1 sans-serif}#${r} .sg-catalog-row.on .sg-pick-box{border-color:var(--accent);color:#fff;background:var(--accent)}#${r} .sg-catalog-copy{min-width:0}#${r} .sg-catalog-copy b,#${r} .sg-catalog-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#${r} .sg-catalog-copy small{color:var(--muted);font-size:10px}#${r} .sg-kind{padding:2px 6px;border-radius:999px;color:var(--muted);background:var(--paper2);font-size:9px}#${r} .sg-catalog-empty{padding:24px 12px;color:var(--muted);text-align:center}#${r} .sg-config-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 15px;border-bottom:1px solid var(--line)}#${r} .sg-config-toolbar p{margin:0;color:var(--muted);font-size:11px}#${r} .sg-bulk{position:relative}#${r} .sg-bulk summary{padding:6px 10px;border:1px solid var(--line);border-radius:999px;list-style:none;cursor:pointer}#${r} .sg-bulk summary::-webkit-details-marker{display:none}#${r} .sg-bulk-menu{position:absolute;right:0;top:calc(100% + 7px);z-index:8;display:grid;min-width:190px;padding:6px;border:1px solid var(--line);border-radius:12px;background:var(--paper);box-shadow:0 14px 32px var(--shadow)}#${r} .sg-bulk-menu button{padding:8px 10px;border:0;border-radius:8px;color:var(--ink);text-align:left;background:transparent;cursor:pointer}#${r} .sg-bulk-menu button:hover{background:color-mix(in srgb,var(--accent) 9%,transparent)}#${r} .sg-config-list{display:grid;gap:10px;padding:12px}#${r} .sg-config-card{border:1px solid var(--line);border-radius:var(--radius-card);background:color-mix(in srgb,var(--paper) 32%,var(--card));overflow:hidden;transition:border-color .18s,box-shadow .18s}#${r} .sg-config-card.expanded{border-color:color-mix(in srgb,var(--accent) 70%,var(--line));box-shadow:0 10px 24px color-mix(in srgb,var(--shadow) 20%,transparent)}#${r} .sg-config-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:start;padding:13px}#${r} .sg-config-main{display:grid;grid-template-columns:28px minmax(0,1fr);gap:9px;align-items:start;padding:0;border:0;color:inherit;text-align:left;background:transparent;cursor:pointer}#${r} .sg-config-chevron{display:grid;width:26px;height:26px;place-items:center;border-radius:8px;color:var(--muted);background:var(--paper2);transition:transform .18s}#${r} .sg-config-card.expanded .sg-config-chevron{transform:rotate(90deg)}#${r} .sg-config-name{display:flex;align-items:center;gap:7px}#${r} .sg-config-name b{font-size:15px}#${r} .sg-config-summary{display:block;margin-top:3px;color:var(--muted);font-size:11px;white-space:normal}#${r} .sg-config-actions{display:flex;align-items:center;gap:6px}#${r} .sg-mini-btn{padding:5px 8px;border:1px solid var(--line);border-radius:8px;color:var(--muted);background:transparent;cursor:pointer}#${r} .sg-mini-btn:hover{border-color:var(--accent);color:var(--accent)}#${r} .sg-quick-area{padding:0 13px 13px 50px}#${r} .sg-quick-label{display:flex;align-items:baseline;gap:8px;margin-bottom:7px}#${r} .sg-quick-label b{font-size:11px}#${r} .sg-quick-label span{color:var(--muted);font-size:10px}#${r} .sg-quick-switches{display:grid;grid-template-columns:repeat(2,minmax(0,1fr)) minmax(112px,.55fr);gap:8px;padding:0}#${r} .sg-choice{position:relative;display:grid;grid-template-columns:22px minmax(0,1fr);gap:9px;align-items:center;padding:9px 10px;border:1px solid var(--line);border-radius:11px;color:var(--ink);background:color-mix(in srgb,var(--paper) 54%,var(--card));cursor:pointer;transition:border-color .16s,background .16s,transform .16s}#${r} .sg-choice:hover{border-color:var(--accent);transform:translateY(-1px)}#${r} .sg-choice input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}#${r} .sg-choice-box{display:grid;width:21px;height:21px;place-items:center;border:1px solid var(--line);border-radius:6px;color:transparent;background:var(--card);font:700 12px/1 sans-serif}#${r} .sg-choice-copy b,#${r} .sg-choice-copy small{display:block}#${r} .sg-choice-copy b{font-size:12px}#${r} .sg-choice-copy small{margin-top:1px;color:var(--muted);font-size:9px}#${r} .sg-affection-quick{display:grid;grid-template-columns:1fr auto;gap:3px 8px;align-items:center;padding:9px 10px;border:1px solid var(--line);border-radius:11px;background:color-mix(in srgb,var(--paper) 54%,var(--card))}#${r} .sg-affection-quick span{font-size:12px;font-weight:700}#${r} .sg-affection-quick input{grid-row:1/3;grid-column:2;width:64px;padding:6px;text-align:center}#${r} .sg-affection-quick small{color:var(--muted);font-size:9px}#${r} .sg-choice:has(input:checked){border-color:var(--accent);background:color-mix(in srgb,var(--accent) 11%,var(--card));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 24%,transparent)}#${r} .sg-choice:has(input:checked) .sg-choice-box{border-color:var(--accent);color:#fff;background:var(--accent)}#${r} .sg-config-body{padding:15px;border-top:1px solid var(--line);background:color-mix(in srgb,var(--card) 58%,transparent)}#${r} .sg-config-note{margin:12px 0 0;color:var(--muted);font-size:11px}#${r} .sg-config-empty{padding:48px 24px;color:var(--muted);text-align:center}#${r} .sg-fixed-relations{margin-top:16px;border-radius:var(--radius-card)}@media(max-width:900px){#${r} .sg-roster-workspace{grid-template-columns:1fr}#${r} .sg-config-panel{grid-row:1}#${r} .sg-catalog{max-height:340px}#${r} .sg-selected-bar{top:-22px}}@media(max-width:560px){#${r} .sg-config-head{grid-template-columns:1fr}#${r} .sg-config-actions{padding-left:37px}#${r} .sg-quick-area{padding-left:13px}#${r} .sg-quick-switches{grid-template-columns:1fr}#${r} .sg-selected-head{align-items:flex-start;flex-direction:column}}`),
            (e.textContent += `#${r} .sg-opening-tools{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:12px;margin:0 0 16px}#${r} .sg-opening-tool{padding:15px;border:1px solid var(--line);border-radius:var(--radius-card);background:color-mix(in srgb,var(--card) 86%,transparent);box-shadow:0 8px 24px color-mix(in srgb,var(--shadow) 18%,transparent)}#${r} .sg-tool-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:10px}#${r} .sg-tool-head b{display:block;font-size:14px}#${r} .sg-tool-head small{display:block;margin-top:2px;color:var(--muted);font-size:10px}#${r} .sg-length-row{display:grid;grid-template-columns:minmax(110px,.7fr) minmax(0,1.3fr);gap:9px;align-items:center}#${r} .sg-length-presets{display:flex;gap:5px;flex-wrap:wrap}#${r} .sg-length-preset{padding:6px 8px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:var(--paper2);cursor:pointer}#${r} .sg-length-preset.on{border-color:var(--accent);color:#fff;background:var(--accent)}#${r} .sg-reference-summary{display:flex;gap:6px;flex-wrap:wrap;min-height:28px;align-items:center}#${r} .sg-reference-chip{display:flex;align-items:center;gap:5px;padding:4px 7px;border:1px solid var(--line);border-radius:999px;color:var(--ink);background:var(--paper2);font-size:10px}#${r} .sg-reference-chip button{padding:0;border:0;color:var(--accent);background:transparent;cursor:pointer;font-size:14px}#${r} .sg-reference-empty{color:var(--muted);font-size:11px}#${r} .sg-reference-overlay{position:absolute;inset:0;z-index:40;display:grid;place-items:center;padding:18px;background:rgba(12,12,10,.54);backdrop-filter:blur(7px)}#${r} .sg-reference-modal{display:grid;grid-template-rows:auto minmax(0,1fr);width:min(680px,96%);max-height:88%;border:1px solid var(--line);border-radius:18px;color:var(--ink);background:var(--paper);box-shadow:0 24px 70px rgba(0,0,0,.42);overflow:hidden}#${r} .sg-reference-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;border-bottom:1px solid var(--line)}#${r} .sg-reference-head h2{margin:0;font-size:20px}#${r} .sg-reference-body{overflow:auto;padding:16px 18px}#${r} .sg-reference-toolbar{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:12px}#${r} .sg-reference-list{display:grid;gap:6px;max-height:380px;overflow:auto;padding-right:4px;scrollbar-width:thin}#${r} .sg-reference-entry{display:grid;grid-template-columns:22px minmax(0,1fr);gap:9px;align-items:center;padding:9px 10px;border:1px solid var(--line);border-radius:10px;background:var(--card);cursor:pointer}#${r} .sg-reference-entry:hover{border-color:var(--accent)}#${r} .sg-reference-entry input{width:18px;height:18px;accent-color:var(--accent)}#${r} .sg-reference-entry b,#${r} .sg-reference-entry small{display:block}#${r} .sg-reference-entry small{overflow:hidden;color:var(--muted);font-size:9px;text-overflow:ellipsis;white-space:nowrap}#${r} .sg-reference-footer{display:flex;justify-content:space-between;gap:10px;margin-top:12px;color:var(--muted);font-size:10px}#${r} .sg-initvar-note{border-radius:var(--radius-card)}@media(max-width:720px){#${r} .sg-opening-tools{grid-template-columns:1fr}#${r} .sg-reference-toolbar,#${r} .sg-length-row{grid-template-columns:1fr}}`),
            (e.textContent += `#${r} .sg-toolbar-actions{display:flex;align-items:center;gap:7px}#${r} .sg-mini-btn.accent{border-color:color-mix(in srgb,var(--accent) 55%,var(--line));color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,transparent)}#${r} .sg-mini-btn:disabled,#${r} .sg-btn:disabled{cursor:wait;opacity:.58;transform:none}#${r} .sg-long-term{display:grid;gap:12px;margin-top:14px;padding-top:14px;border-top:1px dashed var(--line)}#${r} .sg-long-term-head b,#${r} .sg-long-term-head small{display:block}#${r} .sg-long-term-head small{margin-top:2px;color:var(--muted);font-size:10px}#${r} .sg-adaptation-seed{padding:12px;border:1px solid color-mix(in srgb,var(--accent) 42%,var(--line));border-radius:var(--radius-card);background:color-mix(in srgb,var(--accent) 7%,var(--card))}#${r} .sg-adaptation-seed .sg-field>span{color:var(--accent);font-weight:700}#${r} .sg-persona-strip{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:12px 0;padding:10px 12px;border:1px solid color-mix(in srgb,var(--accent) 35%,var(--line));border-radius:var(--radius-card);background:color-mix(in srgb,var(--accent) 7%,var(--card))}#${r} .sg-persona-strip small{color:var(--muted)}#${r} .sg-generation-flow{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:stretch;margin:16px 0}#${r} .sg-flow-card{padding:13px;border:1px solid var(--line);border-radius:var(--radius-card);background:var(--card)}#${r} .sg-flow-card b,#${r} .sg-flow-card small{display:block}#${r} .sg-flow-card small{margin-top:3px;color:var(--muted)}#${r} .sg-flow-arrow{display:grid;place-items:center;color:var(--accent);font-size:20px}@media(max-width:650px){#${r} .sg-generation-flow{grid-template-columns:1fr}#${r} .sg-flow-arrow{transform:rotate(90deg)}#${r} .sg-config-toolbar{align-items:flex-start;flex-direction:column}#${r} .sg-toolbar-actions{width:100%;flex-wrap:wrap}}`),
            (e.textContent += `#${r} [hidden]{display:none!important}#${r} .sg-head-actions{display:flex;align-items:center;gap:8px}#${r} .sg-api-trigger{display:flex;align-items:center;gap:8px;max-width:230px;padding:7px 10px;border:1px solid var(--line);border-radius:var(--radius-control);color:var(--ink);background:var(--card);cursor:pointer}#${r} .sg-api-trigger:hover{border-color:var(--accent)}#${r} .sg-api-trigger span{color:var(--accent);font-weight:800}#${r} .sg-api-trigger small{overflow:hidden;color:var(--muted);font-size:10px;text-overflow:ellipsis;white-space:nowrap}#${r} .sg-api-modal{grid-template-rows:auto minmax(0,1fr);width:min(720px,96%)!important}#${r} .sg-api-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}#${r} .sg-api-model-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px}#${r} [data-api-models]{margin-top:7px}#${r} .sg-api-note{margin-top:14px;padding:10px 12px;border-left:3px solid var(--accent);border-radius:8px;color:var(--muted);background:color-mix(in srgb,var(--accent) 7%,var(--card));font-size:11px}#${r} .sg-api-actions{justify-content:flex-end;margin-top:14px}@media(max-width:640px){#${r} .sg-api-trigger small{display:none}#${r} .sg-api-grid{grid-template-columns:1fr}#${r} .sg-api-grid .sg-field.full{grid-column:auto}}`),
            (e.textContent += `#${r} .sg-identity-record{margin-top:16px;padding:16px;border:1px solid color-mix(in srgb,var(--accent) 38%,var(--line));border-radius:var(--radius-card);background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 8%,var(--card)),var(--card));box-shadow:0 10px 26px color-mix(in srgb,var(--shadow) 20%,transparent)}#${r} .sg-identity-record-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}#${r} .sg-identity-record-head b,#${r} .sg-identity-record-head small{display:block}#${r} .sg-identity-record-head small{margin-top:2px;color:var(--muted);font-size:10px}#${r} .sg-entry-name{flex:0 0 auto;padding:4px 8px;border:1px solid color-mix(in srgb,var(--accent) 45%,var(--line));border-radius:999px;color:var(--accent);background:color-mix(in srgb,var(--accent) 7%,transparent);font:700 10px/1.4 monospace}#${r} .sg-identity-record dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0}#${r} .sg-identity-record dl>div{min-width:0;padding:9px 10px;border:1px solid var(--line);border-radius:10px;background:color-mix(in srgb,var(--paper) 36%,transparent)}#${r} .sg-identity-record dt{color:var(--muted);font-size:9px;letter-spacing:.08em}#${r} .sg-identity-record dd{display:-webkit-box;overflow:hidden;margin:2px 0 0;color:var(--ink);white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2}#${r} .sg-identity-note{margin:10px 0 0;color:var(--muted);font-size:10px}@media(max-width:560px){#${r} .sg-identity-record-head{flex-direction:column}#${r} .sg-identity-record dl{grid-template-columns:1fr}}`),
            (e.textContent += `#${r} .sg-identity-ai{position:relative;margin:0 0 16px;padding:16px;border:1px solid color-mix(in srgb,var(--accent) 45%,var(--line));border-radius:var(--radius-card);background:radial-gradient(circle at 92% 12%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 34%),color-mix(in srgb,var(--card) 88%,transparent);overflow:hidden}#${r} .sg-identity-ai:before{content:'AI';position:absolute;right:16px;top:5px;color:color-mix(in srgb,var(--accent) 14%,transparent);font:900 58px/1 Georgia,serif;pointer-events:none}#${r} .sg-identity-ai-head{position:relative;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}#${r} .sg-identity-ai-head b,#${r} .sg-identity-ai-head small{display:block}#${r} .sg-identity-ai-head small{margin-top:2px;color:var(--muted);font-size:10px}#${r} .sg-identity-ai textarea{position:relative;min-height:84px}#${r} .sg-identity-ai-actions{position:relative;display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:9px}#${r} .sg-identity-ai-actions small{color:var(--muted);font-size:9px}#${r} .sg-profile-detail{margin-top:16px}#${r} .sg-profile-detail summary{cursor:pointer;font-weight:700}#${r} .sg-profile-detail .sg-grid{margin-top:13px}@media(max-width:560px){#${r} .sg-identity-ai-head,#${r} .sg-identity-ai-actions{align-items:stretch;flex-direction:column}}`),
            q.head.appendChild(e));
        })(),
        (Y = []),
        (U = []),
        (F = ""));
      for (const e of Object.keys(K)) delete K[e];
      (await (async function () {
        let e;
        try {
          e =
            "function" == typeof P.listCharacterProfiles
              ? (await P.listCharacterProfiles()) || []
              : ee();
        } catch (t) {
          (console.warn(
            "[Tàn Minh Dư Tẫn khai cục sinh thành khí] Đọc nhân vật của trình quản lý nhân vật và ảnh minh họa thất bại:",
            t,
          ),
            (e = ee()));
        }
        const t = [];
        try {
          const e = S("getCharWorldbookNames"),
            r = S("getWorldbook");
          if ("function" == typeof e && "function" == typeof r) {
            const a = await e("current"),
              n = [
                ...new Set(
                  [a?.primary, ...(a?.additional || [])].filter(Boolean),
                ),
              ];
            for (const e of n) {
              const a = (await r(e)) || [];
              ((K[e] = a), t.push(...a));
            }
          }
        } catch (e) {
          console.warn("[Tàn Minh Dư Tẫn khai cục sinh thành khí] Quét thiết lập nhân vật hoàn chỉnh thất bại:", e);
        }
        y = d({ officialCharacters: h, profiles: e, worldbookEntries: t });
      })(),
        (function () {
          try {
            I = Z(JSON.parse(X().getItem(o) || "null"));
          } catch {
            I = T();
          }
        })(),
        (O = q.createElement("div")),
        (O.id = r),
        (O.className = `theme-${P.theme || "night"}`),
        O.addEventListener("click", (e) => {
          Ze(e);
        }),
        O.addEventListener("input", et),
        O.addEventListener("change", et),
        q.body.appendChild(O),
        (O.innerHTML =
          '<div class="sg-shell"><div class="sg-config-empty">Đang tải mẫu thời đại Sùng Trinh năm thứ bảy tháng bảy……</div></div>'),
        await (async function () {
          ((L = null), (M = ""));
          try {
            if (P.eraPreset) L = k(P.eraPreset);
            else {
              const t = S("getCharWorldbookNames"),
                r = S("getWorldbook");
              if ("function" != typeof t || "function" != typeof r)
                throw new Error("Tửu quán hiện tại không cung cấp giao diện đọc Thế Giới Thư.");
              const a = await t("current"),
                n = a?.primary || a?.additional?.[0];
              if (!n) throw new Error("Nhân vật hiện tại không gắn kết Thế Giới Thư chính.");
              const i = ((await r(n)) || []).find((e) => e?.name === p);
              if (!i?.content) throw new Error(`Thẻ cơ bản thiếu mẫu thời đại "${p}".`);
              L = e.parse(i.content);
            }
            if (
              "canming-era-preset" !== L?.["Định dạng"] ||
              L?.["Định danh"] !== g ||
              !L?.["Biến lượng"]?.["Thiên hạ bản đồ"]?.["Thái thế khu vực"]
            )
              throw new Error("Định dạng mẫu thời đại không chính xác hoặc nội dung không hoàn chỉnh.");
          } catch (e) {
            M = e?.message || "Không thể đọc mẫu thời đại.";
          }
        })(),
        O?.isConnected && Qe());
    },
    close: tt,
    exportProject: function () {
      return k(I);
    },
    exportPackage: function () {
      return fe();
    },
    compileProject: (e, t) => {
      const r = I,
        a = L;
      ((I = Z(e)), t && (L = k(t)));
      try {
        return fe();
      } finally {
        ((I = r), (L = a));
      }
    },
  };
  globalThis[t] = rt;
  try {
    window.parent && window.parent !== window && (window.parent[t] = rt);
  } catch {}
})();