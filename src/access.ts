/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser,
    normalRouteFilter: (route) => {
      return currentUser?.principal?.authorities?.find(item => item?.authority?.includes(route?.uid)) ? true : false;
    },
    funcFilter: (func: string) => {
      return currentUser?.principal?.authorities?.find(item => item?.authority?.includes(func)) ? true : false;
    },
  };

}
