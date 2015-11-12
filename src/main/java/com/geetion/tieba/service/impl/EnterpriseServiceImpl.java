package com.geetion.tieba.service.impl;

import com.geetion.tieba.dao.EnterpriseDAO;
import com.geetion.tieba.pojo.Enterprise;
import com.geetion.tieba.service.EnterpriseService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 * Created by xiang on 2015/6/18.
 */
@Service
public class EnterpriseServiceImpl implements EnterpriseService {

    @Resource
    private EnterpriseDAO enterpriseDAO;

    @Override
    public Enterprise getEnterpriseByIdentifier(String identifier) {
        return enterpriseDAO.selectByIdentifier(identifier);
    }

    @Override
    public List<Map> getDepartmentByEnterpriseId(long id) {
        return enterpriseDAO.selectDeptByEnterpriseId(id);
    }
}
