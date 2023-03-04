import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined, SelectOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useReducer, useRef, useState } from 'react';
import TTable from '@/components/TTable';
import TPageContainer from '@/components/TPageContainer';
import Edit from './edit';
import { useAccess } from '@umijs/max';
import { del, getList } from '@/owner/common-service';
import { ProFormDateRangePicker } from '@ant-design/pro-components';



const initialState = {
    activeKey: 'mysubmited',
    spinning: false,
    loadding: false,
    editModalVisible: false,
    record: {}
}

function reducer(state = initialState, action: { type: string, payload: {} }) {
    switch (action?.type) {
        case "PAYLOAD": {
            return {
                ...state,
                ...action.payload
            }
        }
        default: {
            return state;
        }
    }
}


const TableList: React.FC = () => {
    const moduleName = "user";
    const [state, dispatch] = useReducer(reducer, initialState);
    const access = useAccess();
    const actionRef = useRef();
    const [selectRows, setSelectRows] = useState([]);
    const columns: any[] = [
        {
            title: '用户名',
            dataIndex: 'username',
            width: 300,
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
            width: 300,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            width: 300,
        },
        {
            title: '手机号',
            dataIndex: 'phonenumber',
            width: 300,
            disable: true
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: 300,
            valueEnum: {
                1: "男",
                0: "女",
                2: "未知"
            },
            filters: true,
        },
        {
            title: '帐号状态',
            dataIndex: 'status',
            width: 300,
        },
        {
            title: '最后登录IP',
            dataIndex: 'loginIp',
            width: 300,
        },
        {
            title: '最后登录时间',
            dataIndex: 'loginDate',
            width: 300,
        },
        {
            title: '角色',
            dataIndex: 'roles',
            width: 300,
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            sorter: true,
            width: 150,
            hideInSearch: true
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            hideInTable: true,
            valueType: "dateRange",
            search: {
                transform: (fields: any) => {
                    return {
                        "createdAt": [fields[0], fields[1]]
                    };
                }
            }
        },
        {
            title: '修改时间',
            dataIndex: 'updatedAt',
            sorter: true,
            width: 150,
            hideInSearch: true
        },
        {
            title: '修改时间',
            dataIndex: 'updatedAt',
            hideInTable: true,
            valueType: "dateRange",
            search: {
                transform: (fields: any) => {
                    return {
                        "updatedAt": [fields[0], fields[1]]
                    };
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            align: "center",
            width: 80,
            render: (_, record) => [
                <Popconfirm disabled={access.funcFilter('system:user:delete')} title="是否删除？" okText="是" cancelText="否"
                    onConfirm={
                        async () => {
                            await del(moduleName, [record?.id])
                            message.success("删除成功！");
                            actionRef.current?.reloadAndRest();
                        }
                    }
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button size="small" disabled={access.funcFilter('system:user:delete')} type="link"><DeleteOutlined /></Button>
                </Popconfirm>,
                <Button size="small" disabled={access.funcFilter('system:user:details')} type="link" onClick={async () => {
                    dispatch({ type: "PAYLOAD", payload: { editModalVisible: true, record: record } });
                }}><SelectOutlined /></Button >,
                // <TableDropdown
                //     key="actionGroup"
                //     onSelect={(val) => {
                //         switch (val) {
                //             case "2":
                //                 break;
                //             default:
                //                 break;
                //         }
                //     }}
                //     menus={[
                //         {
                //             key: '2',
                //             name: <Button size="small" type="link" disabled={(access.funcFilter('system:user:save'))}>迁出</Button>,
                //         },
                //     ]}
                // />,
            ],
        },
    ];
    return (
        <TPageContainer>
            <TTable
                headerTitle="错误日志"
                actionRef={actionRef}
                rowKey={"id"}
                stateKey={'list:table'}
                columns={columns}
                request={async (params, sort, filter) => {
                    return await getList(moduleName, { params, sort, filter });
                }}
                toolBarRender={() => [
                    !access.funcFilter('system:user:delete') && (selectRows.length > 0 && <Button
                        key="1"
                        onClick={async () => {
                            await del(moduleName, selectRows);
                            message.success("删除成功！");
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>),
                    !access.funcFilter('system:user:create') && <Button
                        type="primary"
                        key="2"
                        onClick={() => {
                            dispatch({ type: "PAYLOAD", payload: { editModalVisible: true, record: undefined } })
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                onRowSelection={(keys, rows) => setSelectRows(keys)}
            />
            {
                state.editModalVisible && <Edit
                    values={state.record}
                    mode={"edit"}
                    open={state.editModalVisible}
                    onCancel={() => {
                        dispatch({ type: "PAYLOAD", payload: { editModalVisible: false, record: undefined } })
                    }}
                    onSubmit={() => {
                        dispatch({ type: "PAYLOAD", payload: { editModalVisible: false, record: undefined } })
                        actionRef.current?.reload();
                    }}
                >
                </Edit>
            }
        </TPageContainer>
    );
};
export default TableList;
