package com.geetion.tieba.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface CommonController {

    /**
     * 中控首页
     *
     * @return
     */
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView main();

    /**
     * 上传图片
     ** @param pic
     * @return
     */
    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
    @ResponseBody
    Object uploadImage(MultipartFile pic);

    /**
     * 下载图片
     *
     * @param req
     * @param resp
     * @return
     */
    @RequestMapping(value = "/getImage", method = RequestMethod.GET)
    void getImage(Long id, HttpServletRequest req, HttpServletResponse resp);


    /**
     * 显示图片
     *
     * @param id
     * @return
     */
    @RequestMapping(value = "/showImage", method = RequestMethod.GET)
    @ResponseBody
    public void showImage(Long id, HttpServletRequest request, HttpServletResponse response);

}
