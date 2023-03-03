import { rule } from '@/services/ant-design-pro/api';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Popconfirm } from 'antd';
import React, { useReducer, useRef, useState } from 'react';
import TTable from '@/components/TTable';
import TPageContainer from '@/components/TPageContainer';
import Edit from './edit';
import { useAccess } from '@umijs/max';
import { TableDropdown } from '@ant-design/pro-components';
import { del, getList } from '@/owner/common-service';



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
    const moduleName = "operlog";
    const [state, dispatch] = useReducer(reducer, initialState);
    const access = useAccess();
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
            align: "center",
            width: 120,
            render: (_, record) => [
                <Popconfirm disabled={!access.funcFilter('tt:list:del')} title="是否删除？" okText="是" cancelText="否"
                    onConfirm={
                        async () => {
                            await del(moduleName, [record])
                            actionRef.current?.reloadAndRest();
                        }
                    }
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button size="small" disabled={!access.funcFilter('tt:list:del')} type="link">删除</Button>
                </Popconfirm>,
                <Button size="small" disabled={access.funcFilter('tt:list:save')} type="link" onClick={async () => {
                    dispatch({ type: "PAYLOAD", payload: { editModalVisible: true, record: record } });
                }}>编辑</Button >,
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
                //             name: <Button size="small" type="link" disabled={!(access.funcFilter('tt:list:save'))}>迁出</Button>,
                //         },
                //     ]}
                // />,
            ],
        },
    ];
    return (
        <TPageContainer>
            <TTable
                headerTitle="dfafafad"
                actionRef={actionRef}
                rowKey={"key"}
                stateKey={'list:table'}
                columns={columns}
                request={(params, sort, filter) => {
                    return getList(moduleName, params)
                }}
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
                        onClick={() => {
                            dispatch({ type: "PAYLOAD", payload: { editModalVisible: true, record: undefined } })
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                onRowSelection={(rows) => setSelectRows(rows)}
            />
            {
                state.editModalVisible && <Edit
                    values={state.record}
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
