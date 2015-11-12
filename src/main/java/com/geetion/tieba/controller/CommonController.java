package com.geetion.tieba.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.Locale;

/**
 * Created by mac on 14/12/10.
 */
public interface CommonController {

    /**
     * 中控登录页
     *
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public ModelAndView login();

    /**
     * 中控登录操作
     *
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ModelAndView login(String username, String password);

    /**
     * 中控首页
     *
     * @return
     */
    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public ModelAndView main();

    /**
     * 中控控制台首页菜单栏
     *
     * @return
     */
    @RequestMapping(value = "/error", method = RequestMethod.GET)
    public ModelAndView error();

    /**
     * @return
     */
    @RequestMapping(value = "/common/menu", method = RequestMethod.GET)
    public ModelAndView menu();

    /**
     * 中控授权限制页
     *
     * @param locale
     * @param model
     * @return
     */
    @RequestMapping(value = "/unauthorized", method = RequestMethod.GET)
    @ResponseBody
    public Object unauthorized(Locale locale, Model model, String code);

    /**
     * 中控退出
     *
     * @param locale
     * @param model
     * @return
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public ModelAndView logout(Locale locale, Model model);


}
