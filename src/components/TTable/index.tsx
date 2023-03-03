import { rule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, ProTable, ProTableProps } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Table } from 'antd';
import React, { ReactNode, useRef, useState } from 'react'
export declare type TTTableType = {
    columns: any[],
    stateKey: string,
    onDelete?: () => void,
    onRowSelection?: (row: []) => void,
    footerToolbarRender?: ReactNode,
}

export default function index(props: ProTableProps<any, any, any> & TTTableType) {
    const {
        actionRef = useRef(null),
        rowKey = "",
        columns,
        request,
        onDelete = undefined,
        onRowSelection = undefined,
        footerToolbarRender = undefined,
        stateKey
    } = props;
    const [selectedRowsState, setSelectedRows] = useState([]);

    const className = useEmotionCss(() => {
        return {
            display: 'flex',
            flexDirection: "column",
            '.ant-pro-table-search': {
                height: "auto"
            },
            ".ant-pro-card:not(.ant-pro-table-search)": {
                height: "100%",
                overflow: "hidden",
                ".ant-pro-card-body": {
                    display: 'flex',
                    flexDirection: "column",
                    ".ant-pro-table-list-toolbar-left": {
                        overflow: "hidden",
                        flex: 1,
                        marginRight: 10
                    },
                    ".ant-table-wrapper": {
                        height: "100%",
                        overflow: "hidden",
                        ".ant-spin-nested-loading": {
                            height: "100%",
                            overflow: "hidden",
                            ".ant-spin-container,.ant-table-container": {
                                height: "100%",
                                overflow: "hidden",
                                display: 'flex',
                                flexDirection: "column",
                                ".ant-table": {
                                    height: "100%",
                                    overflow: "hidden",
                                    ".ant-table-header": {
                                        minHeight: "40px !important"
                                    },
                                    ".ant-table-body": {
                                        height: "100%"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    });
    return (
        <>
            <ProTable
                options={{
                    fullScreen: true,
                    reload: true,
                    setting: true,
                    density: false,
                }}
                size="small"
                className={className}
                bordered
                actionRef={actionRef}
                // 自定义
                rowKey={rowKey}
                search={{
                    labelWidth: 120,
                }}
                scroll={{ x: 500, y: "auto" }}
                columnsState={{
                    persistenceKey: stateKey,
                    persistenceType: "localStorage"
                }}
                // sticky
                request={request}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows: any) => {
                        setSelectedRows(selectedRows);
                        onRowSelection ? onRowSelection(_, selectedRows) : undefined;
                    },
                    selections: [
                        Table.SELECTION_ALL,
                        Table.SELECTION_INVERT,
                        Table.SELECTION_NONE,
                    ]
                }}
                {...props}
            />
            {footerToolbarRender && <>
                {selectedRowsState?.length > 0 && (
                    <FooterToolbar
                        extra={
                            <div>
                                已选择{' '}
                                <a
                                    style={{
                                        fontWeight: 600,
                                    }}
                                >
                                    {selectedRowsState.length}
                                </a>{' '}
                                项 &nbsp;&nbsp;
                            </div>
                        }
                    >
                        <Button
                            onClick={async () => {
                                await onDelete(selectedRowsState);
                                setSelectedRows([]);
                                actionRef.current?.reloadAndRest?.();
                            }}
                        >
                            批量删除
                        </Button>
                    </FooterToolbar>
                )}

            </>}

        </>)
}
