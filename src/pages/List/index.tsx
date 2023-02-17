import { rule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import {
    FooterToolbar,
    getPageTitle,
    PageContainer,
    ProTable,
} from '@ant-design/pro-components';
import { } from '@umijs/max';
import { Button, Input, message, Table } from 'antd';
import defaultSettings from '../../../config/defaultSettings';
import React, { useRef, useState } from 'react';
import breadcrumb from 'antd/es/breadcrumb';
import TTable from '@/components/TTable';


/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const TableList: React.FC = () => {
    const actionRef = useRef();

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */

    const columns: any[] = [
        {
            title: '规则名称',
            dataIndex: 'name',
            tip: 'The rule name is the unique key',
            // render: (dom, entity) => {
            //     return (
            //         <a
            //             onClick={() => {
            //                 setCurrentRow(entity);
            //                 setShowDetail(true);
            //             }}
            //         >
            //             {dom}
            //         </a>
            //     );
            // },
        },
        {
            title: '描述',
            dataIndex: 'desc',
            valueType: 'textarea',
            ellipsis: true,
            width: 100
        },
        {
            title: '服务调用次数',
            dataIndex: 'callNo',
            sorter: true,
            filtered: true,
            hideInForm: true,
            renderText: (val: string) => `${val}${'万'}`,
        },
        {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            filtered: true,
            valueEnum: {
                0: {
                    text: '关闭',
                    status: 'Default',
                },
                1: {
                    text: '运行中',
                    status: 'Processing',
                },
                2: {
                    text: '已上线',
                    status: 'Success',
                },
                3: {
                    text: '异常',
                    status: 'Error',
                },
            },
        },
        {
            title: '上次调度时间',
            sorter: true,
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                const status = form.getFieldValue('status');
                if (`${status}` === '0') {
                    return false;
                }
                if (`${status}` === '3') {
                    return <Input {...rest} placeholder={'请输入异常原因！'} />;
                }
                return defaultRender(item);
            },
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
                <a
                    key="config"
                    onClick={() => {
                        handleUpdateModalOpen(true);
                        setCurrentRow(record);
                    }}
                >
                    配置
                </a>,
                <a key="subscribeAlert" href="https://procomponents.ant.design/">
                    订阅警报
                </a>,
            ],
        },
    ];
    const title = getPageTitle({

    }, true);
    console.log(title, location.pathname, breadcrumb)
    return (
        <TTable rowKey={"key"} onRowSelection={(record) => {
            console.log(record)
        }} columns={columns} request={rule} />
    );
};
export default TableList;
