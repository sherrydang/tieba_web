package com.geetion.tieba.controller.impl;

import com.geetion.tieba.controller.ClientController;
import com.geetion.tieba.controller.base.BaseWebController;
import com.geetion.tieba.enums.ResultCode;
import com.geetion.tieba.pojo.Client;
import com.geetion.tieba.pojo.Image;
import com.geetion.tieba.service.ClientService;
import com.geetion.tieba.service.ImageService;
import com.geetion.tieba.utils.ImageUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
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

    @Override
    public Object register(@ModelAttribute Client client) {
        if(checkParaNULL(client.getAccount(), client.getPassword())){
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

    @Override
    public Object uploadImage(int type, HttpServletRequest req, HttpServletResponse resp) {
        String fileName = ImageUtils.saveImage(type, req);
        if(fileName != null && !"".equals(fileName)){
            Image image = new Image();
            image.setUrl(fileName);
            image.setType(type);
            boolean insertResult = imageService.addImage(image);
            if(insertResult){
                image = imageService.getByUrl(image.getUrl());
                Map<String, Object> result = new HashMap<String, Object>();
                result.put("image", image);
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, result);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
        }
        return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
    }

    @Override
    public void getImage(long id, HttpServletRequest req, HttpServletResponse resp) {
        Image image = imageService.getByPk(id);
        if(image != null){
            resp = ImageUtils.getImage(image, req, resp);
        }
    }

}
