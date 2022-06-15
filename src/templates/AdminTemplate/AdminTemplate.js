import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    FileOutlined,
    PlusOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { history } from "../../App";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const AdminTemplate = (props) => { //path, exact, Component
    const { Component, ...restProps } = props;
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const [collapsed, setCollapsed] = useState(false);
    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    // if (!localStorage.getItem(USER_LOGIN)) {
    //     alert('Bạn không có quyền truy cập vào trang này !')
    //     return <Redirect to='/' />
    // }
    // if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
    //     alert('Bạn không có quyền truy cập vào trang này !')
    //     return <Redirect to='/' />
    // }
    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment>
            <div className="flex justify-end">
                <div className="w-12 h-12 flex items-center justify-center text-2xl ml-5 rounded-full bg-red-200">
                    {userLogin?.taiKhoan.substr(0, 1)}
                </div>
                <h3 className="absolute right-40 top-0">Hello Ajnomoto ! {userLogin?.taiKhoan}</h3>
            </div>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/');
                window.location.reload();
            }} className="ml-3 text-blue-800 absolute top-0">Đăng xuất</button> </Fragment> : ''}
    </Fragment>
    return <Route {...restProps} render={(propsRoute) => { //props.location,props.history,props.match
        return <Fragment>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo p-5">
                        <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="..." />
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <NavLink to="/admin/users">Users</NavLink>
                        </Menu.Item>
                        <SubMenu key="sub1" icon={<FileOutlined />} title="Films">
                            <Menu.Item key="10" icon={<UnorderedListOutlined />}>
                                <NavLink to="/admin/films">List Films</NavLink>
                            </Menu.Item>
                            <Menu.Item key="11" icon={<PlusOutlined />}>
                                <NavLink to="/admin/films/addnew">Add new film</NavLink>
                            </Menu.Item>
                        </SubMenu>
                        {/* <Menu.Item key="3" icon={<DesktopOutlined />}>
                            <NavLink to="/admin/films/showtime">Showtime</NavLink>
                        </Menu.Item> */}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background p-0">
                        <div className="text-right pr-12 pt-1">{operations}</div>
                    </Header>
                    <hr />
                    <Content className="pb-4">
                        <Breadcrumb className="px-4">
                        </Breadcrumb>
                        <div className="site-layout-background p-3" style={{ minHeight: '75vh' }}>
                            <Component {...propsRoute} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center',padding:"5px 24px"}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </Fragment>
    }} />
}
export default AdminTemplate;