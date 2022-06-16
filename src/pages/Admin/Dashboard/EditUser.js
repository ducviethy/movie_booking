import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Radio,
    Select
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinNguoiDung } from '../../../redux/actions/QuanLyNguoiDungAction';

const EditUser = (props) => {
    let { id } = props.match.params;
    const [componentSize, setComponentSize] = useState('default');
    const { userEdit } = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: userEdit.taiKhoan,
            email: userEdit.email,
            hoTen: userEdit.hoTen,
            soDt: userEdit.soDt,
            matKhau:userEdit.matKhau,
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
        },
        onSubmit: (values) => {
            dispatch(capNhatThongTinNguoiDung({...values,maNhom:"GP01"}))
        }
    })
    const handleChangeSelect = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value);
    }
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
    return (
        <>
            <Form
                onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
            >
                <h3 className='text-2xl text-center'>Edit user</h3>
                <Form.Item label="Form Size" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">Small</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="large">Large</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Account">
                    <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
                </Form.Item>
                <Form.Item label="Name">
                    <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
                </Form.Item>
                <Form.Item label="Permission">
                    <Select name="maLoaiNguoiDung" value={formik.values.maLoaiNguoiDung} onChange={handleChangeSelect} >
                        <Select.Option value="QuanTri">QuanTri</Select.Option>
                        <Select.Option value="KhachHang">KhachHang</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Button">
                    <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
                </Form.Item>
            </Form>
        </>
    )
}
export default EditUser;