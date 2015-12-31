package com.geetion.tieba.controller.base;

import com.geetion.tieba.pojo.Client;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import java.text.SimpleDateFormat;

/**
 * Created by mac on 14/12/10.
 */
@Controller
public abstract class BaseWebController extends BaseController {
    protected SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    protected static final Logger logger = LoggerFactory.getLogger(BaseWebController.class);


    /**
     * 获取当前登陆的client用户
     *
     * @return
     */
    public Client getLoginClient() {
        Subject currentUser = SecurityUtils.getSubject();
        if (currentUser != null) {
            String clientId = (String) currentUser.getPrincipal();
            if (clientId != null) {
                Client loginClient = (Client) currentUser.getSession().getAttribute(clientId);
                if (loginClient != null)
                    return loginClient;
                else
                    throw new UnknownAccountException();//没找到帐号
            } else
                throw new UnknownAccountException();//没找到帐号
        } else
            throw new UnknownAccountException();//没找到帐号
    }
}
