import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const defaultMessage = 'xxx公司 版权所有';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      // links={[
      //   {
      //     key: 'Ant Design Pro',
      //     title: 'Ant Design Pro',
      //     href: 'https://pro.ant.design',
      //     blankTarget: true,
      //   },
      //   {
      //     key: 'github',
      //     title: <GithubOutlined />,
      //     href: 'https://github.com/ant-design/ant-design-pro',
      //     blankTarget: true,
      //   },
      //   {
      //     key: 'Ant Design',
      //     title: 'Ant Design',
      //     href: 'https://ant.design',
      //     blankTarget: true,
      //   },
      // ]}
    />
  );
};
export default Footer;
