package com.geetion.tieba.shiro.service;

import com.geetion.tieba.application.Application;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by mac on 15/4/23.
 */
@Service(value = "authService")
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class ShiroAuthService {

    @Resource
    private ShiroFilterFactoryBean shiroFilterFactoryBean;

    private Map<String, List<String>> multiPartMap = new HashMap<>();

    @Resource
    private Application application;

    private static final String CRLF = "\r\n";


    /**
     * 返回URL配置路径
     *
     * @return String Url
     * /test/** = anon
     * /mqtt/** = anon
     * /upload/** = anon
     * /login = anon
     * /logout = authc
     * /ctrl/district/getDistrictById = anon
     * /ctrl/** = authc,forceLogout
     * /pda/customer/login = anon
     * /pda/employ/login = anon
     * /pda/exception/send = anon
     * /pda/info/uploadCustomImage = anon
     * /pda/info/addCollectTask = sysCustomer,forceLogout
     * /pda/info/searchhistory = sysCustomer,forceLogout
     * /pda/user/login = anon
     * /pda/** = sysUser,forceLogout
     * /vehicle/user/login = anon
     * /vehicle/** = sysVehicle,forceLogout
     */

    public String loadFilterChainDefinitions() {
        StringBuffer sb = new StringBuffer();
        initAnonFilter(sb);
//        initLoginFilter(sb);
//        initSysCustomer(sb);
//        initAuthcFiter(sb);
        return sb.toString();
    }




    public void initAuthcFiter(StringBuffer stringBuffer) {
        stringBuffer.append("/logout = authc,forceLogout").append(CRLF);
        stringBuffer.append("/** = authc,forceLogout").append(CRLF);
    }

    /**
     * 加入不过滤的url地址
     *
     * @param stringBuffer
     */
    public void initAnonFilter(StringBuffer stringBuffer) {
        stringBuffer.append("/test/** = anon").append(CRLF);
        stringBuffer.append("/js/** = anon").append(CRLF);
        stringBuffer.append("/css/** = anon").append(CRLF);
        stringBuffer.append("/images/** = anon").append(CRLF);
        stringBuffer.append("/upload/** = anon").append(CRLF);
//        stringBuffer.append("/index.html = anon").append(CRLF);
    }

    /**
     * 加入登陆url地址
     *
     * @param stringBuffer
     */
    public void initLoginFilter(StringBuffer stringBuffer) {
        stringBuffer.append("/login = anon").append(CRLF);
        stringBuffer.append("/ctrl/admin/login = anon").append(CRLF);
        stringBuffer.append("/ctrl/client/login = anon").append(CRLF);
    }
//    public void initSysCustomer(StringBuffer stringBuffer) {
//        stringBuffer.append("/app/** = sysUser").append(CRLF);
//    }

}
