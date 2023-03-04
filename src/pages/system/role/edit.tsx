import React, { useRef } from 'react';
import { ModalForm, ProCard, ProForm, ProFormDatePicker, ProFormInstance, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import TLine from '@/components/TLine';
import { useModel } from '@umijs/max';
import { findOne, save, update } from '@/owner/common-service';
import { useAccess, useSearchParams } from '@umijs/max';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Edit(props: any) {
  const access = useAccess();
  const moduleName = "role";
  const {
    values,
    onSubmit,
    open,
    onCancel,
    mode = "edit",
  } = props;
  const restFormRef = useRef<ProFormInstance>();
  const formRef = useRef<ProFormInstance>();
  const { initialState } = useModel('@@initialState');

  return (
    <>
      <ModalForm
        //#region
        autoFocusFirstInput
        formRef={formRef}
        title={values?.id ? mode == "read" ? "详情" : "编辑" : "新增"}
        open={true}
        width={800}
        submitter={{
          render: (props, defaultDoms) => {
            return (!access.funcFilter('system:role:create') || access.funcFilter('system:role:update') && mode == "edit") ? [
              // ...defaultDoms,
              <Button
                key="extra-reset"
                onClick={() => {
                  props.reset();
                }}
              >
                重置
              </Button>,
              <Button
                key="sub"
                type="primary"
                onClick={() => {
                  props.submit();
                }}
              >
                提交
              </Button>
            ] : null;
          },
        }}
        onFinish={async (formData) => {
          values?.id ? await update(moduleName, formData) : await save(moduleName, formData);
          onSubmit();
        }}
        modalProps={{
          onCancel: onCancel,
          destroyOnClose: true,
          maskClosable: false,
          keyboard: false,
        }}
        grid
        layout="vertical"
        rowProps={{
          gutter: [8, 8],
        }}
        params={{ id: values?.id }}
        request={async (params) => {
          if (values?.id) {
            const { code, success, data = {} } = await findOne(moduleName, params);
            return data || {};
          } else {
            return {};
          }
        }}
      //#endregion
      >
        <ProForm.Group>
          <ProFormText
            hidden
            name="id"
            readonly
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="roleName"
            label="角色名称"
            placeholder="请输入角色名称"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="roleSort"
            label="角色排序"
            placeholder="请输入角色排序"
            readonly={mode == "read"}
          />
          {/* <ProFormDatePicker
            colProps={{
              xs: 24,
              sm: 24,
              md: 12,
              lg: 12
            }}
            fieldProps={{
              format: 'YYYY-MM',
              picker: "month",
            }}
            name="updatedAt"
            label="上次调度时间"
            placeholder={'请选择上次调度时间'}
            readonly={mode === "read"}
          /> */}
        </ProForm.Group>
      </ModalForm>
    </>
  );
}
