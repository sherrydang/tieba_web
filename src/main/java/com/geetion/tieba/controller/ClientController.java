package com.geetion.tieba.controller;

import com.geetion.tieba.pojo.Client;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by xiang on 2015/6/17.
 */
@RequestMapping("/ctrl/client")
public interface ClientController {

    /**
     * 用户登录
     *
     * @param client
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    @ResponseBody
    public Object login(@ModelAttribute Client client);

    /**
     * 用户注册
     *
     * @param client
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.GET)
    @ResponseBody
    public Object register(@ModelAttribute Client client);

    /**
     * 更新用户个人资料
     *
     * @param client
     * @return
     */
    @RequestMapping(value = "/info/updateInfo", method = RequestMethod.GET)
    @ResponseBody
    public Object updateInfo(@ModelAttribute Client client);

    /**
     * 上传图片
     *
     * @param type
     * @param req
     * @param resp
     * @return
     */
    @RequestMapping(value = "/uploadImage", method = RequestMethod.POST)
    @ResponseBody
    public Object uploadImage(int type, HttpServletRequest req, HttpServletResponse resp);

    /**
     * 下载图片
     *
     * @param req
     * @param resp
     * @return
     */
    @RequestMapping(value = "/getImage", method = RequestMethod.GET)
    public void getImage(long id, HttpServletRequest req, HttpServletResponse resp);
}
