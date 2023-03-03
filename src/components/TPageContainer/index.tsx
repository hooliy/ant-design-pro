import { rule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, PageContainerProps, ProTable, ProTableProps } from '@ant-design/pro-components';
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

export default function index(props: PageContainerProps) {
    const className = useEmotionCss(() => {
        return {
            height: "100%",
            display: 'flex',
            flexDirection: "column",
            overflow: "hidden",
            ".ant-pro-grid-content,.ant-pro-grid-content-children,.ant-pro-page-container-children-content": {
                height: "100%",
                overflow: "hidden",
            }
        };
    });
    return (
        <PageContainer
            breadcrumb={undefined}
            title={false}
            className={className}
            {...props}
        />
    )
}
