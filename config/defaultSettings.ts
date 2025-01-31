import { ProLayoutProps } from '@ant-design/pro-components';
export const BASE_URL = "/";
export const PROJECT_API_NAME="";
/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: "Fluid",
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: true,
  title: 'Ant Design Pro',
  pwa: true,
  splitMenus: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  token: {
    // 参见ts声明，demo 见文档，通过token 修改样式
    //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    bgLayout: "rgba(24,144,255 ,.85)", //layout 的背景颜色
    sider: {
      colorMenuBackground: "rgba(255, 255, 255, 0.6)",
    },
    pageContainer: {
      paddingBlockPageContainerContent: 24,
      paddingInlinePageContainerContent: 24,
      // colorBgPageContainer: "rgba(255, 255, 255, 0.6)",
      // colorBgPageContainerFixed: "#FFF"
    }
  },
};

export default Settings;

