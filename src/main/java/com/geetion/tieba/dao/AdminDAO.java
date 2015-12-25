package com.geetion.tieba.dao;

import com.geetion.tieba.dao.base.BaseDAO;
import com.geetion.tieba.pojo.Admin;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by xiang on 2015/6/17.
 */
@Repository
public interface AdminDAO extends BaseDAO<Admin, Long> {

    public Admin selectByAccount(@Param("account") String account);

}
