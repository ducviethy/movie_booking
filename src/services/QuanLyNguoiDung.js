import { baseService } from "./baseService";
export class QuanLyNguoiDungService extends baseService {
    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }
    dangKy = (thongTinDangKy) => { 
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }
    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    layDanhSachNguoiDung = () => {
        return this.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung');
    }
    capNhatThongTinNguoiDung = (userEdit) => {
        return this.post('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',userEdit);
    }
    xoaNguoiDung = (account) => {
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`);
    }
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();