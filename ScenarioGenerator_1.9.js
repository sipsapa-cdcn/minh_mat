const e = YAML,
  t = _,
  r = z,
  a = r.z.coerce.number().transform((e) => t.clamp(e, 0, 100)),
  n = r.z.coerce.number().transform((e) => Math.max(0, Math.round(e))),
  i = r.z
    .object({
      "Binh khí chủ chiến": r.z.string().prefault("Chưa ghi"),
      "Binh khí viễn xạ": r.z.string().prefault("Không"),
      "Phòng cụ": r.z.string().prefault("Không"),
      "Hỏa khí": r.z.string().prefault("Không"),
      "Tọa kỵ": r.z.string().prefault("Không"),
      "Tỷ lệ tề bị": a.prefault(40),
      "Tỷ lệ hoàn hảo": a.prefault(70),
    })
    .prefault({}),
  o = r.z
    .object({
      "Loại hình": r.z.enum([
        "Đoản kỳ thao luyện",
        "Thường quy chỉnh huấn",
        "Trường kỳ chỉnh huấn",
        "Hưu chỉnh thương binh",
        "Chỉnh doanh hoán trang",
      ]),
      "Doanh mục tiêu": r.z.string().prefault(""),
      "Tướng lĩnh chấp hành": r.z.string().prefault(""),
      "Ngày bắt đầu": r.z.string().prefault(""),
      "Số ngày bắt đầu": n.prefault(0),
      "Số ngày cần thiết": n.prefault(1),
      "Số ngày đã tiến hành": n.prefault(0),
      "Ngân sách ngân lượng": r.z.coerce
        .number()
        .transform((e) => Math.max(0, e))
        .prefault(0),
      "Ngân sách lương thực": r.z.coerce
        .number()
        .transform((e) => Math.max(0, e))
        .prefault(0),
      "Trạng thái": r.z
        .enum(["Đang tiến hành", "Đã hoàn thành", "Đã đình chỉ"])
        .prefault("Đang tiến hành"),
      "Hiệu quả dự kiến": r.z.string().prefault(""),
      "Kết quả hoàn thành": r.z.string().prefault(""),
      "Hiệu quả": r.z
        .object({
          "Huấn luyện": r.z.coerce.number().prefault(0),
          "Sĩ khí": r.z.coerce.number().prefault(0),
          "Hậu cần": r.z.coerce.number().prefault(0),
          "Bì lao": r.z.coerce.number().prefault(0),
          "Khôi phục thương binh": n.prefault(0),
        })
        .prefault({}),
      "Trang bị mục tiêu": r.z
        .object({
          "Đẳng cấp": r.z
            .enum(["Tàn phá", "Giản lậu", "Phổ thông", "Tinh lương", "Tinh nhuệ"])
            .prefault("Phổ thông"),
          "Phương án": r.z.string().prefault("Bộ tốt chế thức"),
        })
        .prefault({}),
      "Ghi chú": r.z.string().prefault(""),
      "_Số ngày thúc đẩy lần cuối": n.prefault(0),
    })
    .prefault({ "Loại hình": "Đoản kỳ thao luyện" }),
  s = r.z
    .object({
      "Ngày tháng": r.z.string().prefault(""),
      "Loại hình": r.z.string().prefault(""),
      "Doanh mục tiêu": r.z.string().prefault(""),
      "Tướng lĩnh chấp hành": r.z.string().prefault(""),
      "Ngân lượng": r.z.coerce.number().prefault(0),
      "Lương thực": r.z.coerce.number().prefault(0),
      "Kết quả": r.z.string().prefault(""),
    })
    .prefault({}),
  c = r.z
    .object({
      "Thế giới vận hành": r.z
        .object({
          "_Định danh khởi đầu": r.z.string().prefault(""),
          "Ngày hiện tại": r.z
            .string()
            .prefault("Sùng Trinh năm thứ bảy mùng một tháng ba"),
          "Năm Công nguyên": r.z.coerce
            .number()
            .transform((e) => Math.trunc(t.clamp(e, 1600, 1700)))
            .prefault(1634),
          "Mười hai canh giờ": r.z
            .object({
              "Canh giờ": r.z
                .enum([
                  "Giờ Tý",
                  "Giờ Sửu",
                  "Giờ Dần",
                  "Giờ Mão",
                  "Giờ Thìn",
                  "Giờ Tỵ",
                  "Giờ Ngọ",
                  "Giờ Mùi",
                  "Giờ Thân",
                  "Giờ Dậu",
                  "Giờ Tuất",
                  "Giờ Hợi",
                ])
                .prefault("Giờ Mão"),
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
          "Địa điểm hiện tại": r.z
            .string()
            .prefault("Nam Trực Lệ An Khánh phủ Đồng Thành huyện nha"),
          "Thời tiết": r.z.string().prefault("Trời quang"),
          "Bối cảnh": r.z.enum(["SFW", "NSFW", "WAR"]).prefault("SFW"),
          "Số ngày vận hành": r.z.coerce.number().prefault(1),
        })
        .prefault({}),
      "Nhân vật chính": r.z
        .object({
          "Chức quan": r.z.string().prefault("Đồng Thành huyện nha tạo lệ"),
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
          "Nhân vật có mặt": r.z
            .array(r.z.string())
            .transform((e) => [...new Set(e.map((e) => e.trim()).filter(Boolean))])
            .prefault([]),
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
                })
                .prefault({ "Thân phận": "", "Hảo cảm độ": 0 }),
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
                })
                .prefault({ "Thân phận": "", "Hảo cảm độ": 0 }),
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
                })
                .prefault({ "Thân phận": "", "Hảo cảm độ": 0, "Trung tâm": 50 }),
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
                })
                .prefault({ "Thân phận": "", "Hảo cảm độ": 0 }),
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
                })
                .prefault({ "Thân phận": "", "Cừu hận độ": 0 }),
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
                })
                .prefault({ "Thân phận": "", "Hảo cảm độ": 0 }),
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
                  "Sinh dục": r.z
                    .object({
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
                      "Phải xử nữ không": r.z.boolean().prefault(!0),
                      "Số lần đồng phòng": n.prefault(0),
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
                  "Biên chế trang bị": i,
                  "Đẳng cấp": r.z
                    .enum(["Ô hợp", "Tân mộ", "Khả dụng", "Lương hảo", "Tinh nhuệ", "Danh quân"])
                    .prefault("Tân mộ"),
                  "Tướng lĩnh": r.z.string().prefault(""),
                  "Trú địa": r.z.string().prefault(""),
                  "Trạng thái": r.z
                    .enum([
                      "Đợi lệnh",
                      "Hành quân",
                      "Tác chiến",
                      "Huấn luyện",
                      "Hoán trang",
                      "Hưu chỉnh",
                      "Thiếu lương",
                      "Hoa biến",
                    ])
                    .prefault("Đợi lệnh"),
                  "Bì lao": a.prefault(0),
                  "Thương binh": n.prefault(0),
                  "Số tháng nợ lương": n.prefault(0),
                  "Số ngày thiếu lương": n.prefault(0),
                  "Ghi chép quân vụ": r.z
                    .object({
                      "Lần khao thưởng trước": r.z.string().prefault(""),
                      "Tháng khao thưởng": r.z.string().prefault(""),
                      "Số lần khao thưởng tháng này": n.prefault(0),
                    })
                    .prefault({}),
                })
                .prefault({
                  "Binh chủng": "Bộ binh",
                  "Nhân số": 0,
                  "Sĩ khí": 50,
                  "Huấn luyện": 30,
                  "Hậu cần": 50,
                  "Trang bị": "Giản lậu",
                  "Biên chế trang bị": {},
                  "Đẳng cấp": "Tân mộ",
                  "Tướng lĩnh": "",
                  "Trú địa": "",
                  "Trạng thái": "Đợi lệnh",
                  "Bì lao": 0,
                  "Thương binh": 0,
                  "Số tháng nợ lương": 0,
                  "Số ngày thiếu lương": 0,
                  "Ghi chép quân vụ": {},
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
                .prefault({
                  "Thống suất": 50,
                  "Võ lực": 50,
                  "Trí mưu": 50,
                  "Chính trị": 50,
                  "Uy vọng": 50,
                }),
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
                .prefault({
                  "Ngày tháng": "",
                  "Đối thủ": "",
                  "Kết quả": "",
                  "Chiến lợi phẩm": "",
                  "Tóm tắt": "",
                }),
            )
            .prefault({}),
          "Quân lệnh": r.z.record(r.z.string(), o).prefault({}),
          "Ghi chép quân lệnh": r.z.array(s).prefault([]),
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
                    .prefault({}),
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
                    .prefault({}),
                )
                .prefault({}),
            })
            .optional(),
          "Lần kết toán trước": r.z
            .record(
              r.z.string(),
              r.z.union([r.z.string(), r.z.number(), r.z.boolean()]),
            )
            .prefault({}),
          "_Ký hiệu kết toán": r.z.string().prefault(""),
        })
        .prefault({}),
      "Khoa kỹ": r.z
        .record(
          r.z.string(),
          r.z
            .object({
              "Tiến độ": r.z
                .enum([
                  "Chưa bắt đầu",
                  "Đang thử nghiệm",
                  "Thí điểm quy mô nhỏ",
                  "Đã phổ biến",
                ])
                .prefault("Chưa bắt đầu"),
              "Hiện trạng": r.z.string().prefault(""),
            })
            .prefault({ "Tiến độ": "Chưa bắt đầu", "Hiện trạng": "" }),
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
                    .enum([
                      "Phe nhân vật chính",
                      "Minh Đình",
                      "Hậu Kim",
                      "Lưu khấu",
                      "Địa phương trung lập",
                      "Chưa rõ",
                    ])
                    .prefault("Chưa rõ"),
                  "Trạng thái tranh đoạt": r.z
                    .enum([
                      "Ổn định",
                      "Động đãng",
                      "Đang tranh đoạt",
                      "Luân hãm",
                      "Mất kiểm soát",
                    ])
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
                        .prefault({
                          "Lực ảnh hưởng": 0,
                          "Hiện diện quân sự": "",
                          "Miêu tả": "",
                        }),
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
          "Thế cục tuyến": r.z
            .record(
              r.z.string(),
              r.z
                .object({
                  "Khu vực": r.z.string().prefault(""),
                  "Bên tham gia": r.z.string().prefault(""),
                  "Thái thế hiện tại": r.z.string().prefault(""),
                  "Động lực thúc đẩy": r.z.string().prefault(""),
                  "Biến chuyển gần đây": r.z.string().prefault(""),
                  "Độ sôi động": r.z
                    .enum(["Thấp", "Trung bình", "Cao"])
                    .prefault("Trung bình"),
                })
                .prefault({
                  "Khu vực": "",
                  "Bên tham gia": "",
                  "Thái thế hiện tại": "",
                  "Động lực thúc đẩy": "",
                  "Biến chuyển gần đây": "",
                  "Độ sôi động": "Trung bình",
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
                  "Trạng thái": r.z
                    .enum([
                      "Chưa tiếp xúc",
                      "Quan sát",
                      "Hữu hảo",
                      "Kết minh",
                      "Địch đối",
                      "Giao chiến",
                      "Phụ dung",
                      "Tông chủ",
                      "Đã đầu hàng",
                      "Đã diệt vong",
                    ])
                    .prefault("Chưa tiếp xúc"),
                  "Tóm tắt quan hệ": r.z.string().prefault(""),
                  "Kinh tế": r.z
                    .object({
                      "Tình trạng tài chính": r.z
                        .enum([
                          "Chưa rõ",
                          "Sụp đổ",
                          "Túng quẫn",
                          "Bình ổn",
                          "Phú túc",
                          "Hùng hậu",
                        ])
                        .prefault("Chưa rõ"),
                      "Trạng thái lương thảo": r.z
                        .enum([
                          "Chưa rõ",
                          "Cạn kiệt",
                          "Thiếu hụt",
                          "Tạm ổn",
                          "Sung túc",
                        ])
                        .prefault("Chưa rõ"),
                    })
                    .prefault({}),
                  "Quân sự": r.z
                    .object({
                      "Tổng binh lực": r.z.coerce.number().prefault(0),
                      "Binh chủng chủ lực": r.z.string().prefault("Chưa rõ"),
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
                                .enum([
                                  "Tàn phá",
                                  "Giản lậu",
                                  "Phổ thông",
                                  "Tinh lương",
                                  "Tinh nhuệ",
                                ])
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
                  "Tóm tắt quan hệ": "",
                  "Kinh tế": {},
                  "Quân sự": {},
                }),
            )
            .prefault({}),
          "Hạng mục chưa quyết": r.z
            .record(
              r.z.string(),
              r.z
                .object({
                  "Trạng thái": r.z
                    .enum(["Chờ xử lý", "Đang tiến hành", "Đang chờ", "Tạm hoãn"])
                    .prefault("Chờ xử lý"),
                  "Khái yếu": r.z.string().prefault(""),
                  "Hiện trạng": r.z.string().prefault(""),
                  "Nhắc nhở": r.z.string().prefault(""),
                })
                .prefault({
                  "Trạng thái": "Chờ xử lý",
                  "Khái yếu": "",
                  "Hiện trạng": "",
                  "Nhắc nhở": "",
                }),
            )
            .prefault({}),
          "Nhiệm vụ hiện tại": r.z
            .record(
              r.z.string(),
              r.z
                .object({
                  "Trạng thái": r.z.string().prefault(""),
                  "Khái yếu": r.z.string().prefault(""),
                  "Hiện trạng": r.z.string().prefault(""),
                  "Nhắc nhở": r.z.string().prefault(""),
                  "Loại hình": r.z.string().prefault(""),
                  "Mục tiêu": r.z.string().prefault(""),
                  "Tiến triển": r.z.string().prefault(""),
                  "Thuyết minh": r.z.string().prefault(""),
                  "Tiến độ": r.z.string().prefault(""),
                })
                .prefault({}),
            )
            .optional(),
        })
        .transform((e) => {
          const t = { ...(e["Hạng mục chưa quyết"] || {}) };
          for (const [r, a] of Object.entries(e["Nhiệm vụ hiện tại"] || {})) {
            if (Object.hasOwn(t, r)) continue;
            const e =
                a["Hiện trạng"] || a["Tiến triển"] || a["Tiến độ"] || "",
              n = `${a["Trạng thái"] || ""} ${e}`;
            let i = "Đang tiến hành";
            /Tạm hoãn|Gác lại|Tạm dừng/i.test(n)
              ? (i = "Tạm hoãn")
              : /Đang chờ|Chờ.*(?:hồi âm|đáp phúc|tin tức|thời cơ|kết quả|đến nơi)|Tĩnh hậu/i.test(
                    n,
                  )
                ? (i = "Đang chờ")
                : (!/Chưa bắt đầu|Chờ xử lý|Chờ làm/i.test(n) && n.trim()) ||
                  (i = "Chờ xử lý");
            t[r] = {
              "Trạng thái": i,
              "Khái yếu":
                a["Khái yếu"] || a["Mục tiêu"] || a["Thuyết minh"] || "",
              "Hiện trạng": e,
              "Nhắc nhở": a["Nhắc nhở"] || "",
            };
          }
          return {
            "Quan hệ thế lực": e["Quan hệ thế lực"],
            "Hạng mục chưa quyết": t,
          };
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
        })
        .prefault({}),
    })
    .transform((e) => {
      const t = e["Kinh tế"]?.["Lưu thủy"];
      if (!t) return e;
      const r = {
          ...(e["Thời cục và nhiệm vụ"]?.["Hạng mục chưa quyết"] || {}),
        },
        a = (e) => {
          if (!Object.hasOwn(r, e)) return e;
          if (!Object.hasOwn(r, `${e} (Lưu thủy cũ)`)) return `${e} (Lưu thủy cũ)`;
          let t = 2;
          for (; Object.hasOwn(r, `${e} (Lưu thủy cũ ${t})`); ) t++;
          return `${e} (Lưu thủy cũ ${t})`;
        },
        n = (e, t) => {
          for (const [n, i] of Object.entries(e || {})) {
            const e = a(`${"income" === t ? "Chờ thu" : "Chờ chi"}：${n}`),
              o = Number(i["Ngân lượng"]) || 0,
              s = String(i["Thuyết minh"] || "").trim();
            r[e] = {
              "Trạng thái": "Đang chờ",
              "Khái yếu": `${n} còn có ${o} lượng bạch ngân ${"income" === t ? "phải thu" : "phải trả"}, chưa thực tế bàn giao.${s ? ` Sự do: ${s}` : ""}`,
              "Hiện trạng":
                "Chuyển đổi từ lưu thủy bản lưu cũ 1.8, hiện vẫn chờ thanh toán.",
              "Nhắc nhở":
                "income" === t
                  ? "Sau khi thực nhận vào tài khoản cập nhật Tư khố nhân vật chính, và xóa hạng mục này."
                  : "Sau khi thực tế chi trả cập nhật Tư khố nhân vật chính, và xóa hạng mục này.",
            };
          }
        };
      n(t["Nguyệt nhập"], "income");
      n(t["Nguyệt xuất"], "expense");
      const { "Lưu thủy": i, ...o } = e["Kinh tế"];
      return {
        ...e,
        "Kinh tế": o,
        "Thời cục và nhiệm vụ": {
          ...e["Thời cục và nhiệm vụ"],
          "Hạng mục chưa quyết": r,
        },
      };
    });

