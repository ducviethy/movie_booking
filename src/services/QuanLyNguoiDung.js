import { baseService } from "./baseService";
export class QuanLyNguoiDungService  extends baseService{
    dangNhap = (thongTinDangNhap) => { // {taiKhoan:'',matKhau:''}
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap);
    }
    layThongTinNguoiDung = () => {
        return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
    }
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();