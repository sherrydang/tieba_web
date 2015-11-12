package com.geetion.tieba.utils;

import com.geetion.tieba.consts.ImageField;
import com.geetion.tieba.handle.ThumbExec;
import com.geetion.tieba.pojo.Image;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.math.BigDecimal;
import java.util.Map;

/**
 * Created by xiang on 2015/6/19.
 */
public class ImageUtils {

    /**
     * 保存图片到服务器本地
     *
     * @param type
     * @param req
     * @return fileName
     */
    public static String saveImage(int type, HttpServletRequest req) {
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) req;
        MultipartFile file = multipartRequest.getFile("pic");
        File newFile = null;
        switch (type) {
            case 0://广告图片
                newFile = new File(PathUtils.getAdvertisementPicPath(req));
                break;
            case 1://头像图片
                newFile = new File(PathUtils.getHeadIconPath(req));
                break;
            case 2://截图图片
                newFile = new File(PathUtils.getScreenshotPath(req));
                break;
            default:
                return null;
        }
        if (!newFile.exists()) {
            newFile.mkdir();
        }
        String fileName = new UUIDUtils().getUUID() + ".jpg";
        try {
            file.transferTo(new File(newFile + File.separator + fileName));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return fileName;
    }

    /**
     * handler
     *
     * @param image
     * @param request
     * @param response
     * @return
     */
    public static HttpServletResponse getImage(Image image, HttpServletRequest request, HttpServletResponse response) {
        // 请求参数
        String[] querys = request.getParameter("thumb").split("/");

        Map<String, String> params = QueryUtil.query2Map(querys);

        // 请求文件物理路径
        String filePath = null;
        switch (image.getType()) {
            case 0:
                filePath = PathUtils.getAdvertisementPicPath(request) + File.separator + image.getUrl();
                break;
            case 1:
                filePath = PathUtils.getHeadIconPath(request) + File.separator + image.getUrl();
                break;
            case 2:
                filePath = PathUtils.getScreenshotPath(request) + File.separator + image.getUrl();
                break;
            default:
                return null;
        }
        if (params.isEmpty() || !FileUtil.exists(filePath)) {
            return response;
        }
        // 缩略图路径
        String thumbPath = filePath;

        int width = 0, height = 0;
        double quality = 0.0D, scale = 0.0D, rotate = 0.0D;

        String field = params.get(ImageField.MAP_FIELD);

        try {
            // 图片质量
            if (null != params.get("q")) {
                quality = Double.valueOf(params.get("q"));
            }
            // 旋转角度
            if (null != params.get("r")) {
                rotate = Double.valueOf(params.get("r"));
            }
            // 按大小
            if (null != params.get("s") && params.get("s").indexOf("x") != -1) {
                String[] size = params.get("s").split("x");
                width = Integer.valueOf(size[0]);
                height = Integer.valueOf(size[1]);
                thumbPath = FileUtil.getImgPath(filePath, width, height, quality, scale, rotate);
                thumbPath = ThumbExec.thumb(filePath, thumbPath, width, height, scale, quality, rotate);
            }

            if (null == params.get("s") && null == params.get("p")) {
                if (scale <= 0) {
                    scale = 1D;
                }
                thumbPath = FileUtil.getImgPath(filePath, width, height, quality, scale, rotate);
                thumbPath = ThumbExec.thumb(filePath, thumbPath, width, height, scale, quality, rotate);
            } else {
                // 既有按大小又有按比例 直接返回 不处理
                if (null != params.get("s") && null != params.get("p")) {
                    return response;
                }
                // 按比例
                if (null != params.get("p")) {
                    scale = BigDecimalUtil.divide(new BigDecimal(params.get("p")), new BigDecimal("100"), 10).doubleValue();
                    thumbPath = FileUtil.getImgPath(filePath, width, height, quality, scale, rotate);
                    thumbPath = ThumbExec.thumb(filePath, thumbPath, width, height, scale, quality, rotate);
                }
            }

            // 缩略图显示
            if (field.equalsIgnoreCase(ImageField.VIEW_FIELD)) {
                response = viewImage(thumbPath, request, response);
            }
            // 缩略图下载
            if (field.equalsIgnoreCase(ImageField.DOWN_FIELD)) {
                response = downImage(thumbPath, request, response);
            }
        } catch (NumberFormatException e) {
        }
        return response;
    }

    /**
     * 显示图片
     *
     * @param path
     * @param request
     * @param response
     * @return
     */
    private static HttpServletResponse viewImage(String path, HttpServletRequest request, HttpServletResponse response) {
        try {
            File file = new File(path);
            String fileName = file.getName();
            // 得到图片的文件流
            InputStream fis = new BufferedInputStream(new FileInputStream(file));

            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();

            response.reset();
            // 设置response的Header
            response.addHeader("Content-Length", "" + file.length());
            OutputStream out = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("image/" + FileUtil.getSuffix(fileName) + "; charset=utf-8");

            out.write(buffer);
            out.flush();
            out.close();
        } catch (IOException ex) {
        }
        return response;
    }

    /**
     * 下载图片
     *
     * @param path
     * @param request
     * @param response
     * @return
     */
    private static HttpServletResponse downImage(String path, HttpServletRequest request, HttpServletResponse response) {
        try {
            File file = new File(path);
            String fileName = file.getName();
            // 得到图片的文件流
            InputStream fis = new BufferedInputStream(new FileInputStream(file));

            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();

            response.reset();
            // 设置response的Header
            response.addHeader("Content-Length", "" + file.length());
            response.addHeader("Content-Disposition", "attachment;filename=" + new String(fileName.getBytes("utf-8"), "iso-8859-1"));
            OutputStream out = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");

            out.write(buffer);
            out.flush();
            out.close();
        } catch (IOException ex) {
        }
        return response;
    }
}
