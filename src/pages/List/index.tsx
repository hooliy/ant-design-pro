import { rule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React, { useRef, useState } from 'react';
import TTable from '@/components/TTable';


/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const TableList: React.FC = () => {
    const actionRef = useRef();
    const [selectRows, setSelectRows] = useState([]);
    const columns: any[] = [
        {
            title: '规则名称',
            dataIndex: 'name',
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
    return (
        <TTable
            headerTitle="dfafafad"
            actionRef={actionRef}
            rowKey={"key"}
            stateKey={'list:table'}
            columns={columns}
            request={rule}
            toolBarRender={() => [
                selectRows.length > 0 && <Button
                    key="1"
                    onClick={() => {
                        actionRef.current?.reloadAndRest?.();
                    }}
                >
                    批量删除
                </Button>,
                <Button
                    type="primary"
                    key="2"
                >
                    <PlusOutlined /> 新建
                </Button>,
            ]}
            onRowSelection={(rows) => setSelectRows(rows)}
        />
    );
};
export default TableList;
