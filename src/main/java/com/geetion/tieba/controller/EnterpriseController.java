package com.geetion.tieba.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by xiang on 2015/6/18.
 */
@RequestMapping("/ctrl/client")
public interface EnterpriseController {

    /**
     * 验证企业识别码
     *
     * @param identifier
     * @return
     */
    @RequestMapping(value = "/validateIdentifier", method = RequestMethod.GET)
    @ResponseBody
    public Object validateIdentifier(String identifier);

    /**
     * 根据企业ID获取部门列表
     *
     * @param enterprise_id
     * @return
     */
    @RequestMapping(value = "/getDepartment", method = RequestMethod.GET)
    @ResponseBody
    public Object getDepartmentByEnterpriseId(Long enterprise_id);
}
