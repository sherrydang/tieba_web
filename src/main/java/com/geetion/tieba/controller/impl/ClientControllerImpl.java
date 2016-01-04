package com.geetion.tieba.controller.impl;

import com.geetion.tieba.controller.ClientController;
import com.geetion.tieba.controller.base.BaseWebController;
import com.geetion.tieba.enums.ResultCode;
import com.geetion.tieba.pojo.Client;
import com.geetion.tieba.pojo.Image;
import com.geetion.tieba.service.ClientService;
import com.geetion.tieba.service.ImageService;
import com.geetion.tieba.utils.ImageUtils;
import com.geetion.tieba.utils.PathUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Created by xiang on 2015/6/17.
 */
@Controller
public class ClientControllerImpl extends BaseWebController implements ClientController {

    @Resource
    private ClientService clientService;

    @Resource
    private ImageService imageService;
/*

    @Override
    public Object login(@ModelAttribute Client client) {
        if(checkParaNULL(client.getAccount(), client.getPassword())){
            client = clientService.login(client);
            if(client != null){
                if(client.getPassword() != null){
                    Map<String, Object> resultMap = new HashMap<String, Object>();
                    resultMap.put("user", client);
                    return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, resultMap);
                }
                return sendResult(ResultCode.CODE_701.code, ResultCode.CODE_701.msg, null);
            }
            return sendResult(ResultCode.CODE_700.code, ResultCode.CODE_700.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }
*/

    @Override
    public ModelAndView login() {
        Subject currentUser = SecurityUtils.getSubject();
        if (currentUser.isAuthenticated() || currentUser.isRemembered()) {
            return sendResult("redirect:/", null);
        }
        return sendResult(ResultCode.CODE_200.code, "login.jsp", ResultCode.CODE_200.msg, null);
    }

    @Override
    public ModelAndView login(String username, String password) {
        if (checkParaNULL(username, password)) {
            Subject currentUser = SecurityUtils.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password, false, "client");
//            token.setRememberMe(true);
            try {
                currentUser.login(token);
                return sendResult("redirect:/", null);
            } catch (UnknownAccountException uae) {
                return sendResult(ResultCode.CODE_700.code, "login.jsp", ResultCode.CODE_700.msg, null);
            } catch (IncorrectCredentialsException ice) {
                return sendResult(ResultCode.CODE_701.code, "login.jsp", ResultCode.CODE_701.msg, null);
            } catch (IllegalArgumentException iae) {
                iae.printStackTrace();
                return sendResult(ResultCode.CODE_703.code, "login.jsp", ResultCode.CODE_703.msg, null);
            } catch (Exception e){
                e.printStackTrace();
                return sendResult(ResultCode.CODE_703.code, "login.jsp", ResultCode.CODE_703.msg, null);
            }
        }
        return sendResult(ResultCode.CODE_401.code, "login.jsp", ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object register(@ModelAttribute Client client) {
        if(checkParaNULL(client.getAccount(), client.getPassword(), client.getImageId())){
            boolean registerResult = clientService.register(client);
            if(registerResult){
                client = clientService.getClientByAccount(client.getAccount());
                Map<String, Object> resultMap = new HashMap<String, Object>();
                resultMap.put("user", client);
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, resultMap);
            }
            return sendResult(ResultCode.CODE_702.code, ResultCode.CODE_702.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object getRole() {
        Client client = getLoginClient();
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("client", client);
        return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, resultMap, "password");
    }

    @Override
    public ModelAndView logout(Locale locale, Model model) {
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.logout();
        return sendResult("redirect:/login", null);
    }

    @Override
    public Object updateInfo(@ModelAttribute Client client) {
        if(checkParaNULL(client.getId())){
            boolean updateResult = clientService.updateClient(client);
            if(updateResult){
                client = clientService.getClientByPK(client.getId());
                Map<String, Object> resultMap = new HashMap<String, Object>();
                resultMap.put("client", client);
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, resultMap);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

}
