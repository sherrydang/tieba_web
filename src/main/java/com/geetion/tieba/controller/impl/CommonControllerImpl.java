package com.geetion.tieba.controller.impl;


import com.geetion.tieba.controller.CommonController;
import com.geetion.tieba.controller.base.BaseWebController;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by mac on 14/12/10.
 */
@Controller
public class CommonControllerImpl extends BaseWebController implements CommonController {

    @Override
    public ModelAndView main() {
        ModelAndView model = new ModelAndView();
        model.setViewName("/index.html");
        return model;
    }
}
