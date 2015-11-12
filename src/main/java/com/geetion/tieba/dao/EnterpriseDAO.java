package com.geetion.tieba.dao;

import com.geetion.tieba.dao.base.BaseDAO;
import com.geetion.tieba.pojo.Enterprise;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * Created by xiang on 2015/6/18.
 */
@Repository
public interface EnterpriseDAO extends BaseDAO<Enterprise, Long> {

    public Enterprise selectByIdentifier(@Param("identifier") String identifier);

    public List<Map> selectDeptByEnterpriseId(@Param("enterpriseId") Long enterpriseId);
}
