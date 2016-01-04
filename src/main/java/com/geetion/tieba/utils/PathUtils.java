package com.geetion.tieba.utils;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by xiang on 2015/6/18.
 */
public class PathUtils {
    public static String getWebRootPath(HttpServletRequest req) {
        return req.getServletContext().getRealPath("/");
    }

    public static String getUploadPath(HttpServletRequest req) {
        return getWebRootPath(req) + "/upload";
    }

    public static String getUserFilePath(HttpServletRequest req, String identifer) {
        return getUploadPath(req) + "/" + identifer;
    }

}
