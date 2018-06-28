import React, { PureComponent } from 'react'

import PropTypes from 'prop-types'

import { Menu, Icon, Affix, Divider } from 'antd'

import { Link } from 'react-router-dom'

// import style from './Nav.scss'

import _ from 'lodash'


const SubMenu = Menu.SubMenu

class Nav extends React.PureComponent {

    static propTypes = {
        location: PropTypes.object.isRequired,
        menuData: PropTypes.array
    }


    /**
     * prepare menu data for renderring
     * @param {Array} menuData 
     * @param {String} selectedPath 
     */
    decorateMenuData(menuData, selectedPath) {

        if (!menuData || !menuData.length) return {}

        let root = {
            name: 'root',
            label: 'root',
            url: '/',
            selected: true,
            children: menuData
        }

        const modules = []

        const decorate = (menu, url, depth, paths) => {
            let o = {}




            try {

                _.extend(o, _.omit(menu, 'modules', 'children'))

                o.depth = depth

                if (menu.children) {  // is catagory
                    o.cat = true
                    o.url = menu.name == 'root' ? '' : (url + '/' + menu.name)

                } else {
                    o.url = url + '/' + menu.name
                    o.isModule = true

                    // save the module in an outter array
                    modules.push(o)
                }

                let children = menu.modules || menu.children || []

                if (children.length) {
                    let selectedChild = children.find((itm) => { return itm.name === paths[0] })

                    if (selectedChild) {
                        o.selectedChild = selectedChild.name
                        o.selectedChildText = selectedChild.text
                        paths.shift()

                    }
                    o.children = children.map((itm) => { return decorate(itm, o.url, o.depth + 1, paths) })
                }



            } catch (error) {
                console.error(error)
            }

            return o
        }

        /**
         * setup module url to its parent catagories
         */
        const setupCatUrl = (menuData, modules) => {

            const setup = (menu, url) => {

                if (menu.cat && RegExp('^' + menu.url + '.+$').test(url) && !menu.selected) {
                    menu.url = url
                    menu.selected = true
                }


                _.castArray(menu.children || []).forEach((itm) => {
                    setup(itm, url)
                })
            }

            // 1st setup selectedPath 
            setup(menuData, selectedPath)

            // 2nd setup url of the first module of each catagory
            modules.forEach(function (itm) {
                setup(menuData, itm.url)
            }, this);
        }

        const paths = ((selectedPath.match(/[^\/].+[^\/]/g) || [])[0] || '').split('/')

        root = decorate(root, '', 0, paths)
        setupCatUrl(root, modules)

        console.log(root)

        return root
    }


    render() {

        const me = this

        const { location, menuData, logout } = this.props

        const menu = me.decorateMenuData(menuData, location.pathname);



        const renderMenu = (menu) => {

            if (!menu) return


            return (
                <div >

                    {
                        (menu.depth === 0) &&
                        <Menu mode="horizontal" className={'nav'}>
                            <SubMenu title={
                                <a style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                    <Icon type={menu.children.find(itm => (itm.name == menu.selectedChild))['icon']} />
                                    {menu.selectedChildText}
                                    <Icon style={{ marginLeft: 8 }} type="down" />
                                </a>}
                            >

                                {
                                    (menu.children || []).map((itm) => {
                                        return <Menu.Item
                                            key={itm.name}
                                            className={itm.url == location.pathname ? 'ant-menu-item-selected ant-menu-item' : ''}
                                        >
                                            <span className={'icon_' + itm.name} />
                                            <Link style={{ display: 'inline-block' }} to={itm.url}>{itm.text}</Link>
                                        </Menu.Item>
                                    })

                                }

                            </SubMenu>

                            {
                                _.get((menu.children || []).find(itm => itm.name === menu.selectedChild), 'children', []).map((itm) => {
                                    return <Menu.Item
                                        className={itm.url == location.pathname ? 'ant-menu-item-selected ant-menu-item' : 'x'}
                                        key={itm.name}
                                    >
                                        <Link to={itm.url}>{itm.text}</Link>
                                    </Menu.Item>
                                })


                            }

                            <SubMenu className='submenu_profile' title={<a><span className='icon_user' /> <span>admin</span></a>} >

                                <Menu.Item key='logout' style={{ textAlign: 'left' }}>
                                    <Icon type='logout' />
                                    <Link style={{ display: 'inline-block' }} to='/' onClick={() => {

                                    }}>{'logout'}</Link>
                                </Menu.Item>


                            </SubMenu>


                        </Menu>

                    }

                    {
                        menu.type === 'dropdown' && menu.depth !== 0 &&
                        <Menu mode="horizontal" className={'nav'}>
                            <SubMenu title={
                                <a style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                    <Icon type={menu.children.find(itm => (itm.name == menu.selectedChild))['icon']} />
                                    {menu.selectedChildText}
                                    <Icon style={{ marginLeft: 8 }} type="down" />
                                </a>}
                            >

                                {
                                    (menu.children || []).map((itm) => {
                                        return <Menu.Item
                                            key={itm.name}
                                            className={itm.url == location.pathname ? 'ant-menu-item-selected ant-menu-item' : ''}
                                        >
                                            <span className={'icon_' + itm.name} />
                                            <Link style={{ display: 'inline-block' }} to={itm.url}>{itm.text}</Link>
                                        </Menu.Item>
                                    })

                                }

                            </SubMenu>

                            {
                                _.get((menu.children || []).find(itm => itm.name === menu.selectedChild), 'children', []).map((itm) => {
                                    return <Menu.Item
                                        className={itm.url == location.pathname ? 'ant-menu-item-selected ant-menu-item' : 'x'}
                                        key={itm.name}
                                    >
                                        <Link to={itm.url}>{itm.text}</Link>
                                    </Menu.Item>
                                })


                            }


                        </Menu>

                    }



                    {
                        menu.type !== 'dropdown' && menu.depth > 1 &&
                        <Menu mode="horizontal" className={'navsub'} style={{ height: 32, borderBottom: 'none' }}>
                            {

                                (menu.children || []).map((itm, index, self) => {
                                    return <Menu.Item
                                        style={{ height: 32, lineHeight: '32px' }}
                                        key={itm.name}
                                        className={itm.url == location.pathname ? 'navsub-selected' : ''}
                                    >
                                        <Link to={itm.url} style={{ display: 'inline-block' }}>
                                            {
                                                itm.children &&
                                                <a className={`ant-table-row-expand-icon ${itm.url == location.pathname ? 'ant-table-row-expanded' : 'ant-table-row-collapsed'}`} />
                                            }
                                            {itm.text}</Link>
                                        {index !== self.length - 1 && <Divider type="vertical" />}
                                    </Menu.Item>

                                })


                            }
                        </Menu>
                    }

                    {renderMenu((menu.children || []).find(itm => itm.name === menu.selectedChild))}
                </div >



            )


        }


        return _.isArray(menuData) && menuData.length ? renderMenu(menu) : ''
    }


}

export default Nav