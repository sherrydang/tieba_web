package com.geetion.tieba.controller.impl;


import com.geetion.tieba.controller.CommonController;
import com.geetion.tieba.controller.base.BaseWebController;
import com.geetion.tieba.enums.ResultCode;
import com.geetion.tieba.pojo.Image;
import com.geetion.tieba.service.ImageService;
import com.geetion.tieba.utils.ImageUtils;
import com.geetion.tieba.utils.PathUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by mac on 14/12/10.
 */
@Controller
public class CommonControllerImpl extends BaseWebController implements CommonController {

    @Autowired
    private HttpServletRequest req;

    @Resource
    private ImageService imageService;

    @Override
    public ModelAndView main() {
        ModelAndView model = new ModelAndView();
        model.setViewName("/index.html");
        return model;
    }

    @Override
    public Object uploadImage(MultipartFile pic) {

        if (checkParaNULL(pic)) {
            //使用时间作为上传文件的标识
            String fileName = ImageUtils.saveImage(pic, req, PathUtils.getUserFilePath(req, "product"));
            if (fileName != null && !"".equals(fileName)) {
                Image image = new Image();
                image.setPath(fileName);
                if (imageService.addImage(image)) {
                    Map<String, Object> result = new HashMap<>();
                    result.put("image", image);
                    return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, result);
                }
                return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
            }
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }


    @Override
    public void getImage(Long id, HttpServletRequest req, HttpServletResponse resp) {
        Image image = imageService.getImageByPk(id);
        if (image != null) {
            resp = ImageUtils.getImage(image.getPath(), req, resp);
        }
    }

    @Override
    public void showImage(Long id, HttpServletRequest request, HttpServletResponse response) {
        if (checkParaNULL(id)) {
            Image image = imageService.getImageByPk(id);
            if (image != null) {
                String fileName = PathUtils.getWebRootPath(request) + image.getPath().replace("\\", File.separator);
                File file = new File(fileName);
                try {
                    //判断文件是否存在如果不存在就返回默认图标
                    if (file.exists() && file.canRead()) {
                        FileInputStream inputStream = null;
                        inputStream = new FileInputStream(file);
                        byte[] data = new byte[(int) file.length()];
                        int length = inputStream.read(data);
                        inputStream.close();
                        response.setContentType("image/png");
                        OutputStream stream = response.getOutputStream();
                        stream.write(data);
                        stream.flush();
                        stream.close();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
