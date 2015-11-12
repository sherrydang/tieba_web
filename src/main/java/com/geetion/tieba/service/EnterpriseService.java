package com.geetion.tieba.service;

import com.geetion.tieba.pojo.Enterprise;

import java.util.List;
import java.util.Map;

/**
 * Created by xiang on 2015/6/18.
 */
public interface EnterpriseService {

    public Enterprise getEnterpriseByIdentifier(String identifier);

    public List<Map> getDepartmentByEnterpriseId(long id);
}
