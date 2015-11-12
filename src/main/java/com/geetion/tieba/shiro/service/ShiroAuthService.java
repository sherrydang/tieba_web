package com.geetion.tieba.shiro.service;

import com.geetion.tieba.application.Application;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.*;

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
//        initAnonFilter(sb);
//        initPermissionUrl(sb);
//        initLoginFilter(sb);
//        initSysCustomer(sb);
//        initSysUser(sb);
//        initSysVehicle(sb);
//        initAuthcFiter(sb);
        return sb.toString();
    }

    /**
     * 同时load入数据库的标示
     * 此方法用于url地址能多个权限同时访问的情况出现
     * 先把对应的URL-Permission Load到Map中用于后期的URL权限访问的定义
     */
    public void LoadPermission() {
        ClassPathResource cp = new ClassPathResource("permission.properties");
        Properties properties = new Properties();
        try {
            properties.load(cp.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        Iterator<Map.Entry<Object, Object>> it = properties.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<Object, Object> entry = it.next();
            String key = String.valueOf(entry.getKey());
            String value = String.valueOf(entry.getValue());
            String[] urls = value.split(" ");
            if (urls != null && urls.length > 0) {
                for (String url : urls) {
                    putToMultiPartMap(url, key);
                }
            } else {
                putToMultiPartMap(value, key);
            }
        }
    }

    public void putToMultiPartMap(String url, String key) {
        List<String> keyList = multiPartMap.get(url);
        if (keyList == null) {
            keyList = new ArrayList<>();
        }
        keyList.add(key);
        multiPartMap.put(url, keyList);
    }

    public void initPermissionUrl(StringBuffer stringBuffer) {
        LoadPermission();
        // Iterator<Map.Entry<String, Operate>> it = application.getNoMap().entrySet().iterator();
        String formatString = "%s = authc, permsOR[%s]";
//        while (it.hasNext()) {
//            Map.Entry<String, Operate> entry = it.next();
//            String url = entry.getValue().getUrl();
//            String code = entry.getValue().getOperate_no();
//            String permission = entry.getValue().getPermission();
//            if (!code.endsWith("0")) {
//                String pers[] = permission.split(":");
//                permission += "," + pers[0] + ":*";
//                permission += "," + pers[0] + ":" + pers[1] + ":*";
//
//                List<String> permissionSet = multiPartMap.get(url);
//                if (permissionSet != null && !permissionSet.isEmpty()) {
//                    for (int i = 0; i < permissionSet.size(); i++) {
//                        String persMutil[] = permissionSet.get(i).split("\\.");
//                        permission += "," + persMutil[0] + ":*";
//                        permission += "," + persMutil[0] + ":" + persMutil[1] + ":*";
//                        permission += "," + permissionSet.get(i).replaceAll("\\.", ":");
//                    }
//                }
//                String urlLink = String.format(formatString, url, permission);
//                stringBuffer.append(urlLink).append(CRLF);
//                System.out.println(urlLink);
//            }
//        }
    }

    /**
     * PDA用户过滤
     *
     * @param stringBuffer
     */
    public void initSysUser(StringBuffer stringBuffer) {
        stringBuffer.append("/pda/** = sysUser,forceLogout").append(CRLF);
    }

    /**
     * 车载终端过滤
     *
     * @param stringBuffer
     */
    public void initSysVehicle(StringBuffer stringBuffer) {
        stringBuffer.append("/vehicle/** = sysVehicle,forceLogout").append(CRLF);
    }

    /**
     * 客户终端过滤
     *
     * @param stringBuffer
     */
    public void initSysCustomer(StringBuffer stringBuffer) {
        stringBuffer.append("/pda/customer/** = sysCustomer,forceLogout").append(CRLF);
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
        stringBuffer.append("/mqtt/** = anon").append(CRLF);
        stringBuffer.append("/mqtt/validate = anon").append(CRLF);
        stringBuffer.append("/mqtt/pushOut = anon").append(CRLF);
        stringBuffer.append("/ctrl/district/getDistrictById = anon").append(CRLF);
        stringBuffer.append("/pda/exception/send = anon").append(CRLF);
        stringBuffer.append("/pda/info/uploadCustomImage = anon").append(CRLF);
        stringBuffer.append("/customer_web/login.html = anon").append(CRLF);
    }

    /**
     * 加入登陆url地址
     *
     * @param stringBuffer
     */
    public void initLoginFilter(StringBuffer stringBuffer) {
        stringBuffer.append("/login = anon").append(CRLF);
        stringBuffer.append("/pda/customer/login = anon").append(CRLF);
        stringBuffer.append("/pda/employ/login = anon").append(CRLF);
        stringBuffer.append("/vehicle/user/login = anon").append(CRLF);
        stringBuffer.append("/pda/user/login = anon").append(CRLF);
        stringBuffer.append("/pda/driver/searchByRfid = anon").append(CRLF);
        stringBuffer.append("/pda/driver/bindDriverAndVehicle = anon").append(CRLF);
    }

}
