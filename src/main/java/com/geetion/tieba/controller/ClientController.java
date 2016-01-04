package com.geetion.tieba.controller;

import com.geetion.tieba.pojo.Client;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Locale;

/**
 * Created by xiang on 2015/6/17.
 */
@RequestMapping("/")
public interface ClientController {

    /**
     * 用户登录页
     *
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    ModelAndView login();

    /**
     * 用户登录操作
     *
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    ModelAndView login(String username, String password);

    /**
     * 返回当前登录用户
     */
    @RequestMapping(value = "/role", method = RequestMethod.GET)
    @ResponseBody
    Object getRole();

    /**
     * 用户注册
     *
     * @param client
     * @return
     */
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public Object register(@ModelAttribute Client client);

    /**
     * 用户退出
     *
     * @param locale
     * @param model
     * @return
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    ModelAndView logout(Locale locale, Model model);

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
     * 获取用户个人资料
     *
     * @param clientId
     * @return
     */
    @RequestMapping(value = "/info/getInfo", method = RequestMethod.GET)
    @ResponseBody
    public Object getInfo(Long clientId);
}