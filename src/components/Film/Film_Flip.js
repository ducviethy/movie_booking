import React from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import './Flim_Flip.css'
import { history } from "../../App";
export default function Film_Flip(props) {
    const { item } = props;
    return (
        <div className="flip-card mt-2">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={item.hinhAnh} className="w-72 h-72" alt="Avatar" onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'}} />
                </div>
                <div className="flip-card-back relative ">
                    <div className='absolute top-0 left-0'>
                        <img className="w-72 h-72" src={item.hinhAnh} alt="Avatar" onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'}} />
                    </div>
                    <div className="w-full h-full absolute flex justify-center items-center" style={{backgroundColor: 'rgba(0,0,0,.5)'}}>
                        <div>
                            <div className="rounded-full cursor-pointer"><PlayCircleOutlined style={{ fontSize: '50px' }} /></div>
                            <div className="text-2xl mt-2 font-bold">{item.tenPhim}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => { history.push(`/detail/${item.maPhim}`) }} className="bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold">ĐẶT VÉ</div>
        </div>
    )
}