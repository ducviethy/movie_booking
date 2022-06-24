import React, { useEffect, useState } from 'react'
import { Form, Button, Select } from 'antd';
import { DatePicker } from 'antd';
import { InputNumber } from 'antd';
import { quanLyRapService } from '../../../services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../services/QuanLyDatVeService';
import { history } from '../../../App';
export default function ShowTime(props) {
    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: ''
        },
        onSubmit: async (values) => {
            try {
                console.log(values);
                await quanLyDatVeService.taoLichChieu(values);
                alert("update thanh cong");
                history.push('/admin/films');
            } catch (error) {
                alert("gia ve tu 75k-200k");
                console.log('error', error.response?.data);
            }
        }
    })
    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })
    //console.log(state.heThongRapChieu)
    useEffect(() => {
        async function fetchData() {
            try {
                let result = await quanLyRapService.layThongTinHeThongRap();
                setState({
                    ...state,
                    heThongRapChieu: result.data.content
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    const handleChangeHeThongRap = async (value) => {
        //từ hệ thống rạp call api lấy thông tin rạp
        try {
            let result = await quanLyRapService.layThongTinCumRap(value);
            //Gán giá trị cụm rạp vào state.cumRap
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
            
        } catch (error) {
            console.log('error', error.response?.data);
        }
    }
    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap', value)
    }
    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY hh:mm:ss'))
        console.log('values', moment(values).format('DD/MM/YYYY hh:mm:ss'));
    }
    const onChangeDate = (value) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(value).format('DD/MM/YYYY hh:mm:ss'))
        console.log('values', moment(value).format('DD/MM/YYYY hh:mm:ss'));
    }
    const onchangeInputNumber = (value) => {
        formik.setFieldValue('giaVe', value)
    }
    const convertSelectHTR = () => {
        // state.heThongRapChieu?.map((htr, index) => ({ label: htr.tenHeThongRap, value: htr.tenHeThongRap }))
        return state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
        })
    }
    //console.log(props.match.params);
    let film = {};
    if (localStorage.getItem('filmParams')) {
        film = JSON.parse(localStorage.getItem('filmParams'));
    }
    return (
        <>
            <h3 className="text-2xl text-center mb-10">Tạo lịch chiếu - {props.match.params.tenphim}</h3>
            <div className="container flex justify-around">
                <img src={film.hinhAnh} alt='...' width={200} height={100} />
                <Form
                    name="basic"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 16 }}
                    onSubmitCapture={formik.handleSubmit}
                >
                    <Form.Item label="Hệ thống rạp">
                        <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
                    </Form.Item>
                    <Form.Item label="Cụm rạp">
                        <Select options={state.cumRapChieu?.map((cumRap, index) => ({ label: cumRap.tenCumRap, value: cumRap.maCumRap }))} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" />
                    </Form.Item>
                    <Form.Item label="Ngày chiếu giờ chiếu">
                        <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={onChangeDate} onOk={onOk} />
                    </Form.Item>
                    <Form.Item label="Giá vé">
                        <InputNumber onChange={onchangeInputNumber} />
                    </Form.Item>
                    <Form.Item label="Chức năng">
                        <Button htmlType="submit">Tạo lịch chiếu</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}