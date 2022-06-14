import { baseService } from "./baseService";
export class QuanLyNguoiDungService extends baseService {
    dangNhap = (thongTinDangNhap) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    }
    dangKy = (thongTinDangKy) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    }
    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
    layDanhSachNguoiDung = () => {
        return this.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung');
    }
    xoaNguoiDung = (account) => {
        console.log(account);
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${account}`);
    }
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();