function l(e) {
  const t = String(e?.apiurl || "").trim();
  if (!t) return !1;
  try {
    return "api.deepseek.com" === new URL(t).hostname.toLowerCase();
  } catch {
    return /^https?:\/\/api\.deepseek\.com(?:[/:?#]|$)/i.test(t);
  }
}

function p(e) {
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

function d(e, t) {
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

function g(e, t = {}) {
  const r = String(t.provider || "API AI").trim(),
    a = p(e),
    n = d(e, a),
    i = (function (e) {
      return !e ||
        /^(?:bad request|payment required|unauthorized|forbidden|too many requests)$/i.test(
          e,
        )
        ? ""
        : ` Lỗi gốc: ${e.slice(0, 240)}`;
    })(a);
  return 401 === n
    ? new Error(
        `${r} xác thực thất bại (HTTP 401): API Key không hợp lệ, đã bị thu hồi hoặc điền sai.${i}`,
      )
    : 402 === n
      ? new Error(
          `${r} số dư không đủ hoặc chưa kích hoạt thanh toán (HTTP 402): Vui lòng nạp tiền, kích hoạt thanh toán hoặc đổi API Key có hạn ngạch.${i}`,
        )
      : 403 === n
        ? new Error(
            `${r} từ chối truy cập (HTTP 403): API Key hiện tại không có quyền truy cập mô hình hoặc giao diện này.${i}`,
          )
        : 404 === n
          ? new Error(
              `${r} giao diện hoặc mô hình không tồn tại (HTTP 404): Vui lòng kiểm tra địa chỉ API và tên mô hình.${i}`,
            )
          : 408 === n
            ? new Error(
                `${r} yêu cầu quá hạn (HTTP 408): Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.${i}`,
              )
            : 413 === n
              ? new Error(
                  `${r} từ chối yêu cầu quá lớn (HTTP 413): Vui lòng giảm bớt Sách thế giới tham khảo, prompt hoặc nội dung sinh ra.${i}`,
                )
              : 429 === n
                ? new Error(
                    `${r} yêu cầu quá thường xuyên hoặc chạm trần hạn ngạch (HTTP 429): Vui lòng đợi giới hạn tốc độ phục hồi hoặc kiểm tra hạn ngạch tài khoản.${i}`,
                  )
                : [500, 502, 503, 504].includes(n)
                  ? new Error(
                      `${r} dịch vụ tạm thời không khả dụng (HTTP ${n}): Đây là sự cố từ phía máy chủ thượng nguồn, vui lòng thử lại sau.${i}`,
                    )
                  : /model[\s\S]{0,80}(?:not found|does not exist|invalid|unavailable)|unknown model/i.test(
                        a,
                      )
                    ? new Error(
                        `${r} không chấp nhận tên mô hình hiện tại: Vui lòng kéo lại danh sách mô hình và chọn mô hình khả dụng.${i}`,
                      )
                    : /context length|maximum context|too many tokens|token limit|prompt is too long/i.test(
                          a,
                        )
                      ? new Error(
                          `${r} vượt quá giới hạn ngữ cảnh: Vui lòng giảm bớt độ dài Sách thế giới tham khảo hoặc prompt.${i}`,
                        )
                      : /response[_ -]?format|json[_ -]?schema|structured output/i.test(
                            a,
                          )
                        ? new Error(
                            `${r} không hỗ trợ định dạng đầu ra có cấu trúc hiện tại: Vui lòng đổi mô hình tương thích hoặc giao thức API.${i}`,
                          )
                        : 400 === n
                          ? new Error(
                              `${r} từ chối yêu cầu (HTTP 400): Vui lòng kiểm tra tên mô hình, giao thức API, phạm vi tham số và độ dài prompt.${i}`,
                            )
                          : /failed to fetch|network error|networkerror|econnreset|econnrefused|socket hang up/i.test(
                                a,
                              )
                            ? new Error(
                                `${r} kết nối mạng thất bại: Vui lòng kiểm tra địa chỉ API, proxy và kết nối mạng.${i}`,
                              )
                            : !a || /^(?:error:\s*)?<none>$/i.test(a)
                              ? new Error(
                                  `${r} yêu cầu thất bại nhưng Tavern Helper không trả về thông tin lỗi cụ thể; vui lòng kiểm tra bảng điều khiển hoặc nhật ký máy chủ Quán Rượu.`,
                                )
                              : e instanceof Error
                                ? e
                                : new Error(a);
}

function u(e) {
  const t = p(e),
    r = d(e, t);
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

const m = (e) => [
  ...new Set(
    (Array.isArray(e) ? e : [])
      .map((e) => String(e || "").trim())
      .filter(Boolean),
  ),
];

function f(e) {
  const t = String(e?.content || ""),
    r = [];
  for (const e of t.matchAll(/<(?:角色设定|Thiết lập nhân vật):([^>\r\n]+?)_SFW>/gi))
    r.push(e[1].trim());
  if (!r.length) {
    const t = String(e?.name || "")
      .trim()
      .match(/^(.+?)_SFW(?:（(?:导入|Đạo nhập)(?:\d+)?）)?$/i);
    t && r.push(t[1].trim());
  }
  return m(r);
}

function b({
  officialCharacters: e = [],
  profiles: t = [],
  worldbookEntries: r = [],
} = {}) {
  const a = [],
    n = new Map(),
    i = (e, t, r) => {
      const i = String(e?.name || "").trim();
      if (!i) return null;
      const o = String(e?.summary || e?.title || r || "").trim(),
        s = m(e?.worldbookEntries || e?.personaEntries),
        c = m(e?.aliases),
        l = n.get(i);
      if (l)
        return (
          (l.worldbookEntries = m([...l.worldbookEntries, ...s])),
          (l.aliases = m([...l.aliases, ...c])),
          !l.summary && o && (l.summary = o),
          l
        );
      const p = {
        name: i,
        summary: o || "Nhân vật mở rộng trong thẻ nhân vật hiện tại",
        lock: e?.lock || ("official" === t ? "free" : "custom"),
        source: e?.source || t,
        aliases: c,
        worldbookEntries: s,
      };
      return a.push(p), n.set(i, p), p;
    };
  for (const t of e) i(t, "official", "");
  for (const e of Array.isArray(t) ? t : [])
    i(e, "profile", "Nhân vật mở rộng trong Trình quản lý Nhân vật và Chân dung");
  for (const e of Array.isArray(r) ? r : [])
    for (const t of f(e)) {
      const r = i(
        { name: t, worldbookEntries: [e.name] },
        "worldbook",
        "Thiết lập nhân vật hoàn chỉnh trong Sách thế giới của thẻ hiện tại",
      );
      r && (r.worldbookEntries = m([...r.worldbookEntries, String(e.name || "").trim()]));
    }
  return a;
}

function h(e) {
  return String(e ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[。；;]+$/, "");
}

function y(e) {
  return h(e).replace(/[\s，,。；;：:、]/g, "");
}

function x(...e) {
  const t = [];
  for (const r of e) {
    const e = h(r),
      a = y(e);
    if (!a) continue;
    if (t.findIndex((e) => y(e).includes(a)) >= 0) continue;
    const n = t.findIndex((e) => a.includes(y(e)));
    n >= 0 ? (t[n] = e) : t.push(e);
  }
  return t.join("；");
}

function v(e) {
  if (!e) return [];
  const t = (e, t = "") => {
    const r =
      e && "object" == typeof e && !Array.isArray(e) ? { ...e } : {};
    return { ...r, name: String(r.name || t).trim() };
  };
  return Array.isArray(e)
    ? e.map((e) => t(e))
    : "object" != typeof e
      ? []
      : Object.hasOwn(e, "name")
        ? [t(e)]
        : Object.entries(e).map(([e, r]) => t(r, e));
}

(() => {
  const t = "CanmingScenarioGenerator",
    r = "canming-scenario-generator-root",
    a = "canming-scenario-generator-style",
    n = "canming-1.9:scenario-generator:project:v1",
    i = "canming-1.9:generator:api",
    o = "[scenario_generator] Mẫu Sùng Trinh năm thứ bảy tháng bảy",
    s = "cmyj.era.chongzhen-7-07",
    p = "[scenario]<user> Thân phận",
    d = 12e4,
    m =
      /<!-- CANMING_CHARACTER_ADAPTATION_START -->[\s\S]*?<!-- CANMING_CHARACTER_ADAPTATION_END -->/g,
    f = {
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
      ["Anna", "Con gái thương nhân Hà Lan thông thạo sổ sách chữ Hán"],
      ["Bạch Dao", "Giáo chủ Bạch Liên giáo lấy loạn thế làm bàn cờ"],
      ["Thúy Nhi", "Nha hoàn nhà nghèo lắm lời nhưng nhiệt tâm"],
      ["Hồng Thiên Muội", "Thiếu nữ kỳ ảo biến thần dụ thành việc thực tế"],
      ["Lâm Tri Hạ", "Ái nữ độc nhất của nhà buôn hoạt bát dịu dàng"],
      ["Liễu Thị", "Khuê tú danh gia một thời bị cuộc sống thị giếng che lấp"],
      ["Lục Vãn Tinh", "Nữ võ sư phương Bắc ôm kiếm độc hành"],
      ["Tê Nguyệt", "Cô em gái biểu lộ tâm ý qua từng cử chỉ nhỏ"],
      ["Tê Vân", "Người chị cả gánh vác làm bình phong che chở gia đình"],
      ["Thẩm Thanh Yến", "Tài nữ thị giếng mắt cao mồm nhọn"],
      [
        "Tô Vãn Đường",
        "Người phụ nữ đương gia nhút nhát quyết đoán nhưng chưa từng buông tay",
      ],
      ["Tô Vãn Nguyệt", "Góa phụ biên trấn miệng độc tay vững"],
      ["Ôn Tố Huyền", "Nữ đầu mục bò lên từ trong doanh trại lưu khấu"],
      ["Chu Thị", "Nữ chưởng quỹ lấy sự đời từng trải làm bùa hộ mệnh"],
      ["Thường Bưu", "Bổ dịch tầng lớp dưới lỗ mãng thẳng thắn trượng nghĩa"],
      ["Cố Minh Viễn", "Tú tài sa sút miệng độc tâm tế"],
      ["Thẩm Đại Trụ", "Đồ tể thị giếng khờ khạo ngay thẳng cần cù"],
      ["Triệu Nghiễn", "Con nuôi lanh lợi trầm mặc lại trọng tình cảm"],
      ["Phương Tử Khâm", "Thiếu nữ họ Phương say mê toán lý cách trí", "family"],
      ["Dương Nhĩ Minh", "Tri huyện Đồng Thành thời Sùng Trinh", "history"],
      ["Phương Khổng Chiếu", "Quan lại danh gia Đồng Thành Phương thị", "history"],
      ["Phương Dĩ Trí", "Danh sĩ Phục Xã kiêm học giả cách trí", "history"],
      ["Liễu Như Thị", "Tài nữ Tần Hoài", "history"],
      ["Trần Viên Viên", "Nữ nhạc Lê viên Tô Châu", "history"],
      ["Chu Hoàng Hậu", "Hoàng hậu Sùng Trinh", "history"],
      ["Chu Huy Đề", "Ái nữ của Minh Quang Tông", "history"],
      ["Trương Yên", "Góa phụ của Minh Hi Tông (Ý An Hoàng Hậu)", "history"],
    ].map(([e, t, r = "free"]) => ({ name: e, summary: t, lock: r }));
  let y = b({ officialCharacters: h });
  const w = [
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
    k = [
      "Thượng tư",
      "Cố hữu và đồng liêu",
      "Hạ thuộc và mạc liêu",
      "Tam giáo cửu lưu",
      "Cừu địch",
      "Thân thuộc",
      "Tư duy",
    ],
    S = ["Thê", "Thiếp", "Thông phòng", "Hồng nhan", "Nữ quyến"],
    j = (e) => JSON.parse(JSON.stringify(e)),
    A = (e) => globalThis[e] ?? window.parent?.[e],
    E = (e) =>
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
    C = (e) =>
      String(e || "my-origin")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fff\u00C0-\u024F\u1EA0-\u1EF9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 56) || "my-origin",
    N = (e) => {
      const t = "\0CMYJ_USER_TOKEN\0";
      return String(e ?? "")
        .replace(/<\s*user\s*>/gi, t)
        .replace(/\{\{\s*user\s*\}\}/gi, t)
        .replace(/\buser\b/gi, t)
        .replaceAll(t, "<user>");
    },
    O = (e) =>
      "string" == typeof e
        ? N(e)
        : Array.isArray(e)
          ? e.map(O)
          : e && "object" == typeof e
            ? Object.fromEntries(
                Object.entries(e).map(([e, t]) => [e, O(t)]),
              )
            : e;

  function T(e) {
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

  function q() {
    return {
      format: "canming-scenario-project",
      version: 2,
      eraId: s,
      step: 1,
      title: "Khai cục Tàn Minh của tôi",
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
        shichen: "Giờ Tỵ",
        ke: "Sơ khắc",
        weather: "Trời quang",
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
        name: "Màn thứ nhất",
        hook: "",
        body: "",
        targetWords: 1200,
        referenceEntries: [],
      },
      initialization: { patch: {}, summary: "", stale: !0, generatedAt: "" },
      characters: Object.fromEntries(y.map((e) => [e.name, T(e)])),
    };
  }

  let P = document,
    I = {},
    L = null,
    M = q(),
    B = null,
    W = "",
    R = !1,
    J = "",
    D = "info",
    H = "",
    U = "all";
  const K = new Set();
  let F = [];
  const V = {};
  let Y = "",
    G = "",
    X = [],
    Q = "";

  function Z() {
    return P.defaultView?.localStorage ?? localStorage;
  }

  function ee() {
    try {
      Z().setItem(n, JSON.stringify(M));
    } catch {}
  }

  function te(e) {
    y = b({ officialCharacters: y });
    const t = q(),
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
            a = { ...T(t), ...r };
          (a.adaptationBrief = String(r.adaptationBrief || "")),
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
            ]);
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
      (r.initialization.patch = (function (e) {
        const t = e?.["Thời cục và nhiệm vụ"];
        if (!t || "object" != typeof t) return e;
        const r =
            t["Nhiệm vụ hiện tại"] && "object" == typeof t["Nhiệm vụ hiện tại"]
              ? t["Nhiệm vụ hiện tại"]
              : {},
          a =
            t["Hạng mục chưa quyết"] &&
            "object" == typeof t["Hạng mục chưa quyết"]
              ? t["Hạng mục chưa quyết"]
              : {};
        if (!Object.keys(r).length && !Object.hasOwn(t, "Nhiệm vụ hiện tại"))
          return e;
        const n = (e, t) => {
          const r = `${String(e || "")} ${String(t || "")}`;
          return ["Chờ xử lý", "Đang tiến hành", "Đang chờ", "Tạm hoãn"].includes(
            String(e || ""),
          )
            ? e
            : /Tạm hoãn|Gác lại|Tạm dừng/i.test(r)
              ? "Tạm hoãn"
              : /Đang chờ|Chờ.*(?:hồi âm|đáp phúc|tin tức|thời cơ|kết quả|đến nơi)|Tĩnh hậu/i.test(
                    r,
                  )
                ? "Đang chờ"
                : /Chưa bắt đầu|Chờ xử lý|Chờ làm/i.test(r)
                  ? "Chờ xử lý"
                  : r.trim()
                    ? "Đang tiến hành"
                    : "Chờ xử lý";
        };
        t["Hạng mục chưa quyết"] = { ...a };
        for (const [e, a] of Object.entries(r)) {
          if (Object.hasOwn(t["Hạng mục chưa quyết"], e)) continue;
          const r = a && "object" == typeof a ? a : {},
            i = r["Hiện trạng"] || r["Tiến triển"] || r["Tiến độ"] || "";
          t["Hạng mục chưa quyết"][e] = {
            "Trạng thái": n(r["Trạng thái"], i),
            "Khái yếu": r["Khái yếu"] || r["Mục tiêu"] || r["Thuyết minh"] || "",
            "Hiện trạng": i,
            "Nhắc nhở": r["Nhắc nhở"] || "",
          };
        }
        return delete t["Nhiệm vụ hiện tại"], e;
      })(
        r.initialization.patch && "object" == typeof r.initialization.patch
          ? r.initialization.patch
          : {},
      )),
      e?.initialization &&
        !Object.hasOwn(e.initialization, "stale") &&
        Object.keys(r.initialization.patch).length &&
        (r.initialization.stale = !1),
      r
    );
  }

  function re() {
    try {
      const e = JSON.parse(
        Z().getItem("canming-afterglow-1.9:character-profiles-v1") || "null",
      );
      return 1 === e?.version && Array.isArray(e.profiles) ? e.profiles : [];
    } catch {
      return [];
    }
  }

  function ae(e, t = "info") {
    ((J = e), (D = t));
    const r = L?.querySelector(".sg-status");
    r && ((r.textContent = J), (r.title = J), (r.className = `sg-status ${D}`)),
      "error" === t && console.error("[Trình tạo mở đầu Tàn Minh Dư Tẫn]", J);
  }

  function ne() {
    M.initialization ||
      (M.initialization = {
        patch: {},
        summary: "",
        stale: !0,
        generatedAt: "",
      }),
      (M.initialization.stale = !0);
  }

  async function ie(e) {
    if (!e || V[e]) return;
    const t = A("getWorldbook");
    if ("function" != typeof t)
      throw new Error("Quán Rượu hiện tại không cung cấp giao diện đọc Sách thế giới.");
    V[e] = (await t(e)) || [];
  }

  function oe(e) {
    return String(e || "")
      .replace(m, "")
      .trim();
  }

  async function se(e) {
    if (!e.length) return "";
    X.length ||
      (await (async function () {
        const e = A("getCharWorldbookNames");
        if ("function" != typeof e)
          throw new Error(
            "Quán Rượu hiện tại không cung cấp giao diện đọc Sách thế giới của nhân vật.",
          );
        const t = await e("current");
        if (
          ((X = [
            ...new Set([t?.primary, ...(t?.additional || [])].filter(Boolean)),
          ]),
          !X.length)
        )
          throw new Error("Nhân vật hiện tại chưa gắn Sách thế giới.");
        for (const e of X) await ie(e);
        return X;
      })());
    const t = [],
      r = [];
    for (const a of e) {
      const e = M.characters[a.name],
        n = [
          ...new Set([
            ...(a.worldbookEntries || []),
            ...(e?.personaEntries || []),
            `${a.name}_SFW`,
            a.name,
          ]),
        ],
        i = [];
      for (const e of X)
        for (const t of V[e] || [])
          n.includes(t?.name) &&
            t?.content &&
            i.push({ source: e, name: t.name, content: t.content });
      if (i.length)
        for (const e of i)
          t.push(`[${e.source} / ${e.name}]\n${oe(e.content)}`);
      else r.push(a.name);
    }
    if (r.length)
      throw new Error(
        `Những nhân vật này chưa liên kết thiết lập nhân vật hoàn chỉnh có thể đọc: ${r.join("、")}. Vui lòng liên kết mục Sách thế giới cho nhân vật trong "Trình quản lý Nhân vật và Chân dung" trước.`,
      );
    const a = t.join("\n\n");
    if (a.length > d)
      throw new Error(
        `Thiết lập của các nhân vật tại hiện trường tổng cộng ${a.length} ký tự, vượt quá giới hạn 120.000 ký tự. Vui lòng giảm bớt nhân vật có mặt ở cảnh mở đầu.`,
      );
    return a;
  }

  function ce(e, t) {
    const r = {
      "Thân phận": t.identity || `Nhân vật ${M.protagonist.location}`,
    };
    return "Cừu địch" === t.category
      ? { ...r, "Cừu hận độ": Ee(-t.affection, 0, 100) }
      : "Hạ thuộc và mạc liêu" === t.category
        ? {
            ...r,
            "Hảo cảm độ": Ee(t.affection, -100, 100),
            "Trung tâm": Ee(t.loyalty, 0, 100),
          }
        : "Tư duy" === t.category
          ? {
              ...r,
              "Quan hệ": S.includes(t.privateRelation)
                ? t.privateRelation
                : "Hồng nhan",
              "Hảo cảm độ": Ee(t.affection, -100, 100),
              "Trung tâm": Ee(t.loyalty, 0, 100),
              "Sinh dục": {
                "Phải xử nữ không": !0,
                "Số lần đồng phòng": 0,
                "Chu kỳ": 1,
                "Thời kỳ": "An toàn kỳ",
                "Trạng thái": "Chưa mang thai",
                "Lần đồng phòng cuối": {
                  "Ngày tháng": "",
                  "Ngày chu kỳ": 0,
                  "Xác suất phán định": 0,
                },
                "Dự sinh kỳ": "",
                "_Số ngày dự sinh": 0,
                "_Số ngày sau sinh": 0,
              },
            }
          : { ...r, "Hảo cảm độ": Ee(t.affection, -100, 100) };
  }

  function le(e, t) {
    if (!t || "object" != typeof t || Array.isArray(t)) return e;
    for (const [r, a] of Object.entries(t))
      if (a && "object" == typeof a && !Array.isArray(a)) {
        const t =
          e[r] && "object" == typeof e[r] && !Array.isArray(e[r]) ? e[r] : {};
        e[r] = le(t, a);
      } else e[r] = a;
    return e;
  }

  function pe(e) {
    const t = e && "object" == typeof e ? j(e) : {},
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
        (t["Nhân vật chính"] = {
          "Tư khố": {
            "Vật phẩm quan trọng":
              t["Nhân vật chính"]?.["Tư khố"]?.["Vật phẩm quan trọng"] || {},
          },
        }),
      (function (e) {
        if (!e || "object" != typeof e || Array.isArray(e)) return 0;
        let t = 0;
        for (const r of Object.values(e)) {
          if (!r || "object" != typeof r || Array.isArray(r)) continue;
          const e = x(r["Hiện trạng"], r["Miêu tả"], r["Hiệu quả"]),
            a = Object.hasOwn(r, "Miêu tả") || Object.hasOwn(r, "Hiệu quả");
          (r["Hiện trạng"] !== e || a) &&
            ((r["Hiện trạng"] = e),
            delete r["Miêu tả"],
            delete r["Hiệu quả"],
            t++);
        }
      })(t["Khoa kỹ"]),
      t
    );
  }

  function de() {
    if (!B) throw new Error("Chưa tải mẫu thời đại Sùng Trinh năm thứ bảy tháng bảy.");
    const e = c.parse({
        "Thiên hạ bản đồ": j(B["Biến lượng"]["Thiên hạ bản đồ"]),
      })["Thiên hạ bản đồ"],
      t = {
        "Nhân vật có mặt": ue()
          .filter((e) => M.characters[e.name].scene)
          .map((e) => e.name),
        ...Object.fromEntries(k.map((e) => [e, {}])),
      };
    for (const [e, r] of Object.entries(M.characters))
      r.included && (r.known || r.scene) && (t[r.category][e] = ce(0, r));
    const r = M.protagonist,
      a = M.opening.name || "Màn thứ nhất";
    var n;
    const i = le(
      {
        "Thế giới vận hành": {
          "_Định danh khởi đầu": M.opening.id,
          "Ngày hiện tại": `Sùng Trinh năm thứ bảy tháng bảy ${M.date.day}`,
          "Năm Công nguyên": 1634,
          "Mười hai canh giờ": {
            "Canh giờ":
              ((n = M.date.hour),
              [
                "Giờ Tý",
                "Giờ Sửu",
                "Giờ Dần",
                "Giờ Mão",
                "Giờ Thìn",
                "Giờ Tỵ",
                "Giờ Ngọ",
                "Giờ Mùi",
                "Giờ Thân",
                "Giờ Dậu",
                "Giờ Tuất",
                "Giờ Hợi",
              ][Math.floor(((Number(n) + 1) % 24) / 2)]),
            "Khắc": M.date.ke,
          },
          "Hai mươi bốn giờ": {
            "Giờ": Number(M.date.hour),
            "Phút": Number(M.date.minute),
          },
          "Địa điểm hiện tại": r.location,
          "Thời tiết": M.date.weather,
          "Bối cảnh": "SFW",
          "Số ngày vận hành": 1,
        },
        "Nhân vật chính": {
          "Chức quan": r.occupation || r.identity,
          "Danh vọng": Number(M.stats.reputation),
          "Giai đoạn danh vọng": "Mặc mặc vô văn",
          "Ngũ duy": {
            "Sinh mệnh": Number(M.stats.life),
            "Võ lực": Number(M.stats.martial),
            "Thống suất": Number(M.stats.command),
            "Trí mưu": Number(M.stats.wisdom),
            "Chính trị": Number(M.stats.politics),
          },
          "Tư khố": {
            "Kim ngân đồng": {
              "Hoàng kim": Number(M.stats.gold),
              "Bạch ngân": Number(M.stats.silver),
              "Tiền đồng": Number(M.stats.copper),
            },
            "Vật phẩm quan trọng": {},
          },
        },
        "Mạng lưới quan hệ": t,
        "Quân sự": { "Các doanh": {}, "Tướng lĩnh": {}, "Ghi chép chiến đấu": {} },
        "Kinh tế": {
          "Tài sản": {},
          "Thương trữ": {},
          "Thị trường": {
            "Chỉ số giá cả": {
              "Lương thực": 100,
              "Quân nhu": 100,
              "Vật tư thường dùng": 100,
            },
            "Tỷ giá": {
              "Một lạng hoàng kim đổi bạch ngân": 6,
              "Một lạng bạch ngân đổi tiền đồng": 1200,
            },
            "Tình hình thị trường": "Bình ổn",
            "_Tồn kho tháng": "",
            "_Tồn kho còn lại": {},
          },
        },
        "Khoa kỹ": {},
        "Cá nhân sử ký": {
          "Đại sự ký": {
            [a]: {
              "Ngày tháng": `Sùng Trinh năm thứ bảy tháng bảy ${M.date.day}`,
              "Địa điểm": r.location,
              "Loại hình": "Nhân sự",
              "Sự tích":
                r.predicament ||
                M.opening.hook ||
                `Câu chuyện của ${r.identity} bắt đầu từ đây`,
              "Ảnh hưởng": r.goal || "Tiền đồ phía trước vẫn chưa thể biết trước",
            },
          },
        },
        "Thiên hạ bản đồ": j(e),
        "Thời cục và nhiệm vụ": {
          "Quan hệ thế lực": {},
          "Hạng mục chưa quyết": {},
        },
        "Phong nguyệt các": { "Điểm đồng phòng": 0, "Khí vật": {} },
      },
      pe(M.initialization?.patch),
    );
    ((i["Thiên hạ bản đồ"] = j(e)),
      (i["Thế giới vận hành"]["_Định danh khởi đầu"] = M.opening.id),
      (i["Thế giới vận hành"]["Ngày hiện tại"] =
        `Sùng Trinh năm thứ bảy tháng bảy ${M.date.day}`),
      (i["Thế giới vận hành"]["Năm Công nguyên"] = 1634),
      (i["Thế giới vận hành"]["Địa điểm hiện tại"] = r.location),
      (i["Thế giới vận hành"]["Thời tiết"] = M.date.weather));
    const o = c.parse(i);
    if (JSON.stringify(o["Thiên hạ bản đồ"]) !== JSON.stringify(e))
      throw new Error(
        "Kiểm tra biến khởi tạo thất bại: Thiên hạ bản đồ bị sửa đổi ngoài ý muốn.",
      );
    return o;
  }

  function ge(
    e,
    t,
    r = 100,
    a = "before_character_definition",
  ) {
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

  function ue() {
    return y.filter((e) => M.characters[e.name]?.included);
  }

  function me() {
    return ue()
      .filter((e) => "history" !== e.lock)
      .map((e) => {
        const t = M.characters[e.name];
        return {
          character: e.name,
          overviewSummary: e.summary,
          identity: N(t.identity || e.summary),
          activityArea: N(
            t.activityArea ||
              "Hợp lý di chuyển theo gia đình, chức vụ hoặc sinh kế trong cốt truyện",
          ),
          faction: N(t.faction || ""),
          userRelation: N(
            t.relation || (t.known ? "Người quen biết" : "Chưa từng quen biết"),
          ),
          relationshipOrigin: N(
            t.relationshipOrigin ||
              (t.known
                ? "Đôi bên quen biết qua những trải nghiệm cụ thể, chi tiết phải nhất quán với chính văn."
                : "Đôi bên ban đầu không có giao tình định sẵn, quan hệ phải được thiết lập qua sự kiện cụ thể."),
          ),
          relationshipPattern: N(
            t.relationshipPattern ||
              "Mối quan hệ phát triển tự nhiên theo tương tác lâu dài, không đột biến vì hào quang nhân vật chính.",
          ),
          characterToUser: N(
            t.characterToUser ||
              "Xưng hô tự nhiên dựa trên thân phận, lễ pháp và giai đoạn quan hệ đôi bên",
          ),
          userToCharacter: N(
            t.userToCharacter || `Xưng hô dựa theo thân phận hoặc tên họ của ${e.name}`,
          ),
          longTermSituation: N(
            t.longTermSituation ||
              "Tiếp nối tính cách cốt lõi, ranh giới năng lực và mạng lưới quan hệ của nhân vật gốc trong thân phận và môi trường mới.",
          ),
          adaptationPrinciples: (t.adaptationPrinciples?.length
            ? t.adaptationPrinciples
            : [
                "Sự thay đổi về thân phận và địa vực tuyệt đối không được ghi đè lên tính cách cốt lõi, ranh giới năng lực và các mối quan hệ gốc của nhân vật.",
              ]
          ).map(N),
          personaEntries: [
            ...new Set(
              [
                ...(t.personaEntries || []),
                ...(e.worldbookEntries || []),
              ]
                .map(String)
                .filter(Boolean),
            ),
          ],
          nonFixedRelationships: [],
        };
      });
  }

  function fe() {
    return N(
      `<Bối cảnh thân phận người chơi>\nĐiểm xuất phát thời đại: Sùng Trinh năm thứ bảy tháng bảy\nLai lịch: ${M.protagonist.origin || "Chưa thiết lập chi tiết"}\nThân phận công khai: ${M.protagonist.identity}\nNghề nghiệp hoặc chức quan: ${M.protagonist.occupation || "Không có nghề nghiệp cố định"}\nKhu vực thuộc về lúc mở đầu: ${M.protagonist.location}\nThế lực trực thuộc lâu dài: ${M.protagonist.faction || "Không có thế lực cố định"}\nThân phận và địa vị xã hội: ${M.protagonist.socialStanding || "Chưa thiết lập chi tiết"}\nXuất thân và bối cảnh gia đình: ${M.protagonist.familyBackground || "Chưa thiết lập chi tiết"}\nTrải nghiệm then chốt trước khi hình thành thân phận: ${M.protagonist.pastExperience || "Chưa thiết lập chi tiết"}\nNăng lực và tri thức ổn định: ${M.protagonist.strengths || "Chưa thiết lập chi tiết"}\nTài nguyên có thể chi phối hoặc điều động lâu dài: ${M.protagonist.resources || "Chưa thiết lập chi tiết"}\nMưu cầu lâu dài: ${M.protagonist.longTermPursuit || "Chưa thiết lập chi tiết"}\nRanh giới và hạn chế của thân phận: ${M.protagonist.identityBoundaries || "Tuân thủ thân phận, thời đại và điều kiện thực tế, không nhận thêm quyền lực hay tri thức phi lý nhờ hào quang nhân vật chính"}\nKhí chất tự sự: ${M.protagonist.tone || "Loạn thế tả thực, kiềm chế có dư âm"}\nThuyết minh: Những điều ghi chép trên đây là bối cảnh thân phận ổn định và điểm xuất phát câu chuyện của <user>, không đại diện cho địa điểm, chức vụ, thế lực, tài nguyên hay mục tiêu hiện tại sau khi cốt truyện phát triển; trạng thái về sau lấy biến lượng và chính văn làm chuẩn.\n</Bối cảnh thân phận người chơi>`,
    );
  }

  function be() {
    const e = [];
    M.title.trim() || e.push("Vui lòng điền tên DLC"),
      M.protagonist.identity.trim() ||
        e.push("Vui lòng điền thân phận nhân vật chính"),
      M.protagonist.location.trim() ||
        e.push("Vui lòng điền địa điểm mở đầu"),
      M.opening.body.trim() ||
        e.push("Vui lòng tạo hoặc điền nội dung lời mở đầu"),
      M.initialization?.stale &&
        e.push(
          "Lời mở đầu hoặc cấu hình đã thay đổi, vui lòng bổ sung lại biến khởi tạo ở bước thứ ba",
        ),
      /^[a-z0-9][a-z0-9._-]{1,63}$/i.test(M.opening.id) ||
        e.push(
          "Định danh mở đầu chỉ có thể dùng từ 2 đến 64 ký tự gồm chữ cái, số, dấu chấm, dấu gạch ngang hoặc dấu gạch dưới",
        ),
      B || e.push(W || "Mẫu thời đại vẫn chưa được tải");
    for (const t of ue()) {
      const r = M.characters[t.name];
      r.scene &&
        !r.included &&
        e.push(
          `${t.name} chưa được đưa vào DLC, không thể đặt làm nhân vật có mặt tại hiện trường mở đầu`,
        ),
        r.known &&
          !k.includes(r.category) &&
          e.push(`Phân loại nhân tế của ${t.name} không hợp lệ`);
    }
    return e;
  }

  function he(e) {
    return String(e || "")
      .replace(/<initvar(?:\s[^>]*)?>[\s\S]*?<\/initvar\s*>/gi, "\n")
      .replace(
        /<(?:initial[_\s-]*variables?|initialization|biến khởi tạo|khởi tạo biến|khởi tạo biến lượng|biến lượng khởi tạo)(?:\s[^>]*)?>[\s\S]*?<\/(?:initial[_\s-]*variables?|initialization|biến khởi tạo|khởi tạo biến|khởi tạo biến lượng|biến lượng khởi tạo)\s*>/gi,
        "\n",
      )
      .replace(
        /```(?:initvar|initial[_-]*variables?)\s*[\s\S]*?```/gi,
        "\n",
      )
      .replace(
        /<\/?(?:initvar|initial[_\s-]*variables?|initialization|biến khởi tạo|khởi tạo biến|khởi tạo biến lượng|biến lượng khởi tạo)(?:\s[^>]*)?>/gi,
        "",
      )
      .trim();
  }

  function ye() {
    const t = be();
    if (t.length) throw new Error(t.join("；"));
    const r = O(de()),
      a = e.stringify(r, { lineWidth: 0, indent: 2 }).trimEnd();
    c.parse(e.parse(a));
    const n = (function (e, t) {
        const r = `${N(he(e))}\n\n<initvar>\n${t}\n</initvar>`;
        if (
          1 !== (r.match(/<initvar>/g) || []).length ||
          1 !== (r.match(/<\/initvar>/g) || []).length
        )
          throw new Error(
            "Tạo thẻ biến khởi tạo thất bại: Nội dung cuối cùng bắt buộc và chỉ được chứa duy nhất một cặp thẻ <initvar>.",
          );
        if (
          /<\/?(?:initial[_\s-]*variables?|initialization|biến khởi tạo|khởi tạo biến)(?:\s[^>]*)?>/i.test(
            r,
          )
        )
          throw new Error(
            "Tạo thẻ biến khởi tạo thất bại: Phát hiện thẻ khởi tạo không đúng chuẩn.",
          );
        return r;
      })(M.opening.body, a),
      i = ue().map((e) => ({
        name: e.name,
        summary: N(
          M.characters[e.name].identity
            ? `${M.characters[e.name].identity}；${e.summary}`
            : e.summary,
        ),
      })),
      o = M.id.trim() || `cmyj.custom.${C(M.title)}`,
      s = fe(),
      l = [
        ge(p, s, 1),
        ge(
          "Khái lãm nhân vật",
          ((d = i),
          `@@preprocessing\n<%_\nvar characterOverviews = ${JSON.stringify({ [M.opening.id]: d }, null, 2)};\nvar openingId = getvar('stat_data.Thế giới vận hành._Định danh khởi đầu', { defaults: '' });\nvar people = characterOverviews[openingId] || [];\nif (people.length > 0) {\n_%>\n<Khái lãm nhân vật>\n<%_ for (var i = 0; i < people.length; i++) { _%>\n- <%- people[i].name %>：<%- people[i].summary %>\n<%_ } _%>\n</Khái lãm nhân vật>\n<%_ } _%>`),
          0,
          "after_character_definition",
        ),
      ];
    var d;
    const g = me(),
      u = ue()
        .filter((e) => M.characters[e.name].known)
        .map((e) => ({
          character: e.name,
          relation: N(M.characters[e.name].relation),
        })),
      m = new Set(ue().map((e) => e.name)),
      f = [
        ...u.map((e) => ({
          source: "Nhân vật chính",
          target: e.character,
          label: e.relation || "Quen biết",
        })),
        ...w
          .filter(([e, t]) => m.has(e) && m.has(t))
          .map(([e, t, r]) => ({ source: e, target: t, label: r })),
      ],
      b = {
        id: o,
        kind: "scenario",
        name: M.title,
        scenario: {
          id: o,
          version: M.packageVersion || "0.1.0",
          baseCard: "cmyj.base",
          minBaseVersion: "1.9.0",
          exclusiveGroup: "player-origin",
          allowMidChatSwitch: !1,
          newChatRequired: !0,
        },
        openings: [
          {
            id: M.opening.id,
            name: M.opening.name,
            subtitle: N(
              `Sùng Trinh năm thứ bảy tháng bảy ${M.date.day} · ${M.protagonist.identity}`,
            ),
            content: n,
          },
        ],
        worldbookEntries: l,
        initialRelationships: u,
        portraitProfiles: [],
        characterOverviewVersion: i.length ? 1 : 0,
        characterOverviews: i.length ? { [M.opening.id]: i } : {},
        characterAdaptationVersion: 3,
        characterAdaptations: g,
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
                desc: N(M.protagonist.identity),
              },
              ...ue().map((e) => ({
                id: e.name,
                name: e.name,
                category: 0,
                symbolSize: 42,
                desc: N(M.characters[e.name].relation || e.summary),
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
          title: M.title,
          summary: N(
            M.summary ||
              `Khai cục ${M.protagonist.identity} tại ${M.protagonist.location}.`,
          ),
          tags: M.tags,
          categories: ["Mở rộng cốt truyện"],
          coverUrl: "",
        },
        resources: [b],
      },
      y = new TextEncoder().encode(JSON.stringify(h)).length;
    if (y > 14e5)
      throw new Error(
        `Dung lượng gói DLC là ${(y / 1024).toFixed(1)} KB, vượt quá giới hạn tối đa 1.4 MB.`,
      );
    return h;
  }

  function xe() {
    try {
      return { ...f, ...JSON.parse(Z().getItem(i) || "{}") };
    } catch {
      return { ...f };
    }
  }

  function $e() {
    const e = xe();
    return (
      e.model ||
      (e.apiUrl || e.apiKey ? "API Tùy chỉnh" : "API Hiện tại của Quán Rượu")
    );
  }

  function ve(e) {
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

  function we() {
    const e = xe();
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

  async function ze(e, t, r) {
    const a = A("generateRaw"),
      n = A("generate");
    if ("function" != typeof a && "function" != typeof n)
      throw new Error("Không tìm thấy giao diện sinh văn bản AI của Quán Rượu.");
    const i = we(),
      o = l(i),
      s = o
        ? (function (e) {
            const t = e?.value ?? e?.schema ?? e;
            return t && "object" == typeof t
              ? [
                  "",
                  "",
                  "【Chế độ tương thích JSON DeepSeek】",
                  "Vui lòng chỉ xuất một đối tượng JSON hợp lệ duy nhất, không kèm Markdown, khối bao mã, giải thích hay bất kỳ chữ nào ngoài đối tượng.",
                  "Đầu ra bắt buộc phải thỏa mãn JSON Schema sau; tất cả trường required đều phải có mặt:",
                  JSON.stringify(t, null, 2),
                ].join("\n")
              : "";
          })(r)
        : "",
      c = {
        should_silence: !0,
        ordered_prompts: [
          { role: "system", content: e },
          { role: "user", content: `${t}${s}` },
        ],
        ...(o ? {} : { json_schema: r }),
        ...(i ? { custom_api: i } : {}),
      };
    let p;
    for (let l = 0; l < 2; l++)
      try {
        const p = l
          ? "\n\nĐầu ra lần trước không thể phân tích cú pháp. Vui lòng nghiêm ngặt chỉ xuất đối tượng JSON chuẩn xác theo JSON Schema, toàn bộ dấu xuống dòng và dấu ngoặc kép phải được escape đúng chuẩn."
          : "";
        ((c.ordered_prompts = [
          { role: "system", content: e },
          { role: "user", content: `${t}${s}${p}` },
        ]));
        const d =
          "function" == typeof a
            ? await a(c)
            : await n({
                should_silence: !0,
                user_input: `${e}\n\n${t}${s}${p}`,
                ...(o ? {} : { json_schema: r }),
                ...(i ? { custom_api: i } : {}),
              });
        return O(ve(d));
      } catch (e) {
        if (((p = g(e, { provider: o ? "DeepSeek" : "API AI" })), !u(e))) break;
      }
    throw p || new Error("AI sinh văn bản thất bại.");
  }

  function ke(e) {
    if (e && "object" == typeof e) {
      const t = e.opening_body ?? e.content ?? e.text;
      if ("string" == typeof t) return t.trim();
      throw new Error("AI đã trả về công cụ gọi hàm hoặc đối tượng không thể nhận diện.");
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
      .replace(/^(?:Chính văn mở đầu|Lời mở đầu|Chính văn|opening_body)\s*[：:]\s*/i, "")
      .trim();
  }

  function Se(e) {
    const t = new Set(e.map((e) => e.name));
    return (
      w
        .filter(([e, r]) => t.has(e) || t.has(r))
        .map(([e, t, r]) => `${e}—${t}：${r}`)
        .join("；") || "Không có quan hệ cố định bổ sung"
    );
  }

  async function je(e) {
    const t = e.filter((e) => "history" !== e.lock);
    if (!t.length)
      throw new Error(
        "Toàn bộ nhân vật đã chọn là nhân vật lịch sử, thân phận không cần điều chỉnh thích ứng.",
      );
    const r = [];
    for (const e of t) {
      const t = await se([e]),
        a = M.characters[e.name],
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
        i = `Bạn chịu trách nhiệm lập định vị nhân vật lâu dài cho nhân vật nguyên tác "${e.name}" của tác phẩm 《Tàn Minh Dư Tẫn》. Bắt buộc phải bảo lưu tính cách cốt lõi, ranh giới năng lực và các mối quan hệ ban đầu của thiết lập gốc. "Ý tưởng thích ứng một câu" do người dùng cung cấp là định hướng sáng tác, cần kết hợp thân phận <user> cùng thiết lập gốc để mở rộng thành thân phận, trải nghiệm và phương thức ở chung có hiệu lực lâu dài. Tuyệt đối không xuất mục tiêu tức thời, tình báo trước mắt, địa điểm có mặt lúc mở đầu, thái độ tạm thời, có mặt tại hiện trường hay không, hoặc bất kỳ trạng thái nào chỉ tồn tại trong một thời điểm duy nhất. Chỉ xử lý duy nhất nhân vật này, không xuất họ tên nhân vật, không sử dụng mảng characters hay vỏ bọc character bên ngoài. Khi nhắc đến người chơi nhất loạt ghi là <user>, tuyệt đối không ghi user hoặc {{user}}. Mỗi chuỗi đều phải có nội dung cụ thể; nếu thực sự không có thế lực cố định hãy ghi "Không có thế lực cố định", không được để chuỗi trống. adaptation_principles tối thiểu đưa ra 2 nguyên tắc có thể chấp hành. Xuất một đối tượng JSON đơn nhất thỏa mãn Schema.`,
        o = `Nhân vật mục tiêu: ${e.name}\nHồ sơ thân phận lâu dài của <user>:\n${fe()}\nQuan hệ nhân vật bất khả xâm phạm: ${Se([e])}\nadaptation_brief là ý tưởng một câu của người dùng, chỉ dùng để định hướng bổ sung, không cần chép lại nguyên văn. Các trường khác nếu đã có nội dung là ràng buộc cứng, cấm viết lại; vui lòng điền toàn bộ các trường còn trống thành nội dung cụ thể, có hiệu lực lâu dài:\n${JSON.stringify(n, null, 2)}\n\n<Thiết lập gốc của ${e.name}>\n${t}\n</Thiết lập gốc của ${e.name}>`,
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
          ["identity", "identity", "Định vị thân phận lâu dài"],
          ["activityArea", "activity_area", "Khu vực hoạt động thường lệ"],
          ["faction", "faction", "Thế lực trực thuộc lâu dài"],
          ["relationshipOrigin", "relationship_origin", "Nguồn gốc quan hệ với nhân vật chính"],
          ["relationshipPattern", "relationship_pattern", "Phương thức ở chung lâu dài"],
          ["characterToUser", "character_to_user", "Nhân vật xưng hô với <user>"],
          ["userToCharacter", "user_to_character", "<user> xưng hô với nhân vật"],
          ["longTermSituation", "long_term_situation", "Hoàn cảnh sinh sống lâu dài"],
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
            .map(([,, e]) => e);
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
          ? `\n\nĐầu ra lần trước vẫn còn thiếu: ${g.join("、")}. Vui lòng trả về lại một đối tượng JSON hoàn chỉnh không mang tên họ, không có vỏ bọc bên ngoài.`
          : "";
        if (
          ((d = l(await ze(i, `${o}${t}`, s))), (g = p(d)), !g.length)
        )
          break;
      }
      if (g.length)
        throw new Error(
          `${e.name} vẫn chưa được bổ sung đầy đủ: ${g.join("、")}`,
        );
      const u = (e, t) => {
        String(a[e] || "").trim() || (a[e] = String(t || "").trim());
      };
      for (const [e, t] of c) u(e, d[t]);
      a.adaptationPrinciples.length ||
        (a.adaptationPrinciples = (d.adaptation_principles || [])
          .map((e) => String(e).trim())
          .filter(Boolean)),
        r.push(e.name),
        ne(),
        ee();
    }
    return r;
  }

  async function _e() {
    M.opening.targetWords = Math.min(
      5e3,
      Math.max(300, Number(M.opening.targetWords) || 1200),
    );
    const e = ue(),
      t = e.filter((e) => M.characters[e.name].scene),
      r = e.filter((e) => M.characters[e.name].known),
      a = await se(t);
    if (a.length > 42e3)
      throw new Error(
        `Thiết lập hoàn chỉnh của nhân vật có mặt tại hiện trường tổng cộng ${a.length} ký tự, đã vượt quá ngân sách tạo ổn định. Vui lòng giảm bớt nhân vật có mặt tại màn mở đầu; các nhân vật không có mặt vẫn được bảo lưu trong phần Khái lãm nhân vật.`,
      );
    const n = Math.max(0, 42e3 - a.length),
      i = await (async function (e = 24e3) {
        if (e <= 0) return "";
        const t = (M.opening.referenceEntries || []).reduce(
            (e, t) => (((e[t.worldbook] ||= []).push(t)), e),
            {},
          ),
          r = [];
        for (const [e, a] of Object.entries(t)) {
          await ie(e);
          const t = new Set(a.map((e) => e.name));
          for (const a of V[e] || [])
            t.has(a.name) &&
              a.content &&
              r.push(`[${e} / ${a.name}]\n${a.content}`);
        }
        const a = r.join("\n\n"),
          n = Math.min(24e3, e);
        return a.length > n
          ? `${a.slice(0, n)}\n\n[Nội dung tham khảo đã được cắt gọn theo ngân sách ngữ cảnh ${n} ký tự của lượt này]`
          : a;
      })(n),
      o = me().filter((e) => t.some((t) => t.name === e.character)),
      s = `DLC: ${M.title}\nTên mở đầu: ${M.opening.name}\nHồ sơ thân phận lâu dài của <user>:\n${fe()}\nÝ tưởng mở đầu một câu: ${M.opening.hook || "Vui lòng dựa trên thân phận để thiết kế một tình huống mở đầu cụ thể và cấp bách"}\nSố chữ mục tiêu của lời mở đầu: Khoảng ${M.opening.targetWords} chữ, cho phép dao động trong phạm vi 15%\nNhân vật đưa vào DLC: ${e.map((e) => e.name).join("、") || "Không có"}\nĐã quen biết trước khi mở màn: ${r.map((e) => `${e.name}（${M.characters[e.name].relation || "Quen biết"}）`).join("、") || "Không có"}\nCho phép xuất hiện tại hiện trường mở đầu: ${t.map((e) => e.name).join("、") || "Không có nhân vật sẵn, mở đầu chỉ viết về <user> và người qua đường một lần cần thiết"}\nQuan hệ nhân vật bất khả xâm phạm: ${Se(e)}\nĐịnh vị lâu dài của nhân vật tại hiện trường: ${JSON.stringify(o, null, 2)}${a ? `\n\n<Thiết lập gốc nhân vật hiện trường>\n${a}\n</Thiết lập gốc nhân vật hiện trường>` : ""}${i ? `\n\n<Sách thế giới tham khảo>\n${i}\n</Sách thế giới tham khảo>` : ""}\n\nBây giờ hãy trực tiếp viết chính văn mở đầu.`;
    ((M.opening.body = await (async function (e, t, r) {
      const a = A("generateRaw"),
        n = A("generate");
      if ("function" != typeof a && "function" != typeof n)
        throw new Error("Không tìm thấy giao diện sinh AI của Quán Rượu.");
      const i = Math.min(
          14e3,
          Math.max(2048, Math.ceil(1.8 * Number(r) + 800)),
        ),
        o = we();
      let s;
      o && (o.max_tokens = Math.max(Number(o.max_tokens) || 0, i));
      for (let c = 0; c < 3; c++)
        try {
          const s = `${t}${c ? `\n\nĐây là lần thử thứ ${c + 1}. Lần trước chưa thu được chính văn hoàn chỉnh; vui lòng bắt đầu trực tiếp từ đoạn tự sự đầu tiên, chỉ xuất chính văn, không giải thích, tiêu đề, JSON hay khối mã.` : ""}`,
            l = ke(
              "function" == typeof a
                ? await a({
                    should_silence: !0,
                    max_tokens: i,
                    ordered_prompts: [
                      { role: "system", content: e },
                      { role: "user", content: s },
                    ],
                    ...(o ? { custom_api: o } : {}),
                  })
                : await n({
                    should_silence: !0,
                    user_input: `${e}\n\n${s}`,
                    ...(o ? { custom_api: o } : {}),
                  }),
            ),
            p = Math.min(300, Math.max(80, Math.round(0.18 * Number(r))));
          if (l.length < p)
            throw new Error(
              `AI chỉ trả về ${l.length} ký tự, chưa tạo thành mở đầu hoàn chỉnh.`,
            );
          return N(l);
        } catch (e) {
          if (((s = g(e, { provider: l(o) ? "DeepSeek" : "API AI" })), !u(e)))
            break;
        }
      throw s || new Error("AI không tạo ra chính văn mở đầu.");
    })(
      'Bạn là trợ lý sáng tác mở màn của tác phẩm 《Tàn Minh Dư Tẫn》. Thời đại được cố định nghiêm ngặt vào tháng 7 năm Sùng Trinh thứ bảy. Thiết lập gốc của các nhân vật tại hiện trường là ràng buộc cứng, việc định vị lâu dài chỉ có thể thay đổi bối cảnh thân phận và quan hệ của họ, không được làm thay đổi tính cách cốt lõi. Chỉ những nhân vật thuộc danh sách "Nhân vật có mặt tại hiện trường mở đầu" mới được thực sự xuất hiện; những nhân vật khác tuyệt đối không được nhồi nhét vào màn đầu tiên chỉ để phô trương danh sách. Khởi đầu chỉ là lời dẫn nhập cho câu chuyện, không cần thiết phải để tất cả nhân vật có mặt lần lượt lên tiếng. Khi nhắc đến người chơi nhất loạt ghi là <user>, tuyệt đối không ghi user hoặc {{user}}. Trực tiếp xuất chính văn tiếng Việt/chữ Hán bản địa hóa dùng được ngay cho Quán Rượu, không xuất tiêu đề, thuyết minh, JSON, khối mã Markdown, thẻ <initvar> hay bất kỳ thẻ khởi tạo nào khác.',
      s,
      M.opening.targetWords,
    )),
      (M.summary = String(
        M.opening.hook ||
          M.summary ||
          M.opening.body.replace(/\s+/g, " ").slice(0, 120),
      ).trim()),
      ne(),
      ee());
  }

  function Ae(e, t = Object.keys(e)) {
    return {
      type: "object",
      additionalProperties: !1,
      required: t,
      properties: e,
    };
  }

  function Ee(e, t, r) {
    return Math.min(r, Math.max(t, Number(e) || 0));
  }

  async function Ce() {
    if (!M.opening.body.trim())
      throw new Error("Vui lòng tạo hoặc điền lời mở đầu trước.");
    const e = ue().map((e) => ({
        name: e.name,
        known_before_opening: M.characters[e.name].known,
        present_in_opening: M.characters[e.name].scene,
        category: M.characters[e.name].category,
        identity: M.characters[e.name].identity || e.summary,
        relation: M.characters[e.name].relation,
        initial_favor: Number(M.characters[e.name].affection) || 0,
        initial_loyalty: Number(M.characters[e.name].loyalty) || 50,
      })),
      t = `<user>: ${M.protagonist.identity}；Nghề nghiệp: ${M.protagonist.occupation || "Chưa định"}；Thế lực: ${M.protagonist.faction || "Không có"}\nĐịa điểm mở đầu: ${M.protagonist.location}\nBản chụp nhanh nhân vật: ${JSON.stringify(e, null, 2)}\n\n<Lời mở đầu cuối cùng>\n${N(he(M.opening.body))}\n</Lời mở đầu cuối cùng>\n\nMảng rỗng biểu thị loại sự thật đó không tồn tại. Nhân vật thực sự chạm trán trong cảnh mở đầu phải được ghi vào relationships; nhân vật không xuất hiện và trước mở màn chưa từng quen biết tuyệt đối không được ghi vào. Độ hảo cảm ban đầu và lòng trung thành trong bản chụp nhanh nhân vật là ràng buộc cứng, cấm viết lại.`,
      r = await ze(
        "Bạn chịu trách nhiệm trích xuất các sự thật khởi tạo từ lời mở đầu cuối cùng của tác phẩm 《Tàn Minh Dư Tẫn》. Chỉ được phép trích xuất những sự thật được chính văn và cấu hình của người chơi ủng hộ rõ ràng, tuyệt đối không được tự tiện bịa đặt quân đội, sản nghiệp, khoa kỹ, thế lực hay vật phẩm chỉ để lấp đầy biến số. Hạng mục chưa quyết chỉ trích xuất những việc nhân vật chính đã biết, chưa giải quyết xong, vẫn còn hiệu lực xuyên cảnh, và nếu lãng quên sẽ gây ảnh hưởng đến lời hứa, thời hạn, lợi ích, an toàn hoặc các quyết sách về sau; lịch trình thông thường, suy nghĩ tức thời, trò chuyện phiếm vô thưởng vô phạt và suy đoán không được trích xuất. Tuyệt đối không xuất Thiên hạ bản đồ, ngày tháng, địa điểm, ngũ duy nhân vật chính hay kim ngân đồng; những mục này đã được tạo bởi mẫu cố định. Khi nhắc đến người chơi nhất loạt ghi là <user>. Chỉ xuất JSON hợp lệ, không xuất <initvar>, các thẻ khởi tạo khác, Markdown hoặc lời giải thích. Thẻ <initvar> cuối cùng sẽ do chương trình thống nhất tạo ra.",
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
                  Ae({ name: e, description: e, quantity: t }),
                ),
                forces: r(
                  Ae({
                    name: e,
                    troop_type: e,
                    people: t,
                    morale: t,
                    training: t,
                    logistics: t,
                    equipment: {
                      type: "string",
                      enum: [
                        "Tàn phá",
                        "Giản lậu",
                        "Phổ thông",
                        "Tinh lương",
                        "Tinh nhuệ",
                      ],
                    },
                    level: {
                      type: "string",
                      enum: [
                        "Ô hợp",
                        "Tân mộ",
                        "Khả dụng",
                        "Lương hảo",
                        "Tinh nhuệ",
                        "Danh quân",
                      ],
                    },
                    commander: e,
                    station: e,
                  }),
                ),
                commanders: r(
                  Ae({
                    name: e,
                    command: t,
                    martial: t,
                    wisdom: t,
                    politics: t,
                    prestige: t,
                  }),
                ),
                assets: r(
                  Ae({ name: e, description: e, monthly_income: t }),
                ),
                storage: r(Ae({ name: e, quantity: t, unit: e })),
                technologies: r(
                  Ae({
                    name: e,
                    progress: {
                      type: "string",
                      enum: [
                        "Chưa bắt đầu",
                        "Đang thử nghiệm",
                        "Thí điểm quy mô nhỏ",
                        "Đã phổ biến",
                      ],
                    },
                    current_state: e,
                  }),
                ),
                relationships: r(
                  Ae({
                    name: e,
                    category: { type: "string", enum: k },
                    identity: e,
                    favor: t,
                    loyalty: t,
                    hatred: t,
                    present: { type: "boolean" },
                    private_relation: { type: "string", enum: S },
                  }),
                ),
                factions: r(
                  Ae({
                    name: e,
                    favor: t,
                    status: {
                      type: "string",
                      enum: [
                        "Chưa tiếp xúc",
                        "Quan sát",
                        "Hữu hảo",
                        "Kết minh",
                        "Địch đối",
                        "Giao chiến",
                        "Phụ dung",
                        "Tông chủ",
                        "Đã đầu hàng",
                        "Đã diệt vong",
                      ],
                    },
                    relationship_summary: e,
                    financial_state: {
                      type: "string",
                      enum: ["Chưa rõ", "Sụp đổ", "Túng quẫn", "Bình ổn", "Phú túc", "Hùng hậu"],
                    },
                    grain_state: {
                      type: "string",
                      enum: ["Chưa rõ", "Cạn kiệt", "Thiếu hụt", "Tạm ổn", "Sung túc"],
                    },
                    total_troops: t,
                    main_troop_type: e,
                  }),
                ),
                pending_matters: r(
                  Ae({
                    name: e,
                    status: {
                      type: "string",
                      enum: ["Chờ xử lý", "Đang tiến hành", "Đang chờ", "Tạm hoãn"],
                    },
                    summary: e,
                    current_state: e,
                    reminder: e,
                  }),
                ),
                events: r(
                  Ae({
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
    ((M.initialization.patch = (function (e) {
      const t = {
          "Nhân vật chính": { "Tư khố": { "Vật phẩm quan trọng": {} } },
          "Mạng lưới quan hệ": { "Nhân vật có mặt": [] },
          "Quân sự": { "Các doanh": {}, "Tướng lĩnh": {} },
          "Kinh tế": { "Tài sản": {}, "Thương trữ": {} },
          "Khoa kỹ": {},
          "Cá nhân sử ký": { "Đại sự ký": {} },
          "Thời cục và nhiệm vụ": { "Quan hệ thế lực": {}, "Hạng mục chưa quyết": {} },
        },
        r = (e, t) => {
          const r = v(e),
            a = new Set();
          for (const e of r) {
            if (
              ((e.name = String(e.name || "").trim()), !e.name || a.has(e.name))
            )
              throw new Error(`${t} tồn tại tên trống hoặc tên bị trùng lặp.`);
            a.add(e.name);
          }
          return r;
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
          "Sĩ khí": Ee(a.morale, 0, 100),
          "Huấn luyện": Ee(a.training, 0, 100),
          "Hậu cần": Ee(a.logistics, 0, 100),
          "Trang bị": a.equipment,
          "Đẳng cấp": a.level,
          "Tướng lĩnh": a.commander,
          "Trú địa": a.station,
        };
      for (const a of r(e.commanders, "Tướng lĩnh"))
        t["Quân sự"]["Tướng lĩnh"][a.name] = {
          "Thống suất": Ee(a.command, 0, 100),
          "Võ lực": Ee(a.martial, 0, 100),
          "Trí mưu": Ee(a.wisdom, 0, 100),
          "Chính trị": Ee(a.politics, 0, 100),
          "Uy vọng": Ee(a.prestige, 0, 100),
        };
      for (const a of r(e.assets, "Tài sản"))
        t["Kinh tế"]["Tài sản"][a.name] = {
          "Thuyết minh": a.description,
          "Nguyệt nhập": Number(a.monthly_income) || 0,
        };
      for (const a of r(e.storage, "Thương trữ"))
        t["Kinh tế"]["Thương trữ"][a.name] = { "Số lượng": Number(a.quantity) || 0, "Đơn vị": a.unit };
      for (const a of r(e.technologies, "Khoa kỹ"))
        t["Khoa kỹ"][a.name] = { "Tiến độ": a.progress, "Hiện trạng": a.current_state };
      for (const a of r(e.relationships, "Mạng lưới quan hệ")) {
        const e = M.characters[a.name];
        e?.included && (a.category = e.category);
        const r = e?.included ? Number(e.affection) || 0 : a.favor,
          n = e?.included ? Number(e.loyalty) || 50 : a.loyalty,
          i = { "Thân phận": N(a.identity) };
        ((e?.included ? Boolean(e.scene) : Boolean(a.present)) &&
          t["Mạng lưới quan hệ"]["Nhân vật có mặt"].push(a.name),
          (t["Mạng lưới quan hệ"][a.category] ||= {}),
          "Cừu địch" === a.category
            ? (t["Mạng lưới quan hệ"][a.category][a.name] = {
                ...i,
                "Cừu hận độ": Ee(e?.included ? -e.affection : a.hatred, 0, 100),
              })
            : "Hạ thuộc và mạc liêu" === a.category
              ? (t["Mạng lưới quan hệ"][a.category][a.name] = {
                  ...i,
                  "Hảo cảm độ": Ee(r, -100, 100),
                  "Trung tâm": Ee(n, 0, 100),
                })
              : "Tư duy" === a.category
                ? (t["Mạng lưới quan hệ"][a.category][a.name] = {
                    ...i,
                    "Quan hệ": e?.included ? e.privateRelation : a.private_relation,
                    "Hảo cảm độ": Ee(r, -100, 100),
                    "Trung tâm": Ee(n, 0, 100),
                    "Sinh dục": {},
                  })
                : (t["Mạng lưới quan hệ"][a.category][a.name] = {
                    ...i,
                    "Hảo cảm độ": Ee(r, -100, 100),
                  }));
      }
      for (const a of r(e.factions, "Quan hệ thế lực"))
        t["Thời cục và nhiệm vụ"]["Quan hệ thế lực"][a.name] = {
          "Hảo cảm độ": Ee(a.favor, -100, 100),
          "Trạng thái": a.status,
          "Tóm tắt quan hệ": a.relationship_summary,
          "Kinh tế": { "Tình trạng tài chính": a.financial_state, "Trạng thái lương thảo": a.grain_state },
          "Quân sự": {
            "Tổng binh lực": Math.max(0, Math.round(a.total_troops)),
            "Binh chủng chủ lực": a.main_troop_type,
            "Tướng lĩnh hạ thuộc": {},
            "Quân đội": {},
          },
        };
      for (const a of r(e.pending_matters, "Hạng mục chưa quyết"))
        t["Thời cục và nhiệm vụ"]["Hạng mục chưa quyết"][a.name] = {
          "Trạng thái": a.status,
          "Khái yếu": a.summary,
          "Hiện trạng": a.current_state,
          "Nhắc nhở": a.reminder,
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
      (M.initialization.summary = `Nhân vật ${v(r.relationships).length} · Vật phẩm ${v(r.important_items).length} · Quân đội ${v(r.forces).length} · Tài sản ${v(r.assets).length} · Hạng mục chưa quyết ${v(r.pending_matters).length}`),
      (M.initialization.stale = !1),
      (M.initialization.generatedAt = new Date().toISOString()),
      de(),
      ee());
  }

  function Ne(e, t, r = "application/json") {
    const a = new Blob([e], { type: r }),
      n = URL.createObjectURL(a),
      i = P.createElement("a");
    ((i.href = n),
      (i.download = t),
      P.body.appendChild(i),
      i.click(),
      i.remove(),
      setTimeout(() => URL.revokeObjectURL(n), 1e3));
  }

  function Oe(e, t, r, a = "", n = "text") {
    return `<label class="sg-field"><span>${E(e)}</span><input type="${n}" data-bind="${E(t)}" value="${E(r)}" placeholder="${E(a)}"></label>`;
  }

  function Te(e, t, r, a = "") {
    return `<label class="sg-field full"><span>${E(e)}</span><textarea data-bind="${E(t)}" placeholder="${E(a)}">${E(r)}</textarea></label>`;
  }

  function qe(e, t, r, a = "") {
    return `<label class="sg-field"><span>${E(e)}</span><textarea data-bind="${E(t)}" placeholder="${E(a)}">${E(r)}</textarea></label>`;
  }

  function Pe(e, t, r = "Chưa điền") {
    return `<div><dt>${E(e)}</dt><dd data-identity-preview="${E(t)}">${E(M.protagonist[t] || r)}</dd></div>`;
  }

  function Ie() {
    const e = M.protagonist;
    return `<section class="sg-page"><p class="sg-kicker">STEP ONE · YOUR PLACE IN HISTORY</p><h1>Trước tiên hãy trả lời: Ngươi là ai?</h1><p class="sg-lead">Tại đây chỉ xác định thân phận lâu dài và điểm xuất phát. Xung đột, mục tiêu cụ thể và lời dẫn câu chuyện được gom chung tại bước ba, tránh phải điền lặp lại.</p><div class="sg-era ${W ? "bad" : ""}"><b>Mốc neo thời đại: Sùng Trinh năm thứ bảy tháng bảy</b><br><span>${W ? E(W) : `Đã tải bản chụp nhanh Thiên hạ bản đồ chính thức · ${Object.keys(B?.["Biến lượng"]?.["Thiên hạ bản đồ"]?.["Thái thế khu vực"] || {}).length} khu vực`}</span></div><section class="sg-identity-ai"><div class="sg-identity-ai-head"><span><b>Dùng một đoạn văn miêu tả thân phận muốn trải nghiệm</b><small>Không cần am hiểu quan chế thời Minh, chỉ cần ghi rõ thân phận đại khái, địa khu và phương hướng muốn trải nghiệm là được.</small></span></div><textarea data-bind="protagonist.description" placeholder="Ví dụ: Ta muốn nhập vai một viên tiểu quân quan xuất thân từ lính bại trận Liêu Đông, am hiểu hỏa khí và đắp thành, tại biên bảo Đại Đồng có vài chục thuộc hạ cũ nguyện ý đi theo, nhưng không có chỗ dựa chính thức.">${E(e.description)}</textarea><div class="sg-identity-ai-actions"><small>AI chỉ điền mục còn trống; nội dung đã tự điền sẽ được giữ lại làm ràng buộc cứng, tiêu đề mặc định và "Nhân vật gốc" có thể điều chỉnh theo mô tả.</small><button type="button" class="sg-btn primary" data-action="ai-protagonist" ${R ? "disabled" : ""}>${R && "protagonist" === Q ? "Đang chỉnh lý thân phận…" : "AI điền biểu mẫu 1-click"}</button></div></section><div class="sg-grid">${Oe("Tên DLC", "title", M.title, "Ví dụ: Đại Đồng cô bảo")}${Oe("Lai lịch", "protagonist.origin", e.origin, "Nhân vật gốc / Người xuyên không")}${Oe("Thân phận công khai", "protagonist.identity", e.identity, "Ví dụ: Quân hộ trấn Đại Đồng")}${Oe("Nghề nghiệp hoặc chức quan", "protagonist.occupation", e.occupation, "Ví dụ: Tiểu kỳ biên bảo")}${Oe("Địa điểm mở đầu", "protagonist.location", e.location, "Ví dụ: Một biên bảo thuộc phủ Đại Đồng, Sơn Tây")}${Oe("Thế lực trực thuộc lâu dài", "protagonist.faction", e.faction, "Không có thế lực cố định có thể để trống")}${Oe("Khí chất câu chuyện", "protagonist.tone", e.tone)}</div><details class="sg-detail sg-profile-detail" open><summary>Hồ sơ thân phận lâu dài</summary><div class="sg-grid">${qe("Thân phận và địa vị xã hội", "protagonist.socialStanding", e.socialStanding, "Thân phận có ý nghĩa gì trong quan phủ, quân ngũ, tông tộc hoặc xã hội địa phương.")}${qe("Xuất thân và bối cảnh gia đình", "protagonist.familyBackground", e.familyBackground, "Nguồn gốc gia đình, tình hình tông tộc và bối cảnh thân tộc ổn định.")}${qe("Trải nghiệm then chốt trước khi hình thành thân phận", "protagonist.pastExperience", e.pastExperience, "Chỉ ghi trải nghiệm quá khứ định hình thân phận, không ghi bối cảnh mở đầu.")}${qe("Năng lực và tri thức ổn định", "protagonist.strengths", e.strengths, "Kỹ năng, học thức sở hữu lâu dài cùng điểm yếu rõ ràng.")}${qe("Tài nguyên có thể chi phối hoặc điều động lâu dài", "protagonist.resources", e.resources, "Nhân lực, sản nghiệp, văn bằng hoặc vật tư có thể nương tựa lâu dài, không ghi chiến lợi phẩm tạm thời.")}${qe("Mưu cầu lâu dài", "protagonist.longTermPursuit", e.longTermPursuit, "Phương hướng xuyên suốt nhiều tình tiết câu chuyện, không phải nhiệm vụ mở đầu.")}${qe("Ranh giới và hạn chế của thân phận", "protagonist.identityBoundaries", e.identityBoundaries, "Xác định rõ ranh giới thực tế về quyền lực, tri thức, của cải và nhân mạch.")}</div></details><section class="sg-identity-record" aria-label="Xem trước mục Sách thế giới thân phận người chơi"><div class="sg-identity-record-head"><span><b>Mục thân phận &lt;user&gt;</b><small>Sau khi cài đặt DLC sẽ được ghi vào như một mục Sách thế giới thường trực, để AI nhận diện lâu dài điểm xuất phát thân phận của người chơi.</small></span><code class="sg-entry-name">${E(p)}</code></div><dl>${Pe("Lai lịch", "origin")}${Pe("Thân phận công khai", "identity")}${Pe("Nghề nghiệp chức quan", "occupation", "Không có nghề nghiệp cố định")}${Pe("Địa điểm mở đầu", "location")}${Pe("Thế lực trực thuộc", "faction", "Không có thế lực cố định")}${Pe("Thân phận xã hội", "socialStanding")}${Pe("Xuất thân gia đình", "familyBackground")}${Pe("Trải nghiệm then chốt", "pastExperience")}${Pe("Năng lực tri thức", "strengths")}${Pe("Tài nguyên lâu dài", "resources")}${Pe("Mưu cầu lâu dài", "longTermPursuit")}${Pe("Ranh giới thân phận", "identityBoundaries")}</dl><p class="sg-identity-note">Tại đây chỉ lưu trữ bối cảnh thân phận ổn định; địa điểm, chức vụ, tài nguyên, mục tiêu và hoàn cảnh hiện tại sau khi mở đầu sẽ lấy chính văn và biến lượng làm chuẩn.</p></section><details class="sg-detail"><summary>Ngày tháng và chỉ số cơ bản (Tùy chọn)</summary><div class="sg-grid" style="margin-top:12px">${Oe("Ngày trong tháng 7", "date.day", M.date.day, "Mùng năm")}${Oe("Thời tiết", "date.weather", M.date.weather)}${Oe("Giờ", "date.hour", M.date.hour, "", "number")}${Oe("Phút", "date.minute", M.date.minute, "", "number")}${Oe("Sinh mệnh", "stats.life", M.stats.life, "", "number")}${Oe("Võ lực", "stats.martial", M.stats.martial, "", "number")}${Oe("Thống suất", "stats.command", M.stats.command, "", "number")}${Oe("Trí mưu", "stats.wisdom", M.stats.wisdom, "", "number")}${Oe("Chính trị", "stats.politics", M.stats.politics, "", "number")}${Oe("Bạch ngân ban đầu", "stats.silver", M.stats.silver, "", "number")}</div></details></section>`;
  }

  function Le() {
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
      const e = L?.querySelector(`[data-identity-preview="${t}"]`);
      e && (e.textContent = M.protagonist[t] || r);
    }
  }

  function Me(e) {
    return "history" === e.lock
      ? "Lịch sử"
      : "family" === e.lock
        ? "Gia tộc"
        : "official" === e.source
          ? "Nguyên tác"
          : "Mở rộng";
  }

  function Be(e) {
    const t = M.characters[e.name];
    return `<button type="button" class="sg-catalog-row ${t.included ? "on" : ""}" data-action="toggle-character" data-character-catalog data-character-name="${E(e.name)}" data-character-kind="${(function (
      e,
    ) {
      return "history" === e.lock
        ? "history"
        : "family" === e.lock
          ? "family"
          : "free";
    })(
      e,
    )}" data-character-search="${E(`${e.name} ${e.summary}`.toLowerCase())}" aria-pressed="${t.included}"><span class="sg-pick-box">✓</span><span class="sg-catalog-copy"><b>${E(e.name)}</b><small>${E(e.summary)}</small></span><span class="sg-kind">${Me(e)}</span></button>`;
  }

  function We(e) {
    return `<button type="button" class="sg-selected-chip" data-action="jump-character" data-character-name="${E(e.name)}">${E(e.name)}</button>`;
  }

  function Re(e) {
    const t = M.characters[e.name],
      r = "history" === e.lock,
      a = K.has(e.name),
      n = t.identity || e.summary,
      i = r
        ? "Khóa thân phận lịch sử và quỹ đạo hoạt động"
        : t.activityArea || M.protagonist.location || "Chưa thiết lập phạm vi hoạt động",
      o = `<div class="sg-grid">${Oe("Quan hệ với <user>", `characters.${e.name}.relation`, t.relation, "Ví dụ: Cố hữu / Thượng tư / Chưa từng quen biết")}<label class="sg-field"><span>Phân loại nhân tế (Chỉ dùng khi đã quen biết)</span><select data-bind="characters.${E(e.name)}.category">${k.map((e) => `<option ${e === t.category ? "selected" : ""}>${e}</option>`).join("")}</select></label><label class="sg-field"><span>Quan hệ tư duy (Chỉ dùng khi phân loại là Tư duy)</span><select data-bind="characters.${E(e.name)}.privateRelation">${S.map((e) => `<option ${e === t.privateRelation ? "selected" : ""}>${e}</option>`).join("")}</select></label></div>`,
      s = r
        ? '<div class="sg-era"><b>Khóa thân phận nhân vật lịch sử</b><br>Có thể điều chỉnh quan hệ với &lt;user&gt;, nhưng không sửa đổi thân phận lịch sử, quỹ đạo hoạt động hoặc thiết lập gốc.</div>'
        : `<div class="sg-long-term"><div class="sg-long-term-head"><span><b>Định vị nhân vật lâu dài</b><small>Có hiệu lực xuyên suốt cốt truyện, không điền mục tiêu hiện tại, thái độ tức thời hoặc vị trí mở màn.</small></span></div><div class="sg-adaptation-seed">${Oe("Ý tưởng nhân vật một câu (Giao cho AI mở rộng)", `characters.${e.name}.adaptationBrief`, t.adaptationBrief, "Ví dụ: Để nàng trở thành người quen cũ cùng <user> qua lại biên trấn, phụ trách kinh doanh thương lộ")}</div><div class="sg-grid">${Oe("Thân phận", `characters.${e.name}.identity`, t.identity, e.summary)}${Oe("Khu vực hoạt động thường lệ", `characters.${e.name}.activityArea`, t.activityArea, "Ví dụ: Qua lại thành Nam Kinh và thương lộ Trường Giang")}${Oe("Thế lực trực thuộc", `characters.${e.name}.faction`, t.faction, "Ví dụ: Gia đình Tô Vãn Đường; nếu không có thì để AI điền “Không có thế lực cố định”")}${Oe("Nhân vật xưng hô <user>", `characters.${e.name}.characterToUser`, t.characterToUser, "Xưng hô theo thân phận và giai đoạn quan hệ")}${Oe("<user> xưng hô nhân vật", `characters.${e.name}.userToCharacter`, t.userToCharacter, e.name)}${Te("Quá khứ với <user>", `characters.${e.name}.relationshipOrigin`, t.relationshipOrigin, "Đôi bên vì sao quen biết hoặc vì sao chưa từng quen biết")}${Te("Phương thức ở chung", `characters.${e.name}.relationshipPattern`, t.relationshipPattern, "Lòng tin, sự phòng bị và quan hệ lợi ích phát triển lâu dài ra sao")}${Te("Hoàn cảnh sinh sống lâu dài", `characters.${e.name}.longTermSituation`, t.longTermSituation, "Miêu tả bối cảnh sinh hoạt lâu dài, không viết khoảnh khắc nào đó đang làm gì")}${(function (
            e,
            t,
            r,
            a = "",
          ) {
            return `<label class="sg-field full"><span>${E(e)}</span><textarea data-list-bind="${E(t)}" placeholder="${E(a)}">${E((r || []).join("\n"))}</textarea></label>`;
          })(
            "Yếu điểm diễn dịch (Mỗi dòng một mục)",
            `characters.${e.name}.adaptationPrinciples`,
            t.adaptationPrinciples,
            "Giữ lại trải nghiệm, hành vi và mối quan hệ không thể đánh mất trong thiết lập gốc",
          )}</div></div>`;
    return `<article class="sg-config-card ${a ? "expanded" : ""}" data-character-config="${E(e.name)}"><div class="sg-config-head"><button type="button" class="sg-config-main" data-action="toggle-character-editor" data-character-name="${E(e.name)}" aria-expanded="${a}"><span class="sg-config-chevron">›</span><span><span class="sg-config-name"><b>${E(e.name)}</b><span class="sg-kind">${Me(e)}</span></span><span class="sg-config-summary">${E(n)} · ${E(i)} · ${E(t.relation || "Chưa từng quen biết")}</span></span></button><div class="sg-config-actions">${r ? "" : `<button type="button" class="sg-mini-btn accent" data-action="ai-character" data-character-name="${E(e.name)}">AI bổ sung</button>`}<button type="button" class="sg-mini-btn" data-action="remove-character" data-character-name="${E(e.name)}">Gỡ bỏ</button></div></div><div class="sg-quick-area"><div class="sg-quick-label"><b>Bản chụp nhanh mở đầu</b><span>Chỉ ghi vào biến khởi tạo, không cố định vào thiết lập nhân vật lâu dài</span></div><div class="sg-quick-switches"><label class="sg-choice"><input type="checkbox" data-character-toggle="known" data-character-name="${E(e.name)}" ${t.known ? "checked" : ""}><i class="sg-choice-box">✓</i><span class="sg-choice-copy"><b>Đã quen biết trước khi mở màn</b><small>Ghi vào quan hệ nhân tế ban đầu</small></span></label><label class="sg-choice"><input type="checkbox" data-character-toggle="scene" data-character-name="${E(e.name)}" ${t.scene ? "checked" : ""}><i class="sg-choice-box">✓</i><span class="sg-choice-copy"><b>Xuất hiện tại Màn thứ nhất</b><small>Tự động đọc thiết lập hoàn chỉnh tham gia mở đầu</small></span></label><label class="sg-affection-quick"><span>Hảo cảm độ ban đầu</span><input type="number" min="-100" max="100" step="1" data-bind="characters.${E(e.name)}.affection" value="${E(t.affection)}"><small>-100 ～ 100</small></label></div></div><div class="sg-config-body" ${a ? "" : "hidden"}>${o}${s}<p class="sg-config-note">Đưa vào DLC chỉ biểu thị AI biết người này tồn tại; chỉ có nhân vật "Xuất hiện tại Màn thứ nhất" mới được tự động đọc thiết lập hoàn chỉnh và cho phép thực tế xuất hiện.</p></div></article>`;
  }

  function Je() {
    const e = ue().length,
      t = L?.querySelector("[data-selected-count]");
    t && (t.textContent = `Nhân vật đã chọn · ${e} người`);
  }

  function De(e) {
    const t = y.find((t) => t.name === e),
      r = L?.querySelector(`[data-character-config="${CSS.escape(e)}"]`);
    t && r && (r.outerHTML = Re(t));
  }

  function He(e, t) {
    const r = y.find((t) => t.name === e),
      a = M.characters[e];
    r &&
      a &&
      a.included !== t &&
      ((a.included = t),
      t
        ? (K.add(e),
          (function (e) {
            const t = L?.querySelector("[data-selected-chips]");
            t &&
              (t.querySelector(".sg-selected-empty")?.remove(),
              t.insertAdjacentHTML("beforeend", We(e)));
            const r = L?.querySelector("[data-config-container]");
            if (!r) return;
            r.querySelector(".sg-config-empty")?.remove();
            let a = r.querySelector(".sg-config-list");
            (a ||
              ((r.innerHTML = '<div class="sg-config-list"></div>'),
              (a = r.querySelector(".sg-config-list"))),
              a.insertAdjacentHTML("beforeend", Re(e)),
              Je());
          })(r))
        : ((a.known = !1),
          (a.scene = !1),
          K.delete(e),
          (function (e) {
            L?.querySelector(
              `[data-character-config="${CSS.escape(e)}"]`,
            )?.remove();
            const t = [
              ...(L?.querySelectorAll(
                "[data-selected-chips] [data-character-name]",
              ) || []),
            ].find((t) => t.dataset.characterName === e);
            t?.remove();
            const r = ue(),
              a = L?.querySelector("[data-selected-chips]"),
              n = L?.querySelector("[data-config-container]");
            (r.length ||
              (a &&
                (a.innerHTML =
                  '<span class="sg-selected-empty">Chưa chọn nhân vật nào; mở đầu cũng có thể chỉ gồm duy nhất &lt;user&gt;.</span>'),
              n &&
                (n.innerHTML =
                  '<div class="sg-config-empty"><b>Chưa đưa vào nhân vật</b><br>Sau khi chọn từ danh bạ bên trái, cấu hình sẽ xuất hiện tại đây.</div>')),
              Je());
          })(e)),
      (function (e, t) {
        const r = [
          ...(L?.querySelectorAll("[data-character-catalog]") || []),
        ].find((t) => t.dataset.characterName === e);
        (r?.classList.toggle("on", t),
          r?.setAttribute("aria-pressed", String(t)));
      })(e, t),
      ne(),
      ee());
  }

  function Ue() {
    if (!L || 2 !== M.step) return;
    let e = 0;
    for (const t of L.querySelectorAll("[data-character-catalog]")) {
      const r = "all" === U || t.dataset.characterKind === U,
        a = !H || t.dataset.characterSearch.includes(H);
      ((t.hidden = !(r && a)), t.hidden || (e += 1));
    }
    const t = L.querySelector("[data-catalog-empty]");
    t && (t.hidden = e > 0);
    for (const e of L.querySelectorAll("[data-roster-filter]"))
      e.classList.toggle("on", e.dataset.rosterFilter === U);
  }

  function Ke() {
    const e = ue();
    return `<section class="sg-page sg-page-wide"><p class="sg-kicker">STEP TWO · WHO EXISTS AROUND YOU</p><h1>Sắp đặt nhân vật cho tuyến thế giới này</h1><p class="sg-lead">Danh bạ sẽ đồng bộ "Trình quản lý Nhân vật và Chân dung" cùng thiết lập hoàn chỉnh trong Sách thế giới của thẻ nhân vật hiện tại. Sau khi chọn nhân vật, chỉ cần quyết định xem trước khi mở màn đã quen biết hay chưa, và có xuất hiện tại Màn thứ nhất hay không.</p><div class="sg-selected-bar"><div class="sg-selected-head"><b data-selected-count>Nhân vật đã chọn · ${e.length} người</b><span>Nhấp vào tên để định vị trực tiếp cấu hình</span></div><div class="sg-selected-chips" data-selected-chips>${e.length ? e.map(We).join("") : '<span class="sg-selected-empty">Chưa chọn nhân vật nào; mở đầu cũng có thể chỉ gồm duy nhất &lt;user&gt;.</span>'}</div></div><div class="sg-roster-workspace"><aside class="sg-roster-panel"><div class="sg-panel-head"><div class="sg-panel-title"><h2>Danh bạ nhân vật</h2><span>${y.length} người</span></div><label class="sg-search"><input type="search" data-roster-search value="${E(H)}" placeholder="Tìm kiếm tên hoặc giới thiệu"></label><div class="sg-filter-row">${[
      ["all", "Tất cả"],
      ["free", "Nguyên tác"],
      ["family", "Gia tộc"],
      ["history", "Lịch sử"],
    ]
      .map(
        ([e, t]) =>
          `<button type="button" class="sg-filter ${U === e ? "on" : ""}" data-action="roster-filter" data-roster-filter="${e}">${t}</button>`,
      )
      .join(
        "",
      )}</div></div><div class="sg-catalog">${y.map(Be).join("")}<div class="sg-catalog-empty" data-catalog-empty hidden>Không có nhân vật phù hợp điều kiện</div></div></aside><section class="sg-config-panel"><div class="sg-config-toolbar"><p>"Bản chụp nhanh mở đầu" và "Định vị lâu dài" đã được tách biệt, cốt truyện sẽ không bị giam giữ vĩnh viễn ở cảnh mở màn.</p><div class="sg-toolbar-actions"><button type="button" class="sg-mini-btn accent" data-action="ai-characters">AI bổ sung nhân vật đã chọn</button><details class="sg-bulk"><summary>Cài đặt hàng loạt</summary><div class="sg-bulk-menu"><button type="button" data-action="bulk-location">Khu vực hoạt động tham khảo địa điểm nhân vật chính</button><button type="button" data-action="bulk-known">Đặt tất cả thành Đã quen biết</button><button type="button" data-action="bulk-clear-scene">Dọn trống hiện trường mở đầu</button></div></details></div></div><div data-config-container>${e.length ? `<div class="sg-config-list">${e.map(Re).join("")}</div>` : '<div class="sg-config-empty"><b>Chưa đưa vào nhân vật</b><br>Sau khi chọn từ danh bạ bên trái, cấu hình sẽ xuất hiện tại đây.</div>'}</div></section></div><div class="sg-era sg-fixed-relations"><b>Quan hệ thân thuộc sẵn có giữa các nhân vật</b><br>${w.map(([e, t, r]) => `${e}—${t}（${r}）`).join(" · ")}</div></section>`;
  }

  function Fe(e, t) {
    return (M.opening.referenceEntries || []).some(
      (r) => r.worldbook === e && r.name === t,
    );
  }

  function Ve() {
    const e = M.opening.referenceEntries || [];
    return e.length
      ? e
          .map(
            (e) =>
              `<span class="sg-reference-chip"><span title="${E(e.worldbook)}">${E(e.name)}</span><button type="button" data-action="remove-reference-entry" data-reference-worldbook="${E(e.worldbook)}" data-reference-name="${E(e.name)}" aria-label="Gỡ bỏ ${E(e.name)}">×</button></span>`,
          )
          .join("")
      : '<span class="sg-reference-empty">Chưa lựa chọn; AI sẽ chỉ dựa theo cấu hình mở đầu hiện tại để sinh.</span>';
  }

  function Ye() {
    const e = L?.querySelector("[data-reference-overlay-body]");
    e &&
      (e.innerHTML = (function () {
        if (G) return `<div class="sg-errors">${E(G)}</div>`;
        if (!F.length)
          return '<div class="sg-config-empty">Không có Sách thế giới để đọc.</div>';
        const e = [...(V[Y] || [])]
          .filter((e) => e?.name)
          .sort(
            (e, t) => (e.position?.order || 100) - (t.position?.order || 100),
          );
        return `<div class="sg-reference-toolbar"><label class="sg-field"><span>Sách thế giới</span><select data-reference-worldbook-select>${F.map((e) => `<option value="${E(e)}" ${e === Y ? "selected" : ""}>${E(e)}</option>`).join("")}</select></label><label class="sg-field"><span>Tìm kiếm mục</span><input type="search" data-reference-search placeholder="Nhập tên mục"></label></div><div class="sg-reference-list">${
          e.length
            ? e
                .map(
                  (e) =>
                    `<label class="sg-reference-entry" data-reference-entry-row data-reference-search-text="${E(e.name.toLowerCase())}"><input type="checkbox" data-reference-entry data-reference-worldbook="${E(Y)}" data-reference-name="${E(e.name)}" ${Fe(Y, e.name) ? "checked" : ""}><span><b>${E(e.name)}</b><small>${E(
                      String(e.content || "")
                        .replace(/\s+/g, " ")
                        .slice(0, 100) || "Mục trống",
                    )}</small></span></label>`,
                )
                .join("")
            : '<div class="sg-config-empty">Sách thế giới này không có mục nào.</div>'
        }<div class="sg-config-empty" data-reference-search-empty hidden>Không có mục phù hợp.</div></div><div class="sg-reference-footer"><span>Chỉ giao các mục đã chọn cho AI tham khảo, không sao chép vào DLC.</span><span data-reference-modal-count>Đã chọn ${(M.opening.referenceEntries || []).length} mục</span></div>`;
      })());
  }

  async function Ge() {
    (L?.querySelector("[data-reference-overlay]")?.remove(),
      L?.insertAdjacentHTML(
        "beforeend",
        '<div class="sg-reference-overlay" data-reference-overlay><section class="sg-reference-modal" role="dialog" aria-modal="true" aria-label="Chọn mục Sách thế giới tham khảo"><header class="sg-reference-head"><div><p class="sg-kicker">REFERENCE MATERIAL</p><h2>Chọn Sách thế giới tham khảo</h2></div><button type="button" class="sg-close" data-action="close-reference-selector" aria-label="Đóng">×</button></header><div class="sg-reference-body" data-reference-overlay-body><div class="sg-config-empty">Đang đọc Sách thế giới……</div></div></section></div>',
      ),
      F.length ||
        (await (async function () {
          G = "";
          try {
            const e = A("getWorldbookNames"),
              t = A("getCharWorldbookNames"),
              r = ("function" == typeof e && (await e())) || [],
              a = "function" == typeof t ? await t("current") : null,
              n = [a?.primary, ...(a?.additional || [])].filter(Boolean);
            ((F = [...new Set([...n, ...r])]),
              (Y && F.includes(Y)) || (Y = n[0] || F[0] || ""),
              Y && (await ie(Y)));
          } catch (e) {
            G = e?.message || "Không thể đọc danh sách Sách thế giới.";
          }
        })()),
      Ye());
  }

  function Xe(e, t, r) {
    const a = (M.opening.referenceEntries ||= []),
      n = Fe(e, t);
    (r && !n && a.push({ worldbook: e, name: t }),
      !r &&
        n &&
        (M.opening.referenceEntries = a.filter(
          (r) => r.worldbook !== e || r.name !== t,
        )),
      ee(),
      (function () {
        const e = L?.querySelector("[data-reference-summary]");
        e && (e.innerHTML = Ve());
        const t = L?.querySelector("[data-reference-count]");
        t &&
          (t.textContent = `Đã chọn ${(M.opening.referenceEntries || []).length} mục`);
      })());
    const i = L?.querySelector("[data-reference-modal-count]");
    i && (i.textContent = `Đã chọn ${M.opening.referenceEntries.length} mục`);
  }

  function Qe() {
    const e = (e) => L?.querySelector(`[data-api-setting="${e}"]`)?.value ?? "";
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

  function Ze() {
    const e = ue(),
      t = e.filter((e) => M.characters[e.name].scene),
      r = M.initialization?.stale
        ? "Chưa bổ sung theo mở đầu hiện tại"
        : M.initialization?.summary || "Đã vượt qua kiểm tra Schema cố định";
    return `<section class="sg-page"><p class="sg-kicker">STEP THREE · THE FIRST SPARK</p><h1>Câu chuyện bắt đầu từ đâu?</h1><p class="sg-lead">Màn thứ nhất chỉ là lời dẫn nhập, không có trách nhiệm để tất cả nhân vật lần lượt xuất hiện. Dưới đây chỉ có nhân vật được kích hoạt mới có thể xuất hiện tại hiện trường mở đầu.</p><div class="sg-scene">${e.length ? e.map((e) => `<button type="button" class="${M.characters[e.name].scene ? "on" : ""}" data-scene-character="${E(e.name)}" aria-pressed="${M.characters[e.name].scene}">${E(e.name)}</button>`).join("") : '<span class="sg-lead">Chưa đưa vào nhân vật; cũng có thể chỉ viết cảnh mở màn gồm &lt;user&gt; và người qua đường dùng một lần.</span>'}</div><div class="sg-persona-strip"><span><b>Tự động tham khảo thiết lập nhân vật</b><br><small data-persona-summary>${t.length ? `${t.map((e) => e.name).join("、")} · Sẽ đọc mục SFW/nhân vật tương ứng` : "Không có nhân vật hiện trường; sẽ không đọc thêm thiết lập nhân vật"}</small></span><span class="sg-kind">Ràng buộc cứng</span></div><div class="sg-opening-tools"><section class="sg-opening-tool"><div class="sg-tool-head"><span><b>Số chữ lời mở đầu</b><small>AI sẽ lấy số chữ mục tiêu làm trung tâm, dao động khoảng 10%</small></span></div><div class="sg-length-row"><input type="number" min="300" max="5000" step="100" data-bind="opening.targetWords" value="${E(M.opening.targetWords)}"><div class="sg-length-presets">${[600, 1e3, 1500, 2e3].map((e) => `<button type="button" class="sg-length-preset ${Number(M.opening.targetWords) === e ? "on" : ""}" data-action="opening-length" data-opening-length="${e}">${e} chữ</button>`).join("")}</div></div></section><section class="sg-opening-tool"><div class="sg-tool-head"><span><b>Tham khảo thêm Sách thế giới</b><small>Dùng cho sự thật địa phương, bối cảnh lịch sử, bầu không khí hoặc văn phong; thiết lập nhân vật không cần chọn thủ công</small></span><button type="button" class="sg-btn" data-action="open-reference-selector">Chọn mục</button></div><div class="sg-reference-summary" data-reference-summary>${Ve()}</div><div style="margin-top:8px;color:var(--muted);font-size:10px" data-reference-count>Đã chọn ${(M.opening.referenceEntries || []).length} mục</div></section></div><div class="sg-grid">${Oe("Tên mở đầu", "opening.name", M.opening.name, "Màn thứ nhất")}${Te("Ý tưởng mở đầu một câu", "opening.hook", M.opening.hook, "Ví dụ: Binh sĩ bị nợ lương đang làm loạn ngoài cổng bảo, nhân vật chính phải gom đủ một chuyến lương thực trước khi trời tối.")}${Te("Chính văn lời mở đầu", "opening.body", M.opening.body, "Có thể tự viết, hoặc nhấp nút bên dưới để AI tự động tạo.")}</div><div class="sg-generation-flow"><div class="sg-flow-card"><b>1. Tạo Màn thứ nhất</b><small>Đọc thiết lập hoàn chỉnh và định vị lâu dài của nhân vật hiện trường</small></div><span class="sg-flow-arrow">→</span><div class="sg-flow-card"><b>2. Bổ sung biến khởi tạo</b><small>Trích xuất sự thật từ chính văn cuối cùng, chỉ ghi vào các trường Schema cố định</small></div></div><div class="sg-actions" style="margin-top:16px"><button class="sg-btn primary" data-action="generate" ${R ? "disabled" : ""}>${R && "opening" === Q ? "Đang tạo lời mở đầu…" : R && "initialization" === Q ? "Đang kiểm tra biến khởi tạo…" : "AI tạo lời mở đầu và bổ sung biến lượng"}</button><button class="sg-btn" data-action="generate-initvar" ${R || !M.opening.body.trim() ? "disabled" : ""}>Chỉ bổ sung lại biến khởi tạo</button></div><div class="sg-era"><b>Nhân vật hiện trường:</b><span data-scene-summary>${t.map((e) => e.name).join("、") || "Không có nhân vật sẵn có"}</span><br><span>Các nhân vật đã chọn khác vẫn sẽ vào Khái lãm nhân vật, nhưng không tự động xuất hiện trong Màn thứ nhất.</span></div><div class="sg-era sg-initvar-note"><b>Biến khởi tạo:</b><span data-initvar-status>${E(r)}</span><br><small>Bản đồ thiên hạ chính thức, ngày tháng địa điểm, thuộc tính nhân vật chính và cấu trúc trường được khóa bằng mã nguồn; AI chỉ có thể bổ sung nhân vật, vật phẩm, quân đội, tài sản, khoa kỹ, thế lực, nhiệm vụ và đại sự ký được chính văn ủng hộ rõ ràng.</small></div></section>`;
  }
  function et() {
    const e = be(),
      t = ue(),
      r = t.filter((e) => M.characters[e.name].known),
      a = t.filter((e) => M.characters[e.name].scene);
    let n = 0;
    try {
      n = new TextEncoder().encode(JSON.stringify(ye())).length;
    } catch {}
    return `<section class="sg-page"><p class="sg-kicker">STEP FOUR · SEAL THE DOCUMENT</p><h1>Đối chiếu văn điệp thân phận</h1><p class="sg-lead">Tại đây hiển thị nội dung cuối cùng sẽ ghi vào thẻ nhân vật. Sau khi cài đặt chỉ có thể dùng khi tạo đoạn chat mới, không hỗ trợ chuyển đổi giữa chừng.</p>${e.length ? `<div class="sg-errors"><b>Chưa thể tạo:</b><br>${e.map((e) => `• ${E(e)}`).join("<br>")}</div>` : ""}<div class="sg-preview"><article class="sg-card"><h3>${E(M.title)}</h3><p>Sùng Trinh năm thứ bảy tháng bảy · ${E(M.protagonist.location)} · ${E(M.protagonist.identity)}</p></article><article class="sg-card"><h3>Ghi vào Sách thế giới</h3><p><code>${E(p)}</code> · <code>Khái lãm nhân vật</code>; ngoài ra ghi lại thông tin thích ứng của ${t.filter((e) => "history" !== e.lock).length} nhân vật nguyên tác vào mục thiết lập tương ứng.</p></article><article class="sg-card"><h3>Phân bổ nhân vật</h3><p>Khái lãm nhân vật ${t.length} người · Đã quen biết ${r.length} người · Hiện trường mở đầu ${a.length} người</p></article><article class="sg-card"><h3>Màn thứ nhất</h3><p>${E(M.opening.name)} · ${E(M.opening.body.slice(0, 180) || "Chưa điền chính văn")}${M.opening.body.length > 180 ? "……" : ""}</p></article><article class="sg-card"><h3>Biến khởi tạo</h3><p>${M.initialization?.stale ? "Cần quay lại bước ba để bổ sung lại" : `Đã qua kiểm tra Schema cố định · ${E(M.initialization?.summary || "Không có sự thật bổ sung")}`}</p></article><article class="sg-card"><h3>Thời đại và dung lượng gói</h3><p>Bản đồ tháng 7 chính thức ${Object.keys(B?.["Biến lượng"]?.["Thiên hạ bản đồ"]?.["Thái thế khu vực"] || {}).length} khu vực · Dự kiến ${(n / 1024).toFixed(1)} KB / 1367 KB</p></article></div><input type="file" hidden accept="application/json,.json" data-project-file><div class="sg-actions" style="margin-top:18px"><button class="sg-btn" data-action="import-project">Tải dự án</button><button class="sg-btn" data-action="download-project">Lưu dự án</button><button class="sg-btn" data-action="download-package" ${e.length ? "disabled" : ""}>Tải xuống DLC</button><button class="sg-btn primary" data-action="install" ${e.length ? "disabled" : ""}>Cài đặt chơi thử trực tiếp</button><button class="sg-btn primary" data-action="publish" ${e.length ? "disabled" : ""}>Đưa lên Xưởng sáng tạo</button></div></section>`;
  }
  function tt({ preserveScroll: e = !1 } = {}) {
    if (!L) return;
    const t = (e && L.querySelector(".sg-content")?.scrollTop) || 0,
      r = (e && L.querySelector(".sg-catalog")?.scrollTop) || 0,
      a = [Ie, Ke, Ze, et];
    if (
      ((L.innerHTML = `<div class="sg-shell"><header class="sg-head"><div class="sg-brand"><span class="sg-seal">Khởi</span><span><b>Trình tạo mở đầu</b><small>Sùng Trinh năm thứ bảy tháng bảy · DLC Thân phận</small></span></div><div class="sg-head-actions"><button type="button" class="sg-api-trigger" data-action="open-api-settings" title="Dùng chung cấu hình API với Vạn Tượng Sinh Thành Khí"><span>⚙ API</span><small>${E($e())}</small></button><button class="sg-close" data-action="close" aria-label="Đóng">×</button></div></header><main class="sg-main"><nav class="sg-steps">${["Tôi là ai", "Tôi quen ai", "Lời dẫn câu chuyện", "Tạo DLC"].map((e, t) => `<button class="sg-step ${M.step === t + 1 ? "on" : ""}" data-step="${t + 1}"><i>${t + 1}</i><span>${e}</span></button>`).join("")}</nav><div class="sg-content">${a[M.step - 1]()}</div></main><footer class="sg-footer"><div class="sg-status ${D}">${E(J || W || "Bản nháp tự động lưu cục bộ.")}</div><div class="sg-actions"><button class="sg-btn" data-action="reset">Tạo mới</button>${M.step > 1 ? '<button class="sg-btn" data-action="previous">Bước trước</button>' : ""}${M.step < 4 ? '<button class="sg-btn primary" data-action="next">Bước tiếp</button>' : ""}</div></footer></div>`),
      Ue(),
      e)
    ) {
      L.querySelector(".sg-content").scrollTop = t;
      const e = L.querySelector(".sg-catalog");
      e && (e.scrollTop = r);
    }
  }
  async function rt(e) {
    const t = e.target.closest?.("[data-step]");
    if (t) return ((M.step = Number(t.dataset.step)), ee(), void tt());
    if (e.target.matches?.("[data-reference-overlay]"))
      return void e.target.remove();
    if (e.target.matches?.("[data-api-overlay]")) return void e.target.remove();
    const r = e.target.closest?.("[data-scene-character]");
    if (r) {
      const e = M.characters[r.dataset.sceneCharacter];
      ((e.scene = !e.scene),
        ee(),
        ne(),
        ee(),
        r.classList.toggle("on", e.scene),
        r.setAttribute("aria-pressed", String(e.scene)));
      const t = ue().filter((e) => M.characters[e.name].scene),
        a = L.querySelector("[data-scene-summary]");
      a && (a.textContent = t.map((e) => e.name).join("、") || "Không có nhân vật sẵn có");
      const n = L.querySelector("[data-persona-summary]");
      n &&
        (n.textContent = t.length
          ? `${t.map((e) => e.name).join("、")} · Sẽ đọc mục SFW/nhân vật tương ứng`
          : "Không có nhân vật hiện trường; sẽ không đọc thêm thiết lập nhân vật");
      const i = L.querySelector("[data-initvar-status]");
      return void (i && (i.textContent = "Cấu hình đã thay đổi, cần bổ sung lại"));
    }
    const a = e.target.closest?.("[data-action]"),
      n = a?.dataset.action;
    if (!n) return;
    if ("close" === n) return nt();
    if ("open-api-settings" === n)
      return void (function () {
        L?.querySelector("[data-api-overlay]")?.remove();
        const e = xe();
        L?.insertAdjacentHTML(
          "beforeend",
          `<div class="sg-reference-overlay" data-api-overlay><section class="sg-reference-modal sg-api-modal" role="dialog" aria-modal="true" aria-label="Cấu hình API"><header class="sg-reference-head"><div><p class="sg-kicker">SHARED MODEL API</p><h2>Cấu hình API tạo văn bản</h2><small>Dùng chung cấu hình với Vạn Tượng Sinh Thành Khí, lưu ở bất kỳ đâu cũng sẽ đồng bộ có hiệu lực.</small></div><button type="button" class="sg-close" data-action="close-api-settings" aria-label="Đóng">×</button></header><div class="sg-reference-body"><div class="sg-api-grid"><label class="sg-field"><span>Giao thức kết nối</span><select data-api-setting="apiType"><option value="openai" ${"openai" === e.apiType ? "selected" : ""}>Giao thức tương thích OpenAI</option><option value="claude" ${"claude" === e.apiType ? "selected" : ""}>Giao thức Claude</option></select></label><label class="sg-field"><span>Tên mô hình</span><div class="sg-api-model-row"><input data-api-setting="model" value="${E(e.model)}" placeholder="Ví dụ: gemini-2.5-flash"><button type="button" class="sg-btn" data-action="fetch-api-models">Lấy danh sách</button></div><select data-api-models hidden aria-label="Mô hình khả dụng"></select></label><label class="sg-field full"><span>Địa chỉ API</span><input data-api-setting="apiUrl" value="${E(e.apiUrl)}" placeholder="https://example.com/v1/chat/completions"></label><label class="sg-field full"><span>Khóa API</span><input type="password" data-api-setting="apiKey" value="${E(e.apiKey)}" placeholder="sk-..."></label><label class="sg-field"><span>Nhiệt độ (Temperature)</span><input type="number" min="0" max="2" step="0.1" data-api-setting="temperature" value="${E(e.temperature)}"></label><label class="sg-field"><span>Token tối đa</span><input type="number" min="1" max="200000" data-api-setting="maxTokens" value="${E(e.maxTokens)}"></label><label class="sg-field"><span>Top P</span><input type="number" min="0" max="1" step="0.05" data-api-setting="topP" value="${E(e.topP)}"></label><label class="sg-field"><span>Phạt tần suất (Frequency Penalty)</span><input type="number" min="-2" max="2" step="0.1" data-api-setting="frequencyPenalty" value="${E(e.frequencyPenalty)}"></label><label class="sg-field"><span>Phạt hiện diện (Presence Penalty)</span><input type="number" min="-2" max="2" step="0.1" data-api-setting="presencePenalty" value="${E(e.presencePenalty)}"></label></div><div class="sg-api-note" data-api-settings-status>Khóa bí mật chỉ được lưu trong bộ nhớ cục bộ của trang Quán Rượu hiện tại.</div><div class="sg-actions sg-api-actions"><button type="button" class="sg-btn" data-action="close-api-settings">Hủy bỏ</button><button type="button" class="sg-btn primary" data-action="save-api-settings">Lưu và đồng bộ</button></div></div></section></div>`,
        );
      })();
    if ("close-api-settings" === n)
      return void L.querySelector("[data-api-overlay]")?.remove();
    if ("fetch-api-models" === n)
      return void (await (async function (e) {
        const t = Qe(),
          r = L?.querySelector("[data-api-settings-status]"),
          a = e.textContent;
        ((e.disabled = !0), (e.textContent = "Đang đọc…"));
        try {
          if (!t.apiUrl) throw new Error("Vui lòng điền địa chỉ API trước.");
          const e = A("getModelList");
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
            throw new Error("Giao thức API không trả về mô hình khả dụng.");
          const n = L?.querySelector("[data-api-models]");
          ((n.innerHTML = a
            .map((e) => `<option value="${E(e)}">${E(e)}</option>`)
            .join("")),
            (n.hidden = !1));
          const i = L?.querySelector('[data-api-setting="model"]');
          (i.value && a.includes(i.value)
            ? (n.value = i.value)
            : ((n.value = a[0]), (i.value = a[0])),
            r &&
              (r.textContent = `Đã đọc ${a.length} mô hình; sau khi chọn hãy nhớ lưu lại.`));
        } catch (e) {
          r && (r.textContent = `Đọc danh sách mô hình thất bại: ${e?.message || e}`);
        } finally {
          ((e.disabled = !1), (e.textContent = a));
        }
      })(a));
    if ("save-api-settings" === n) {
      ((o = Qe()),
        Z().setItem(i, JSON.stringify({ ...f, ...o })),
        L.querySelector("[data-api-overlay]")?.remove());
      const e = L.querySelector(".sg-api-trigger small");
      return (
        e && (e.textContent = $e()),
        void ae("Cấu hình API đã được lưu và đồng bộ với Vạn Tượng Sinh Thành Khí.", "success")
      );
    }
    var o;
    if ("ai-protagonist" === n) {
      ((Q = "protagonist"), (R = !0), (a.disabled = !0));
      const e = a.textContent;
      a.textContent = "AI đang chỉnh lý thân phận…";
      try {
        (await (async function () {
          const e = M.protagonist;
          if (!String(e.description || "").trim())
            throw new Error("Vui lòng dùng một đoạn văn miêu tả thân phận <user> muốn trải nghiệm trước.");
          const t = {
              title: ["Tên DLC", M.title],
              origin: ["Lai lịch", e.origin],
              identity: ["Thân phận công khai", e.identity],
              occupation: ["Nghề nghiệp hoặc chức quan", e.occupation],
              location: ["Địa điểm mở đầu", e.location],
              faction: ["Thế lực trực thuộc lâu dài", e.faction],
              social_standing: ["Thân phận và địa vị xã hội", e.socialStanding],
              family_background: ["Xuất thân và bối cảnh gia đình", e.familyBackground],
              past_experience: ["Trải nghiệm then chốt trước khi hình thành thân phận", e.pastExperience],
              strengths: ["Năng lực và tri thức ổn định", e.strengths],
              resources: ["Tài nguyên có thể chi phối hoặc điều động lâu dài", e.resources],
              long_term_pursuit: ["Mưu cầu lâu dài", e.longTermPursuit],
              identity_boundaries: ["Ranh giới và hạn chế của thân phận", e.identityBoundaries],
              tone: ["Khí chất tự sự", e.tone],
            },
            r = `Người chơi miêu tả:\n${e.description.trim().slice(0, 4e3)}\n\nThời đại cố định: Sùng Trinh năm thứ bảy tháng bảy.\nBảng hiện tại như sau. Nội dung không trống bắt buộc giữ nguyên ý; tiêu đề mặc định "Mở đầu Tàn Minh của ta" và "Nhân vật gốc" có thể dựa theo mô tả để lập lại:\n${JSON.stringify(Object.fromEntries(Object.entries(t).map(([e, [, t]]) => [e, t])), null, 2)}`,
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
            i = await ze(
              "Bạn chịu trách nhiệm chỉnh lý một đoạn ý tưởng thân phận của người chơi thành hồ sơ thân phận lâu dài trong tác phẩm 《Tàn Minh Dư Tẫn》 thời điểm tháng 7 năm Sùng Trinh thứ bảy. Toàn bộ nội dung bắt buộc phải phù hợp với xã hội, địa lý, quan chế và sức sản xuất cuối thời Minh; khi đề cập đến người chơi nhất loạt ghi là <user>. Chỉ ghi thông tin ổn định lâu dài, tuyệt đối không ghi mục tiêu tức thời, hoàn cảnh tạm thời, tình báo trước mắt, có mặt tại hiện trường hay không, hoặc cốt truyện chưa xảy ra lúc mở màn. Ranh giới thân phận bắt buộc phải xác định rõ giới hạn thực tế về quyền lực, tri thức, của cải hoặc nhân mạch, tránh hào quang nhân vật chính. Các trường đã có nội dung không trống là ràng buộc cứng, cấm viết lại; chỉ có tiêu đề mặc định \"Mở đầu Tàn Minh của ta\" và lai lịch mặc định \"Nhân vật gốc\" là có thể lập lại theo miêu tả. Vui lòng bổ sung các trường còn lại, chỉ xuất đối tượng JSON thỏa mãn Schema.",
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
          if (s.length) throw new Error(`AI trả về vẫn còn thiếu: ${s.join("、")}`);
          const c = (e, t, r = []) => {
              const a = String(e.value || "").trim();
              (a && !r.includes(a)) || (e.value = String(o[t]).trim());
            },
            l = { value: M.title };
          (c(l, "title", ["Mở đầu Tàn Minh của ta"]), (M.title = l.value));
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
          ((M.summary = M.summary || e.description.trim().slice(0, 120)),
            ne(),
            ee());
        })(),
          (function () {
            const e = {
              title: M.title,
              ...Object.fromEntries(
                Object.entries(M.protagonist).map(([e, t]) => [
                  `protagonist.${e}`,
                  t,
                ]),
              ),
            };
            for (const [t, r] of Object.entries(e)) {
              const e = L?.querySelector(`[data-bind="${t}"]`);
              e && (e.value = r ?? "");
            }
            Le();
          })(),
          ae("Đã bổ sung hồ sơ thân phận lâu dài của <user> dựa theo miêu tả.", "success"));
      } catch (e) {
        ae(`Bổ sung thân phận thất bại: ${e?.message || e}`, "error");
      } finally {
        ((Q = ""),
          (R = !1),
          a.isConnected && ((a.disabled = !1), (a.textContent = e)));
      }
      return;
    }
    if ("close-reference-selector" === n)
      return void L.querySelector("[data-reference-overlay]")?.remove();
    if ("open-reference-selector" === n) return void (await Ge());
    if ("opening-length" === n) {
      ((M.opening.targetWords = Number(a.dataset.openingLength)), ee());
      const e = L.querySelector('[data-bind="opening.targetWords"]');
      e && (e.value = M.opening.targetWords);
      for (const e of L.querySelectorAll("[data-opening-length]"))
        e.classList.toggle(
          "on",
          Number(e.dataset.openingLength) === M.opening.targetWords,
        );
      return;
    }
    if ("remove-reference-entry" === n) {
      Xe(a.dataset.referenceWorldbook, a.dataset.referenceName, !1);
      const e = [...(L.querySelectorAll("[data-reference-entry]") || [])].find(
        (e) =>
          e.dataset.referenceWorldbook === a.dataset.referenceWorldbook &&
          e.dataset.referenceName === a.dataset.referenceName,
      );
      return void (e && (e.checked = !1));
    }
    if ("previous" === n)
      return ((M.step = Math.max(1, M.step - 1)), ee(), tt());
    if ("next" === n) return ((M.step = Math.min(4, M.step + 1)), ee(), tt());
    if ("reset" === n) {
      if (
        !(P.defaultView || window).confirm(
          "Tạo dự án mới sẽ xóa sạch bản nháp cục bộ hiện tại, bạn có chắc chắn tiếp tục không?",
        )
      )
        return;
      return ((M = q()), ee(), (J = ""), tt());
    }
    if ("roster-filter" === n) return ((U = a.dataset.rosterFilter), void Ue());
    if ("toggle-character" === n) {
      const e = a.dataset.characterName;
      return void He(e, !M.characters[e].included);
    }
    if ("toggle-character-editor" === n) {
      const e = a.dataset.characterName,
        t = a.closest("[data-character-config]"),
        r = t?.querySelector(".sg-config-body"),
        n = !K.has(e);
      return (
        n ? K.add(e) : K.delete(e),
        t?.classList.toggle("expanded", n),
        a.setAttribute("aria-expanded", String(n)),
        void (r && (r.hidden = !n))
      );
    }
    if ("jump-character" === n) {
      const e = a.dataset.characterName,
        t = L.querySelector(".sg-content"),
        r = L.querySelector(`[data-character-config="${CSS.escape(e)}"]`);
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
    if ("remove-character" === n) return void He(a.dataset.characterName, !1);
    if ("ai-character" === n || "ai-characters" === n) {
      const e = (
        "ai-character" === n
          ? y.filter((e) => e.name === a.dataset.characterName)
          : ue()
      ).filter((e) => "history" !== e.lock);
      ((Q = "adaptation"), (R = !0), (a.disabled = !0));
      const t = a.textContent;
      a.textContent = "AI đang đọc thiết lập nhân vật…";
      try {
        if (!e.length)
          throw new Error("Trong các nhân vật đã chọn không có nhân vật nguyên tác nào cần thích ứng lâu dài.");
        const t = [];
        for (let r = 0; r < e.length; r++) {
          a.textContent =
            e.length > 1
              ? `AI đang bổ sung ${r + 1}/${e.length} · ${e[r].name}…`
              : "AI đang đọc thiết lập nhân vật…";
          const n = await je([e[r]]);
          t.push(...n);
          for (const e of n) De(e);
        }
        ae(`Đã bổ sung định vị lâu dài cho ${t.join("、")} dựa theo thiết lập gốc.`, "success");
      } catch (e) {
        ae(`Thích ứng nhân vật thất bại: ${e?.message || e}`, "error");
      } finally {
        ((Q = ""),
          (R = !1),
          a.isConnected && ((a.disabled = !1), (a.textContent = t)));
      }
      return;
    }
    if ("bulk-location" === n) {
      for (const e of ue())
        if ("history" !== e.lock) {
          const t = M.characters[e.name];
          t.activityArea = `Thường hoạt động tại ${M.protagonist.location || "khu vực của nhân vật chính"} và vùng lân cận, có thể di chuyển hợp lý theo chức vụ lâu dài, gia đình hoặc mưu sinh`;
          const r = L.querySelector(
            `[data-bind="characters.${CSS.escape(e.name)}.activityArea"]`,
          );
          r && (r.value = t.activityArea);
        }
      return (
        ne(),
        ee(),
        void ae("Đã cho khu vực hoạt động của nhân vật nguyên tác tham khảo địa điểm của nhân vật chính.", "success")
      );
    }
    if ("bulk-known" === n) {
      for (const e of ue()) {
        M.characters[e.name].known = !0;
        const t = L.querySelector(
          `[data-character-toggle="known"][data-character-name="${CSS.escape(e.name)}"]`,
        );
        t && (t.checked = !0);
      }
      return (
        ne(),
        ee(),
        void ae("Đã đặt toàn bộ nhân vật đã chọn thành quen biết với <user> trước khi mở màn.", "success")
      );
    }
    if ("bulk-clear-scene" === n) {
      for (const e of ue()) {
        M.characters[e.name].scene = !1;
        const t = L.querySelector(
          `[data-character-toggle="scene"][data-character-name="${CSS.escape(e.name)}"]`,
        );
        t && (t.checked = !1);
      }
      return (ne(), ee(), void ae("Đã dọn trống nhân vật tại hiện trường mở đầu.", "success"));
    }
    if ("generate" === n) {
      ((R = !0),
        (Q = "opening"),
        (a.disabled = !0),
        (a.textContent = "Đang tạo lời mở đầu…"));
      try {
        await _e();
        const e = L.querySelector('[data-bind="opening.name"]'),
          t = L.querySelector('[data-bind="opening.body"]');
        (e && (e.value = M.opening.name),
          t && (t.value = M.opening.body),
          (J = "Lời mở đầu đã được tạo và lưu lại, đang bổ sung biến khởi tạo……"),
          (D = "success"));
        const r = L.querySelector(".sg-status");
        r &&
          ((r.textContent = J),
          (r.title = J),
          (r.className = `sg-status ${D}`));
        try {
          ((Q = "initialization"),
            (a.textContent = "Lời mở đầu đã lưu, đang bổ sung biến…"),
            await Ce());
          const e = L.querySelector("[data-initvar-status]");
          (e && (e.textContent = M.initialization.summary),
            (J = "Lời mở đầu đã tạo theo thiết lập nhân vật, biến khởi tạo cũng đã vượt qua kiểm tra Schema cố định."),
            (D = "success"));
        } catch (e) {
          const t = L.querySelector("[data-initvar-status]");
          (t && (t.textContent = "Lời mở đầu đã lưu; biến khởi tạo cần thử lại riêng"),
            (J = `Lời mở đầu đã tạo và lưu; chỉ có bổ sung biến khởi tạo thất bại: ${e?.message || e}`),
            (D = "warning"));
        }
      } catch (e) {
        ((J = `Tạo lời mở đầu thất bại: ${e?.message || e}`), (D = "error"));
      } finally {
        ((R = !1),
          (Q = ""),
          (a.disabled = !1),
          (a.textContent = "AI tạo lời mở đầu và bổ sung biến lượng"));
        const e = L.querySelector(".sg-status");
        e &&
          ((e.textContent = J),
          (e.title = J),
          (e.className = `sg-status ${D}`));
      }
      return;
    }
    if ("generate-initvar" === n) {
      ((R = !0), (Q = "initialization"), (a.disabled = !0));
      const e = a.textContent;
      a.textContent = "Đang bổ sung và kiểm tra…";
      try {
        await Ce();
        const e = L.querySelector("[data-initvar-status]");
        (e && (e.textContent = M.initialization.summary),
          ae("Biến khởi tạo đã được bổ sung lại theo mở đầu hiện tại và vượt qua kiểm tra Schema.", "success"));
      } catch (e) {
        ae(`Tạo biến khởi tạo thất bại: ${e?.message || e}`, "error");
      } finally {
        ((R = !1), (Q = ""), (a.disabled = !1), (a.textContent = e));
      }
      return;
    }
    if ("download-project" === n)
      return (
        Ne(
          JSON.stringify(M, null, 2),
          `${C(M.title)}.cmyj-scenario-project.json`,
        ),
        ae("Dự án mở đầu đã được lưu.", "success")
      );
    if ("import-project" === n)
      return void L.querySelector("[data-project-file]")?.click();
    let s;
    try {
      s = ye();
    } catch (e) {
      return ae(e.message, "error");
    }
    if ("download-package" === n)
      return (
        Ne(JSON.stringify(s, null, 2), `${C(M.title)}.workshop.json`),
        ae("DLC Thân phận đã được xuất.", "success")
      );
    if ("install" !== n)
      return "publish" === n
        ? "function" != typeof I.openWorkshop
          ? ae("Môi trường hiện tại chưa kết nối Xưởng sáng tạo.", "error")
          : (nt(),
            I.openWorkshop({
              initialView: "publish",
              initialType: "scenario",
              initialBundle: s,
            }))
        : void 0;
    if ("function" != typeof I.installScenarioPackage)
      return ae("Môi trường hiện tại chưa kết nối Trình cài đặt DLC.", "error");
    try {
      (await I.installScenarioPackage(s),
        ae("DLC Thân phận đã được cài đặt, vui lòng tạo cuộc trò chuyện mới và chọn màn mở đầu.", "success"));
    } catch (e) {
      "SCENARIO_REPLACE_CANCELLED" === e?.code
        ? ae("Đã giữ lại DLC Thân phận hiện tại.", "info")
        : ae(`Cài đặt thất bại: ${e?.message || e}`, "error");
    }
  }
  function at(e) {
    const t = e.target;
    if (t.matches?.("[data-api-models]")) {
      const e = L?.querySelector('[data-api-setting="model"]');
      return void (e && (e.value = t.value));
    }
    if (t.matches?.("[data-reference-worldbook-select]"))
      "change" === e.type &&
        (async function (e) {
          Y = e;
          const t = L?.querySelector("[data-reference-overlay-body]");
          t &&
            (t.innerHTML = '<div class="sg-config-empty">Đang đọc các mục……</div>');
          try {
            (await ie(e), (G = ""));
          } catch (e) {
            G = e?.message || "Đọc Sách thế giới thất bại.";
          }
          Ye();
        })(t.value);
    else if (t.matches?.("[data-reference-entry]"))
      "change" === e.type &&
        Xe(t.dataset.referenceWorldbook, t.dataset.referenceName, t.checked);
    else if (t.matches?.("[data-reference-search]"))
      !(function (e) {
        let t = 0;
        for (const r of L?.querySelectorAll("[data-reference-entry-row]") || [])
          ((r.hidden = !r.dataset.referenceSearchText.includes(
            e.trim().toLowerCase(),
          )),
            r.hidden || (t += 1));
        const r = L?.querySelector("[data-reference-search-empty]");
        r && (r.hidden = t > 0);
      })(t.value);
    else if (t.matches?.("[data-bind]")) {
      if (
        ((function (e, t) {
          const r = e.split(".");
          let a = M;
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
            ee());
        })(t.dataset.bind, t.value),
        t.dataset.bind.startsWith("protagonist.") && Le(),
        "protagonist.description" !== t.dataset.bind &&
          /^(protagonist|date|stats|characters|opening\.(hook|body|id|name))/.test(
            t.dataset.bind,
          ))
      ) {
        (ne(), ee());
        const e = L?.querySelector("[data-initvar-status]");
        e && (e.textContent = "Nội dung đã chỉnh sửa, cần bổ sung lại");
      }
      if ("opening.targetWords" === t.dataset.bind)
        for (const e of L.querySelectorAll("[data-opening-length]"))
          e.classList.toggle(
            "on",
            Number(e.dataset.openingLength) === Number(t.value),
          );
    } else {
      if (t.matches?.("[data-list-bind]")) {
        const e = t.dataset.listBind.split(".");
        let r = M;
        for (let t = 0; t < e.length - 1; t++) r = r[e[t]];
        return (
          (r[e.at(-1)] = t.value
            .split(/\r?\n/)
            .map((e) => e.trim())
            .filter(Boolean)),
          ne(),
          void ee()
        );
      }
      if (t.matches?.("[data-roster-search]"))
        return ((H = t.value.trim().toLowerCase()), void Ue());
      if (t.matches?.("[data-character-toggle]")) {
        if ("change" !== e.type) return;
        ((M.characters[t.dataset.characterName][t.dataset.characterToggle] =
          t.checked),
          ne(),
          ee());
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
              throw new Error("Không phải tệp dự án mở đầu hợp lệ.");
            ((M = te(t)), ee(), ae("Dự án mở đầu đã được tải.", "success"));
          })
          .catch((e) => ae(`Tải thất bại: ${e?.message || e}`, "error"));
    }
  }
  function nt() {
    (P.getElementById(r)?.remove(), (L = null));
  }
  const it = {
    apiVersion: 1,
    open: async function (t = {}) {
      ((I = t),
        (P = I.mountDocument || document),
        nt(),
        (function () {
          if (P.getElementById(a)) return;
          const e = P.createElement("style");
          ((e.id = a),
            (e.textContent = `#${r}{--paper:#eee5d2;--paper2:#dfd1b7;--card:#f8f0df;--ink:#29231c;--muted:#756958;--line:#b9a98d;--red:#8e2926;position:absolute;inset:0;z-index:68;color:var(--ink);font:14px/1.65 "Noto Serif SC","Songti SC",serif;background:radial-gradient(circle at 82% 9%,rgba(142,41,38,.13),transparent 31%),linear-gradient(145deg,var(--paper),var(--paper2));overflow:hidden}#${r}.theme-night,#${r}.theme-star{--paper:#171b20;--paper2:#20262c;--card:#252b31;--ink:#eee4d1;--muted:#b7aa95;--line:#4b4a45;--red:#bd5950}#${r}*{box-sizing:border-box}#${r} button,#${r} input,#${r} textarea,#${r} select{font:inherit}#${r} .sg-shell{height:100%;display:grid;grid-template-rows:72px 1fr 68px}#${r} .sg-head{display:flex;align-items:center;justify-content:space-between;padding:0 24px;border-bottom:1px solid var(--line);background:color-mix(in srgb,var(--paper) 86%,transparent);backdrop-filter:blur(16px)}#${r} .sg-brand{display:flex;align-items:center;gap:12px}#${r} .sg-seal{display:grid;width:40px;height:40px;place-items:center;border:2px solid var(--red);color:var(--red);font-size:20px;font-weight:900;transform:rotate(-5deg)}#${r} .sg-brand b{font-size:18px;letter-spacing:.1em}#${r} .sg-brand small{display:block;color:var(--muted);font-size:10px;letter-spacing:.14em}#${r} .sg-close,#${r} .sg-btn{border:1px solid var(--line);border-radius:10px;color:inherit;background:var(--card);cursor:pointer;transition:.18s}#${r} .sg-close{width:36px;height:36px;font-size:22px}#${r} .sg-btn{padding:9px 14px}#${r} .sg-btn:hover{transform:translateY(-1px);border-color:var(--red)}#${r} .sg-btn.primary{color:#fff;background:var(--red);border-color:var(--red)}#${r} .sg-main{display:grid;grid-template-columns:210px minmax(0,1fr);min-height:0}#${r} .sg-steps{padding:26px 16px;border-right:1px solid var(--line)}#${r} .sg-step{display:grid;grid-template-columns:32px 1fr;gap:10px;align-items:center;width:100%;padding:11px;border:0;border-radius:12px;color:var(--muted);text-align:left;background:transparent;cursor:pointer}#${r} .sg-step i{display:grid;width:28px;height:28px;place-items:center;border:1px solid var(--line);border-radius:50%;font-style:normal}#${r} .sg-step.on{color:var(--ink);background:color-mix(in srgb,var(--red) 10%,var(--card))}#${r} .sg-step.on i{color:#fff;background:var(--red);border-color:var(--red)}#${r} .sg-content{overflow:auto;padding:30px clamp(18px,4vw,52px)}#${r} .sg-page{width:min(960px,100%);margin:auto}#${r} .sg-kicker{margin:0;color:var(--red);font-size:10px;letter-spacing:.28em}#${r} h1{margin:5px 0 8px;font-size:clamp(28px,4vw,44px);line-height:1.2}#${r} .sg-lead{max-width:720px;margin:0 0 24px;color:var(--muted)}#${r} .sg-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}#${r} .sg-field{display:grid;gap:6px}#${r} .sg-field.full{grid-column:1/-1}#${r} label>span{color:var(--muted);font-size:11px}#${r} input,#${r} textarea,#${r} select{width:100%;border:1px solid var(--line);border-radius:10px;padding:10px 12px;color:var(--ink);background:var(--card);outline:none}#${r} textarea{min-height:102px;resize:vertical}#${r} input:focus,#${r} textarea:focus,#${r} select:focus{border-color:var(--red);box-shadow:0 0 0 3px color-mix(in srgb,var(--red) 12%,transparent)}#${r} .sg-era{margin:18px 0;padding:13px 15px;border-left:4px solid var(--red);border-radius:8px;background:color-mix(in srgb,var(--red) 8%,var(--card))}#${r} .sg-era.bad{border-color:#c46a45}#${r} .sg-roster{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}#${r} .sg-char{position:relative;padding:13px;border:1px solid var(--line);border-radius:14px;background:var(--card);cursor:pointer}#${r} .sg-char.on{border-color:var(--red);box-shadow:inset 0 0 0 1px var(--red)}#${r} .sg-char b{display:block}#${r} .sg-char small{display:block;margin-top:3px;color:var(--muted)}#${r} .sg-char em{position:absolute;right:9px;top:8px;color:var(--red);font-size:9px;font-style:normal}#${r} .sg-char-flags{display:flex;gap:5px;margin-top:9px}#${r} .sg-flag{padding:2px 6px;border-radius:999px;background:var(--paper2);color:var(--muted);font-size:9px}#${r} .sg-flag.on{color:#fff;background:var(--red)}#${r} .sg-detail{margin:16px 0;padding:18px;border:1px solid var(--line);border-radius:16px;background:color-mix(in srgb,var(--card) 88%,transparent)}#${r} .sg-detail h3{margin:0 0 12px}#${r} .sg-checks{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px}#${r} .sg-check{display:flex;align-items:center;gap:7px;padding:7px 10px;border:1px solid var(--line);border-radius:999px;background:var(--paper2);cursor:pointer}#${r} .sg-check input{width:auto}#${r} .sg-scene{display:flex;flex-wrap:wrap;gap:8px;margin:14px 0 22px}#${r} .sg-scene button{padding:8px 11px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:var(--card);cursor:pointer}#${r} .sg-scene button.on{color:#fff;background:var(--red);border-color:var(--red)}#${r} .sg-preview{display:grid;gap:12px}#${r} .sg-card{padding:17px;border:1px solid var(--line);border-radius:15px;background:var(--card)}#${r} .sg-card h3{margin:0 0 7px}#${r} .sg-card p{margin:0;color:var(--muted)}#${r} .sg-errors{padding:12px 14px;border:1px solid #b95d4b;border-radius:10px;background:color-mix(in srgb,#b95d4b 10%,var(--card));color:#b95d4b}#${r} .sg-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 22px;border-top:1px solid var(--line);background:color-mix(in srgb,var(--paper) 90%,transparent)}#${r} .sg-status{overflow:hidden;color:var(--muted);text-overflow:ellipsis;white-space:nowrap}#${r} .sg-status.error{color:#c05b49}#${r} .sg-status.warning{color:#c48a3f}#${r} .sg-status.success{color:#568e63}#${r} .sg-actions{display:flex;gap:8px}@media(max-width:800px){#${r} .sg-main{grid-template-columns:1fr}#${r} .sg-steps{display:flex;overflow:auto;padding:8px;border-right:0;border-bottom:1px solid var(--line)}#${r} .sg-step{min-width:116px;padding:7px}#${r} .sg-content{padding:22px 14px}#${r} .sg-roster{grid-template-columns:repeat(2,minmax(0,1fr))}#${r} .sg-grid{grid-template-columns:1fr}#${r} .sg-field.full{grid-column:auto}#${r} .sg-status{display:none}#${r} .sg-footer{justify-content:flex-end;padding:8px 12px}#${r} .sg-actions{flex-wrap:wrap;justify-content:flex-end}}`),
            (e.textContent += `#${r}{--paper:#f4e7c7;--paper2:#ead6a6;--ink:#2c2118;--muted:#75624d;--line:rgba(96,65,36,.28);--accent:#a43d2d;--accent2:#6f8a67;--shadow:rgba(55,31,12,.35);--card:rgba(255,248,226,.72);--glow:rgba(188,83,42,.32);--red:var(--accent);--radius-shell:20px;--radius-card:14px;--radius-control:10px;background:radial-gradient(circle at 82% 9%,var(--glow),transparent 31%),linear-gradient(145deg,var(--paper),var(--paper2));border-radius:var(--radius-shell)}#${r}.theme-night{--paper:#211913;--paper2:#352619;--ink:#f2dfba;--muted:#b99f76;--line:rgba(237,196,128,.24);--accent:#d0784b;--accent2:#89a074;--shadow:rgba(0,0,0,.65);--card:rgba(65,44,30,.82);--glow:rgba(220,94,48,.28)}#${r}.theme-star{--paper:#0d1820;--paper2:#111d28;--ink:#e6dcc8;--muted:#7d8fa0;--line:rgba(180,155,110,.22);--accent:#d4a040;--accent2:#5d8d9a;--shadow:rgba(0,0,0,.7);--card:rgba(18,28,38,.8);--glow:rgba(210,160,60,.2)}#${r}.theme-ink{--paper:#eee9dc;--paper2:#d8d0bf;--ink:#171a17;--muted:#5f6158;--line:rgba(20,25,22,.24);--accent:#a12f25;--accent2:#2f6965;--shadow:rgba(25,30,24,.30);--card:rgba(248,245,235,.62);--glow:rgba(40,70,64,.18);background:radial-gradient(ellipse at 70% 12%,rgba(23,26,23,.18),transparent 28%),radial-gradient(ellipse at 18% 74%,rgba(47,105,101,.16),transparent 38%),linear-gradient(135deg,var(--paper),var(--paper2))}#${r} .sg-shell{position:relative;border-radius:var(--radius-shell);overflow:hidden}#${r} .sg-shell:before{content:"";position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(80,45,20,.025),rgba(80,45,20,.025) 1px,transparent 1px,transparent 9px);opacity:.55}#${r} .sg-head,#${r} .sg-main,#${r} .sg-footer{position:relative;z-index:1}#${r} .sg-head{background:color-mix(in srgb,var(--paper) 76%,transparent);box-shadow:0 1px 0 rgba(255,255,255,.08) inset}#${r} .sg-steps{background:color-mix(in srgb,var(--card) 36%,transparent)}#${r} .sg-step,#${r} .sg-btn,#${r} .sg-close,#${r} input,#${r} textarea,#${r} select{border-radius:var(--radius-control)}#${r} .sg-char,#${r} .sg-detail,#${r} .sg-card{border-radius:var(--radius-card);box-shadow:0 1px 0 rgba(255,255,255,.08) inset,0 10px 26px color-mix(in srgb,var(--shadow) 28%,transparent);backdrop-filter:blur(3px)}#${r}.theme-ink .sg-char,#${r}.theme-ink .sg-detail,#${r}.theme-ink .sg-card{border-radius:var(--radius-card);background:rgba(250,247,235,.58)}#${r} .sg-content{scrollbar-color:var(--line) transparent}#${r} .sg-kicker{color:var(--accent)}#${r} .sg-seal{border-color:var(--accent);border-radius:6px;color:var(--accent)}#${r} .sg-step.on{background:color-mix(in srgb,var(--accent) 11%,var(--card))}#${r} .sg-step.on i,#${r} .sg-btn.primary,#${r} .sg-flag.on,#${r} .sg-scene button.on{background:var(--accent);border-color:var(--accent)}#${r} .sg-char.on{border-color:var(--accent);box-shadow:inset 3px 0 0 var(--accent),0 10px 26px color-mix(in srgb,var(--shadow) 28%,transparent)}#${r} .sg-btn:hover{border-color:var(--accent)}#${r} .sg-field input:focus,#${r} .sg-field textarea:focus,#${r} .sg-field select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 2px var(--glow)}#${r} .sg-page{animation:sg-page-in .22s ease-out}@keyframes sg-page-in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}`),
            (e.textContent += `#${r} .sg-page-wide{width:min(1180px,100%)}#${r} .sg-selected-bar{position:sticky;top:-30px;z-index:5;margin:0 0 16px;padding:12px 14px;border:1px solid var(--line);border-radius:var(--radius-card);background:color-mix(in srgb,var(--paper) 86%,transparent);box-shadow:0 9px 28px color-mix(in srgb,var(--shadow) 22%,transparent);backdrop-filter:blur(16px)}#${r} .sg-selected-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:9px}#${r} .sg-selected-head b{font-size:13px}#${r} .sg-selected-head span{color:var(--muted);font-size:11px}#${r} .sg-selected-chips{display:flex;gap:7px;overflow:auto;padding:1px 0 3px;scrollbar-width:thin}#${r} .sg-selected-chip{flex:0 0 auto;padding:5px 9px;border:1px solid var(--line);border-radius:999px;color:var(--ink);background:var(--card);cursor:pointer}#${r} .sg-selected-chip:hover{border-color:var(--accent);color:var(--accent)}#${r} .sg-selected-empty{color:var(--muted);font-size:12px}#${r} .sg-roster-workspace{display:grid;grid-template-columns:minmax(250px,310px) minmax(0,1fr);gap:16px;align-items:start}#${r} .sg-roster-panel,#${r} .sg-config-panel{border:1px solid var(--line);border-radius:var(--radius-card);background:color-mix(in srgb,var(--card) 88%,transparent);box-shadow:0 10px 30px color-mix(in srgb,var(--shadow) 22%,transparent);overflow:hidden}#${r} .sg-panel-head{padding:15px;border-bottom:1px solid var(--line)}#${r} .sg-panel-title{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-bottom:10px}#${r} .sg-panel-title h2{margin:0;font-size:17px}#${r} .sg-panel-title span{color:var(--muted);font-size:11px}#${r} .sg-search{position:relative}#${r} .sg-search input{padding-left:34px;background:color-mix(in srgb,var(--paper) 56%,var(--card))}#${r} .sg-search:before{content:'⌕';position:absolute;left:12px;top:6px;z-index:1;color:var(--muted);font-size:20px}#${r} .sg-filter-row{display:flex;gap:6px;margin-top:9px;overflow:auto}#${r} .sg-filter{flex:0 0 auto;padding:5px 9px;border:1px solid transparent;border-radius:999px;color:var(--muted);background:transparent;cursor:pointer}#${r} .sg-filter.on{border-color:var(--line);color:var(--ink);background:var(--paper2)}#${r} .sg-catalog{max-height:480px;overflow:auto;padding:7px;scrollbar-width:thin}#${r} .sg-catalog-row{display:grid;grid-template-columns:24px minmax(0,1fr) auto;gap:9px;align-items:center;width:100%;padding:9px;border:0;border-radius:11px;color:var(--ink);text-align:left;background:transparent;cursor:pointer}#${r} .sg-catalog-row:hover{background:color-mix(in srgb,var(--accent) 7%,transparent)}#${r} .sg-catalog-row.on{background:color-mix(in srgb,var(--accent) 10%,var(--card))}#${r} .sg-pick-box{display:grid;width:20px;height:20px;place-items:center;border:1px solid var(--line);border-radius:6px;color:transparent;background:var(--card);font:700 12px/1 sans-serif}#${r} .sg-catalog-row.on .sg-pick-box{border-color:var(--accent);color:#fff;background:var(--accent)}#${r} .sg-catalog-copy{min-width:0}#${r} .sg-catalog-copy b,#${r} .sg-catalog-copy small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#${r} .sg-catalog-copy small{color:var(--muted);font-size:10px}#${r} .sg-kind{padding:2px 6px;border-radius:999px;color:var(--muted);background:var(--paper2);font-size:9px}#${r} .sg-catalog-empty{padding:24px 12px;color:var(--muted);text-align:center}#${r} .sg-config-toolbar{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 15px;border-bottom:1px solid var(--line)}#${r} .sg-config-toolbar p{margin:0;color:var(--muted);font-size:11px}#${r} .sg-bulk{position:relative}#${r} .sg-bulk summary{padding:6px 10px;border:1px solid var(--line);border-radius:999px;list-style:none;cursor:pointer}#${r} .sg-bulk summary::-webkit-details-marker{display:none}#${r} .sg-bulk-menu{position:absolute;right:0;top:calc(100% + 7px);z-index:8;display:grid;min-width:190px;padding:6px;border:1px solid var(--line);border-radius:12px;background:var(--paper);box-shadow:0 14px 32px var(--shadow)}#${r} .sg-bulk-menu button{padding:8px 10px;border:0;border-radius:8px;color:var(--ink);text-align:left;background:transparent;cursor:pointer}#${r} .sg-bulk-menu button:hover{background:color-mix(in srgb,var(--accent) 9%,transparent)}#${r} .sg-config-list{display:grid;gap:10px;padding:12px}#${r} .sg-config-card{border:1px solid var(--line);border-radius:var(--radius-card);background:color-mix(in srgb,var(--paper) 32%,var(--card));overflow:hidden;transition:border-color .18s,box-shadow .18s}#${r} .sg-config-card.expanded{border-color:color-mix(in srgb,var(--accent) 70%,var(--line));box-shadow:0 10px 24px color-mix(in srgb,var(--shadow) 20%,transparent)}#${r} .sg-config-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:start;padding:13px}#${r} .sg-config-main{display:grid;grid-template-columns:28px minmax(0,1fr);gap:9px;align-items:start;padding:0;border:0;color:inherit;text-align:left;background:transparent;cursor:pointer}#${r} .sg-config-chevron{display:grid;width:26px;height:26px;place-items:center;border-radius:8px;color:var(--muted);background:var(--paper2);transition:transform .18s}#${r} .sg-config-card.expanded .sg-config-chevron{transform:rotate(90deg)}#${r} .sg-config-name{display:flex;align-items:center;gap:7px}#${r} .sg-config-name b{font-size:15px}#${r} .sg-config-summary{display:block;margin-top:3px;color:var(--muted);font-size:11px;white-space:normal}#${r} .sg-config-actions{display:flex;align-items:center;gap:6px}#${r} .sg-mini-btn{padding:5px 8px;border:1px solid var(--line);border-radius:8px;color:var(--muted);background:transparent;cursor:pointer}#${r} .sg-mini-btn:hover{border-color:var(--accent);color:var(--accent)}#${r} .sg-quick-area{padding:0 13px 13px 50px}#${r} .sg-quick-label{display:flex;align-items:baseline;gap:8px;margin-bottom:7px}#${r} .sg-quick-label b{font-size:11px}#${r} .sg-quick-label span{color:var(--muted);font-size:10px}#${r} .sg-quick-switches{display:grid;grid-template-columns:repeat(2,minmax(0,1fr)) minmax(112px,.55fr);gap:8px;padding:0}#${r} .sg-choice{position:relative;display:grid;grid-template-columns:22px minmax(0,1fr);gap:9px;align-items:center;padding:9px 10px;border:1px solid var(--line);border-radius:11px;color:var(--ink);background:color-mix(in srgb,var(--paper) 54%,var(--card));cursor:pointer;transition:border-color .16s,background .16s,transform .16s}#${r} .sg-choice:hover{border-color:var(--accent);transform:translateY(-1px)}#${r} .sg-choice input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}#${r} .sg-choice-box{display:grid;width:21px;height:21px;place-items:center;border:1px solid var(--line);border-radius:6px;color:transparent;background:var(--card);font:700 12px/1 sans-serif}#${r} .sg-choice-copy b,#${r} .sg-choice-copy small{display:block}#${r} .sg-choice-copy b{font-size:12px}#${r} .sg-choice-copy small{margin-top:1px;color:var(--muted);font-size:9px}#${r} .sg-affection-quick{display:grid;grid-template-columns:1fr auto;gap:3px 8px;align-items:center;padding:9px 10px;border:1px solid var(--line);border-radius:11px;background:color-mix(in srgb,var(--paper) 54%,var(--card))}#${r} .sg-affection-quick span{font-size:12px;font-weight:700}#${r} .sg-affection-quick input{grid-row:1/3;grid-column:2;width:64px;padding:6px;text-align:center}#${r} .sg-affection-quick small{color:var(--muted);font-size:9px}#${r} .sg-choice:has(input:checked){border-color:var(--accent);background:color-mix(in srgb,var(--accent) 11%,var(--card));box-shadow:inset 0 0 0 1px color-mix(in srgb,var(--accent) 24%,transparent)}#${r} .sg-choice:has(input:checked) .sg-choice-box{border-color:var(--accent);color:#fff;background:var(--accent)}#${r} .sg-config-body{padding:15px;border-top:1px solid var(--line);background:color-mix(in srgb,var(--card) 58%,transparent)}#${r} .sg-config-note{margin:12px 0 0;color:var(--muted);font-size:11px}#${r} .sg-config-empty{padding:48px 24px;color:var(--muted);text-align:center}#${r} .sg-fixed-relations{margin-top:16px;border-radius:var(--radius-card)}@media(max-width:900px){#${r} .sg-roster-workspace{grid-template-columns:1fr}#${r} .sg-config-panel{grid-row:1}#${r} .sg-catalog{max-height:340px}#${r} .sg-selected-bar{top:-22px}}@media(max-width:560px){#${r} .sg-config-head{grid-template-columns:1fr}#${r} .sg-config-actions{padding-left:37px}#${r} .sg-quick-area{padding-left:13px}#${r} .sg-quick-switches{grid-template-columns:1fr}#${r} .sg-selected-head{align-items:flex-start;flex-direction:column}}`),
            (e.textContent += `#${r} .sg-opening-tools{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:12px;margin:0 0 16px}#${r} .sg-opening-tool{padding:15px;border:1px solid var(--line);border-radius:var(--radius-card);background:color-mix(in srgb,var(--card) 86%,transparent);box-shadow:0 8px 24px color-mix(in srgb,var(--shadow) 18%,transparent)}#${r} .sg-tool-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:10px}#${r} .sg-tool-head b{display:block;font-size:14px}#${r} .sg-tool-head small{display:block;margin-top:2px;color:var(--muted);font-size:10px}#${r} .sg-length-row{display:grid;grid-template-columns:minmax(110px,.7fr) minmax(0,1.3fr);gap:9px;align-items:center}#${r} .sg-length-presets{display:flex;gap:5px;flex-wrap:wrap}#${r} .sg-length-preset{padding:6px 8px;border:1px solid var(--line);border-radius:999px;color:var(--muted);background:var(--paper2);cursor:pointer}#${r} .sg-length-preset.on{border-color:var(--accent);color:#fff;background:var(--accent)}#${r} .sg-reference-summary{display:flex;gap:6px;flex-wrap:wrap;min-height:28px;align-items:center}#${r} .sg-reference-chip{display:flex;align-items:center;gap:5px;padding:4px 7px;border:1px solid var(--line);border-radius:999px;color:var(--ink);background:var(--paper2);font-size:10px}#${r} .sg-reference-chip button{padding:0;border:0;color:var(--accent);background:transparent;cursor:pointer;font-size:14px}#${r} .sg-reference-empty{color:var(--muted);font-size:11px}#${r} .sg-reference-overlay{position:absolute;inset:0;z-index:40;display:grid;place-items:center;padding:18px;background:rgba(12,12,10,.54);backdrop-filter:blur(7px)}#${r} .sg-reference-modal{display:grid;grid-template-rows:auto minmax(0,1fr);width:min(680px,96%);max-height:88%;border:1px solid var(--line);border-radius:18px;color:var(--ink);background:var(--paper);box-shadow:0 24px 70px rgba(0,0,0,.42);overflow:hidden}#${r} .sg-reference-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 18px;border-bottom:1px solid var(--line)}#${r} .sg-reference-head h2{margin:0;font-size:20px}#${r} .sg-reference-body{overflow:auto;padding:16px 18px}#${r} .sg-reference-toolbar{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:12px}#${r} .sg-reference-list{display:grid;gap:6px;max-height:380px;overflow:auto;padding-right:4px;scrollbar-width:thin}#${r} .sg-reference-entry{display:grid;grid-template-columns:22px minmax(0,1fr);gap:9px;align-items:center;padding:9px 10px;border:1px solid var(--line);border-radius:10px;background:var(--card);cursor:pointer}#${r} .sg-reference-entry:hover{border-color:var(--accent)}#${r} .sg-reference-entry input{width:18px;height:18px;accent-color:var(--accent)}#${r} .sg-reference-entry b,#${r} .sg-reference-entry small{display:block}#${r} .sg-reference-entry small{overflow:hidden;color:var(--muted);font-size:9px;text-overflow:ellipsis;white-space:nowrap}#${r} .sg-reference-footer{display:flex;justify-content:space-between;gap:10px;margin-top:12px;color:var(--muted);font-size:10px}#${r} .sg-initvar-note{border-radius:var(--radius-card)}@media(max-width:720px){#${r} .sg-opening-tools{grid-template-columns:1fr}#${r} .sg-reference-toolbar,#${r} .sg-length-row{grid-template-columns:1fr}}`),
            (e.textContent += `#${r} .sg-toolbar-actions{display:flex;align-items:center;gap:7px}#${r} .sg-mini-btn.accent{border-color:color-mix(in srgb,var(--accent) 55%,var(--line));color:var(--accent);background:color-mix(in srgb,var(--accent) 8%,transparent)}#${r} .sg-mini-btn:disabled,#${r} .sg-btn:disabled{cursor:wait;opacity:.58;transform:none}#${r} .sg-long-term{display:grid;gap:12px;margin-top:14px;padding-top:14px;border-top:1px dashed var(--line)}#${r} .sg-long-term-head b,#${r} .sg-long-term-head small{display:block}#${r} .sg-long-term-head small{margin-top:2px;color:var(--muted);font-size:10px}#${r} .sg-adaptation-seed{padding:12px;border:1px solid color-mix(in srgb,var(--accent) 42%,var(--line));border-radius:var(--radius-card);background:color-mix(in srgb,var(--accent) 7%,var(--card))}#${r} .sg-adaptation-seed .sg-field>span{color:var(--accent);font-weight:700}#${r} .sg-persona-strip{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:12px 0;padding:10px 12px;border:1px solid color-mix(in srgb,var(--accent) 35%,var(--line));border-radius:var(--radius-card);background:color-mix(in srgb,var(--accent) 7%,var(--card))}#${r} .sg-persona-strip small{color:var(--muted)}#${r} .sg-generation-flow{display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:stretch;margin:16px 0}#${r} .sg-flow-card{padding:13px;border:1px solid var(--line);border-radius:var(--radius-card);background:var(--card)}#${r} .sg-flow-card b,#${r} .sg-flow-card small{display:block}#${r} .sg-flow-card small{margin-top:3px;color:var(--muted)}#${r} .sg-flow-arrow{display:grid;place-items:center;color:var(--accent);font-size:20px}@media(max-width:650px){#${r} .sg-generation-flow{grid-template-columns:1fr}#${r} .sg-flow-arrow{transform:rotate(90deg)}#${r} .sg-config-toolbar{align-items:flex-start;flex-direction:column}#${r} .sg-toolbar-actions{width:100%;flex-wrap:wrap}}`),
            (e.textContent += `#${r} [hidden]{display:none!important}#${r} .sg-head-actions{display:flex;align-items:center;gap:8px}#${r} .sg-api-trigger{display:flex;align-items:center;gap:8px;max-width:230px;padding:7px 10px;border:1px solid var(--line);border-radius:var(--radius-control);color:var(--ink);background:var(--card);cursor:pointer}#${r} .sg-api-trigger:hover{border-color:var(--accent)}#${r} .sg-api-trigger span{color:var(--accent);font-weight:800}#${r} .sg-api-trigger small{overflow:hidden;color:var(--muted);font-size:10px;text-overflow:ellipsis;white-space:nowrap}#${r} .sg-api-modal{grid-template-rows:auto minmax(0,1fr);width:min(720px,96%)}#${r} .sg-api-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}#${r} .sg-api-model-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px}#${r} [data-api-models]{margin-top:7px}#${r} .sg-api-note{margin-top:14px;padding:10px 12px;border-left:3px solid var(--accent);border-radius:8px;color:var(--muted);background:color-mix(in srgb,var(--accent) 7%,var(--card));font-size:11px}#${r} .sg-api-actions{justify-content:flex-end;margin-top:14px}@media(max-width:640px){#${r} .sg-api-trigger small{display:none}#${r} .sg-api-grid{grid-template-columns:1fr}#${r} .sg-api-grid .sg-field.full{grid-column:auto}}`),
            (e.textContent += `#${r} .sg-identity-record{margin-top:16px;padding:16px;border:1px solid color-mix(in srgb,var(--accent) 38%,var(--line));border-radius:var(--radius-card);background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 8%,var(--card)),var(--card));box-shadow:0 10px 26px color-mix(in srgb,var(--shadow) 20%,transparent)}#${r} .sg-identity-record-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}#${r} .sg-identity-record-head b,#${r} .sg-identity-record-head small{display:block}#${r} .sg-identity-record-head small{margin-top:2px;color:var(--muted);font-size:10px}#${r} .sg-entry-name{flex:0 0 auto;padding:4px 8px;border:1px solid color-mix(in srgb,var(--accent) 45%,var(--line));border-radius:999px;color:var(--accent);background:color-mix(in srgb,var(--accent) 7%,transparent);font:700 10px/1.4 monospace}#${r} .sg-identity-record dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0}#${r} .sg-identity-record dl>div{min-width:0;padding:9px 10px;border:1px solid var(--line);border-radius:10px;background:color-mix(in srgb,var(--paper) 36%,transparent)}#${r} .sg-identity-record dt{color:var(--muted);font-size:9px;letter-spacing:.08em}#${r} .sg-identity-record dd{display:-webkit-box;overflow:hidden;margin:2px 0 0;color:var(--ink);white-space:normal;-webkit-box-orient:vertical;-webkit-line-clamp:2}#${r} .sg-identity-note{margin:10px 0 0;color:var(--muted);font-size:10px}@media(max-width:560px){#${r} .sg-identity-record-head{flex-direction:column}#${r} .sg-identity-record dl{grid-template-columns:1fr}}`),
            (e.textContent += `#${r} .sg-identity-ai{position:relative;margin:0 0 16px;padding:16px;border:1px solid color-mix(in srgb,var(--accent) 45%,var(--line));border-radius:var(--radius-card);background:radial-gradient(circle at 92% 12%,color-mix(in srgb,var(--accent) 18%,transparent),transparent 34%),color-mix(in srgb,var(--card) 88%,transparent);overflow:hidden}#${r} .sg-identity-ai:before{content:'AI';position:absolute;right:16px;top:5px;color:color-mix(in srgb,var(--accent) 14%,transparent);font:900 58px/1 Georgia,serif;pointer-events:none}#${r} .sg-identity-ai-head{position:relative;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}#${r} .sg-identity-ai-head b,#${r} .sg-identity-ai-head small{display:block}#${r} .sg-identity-ai-head small{margin-top:2px;color:var(--muted);font-size:10px}#${r} .sg-identity-ai textarea{position:relative;min-height:84px}#${r} .sg-identity-ai-actions{position:relative;display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:9px}#${r} .sg-identity-ai-actions small{color:var(--muted);font-size:9px}#${r} .sg-profile-detail{margin-top:16px}#${r} .sg-profile-detail summary{cursor:pointer;font-weight:700}#${r} .sg-profile-detail .sg-grid{margin-top:13px}@media(max-width:560px){#${r} .sg-identity-ai-head,#${r} .sg-identity-ai-actions{align-items:stretch;flex-direction:column}}`),
            P.head.appendChild(e));
        })(),
        (X = []),
        (F = []),
        (Y = ""));
      for (const e of Object.keys(V)) delete V[e];
      (await (async function () {
        let e;
        try {
          e =
            "function" == typeof I.listCharacterProfiles
              ? (await I.listCharacterProfiles()) || []
              : re();
        } catch (t) {
          (console.warn(
            "[Tàn Minh Dư Tẫn Trình tạo mở đầu] Đọc nhân vật từ Trình quản lý nhân vật và chân dung thất bại:",
            t,
          ),
            (e = re()));
        }
        const t = [];
        try {
          const e = A("getCharWorldbookNames"),
            r = A("getWorldbook");
          if ("function" == typeof e && "function" == typeof r) {
            const a = await e("current"),
              n = [
                ...new Set(
                  [a?.primary, ...(a?.additional || [])].filter(Boolean),
                ),
              ];
            for (const e of n) {
              const a = (await r(e)) || [];
              ((V[e] = a), t.push(...a));
            }
          }
        } catch (e) {
          console.warn("[Tàn Minh Dư Tẫn Trình tạo mở đầu] Quét thiết lập nhân vật hoàn chỉnh thất bại:", e);
        }
        y = b({ officialCharacters: h, profiles: e, worldbookEntries: t });
      })(),
        (function () {
          try {
            M = te(JSON.parse(Z().getItem(n) || "null"));
          } catch {
            M = q();
          }
        })(),
        (L = P.createElement("div")),
        (L.id = r),
        (L.className = `theme-${I.theme || "night"}`),
        L.addEventListener("click", (e) => {
          rt(e);
        }),
        L.addEventListener("input", at),
        L.addEventListener("change", at),
        P.body.appendChild(L),
        (L.innerHTML =
          '<div class="sg-shell"><div class="sg-config-empty">Đang tải mẫu thời đại Sùng Trinh năm thứ bảy tháng bảy……</div></div>'),
        await (async function () {
          ((B = null), (W = ""));
          try {
            if (I.eraPreset) B = j(I.eraPreset);
            else {
              const t = A("getCharWorldbookNames"),
                r = A("getWorldbook");
              if ("function" != typeof t || "function" != typeof r)
                throw new Error("Quán Rượu hiện tại không cung cấp giao diện đọc Sách thế giới.");
              const a = await t("current"),
                n = a?.primary || a?.additional?.[0];
              if (!n) throw new Error("Nhân vật hiện tại chưa gắn Sách thế giới chính.");
              const i = ((await r(n)) || []).find((e) => e?.name === o);
              if (!i?.content) throw new Error(`Thẻ cơ sở thiếu mẫu thời đại "${o}".`);
              B = e.parse(i.content);
            }
            if (
              "canming-era-preset" !== B?.["Định dạng"] ||
              B?.["Định danh"] !== s ||
              !B?.["Biến lượng"]?.["Thiên hạ bản đồ"]?.["Thái thế khu vực"]
            )
              throw new Error("Định dạng mẫu thời đại không đúng hoặc nội dung không hoàn chỉnh.");
          } catch (e) {
            W = e?.message || "Không thể đọc mẫu thời đại.";
          }
        })(),
        L?.isConnected && tt());
    },
    close: nt,
    exportProject: function () {
      return j(M);
    },
    exportPackage: function () {
      return ye();
    },
    compileProject: (e, t) => {
      const r = M,
        a = B;
      ((M = te(e)), t && (B = j(t)));
      try {
        return ye();
      } finally {
        ((M = r), (B = a));
      }
    },
  };
  globalThis[t] = it;
  try {
    window.parent && window.parent !== window && (window.parent[t] = it);
  } catch {}
})();
export { v as normalizeScenarioFactList };
//# sourceMappingURL=index.js.map
