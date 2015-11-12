package com.geetion.tieba.utils;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by xiang on 2015/6/18.
 */
public class PathUtils {
    public static String getWebRootPath(HttpServletRequest req){
        return req.getServletContext().getRealPath("/");
    }

    public static String getAdvertisementPicPath(HttpServletRequest req){
        return getWebRootPath(req) + "/upload/advertisement_pic";
    }

    public static String getHeadIconPath(HttpServletRequest req){
        return getWebRootPath(req) + "/upload/head_icon";
    }

    public static String getScreenshotPath(HttpServletRequest req){
        return getWebRootPath(req) + "/upload/screenshot";
    }
}
