package com.geetion.tieba.shiro.filter;

import org.apache.shiro.web.filter.PathMatchingFilter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**
 * <p>User: Zhang Kaitao
 * <p>Date: 14-2-15
 * <p>Version: 1.0
 */
public class SysUserFilter extends PathMatchingFilter {
    //    @Resource
//    private PersonService personService;
    @Autowired
    private HttpServletRequest mRequest;

    @Override
    protected boolean onPreHandle(ServletRequest request, ServletResponse response, Object mappedValue) throws Exception {
//        String token = mRequest.getHeader("Authorization");
//        PersonalBase user = null;
//        if (token != null) {
//            user = personService.getPersonalBaseByToken(token);
//        }
//        if (user != null) {
//            request.setAttribute(Constants.CURRENT_USER, user);
//            return true;
//        } else {
//            response.setContentType("application/json");
//            response.setCharacterEncoding("UTF-8");
//            Map params = new HashMap();
//            params.put("code", "401");
//            params.put("message", "访问用户的token错误");
//            response.getWriter().append(JSON.toJSONString(params));
//            return false;
//        }
        return true;
    }
}
