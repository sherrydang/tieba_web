package com.geetion.tieba.shiro.realm;

import com.geetion.tieba.pojo.Admin;
import com.geetion.tieba.pojo.Client;
import com.geetion.tieba.service.AdminService;
import com.geetion.tieba.service.ClientService;
import com.geetion.tieba.utils.PasswordHelper;
import com.geetion.tieba.utils.UUIDUtils;
import org.apache.commons.lang.builder.ReflectionToStringBuilder;
import org.apache.commons.lang.builder.ToStringStyle;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Created by virgilyan on 12/27/14.
 */
public class UserVerifyRealm extends AuthorizingRealm {

    @Resource
    private UUIDUtils uuidUtils;
    @Resource
    private PasswordHelper passwordHelper;

    @Resource
    private ClientService clientService;

    @Resource
    private AdminService adminService;


    /**
     * 赋予登录用户角色和权限
     *
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        //获取当前登录的用户名,等价于(String)principals.fromRealm(this.getName()).iterator().next()
        String employee_no = (String) super.getAvailablePrincipal(principals);
        //String employee_no = (String)principals.fromRealm(this.getName()).iterator().next();
        System.out.println("赋予权限：" + ReflectionToStringBuilder.toString(principals, ToStringStyle.MULTI_LINE_STYLE));
        List<String> roleList = new ArrayList<>();
        List<String> permissionList = new ArrayList<>();
        //从数据库中获取当前登录用户的详细信息
//        PersonalBase user = personService.getPersonalBaseByEmployeeno(employee_no);
//        if (null == user) {
//            throw new AuthorizationException();
//        }
//        //获取该用户的角色
//        List<PersonRole> roleRecords = authorityService.getByPersonId(user.getId());
//        //实体类User中包含有用户角色的实体类信息
//        if (null != roleRecords && roleRecords.size() > 0) {
//            for (PersonRole role : roleRecords) {
//                roleList.add(role.getRole().getName());
//            }
//        }
//        List<Map> operateMap = authorityService.getOperateByPersonID(user.getId());
//
//        for (Map map : operateMap) {
//            permissionList.add((String) map.get("permission"));
//        }

        //为当前用户设置角色和权限
        if (roleList.size() > 0 && permissionList.size() > 0) {
            SimpleAuthorizationInfo simpleAuthorInfo = new SimpleAuthorizationInfo();
            simpleAuthorInfo.addRoles(roleList);
            simpleAuthorInfo.addStringPermissions(permissionList);
            return simpleAuthorInfo;
        }
        //若该方法什么都不做直接返回null的话,就会导致任何用户访问/admin/listUser.jsp时都会自动跳转到unauthorizedUrl指定的地址
        //详见applicationContext.xml中的<quartz id="shiroFilter">的配置
        return null;
    }

    /**
     * 验证登录用户资格
     *
     * @param authcToken
     * @return
     * @throws AuthenticationException UsernameNotFoundException 用户找不到
     *                                 BadCredentialsException 坏的凭据
     *                                 AccountStatusException 用户状态异常它包含如下子类
     *                                 AccountExpiredException 账户过期
     *                                 LockedException 账户锁定
     *                                 DisabledException 账户不可用
     *                                 CredentialsExpiredException 证书过期
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        //获取基于用户名和密码的令牌
        //实际上这个authcToken是从LoginController里面currentUser.login(token)传过来的
        //两个token的引用都是一样的
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        System.out.println("验证当前Subject时获取到token为" + ReflectionToStringBuilder.toString(token, ToStringStyle.MULTI_LINE_STYLE));
        //此处无需比对,比对的逻辑Shiro会做,我们只需返回一个和令牌相关的正确的验证信息
        //说白了就是第一个参数填登录用户名,第二个参数填合法的登录密码(可以是从数据库中取到的,本例中为了演示就硬编码了)
        //这样一来,在随后的登录页面上就只有这里指定的用户和密码才能通过验证

        String account = token.getUsername();
        Admin admin = null;
        Client client = null;
        AuthenticationInfo authcInfo = null;
        if ("admin".equals(token.getHost())) {
            admin = adminService.getAdminByAccount(account);
            if (null == admin) {
                throw new UnknownAccountException();//没找到帐号
            }
//            if (admin.getPassword().equals("123456")) {
//                admin.setPassword(passwordHelper.encryptPassword(admin));
//            }
            //设置登录时间
            admin.setLoginTime(new Date());

            authcInfo = new SimpleAuthenticationInfo(
                    admin.getAccount(),
                    admin.getPassword(),
                    ByteSource.Util.bytes(admin.getAccount()),
                    admin.getAccount()
            );

            this.setSession(admin.getAccount(), admin);
            //设置缓存
            setAuthenticationCachingEnabled(true);


        } else if ("client".equals(token.getHost())) {
            client = clientService.getClientByAccount(account);

            if (null == client) {
                throw new UnknownAccountException();//没找到帐号
            } else if (client.getFreeze() == 1) {
                throw new LockedAccountException();//帐号锁定
            }

//            if (client.getPassword().equals("123456")) {
//                client.setPassword(passwordHelper.encryptPassword(client));
//            }
            //设置登录时间
            client.setLoginTime(new Date());
            clientService.updateClient(client);

            authcInfo = new SimpleAuthenticationInfo(
                    client.getAccount(),
                    client.getPassword(),
                    ByteSource.Util.bytes(client.getAccount()),
                    client.getAccount()
            );

            this.setSession(client.getAccount(), client);
            //设置缓存
            setAuthenticationCachingEnabled(true);

        }
        return authcInfo;

    }

    /**
     * 将一些数据放到ShiroSession中,以便于其它地方使用
     */
    private void setSession(Object key, Object value) {
        Subject currentUser = SecurityUtils.getSubject();
        if (null != currentUser) {
            Session session = currentUser.getSession();
            System.out.println("Session默认超时时间为[" + session.getTimeout() + "]毫秒");
            if (null != session) {
                session.setAttribute(key, value);
            }
        }
    }

    @Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
    }

    @Override
    public void clearCache(PrincipalCollection principals) {
        super.clearCache(principals);
    }

    public void clearAllCachedAuthorizationInfo() {
        getAuthorizationCache().clear();
    }

    public void clearAllCachedAuthenticationInfo() {
        getAuthenticationCache().clear();
    }

    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }

    public Object getUsername(PrincipalCollection principals) {
        Object primary = null;
        if (!CollectionUtils.isEmpty(principals)) {
            Collection thisPrincipals = principals.fromRealm(getName());
            if (!CollectionUtils.isEmpty(thisPrincipals)) {
                primary = thisPrincipals.iterator().next();
            } else {
                //no principals attributed to this particular realm.  Fall back to the 'master' primary:
                primary = principals.getPrimaryPrincipal();
            }
        }
        return primary;
    }

}
