import React, { useRef } from 'react';
import { ModalForm, ProForm, ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { findOne, save, update } from '@/owner/common-service';
import { useAccess } from '@umijs/max';
import { Button, message } from 'antd';

export default function Edit(props: any) {
  const access = useAccess();
  const moduleName = "user";
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
            return (!access.funcFilter('system:user:create') || access.funcFilter('system:user:update') && mode == "edit") ? [
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
          message.success("提交成功！")
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
            name="username"
            label="用户名"
            initialValue="15667033125"
            placeholder="请输入用户名"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="nickName"
            label="昵称"
            placeholder="请输入昵称"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="email"
            label="邮箱"
            placeholder="请输入邮箱"
            initialValue="123121@11.com"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            initialValue="15667033125"
            name="phonenumber"
            label="手机号"
            placeholder="请输入手机号"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="sex"
            label="性别"
            placeholder="请输入性别"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="avatar"
            label="用户头像"
            placeholder="请输入用户头像"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            initialValue="132"
            name="password"
            label="密码"
            placeholder="请输入密码"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="status"
            label="帐号状态"
            placeholder="请输入帐号状态"
            readonly={mode == "read"}
          />
          <ProFormText
            colProps={{
              xs: 24,
              sm: 24,
              md: 24,
              lg: 24
            }}
            name="roles"
            label="角色"
            placeholder="请输入角色"
            // rules={[
            //   {
            //     required: mode === "edit",
            //     message: '请输入角色!',
            //   },
            //   { max: 100, message: '不能超过100个字符' },
            // ]}
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
