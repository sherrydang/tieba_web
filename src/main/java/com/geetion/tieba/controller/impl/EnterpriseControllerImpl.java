package com.geetion.tieba.controller.impl;

import com.geetion.tieba.controller.EnterpriseController;
import com.geetion.tieba.controller.base.BaseWebController;
import com.geetion.tieba.enums.ResultCode;
import com.geetion.tieba.pojo.Enterprise;
import com.geetion.tieba.service.EnterpriseService;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by xiang on 2015/6/18.
 */
@Controller
public class EnterpriseControllerImpl extends BaseWebController implements EnterpriseController {

    @Resource
    private EnterpriseService enterpriseService;

    @Override
    public Object validateIdentifier(String identifier) {
        if(checkParaNULL(identifier)){
            Enterprise enterprise = enterpriseService.getEnterpriseByIdentifier(identifier);
            if(enterprise != null){
                Map<String, Object> resultMap = new HashMap<String, Object>();
                resultMap.put("enterprise", enterprise);
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, resultMap);
            }
            return sendResult(ResultCode.CODE_800.code, ResultCode.CODE_800.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

    @Override
    public Object getDepartmentByEnterpriseId(Long enterprise_id) {
        if(checkParaNULL(enterprise_id)){
            List<Map> deptList = enterpriseService.getDepartmentByEnterpriseId(enterprise_id);
            if(deptList != null){
                Map<String, Object> resultMap = new HashMap<String, Object>();
                resultMap.put("departments", deptList);
                return sendResult(ResultCode.CODE_200.code, ResultCode.CODE_200.msg, resultMap);
            }
            return sendResult(ResultCode.CODE_500.code, ResultCode.CODE_500.msg, null);
        }
        return sendResult(ResultCode.CODE_401.code, ResultCode.CODE_401.msg, null);
    }

}
