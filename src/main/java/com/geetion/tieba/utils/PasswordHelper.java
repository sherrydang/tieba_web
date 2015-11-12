package com.geetion.tieba.utils;

import org.springframework.stereotype.Component;

/**
 * <p>User: Zhang Kaitao
 * <p>Date: 14-1-28
 * <p>Version: 1.0
 */
@Component("passwordHelper")
public class PasswordHelper {

    public static final String algorithmName = "md5";
    public static final int hashIterations = 2;

    public void encryptPassword(Object user) {
//        String newPassword = new SimpleHash(algorithmName, user.getPassword(), ByteSource.Util.bytes(user.getEmployee_no()), hashIterations).toHex();
//        user.setPassword(newPassword);
    }
}
