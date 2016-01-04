package com.geetion.tieba.utils;

import com.drew.imaging.jpeg.JpegMetadataReader;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifDirectory;
import com.geetion.tieba.consts.ImageField;
import com.geetion.tieba.handle.ThumbExec;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.*;
import java.math.BigDecimal;
import java.util.Map;

/**
 * Created by xiang on 2015/6/19.
 */
@Component
public class ImageUtils {

    /**
     * 保存图片到服务器本地
     *
     * @param file     http 上传文件
     * @param req      request
     * @param savePath 保存文件的路径
     * @return
     */
    public static String saveImage(MultipartFile file, HttpServletRequest req, String savePath) {
        File uploadFile = new File(PathUtils.getUploadPath(req));
        if (!uploadFile.exists()) {//检查upload文件夹是否存在
            uploadFile.mkdir();
        }
        File newFile = new File(savePath);
        if (!newFile.exists()) {
            newFile.mkdir();
        }
        String fileName = System.nanoTime() + ".jpg";
        File imageFile = new File(newFile + File.separator + fileName);
        //imageFile.deleteOnExit();//当文件存在时，删除原图
        try {
            file.transferTo(imageFile);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return imageFile.getAbsolutePath().replace(PathUtils.getWebRootPath(req), "");
    }

    /**
     * handler
     *
     * @param filePath
     * @param request
     * @param response
     * @return
     */
    public static HttpServletResponse getImage(String filePath, HttpServletRequest request, HttpServletResponse response) {
        // 请求参数
        String[] querys = request.getParameter("thumb").split("-");

        Map<String, String> params = QueryUtil.query2Map(querys);
        filePath = PathUtils.getWebRootPath(request) + filePath;

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


    /**
     * 旋转图片并保存
     *
     * *@param degree 旋转角度
     * @throws Exception
     * @return PATH  文件路径
     */
    public static String rotateImage(MultipartFile file, HttpServletRequest req, String savePath ) throws Exception {

        File uploadFile = new File(PathUtils.getUploadPath(req));
        if (!uploadFile.exists()) {//检查upload文件夹是否存在
            uploadFile.mkdir();
        }
        File newFile = new File(savePath);
        if (!newFile.exists()) {
            newFile.mkdir();
        }
        String fileName = System.nanoTime() + ".jpg";
        File imageFile = new File(newFile + File.separator + fileName);
        //imageFile.deleteOnExit();//当文件存在时，删除原图

        file.transferTo(imageFile);

        Integer degree = 0;

        //读取图片的EXIF信息
        Metadata metadata = JpegMetadataReader.readMetadata(imageFile);

        System.out.println("metadata.getDirectoryCount()     "+metadata.getDirectoryCount());

        Directory exif = metadata.getDirectory(ExifDirectory.class);
        int orientation = exif.getInt(ExifDirectory.TAG_ORIENTATION);
        switch (orientation) {
            case 1:
                System.out.println("Top, left side (Horizontal / normal)");
                degree = 270;
                break;
            case 2: System.out.println( "Top, right side (Mirror horizontal)");
                degree = 90;
                break;
            case 3: System.out.println( "Bottom, right side (Rotate 180)");
                degree = 180;
                break;
            case 4: System.out.println( "Bottom, left side (Mirror vertical)");
                degree = 180;
                break;
            case 5: System.out.println( "Left side, top (Mirror horizontal and rotate 270 CW)");
                degree = 270;
                break;
            case 6: System.out.println( "Right side, top (Rotate 90 CW)");
                degree = 90;
                break;
            case 7: System.out.println( "Right side, bottom (Mirror horizontal and rotate 90 CW)");
                degree = 90;
                break;
            case 8: System.out.println( "Left side, bottom (Rotate 270 CW)");
                degree = 270;
                break;
        }

        System.out.println("\n\nimageFile.getPath()  "+imageFile.getPath());

        int swidth = 0; // 旋转后的宽度
        int sheight = 0; // 旋转后的高度
        int x; // 原点横坐标
        int y; // 原点纵坐标

        if (!imageFile.isFile()) {
            throw new Exception("ImageDeal>>>" + imageFile + " 不是一个图片文件!");
        }
        BufferedImage bi = ImageIO.read(imageFile); // 读取该图片


        // 处理角度--确定旋转弧度
        degree = degree % 360;
        if (degree < 0)
            degree = 360 + degree;// 将角度转换到0-360度之间
        double theta = Math.toRadians(degree);// 将角度转为弧度

        // 确定旋转后的宽和高
        if (degree == 180 || degree == 0 || degree == 360) {
            swidth = bi.getWidth();
            sheight = bi.getHeight();
        } else if (degree == 90 || degree == 270) {
            sheight = bi.getWidth();
            swidth = bi.getHeight();
        } else {
            swidth = (int) (Math.sqrt(bi.getWidth() * bi.getWidth()
                    + bi.getHeight() * bi.getHeight()));
            sheight = (int) (Math.sqrt(bi.getWidth() * bi.getWidth()
                    + bi.getHeight() * bi.getHeight()));
        }

        System.out.println("\n\nswidth  "+swidth+"      sheight     "+sheight);


        x = (swidth / 2) - (bi.getWidth() / 2);// 确定原点坐标
        y = (sheight / 2) - (bi.getHeight() / 2);

        System.out.println("\n\n原点  x   "+x+"    y  "+y);

        BufferedImage spinImage = new BufferedImage(swidth, sheight,
                bi.getType());
        // 设置图片背景颜色
        Graphics2D gs = (Graphics2D) spinImage.getGraphics();

        gs.setColor(Color.white);
        gs.fillRect(0, 0, swidth, sheight);// 以给定颜色绘制旋转后图片的背景

        AffineTransform at = new AffineTransform();
        at.rotate(theta, swidth / 2, sheight / 2);// 旋转图象
        at.translate(x, y);
        AffineTransformOp op = new AffineTransformOp(at,
                AffineTransformOp.TYPE_BICUBIC);
        spinImage = op.filter(bi, spinImage);

        ImageIO.write(spinImage, "jpg", imageFile); // 保存图片

        return imageFile.getAbsolutePath().replace(PathUtils.getWebRootPath(req), "");

    }



}
