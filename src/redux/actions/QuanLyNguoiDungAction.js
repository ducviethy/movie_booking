import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung";
import { DANG_NHAP_ACTION, LIST_USER, SET_THONG_TIN_NGUOI_DUNG } from "./types/QuanLyNguoiDungType";
import { history } from '../../App';
export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về admin
                history.push("/home");
            }
        } catch (error) {
            console.log('error', error)
        }
    }
}
export const dangKyAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy)
            if (result.data.statusCode === 200) {
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }
            alert("Đăng ký thành công !")
        } catch (error) {
            alert("Đăng ký thất bại,thử lại sau !")
            console.log('error', error)
        }
    }
}
export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung()
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });
            }
        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}
export const layDanhSachNguoiDung = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung()
            if (result.data.statusCode === 200) {
                dispatch({
                    type: LIST_USER,
                    listUser: result.data.content
                })
            }
            //console.log(result.data.content);
        } catch (error) {
            console.log('error', error)
        }
    }
}
export const xoaNguoiDung = (account) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(account)
            alert("Xóa thành công !")
            //console.log(result.data.content);
            dispatch(layDanhSachNguoiDung())
        } catch (error) {
            alert("Xóa thất bại !")
            console.log('error', error)
        }
    }
}