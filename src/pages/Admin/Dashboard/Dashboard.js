import { layDanhSachNguoiDung, xoaNguoiDung } from '../../../redux/actions/QuanLyNguoiDungAction';
import { Table, Tag, Space, Button, Popconfirm, Input } from 'antd';
import { FormOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import { history } from '../../../App';
export default function Dashboard() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachNguoiDung());
    }, [])
    const { listUser } = useSelector(state => state.QuanLyNguoiDungReducer);
    //console.log(listUser);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            sorter: (item, nextItem) => {
                return nextItem?.userId - item?.userId
            },
            render: (text, record, index) => {
                return <span className='text-danger'>{index + 1}</span>
            },
            sortDirections: ['descend'],
        },
        {
            title: 'taiKhoan',
            key: 'taiKhoan',
            dataIndex: 'taiKhoan',
            ...getColumnSearchProps('taiKhoan')
        },
        {
            title: 'email',
            key: 'email',
            dataIndex: 'email',
            ...getColumnSearchProps('email')
        },
        {
            title: 'hoTen',
            key: 'hoTen',
            dataIndex: 'hoTen',
            ...getColumnSearchProps('hoTen'),
        },
        {
            title: 'soDt',
            key: 'soDt',
            dataIndex: 'soDt',
            render: (text, record, index) => {
                return record?.soDt
            }
        },
        {
            title: 'maLoaiNguoiDung',
            key: 'maLoaiNguoiDung',
            dataIndex: 'maLoaiNguoiDung',
            render: (text, record, index) => {
                return record?.maLoaiNguoiDung
            }
        },
        {
            title: 'Action',
            key: 'Action',
            render: (text, record, index) => {
                return <div>
                    <button className="btn mr-2 btn-primary text-red-400" onClick={() => {
                        history.push(`/admin/users/edit/${record.taiKhoan}`)
                        dispatch({
                            type: "EDIT_USER",
                            userEdit: record
                        })
                    }}>
                        <FormOutlined style={{ fontSize: 17 }} />
                    </button>
                    <Popconfirm
                        title="Are you sure to delete this project?"
                        onConfirm={() => { dispatch(xoaNguoiDung(record?.taiKhoan)) }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button className="text-yellow-500">
                            <DeleteOutlined style={{ fontSize: 17 }} />
                        </button>
                    </Popconfirm>,
                </div>
            }
        }
    ];
    return (
        <>
            <h3 className='text-center' style={{ fontSize: 24 }}>User Managerment</h3>
            <Table columns={columns} rowKey={"email"} dataSource={listUser} />
        </>
    )
}