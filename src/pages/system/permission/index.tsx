import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined, SelectOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React, { useReducer, useRef, useState } from 'react';
import TTable from '@/components/TTable';
import TPageContainer from '@/components/TPageContainer';
import Edit from './edit';
import { useAccess } from '@umijs/max';
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
    const moduleName = "permission";
    const [state, dispatch] = useReducer(reducer, initialState);
    const access = useAccess();
    const actionRef = useRef();
    const [selectRows, setSelectRows] = useState([]);
    const columns: any[] = [
        {
            title: '权限名称',
            dataIndex: 'name',
            width: 300,
        },
        {
            title: '权限标识',
            dataIndex: 'identify',
            width: 300,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            align: "center",
            width: 80,
            render: (_, record) => [
                <Popconfirm disabled={access.funcFilter('system:permission:delete')} title="是否删除？" okText="是" cancelText="否"
                    onConfirm={
                        async () => {
                            await del(moduleName, [record?.id])
                            actionRef.current?.reloadAndRest();
                        }
                    }
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
                    <Button size="small" disabled={access.funcFilter('system:permission:delete')} type="link"><DeleteOutlined /></Button>
                </Popconfirm>,
                <Button size="small" disabled={access.funcFilter('system:permission:details')} type="link" onClick={async () => {
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
                //             name: <Button size="small" type="link" disabled={(access.funcFilter('system:permission:save'))}>迁出</Button>,
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
                    !access.funcFilter('system:permission:delete') && (selectRows.length > 0 && <Button
                        key="1"
                        onClick={async () => {
                            await del(moduleName, selectRows);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>),
                    !access.funcFilter('system:permission:create') && <Button
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
