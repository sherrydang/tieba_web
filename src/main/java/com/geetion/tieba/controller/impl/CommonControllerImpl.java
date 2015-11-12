package com.geetion.tieba.controller.impl;

import com.geetion.tieba.controller.CommonController;
import com.geetion.tieba.controller.base.BaseWebController;
import com.geetion.tieba.enums.ResultCode;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;

/**
 * Created by mac on 14/12/10.
 */
@Controller
public class CommonControllerImpl extends BaseWebController implements CommonController {

    @Autowired(required = true)
    private HttpServletRequest request;

    @Override
    public ModelAndView login() {
        Subject currentUser = SecurityUtils.getSubject();
        if (currentUser.isAuthenticated() || currentUser.isRemembered()) {
            return sendResult("redirect:/index.html", null);
        }
        return sendResult(ResultCode.CODE_200.code, "login.jsp", ResultCode.CODE_200.msg, null);
    }

    @Override
    public ModelAndView login(String username, String password) {
        if (checkParaNULL(username, password)) {
            Subject currentUser = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password, false, "ctrl");
            try {
                currentUser.login(token);
                return sendResult("redirect:/index.html", null);
            } catch (UnknownAccountException uae) {
                return sendResult(ResultCode.CODE_702.code, "login.jsp", ResultCode.CODE_702.msg, null);
            } catch (IncorrectCredentialsException ice) {
                return sendResult(ResultCode.CODE_700.code, "login.jsp", ResultCode.CODE_700.msg, null);
            } catch (LockedAccountException lae) {
                return sendResult(ResultCode.CODE_701.code, "login.jsp", ResultCode.CODE_701.msg, null);
            } catch (AuthenticationException ae) {
                ae.printStackTrace();
                return sendResult(ResultCode.CODE_703.code, "login.jsp", ResultCode.CODE_703.msg, null);
            } catch (IllegalArgumentException iae) {
                iae.printStackTrace();
                return sendResult(ResultCode.CODE_703.code, "login.jsp", ResultCode.CODE_703.msg, null);
            }
        }
        return sendResult(ResultCode.CODE_401.code, "login.jsp", ResultCode.CODE_401.msg, null);
    }

    @Override
    public ModelAndView main() {
        ModelAndView model = new ModelAndView();
        model.setViewName("/index.html");
        return model;
    }

    @Override
    public ModelAndView error() {
        ModelAndView model = new ModelAndView();
        model.setViewName("/views/error");
        return model;
    }

    @Override
    public ModelAndView menu() {
        ModelAndView model = new ModelAndView();
        model.setViewName("/views/menu/menu");
        return model;
    }

    @Override
    public Object unauthorized(Locale locale, Model model, String code) {
        //TODO
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public ModelAndView logout(Locale locale, Model model) {
        SecurityUtils.getSubject().logout();
        return sendResult("redirect:/login", null);
    }

}
