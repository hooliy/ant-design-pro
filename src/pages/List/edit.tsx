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
  const moduleName = "operlog";
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
            return (!access.funcFilter('system:operlog:create') || access.funcFilter('system:operlog:update') && mode == "edit") ? [
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
            name="name"
            label="规则名称"
            placeholder="请输入规则名称"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="url"
            label="规则名称"
            placeholder="请输入规则名称"
            readonly={mode == "read"}
          />
          <ProFormTextArea
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="stack"
            label="规则名称"
            placeholder="请输入规则名称"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="message"
            label="状态"
            placeholder="请输入状态"
            rules={[
              {
                required: mode === "edit",
                message: '请输入状态!',
              },
              { max: 100, message: '不能超过100个字符' },
            ]}
            readonly={mode === "read"}
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
