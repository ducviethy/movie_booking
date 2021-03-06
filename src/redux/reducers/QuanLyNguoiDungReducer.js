import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { DANG_NHAP_ACTION, LIST_USER, SET_THONG_TIN_NGUOI_DUNG } from "../actions/types/QuanLyNguoiDungType"
let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {},
    listUser:[],
    userEdit:{}
}
export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP_ACTION: {
            const { thongTinDangNhap } = action;
            localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
            localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
            return { ...state, userLogin: thongTinDangNhap }
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state };
        }
        case LIST_USER: {
            state.listUser = action.listUser;
            return { ...state };
        }
        case "EDIT_USER": {
            state.userEdit = action.userEdit;
            return { ...state };
        }
        default:
            return { ...state }
    }
}