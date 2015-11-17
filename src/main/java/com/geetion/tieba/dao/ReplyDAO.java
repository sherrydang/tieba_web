package com.geetion.tieba.dao;

import com.geetion.tieba.dao.base.BaseDAO;
import com.geetion.tieba.pojo.Reply;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by sherry on 2015/11/17.
 */
@Repository
public interface ReplyDAO extends BaseDAO<Reply, Long> {

    public List<Reply> selectByClient(@Param("userId") Long userId);

}
